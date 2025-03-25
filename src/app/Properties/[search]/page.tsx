"use client"
import { useState, useEffect } from "react"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Award, Clock, Share2, Home, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

// Import the Property interface and PropertyCard component from your home page
// or create a shared types file for better organization
interface Property {
  id: string
  title: string
  location: string
  price: string
  images: string[]
  brokerage: string
  tag: string
  readyToMove: boolean
  discount: string
  visitBonus: string
  bhkOptions: string[]
}

interface FilterOptions {
  priceRange: [number, number]
  bhkTypes: string[]
  readyToMove: boolean
  locations: string[]
  brokerages: string[]
}

function SearchResultsPage({ params }: { params: { search: string } }) {
  const searchQuery = decodeURIComponent(params.search)
  const router = useRouter()
  const searchParams = useSearchParams()

  // If no search query is provided, return 404
  if (!searchQuery) {
    notFound()
  }

  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000000], // Default price range in rupees
    bhkTypes: [],
    readyToMove: false,
    locations: [],
    brokerages: [],
  })

  const [availableFilters, setAvailableFilters] = useState({
    maxPrice: 10000000,
    minPrice: 0,
    locations: [] as string[],
    brokerages: [] as string[],
  })

  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Fetch properties based on search query and filters
  useEffect(() => {
    async function fetchProperties() {
      setLoading(true)
      try {
        // Build query parameters from filters
        const queryParams = new URLSearchParams(searchParams)

        // Add filters to query params
        if (filters.priceRange[0] > availableFilters.minPrice) {
          queryParams.set("minPrice", filters.priceRange[0].toString())
        }

        if (filters.priceRange[1] < availableFilters.maxPrice) {
          queryParams.set("maxPrice", filters.priceRange[1].toString())
        }

        if (filters.bhkTypes.length > 0) {
          queryParams.set("bhkTypes", filters.bhkTypes.join(","))
        }

        if (filters.readyToMove) {
          queryParams.set("readyToMove", "true")
        }

        if (filters.locations.length > 0) {
          queryParams.set("locations", filters.locations.join(","))
        }

        if (filters.brokerages.length > 0) {
          queryParams.set("brokerages", filters.brokerages.join(","))
        }

        // Replace with your actual API endpoint that supports search and filters
        const response = await fetch(
          `https://apimobile-6zp8.onrender.com/api/properties?search=${encodeURIComponent(searchQuery)}&${queryParams.toString()}`,
          {
            cache: "no-store", // Don't cache search results
          },
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const data = await response.json()
        setProperties(data)

        // Extract available filter options from the data
        if (data.length > 0) {
          const locations: string[] = Array.from(new Set(data.map((p: Property) => p.location)));
          const brokerages: string[] = Array.from(new Set(data.map((p: Property) => p.brokerage)));
          
          const prices = data.map((p: Property) => Number.parseInt(p.price.replace(/[^\d]/g, "")))

          setAvailableFilters({
            locations,
            brokerages,
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices),
          })

          // Update price range if it's the initial load
          if (filters.priceRange[0] === 0 && filters.priceRange[1] === 10000000) {
            setFilters((prev) => ({
              ...prev,
              priceRange: [Math.min(...prices), Math.max(...prices)],
            }))
          }
        }
      } catch (error) {
        console.error("Error fetching search results:", error)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [searchQuery, filters, searchParams])

  // Count active filters
  useEffect(() => {
    let count = 0

    if (filters.priceRange[0] > availableFilters.minPrice || filters.priceRange[1] < availableFilters.maxPrice) {
      count++
    }

    if (filters.bhkTypes.length > 0) count++
    if (filters.readyToMove) count++
    if (filters.locations.length > 0) count++
    if (filters.brokerages.length > 0) count++

    setActiveFiltersCount(count)
  }, [filters, availableFilters])

  // Apply filters to the URL
  const applyFilters = () => {
    const queryParams = new URLSearchParams(searchParams)

    // Reset existing filter params
    queryParams.delete("minPrice")
    queryParams.delete("maxPrice")
    queryParams.delete("bhkTypes")
    queryParams.delete("readyToMove")
    queryParams.delete("locations")
    queryParams.delete("brokerages")

    // Add new filter params
    if (filters.priceRange[0] > availableFilters.minPrice) {
      queryParams.set("minPrice", filters.priceRange[0].toString())
    }

    if (filters.priceRange[1] < availableFilters.maxPrice) {
      queryParams.set("maxPrice", filters.priceRange[1].toString())
    }

    if (filters.bhkTypes.length > 0) {
      queryParams.set("bhkTypes", filters.bhkTypes.join(","))
    }

    if (filters.readyToMove) {
      queryParams.set("readyToMove", "true")
    }

    if (filters.locations.length > 0) {
      queryParams.set("locations", filters.locations.join(","))
    }

    if (filters.brokerages.length > 0) {
      queryParams.set("brokerages", filters.brokerages.join(","))
    }

    // Update the URL with filters
    router.push(`/Properties/${params.search}?${queryParams.toString()}`)
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      priceRange: [availableFilters.minPrice, availableFilters.maxPrice],
      bhkTypes: [],
      readyToMove: false,
      locations: [],
      brokerages: [],
    })

    // Remove filter params from URL
    router.push(`/Properties/${params.search}`)
  }

  // Toggle BHK type selection
  const toggleBhkType = (bhkType: string) => {
    setFilters((prev) => {
      if (prev.bhkTypes.includes(bhkType)) {
        return {
          ...prev,
          bhkTypes: prev.bhkTypes.filter((type) => type !== bhkType),
        }
      } else {
        return {
          ...prev,
          bhkTypes: [...prev.bhkTypes, bhkType],
        }
      }
    })
  }

  // Toggle location selection
  const toggleLocation = (location: string) => {
    setFilters((prev) => {
      if (prev.locations.includes(location)) {
        return {
          ...prev,
          locations: prev.locations.filter((loc) => loc !== location),
        }
      } else {
        return {
          ...prev,
          locations: [...prev.locations, location],
        }
      }
    })
  }

  // Toggle brokerage selection
  const toggleBrokerage = (brokerage: string) => {
    setFilters((prev) => {
      if (prev.brokerages.includes(brokerage)) {
        return {
          ...prev,
          brokerages: prev.brokerages.filter((b) => b !== brokerage),
        }
      } else {
        return {
          ...prev,
          brokerages: [...prev.brokerages, brokerage],
        }
      }
    })
  }

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lac`
    } else {
      return `₹${price.toLocaleString()}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Search Results: {searchQuery}</h1>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Properties</SheetTitle>
                <SheetDescription>Refine your search results with these filters</SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                {/* Price Range Filter */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                      min={availableFilters.minPrice}
                      max={availableFilters.maxPrice}
                      step={100000}
                      value={[filters.priceRange[0], filters.priceRange[1]]}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: [value[0], value[1]] }))}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{formatPrice(filters.priceRange[0])}</span>
                      <span>{formatPrice(filters.priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* BHK Options Filter */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">BHK Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((bhk) => (
                      <Button
                        key={bhk}
                        variant={filters.bhkTypes.includes(bhk) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleBhkType(bhk)}
                        className="rounded-full"
                      >
                        {bhk}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Ready to Move Filter */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ready-to-move"
                    checked={filters.readyToMove}
                    onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, readyToMove: checked === true }))}
                  />
                  <label
                    htmlFor="ready-to-move"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ready to Move
                  </label>
                </div>

                {/* Location Filter */}
                {availableFilters.locations.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm">Location</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {availableFilters.locations.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-${location}`}
                            checked={filters.locations.includes(location)}
                            onCheckedChange={() => toggleLocation(location)}
                          />
                          <label
                            htmlFor={`location-${location}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Brokerage Filter */}
                {availableFilters.brokerages.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm">Brokerage</h3>
                    <div className="space-y-2">
                      {availableFilters.brokerages.map((brokerage) => (
                        <div key={brokerage} className="flex items-center space-x-2">
                          <Checkbox
                            id={`brokerage-${brokerage}`}
                            checked={filters.brokerages.includes(brokerage)}
                            onCheckedChange={() => toggleBrokerage(brokerage)}
                          />
                          <label
                            htmlFor={`brokerage-${brokerage}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {brokerage}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <SheetFooter className="flex-row justify-between sm:justify-between gap-2">
                <Button variant="outline" onClick={resetFilters} className="flex-1">
                  Reset All
                </Button>
                <SheetClose asChild>
                  <Button onClick={applyFilters} className="flex-1">
                    Apply Filters
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Active filters:</span>

            {filters.priceRange[0] > availableFilters.minPrice || filters.priceRange[1] < availableFilters.maxPrice ? (
              <Badge variant="secondary" className="flex items-center gap-1">
                {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [availableFilters.minPrice, availableFilters.maxPrice],
                    }))
                  }
                />
              </Badge>
            ) : null}

            {filters.bhkTypes.map((bhk) => (
              <Badge key={bhk} variant="secondary" className="flex items-center gap-1">
                {bhk}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleBhkType(bhk)} />
              </Badge>
            ))}

            {filters.readyToMove && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Ready to Move
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => setFilters((prev) => ({ ...prev, readyToMove: false }))}
                />
              </Badge>
            )}

            {filters.locations.map((location) => (
              <Badge key={location} variant="secondary" className="flex items-center gap-1">
                {location}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleLocation(location)} />
              </Badge>
            ))}

            {filters.brokerages.map((brokerage) => (
              <Badge key={brokerage} variant="secondary" className="flex items-center gap-1">
                {brokerage}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleBrokerage(brokerage)} />
              </Badge>
            ))}

            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-gray-500">
              Clear all
            </Button>
          </div>
        )}

        {loading ? (
          <SearchResultsSkeleton />
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No properties found</h2>
            <p className="text-gray-500 mb-6">
              We couldn&apos;t find any properties matching &quot;{searchQuery}&quot;
              {activeFiltersCount > 0 && " with the selected filters"}
            </p>
            <div className="flex justify-center gap-4">
              {activeFiltersCount > 0 && (
                <Button variant="outline" onClick={resetFilters}>
                  Clear Filters
                </Button>
              )}
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-gray-500">Found {properties.length} properties matching your search</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Skeleton loader for search results
function SearchResultsSkeleton() {
  return (
    <div>
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-[400px]">
            <div className="h-[180px] bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="w-8 h-8 bg-gray-200 rounded-md animate-pulse"></div>
                ))}
              </div>
              <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Import the PropertyCard component from your home page or create a shared component
function PropertyCard({ property }: { property: Property }) {
  const bhkOptions = typeof property.bhkOptions === "string" ? JSON.parse(property.bhkOptions) : property.bhkOptions

  const imagesArray: string[] = Array.isArray(property.images) ? property.images : JSON.parse(property.images || "[]")

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="relative">
        {imagesArray.length > 0 ? (
          <img
            src={imagesArray[0] || "/placeholder.svg"} // Display the first image
            alt={property.title}
            className="w-full h-[180px] object-cover"
          />
        ) : (
          <div className="w-full h-[180px] bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}

        {/* Brokerage Tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">{property.brokerage}</span>
        </div>

        {/* Best Seller Tag */}
        <div className="absolute top-3 right-3">
          <span className="bg-amber-400 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
            <Award className="w-3 h-3" />
            {property.tag}
          </span>
        </div>

        {/* Ready to Move Tag */}
        {property.readyToMove && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/70 text-white text-xs font-medium px-3 py-1 rounded-md flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Ready to Move
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Property Details */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-800">{property.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{property.location}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Share2 size={18} />
          </button>
        </div>

        {/* BHK Options */}
        <div className="flex gap-2 mt-4">
          {Array.isArray(bhkOptions) ? (
            bhkOptions.map((option, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md">
                  <Home size={16} className="text-gray-500" />
                </div>
                <span className="text-xs text-gray-600 mt-1">{option}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No BHK options available</p>
          )}
        </div>

        {/* Price and Discount */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xl text-gray-900">{property.price}</h4>
              <p className="text-xs text-gray-500 mt-1">{property.discount}</p>
            </div>
            <div>
              <Link href={`/Properties/${property.id}`}>
                <Button className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50">Book Visit</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Visit Bonus */}
        {property.visitBonus && (
          <div className="mt-3">
            <span className="bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-md">
              {property.visitBonus}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResultsPage

