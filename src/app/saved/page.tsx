"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Home, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from "../component/footer"

// Define the Property type based on the provided fields
interface Property {
  id: string
  title: string
  location: string
  price: string
  image: string
  brokerage: string
  tag: string
  readyToMove: boolean
  discount: string
  visitBonus: string
  bhkOptions: string[]
}

export default function SavedProperties() {
  // Sample data for demonstration
  const [savedProperties, setSavedProperties] = useState<Property[]>([
    {
      id: "1",
      title: "Modern Apartment with Sea View",
      location: "Downtown, New York",
      price: "$2,500/month",
      image: "/placeholder.svg?height=300&width=500",
      brokerage: "2.5%",
      tag: "Premium",
      readyToMove: true,
      discount: "10% off first month",
      visitBonus: "$100 Amazon gift card",
      bhkOptions: ["1 BHK", "2 BHK", "3 BHK"],
    },
    {
      id: "2",
      title: "Luxury Villa with Pool",
      location: "Beverly Hills, Los Angeles",
      price: "$5,000/month",
      image: "/placeholder.svg?height=300&width=500",
      brokerage: "3%",
      tag: "Luxury",
      readyToMove: true,
      discount: "15% off first month",
      visitBonus: "$200 Amazon gift card",
      bhkOptions: ["3 BHK", "4 BHK"],
    },
    {
      id: "3",
      title: "Cozy Studio Apartment",
      location: "Brooklyn, New York",
      price: "$1,800/month",
      image: "/placeholder.svg?height=300&width=500",
      brokerage: "2%",
      tag: "Budget",
      readyToMove: false,
      discount: "5% off first month",
      visitBonus: "$50 Amazon gift card",
      bhkOptions: ["Studio", "1 BHK"],
    },
    {
      id: "4",
      title: "Spacious Family Home",
      location: "Queens, New York",
      price: "$3,200/month",
      image: "/placeholder.svg?height=300&width=500",
      brokerage: "2.5%",
      tag: "Family",
      readyToMove: true,
      discount: "7% off first month",
      visitBonus: "$150 Amazon gift card",
      bhkOptions: ["2 BHK", "3 BHK", "4 BHK"],
    },
    {
      id: "5",
      title: "Penthouse with Rooftop Garden",
      location: "Manhattan, New York",
      price: "$7,500/month",
      image: "/placeholder.svg?height=300&width=500",
      brokerage: "3.5%",
      tag: "Premium",
      readyToMove: true,
      discount: "20% off first month",
      visitBonus: "$300 Amazon gift card",
      bhkOptions: ["3 BHK", "4 BHK", "5 BHK"],
    },
    {
      id: "6",
      title: "Riverside Apartment",
      location: "Hudson River, New York",
      price: "$3,800/month",
      image: "/placeholder.svg?height=300&width=500",
      brokerage: "2.75%",
      tag: "Waterfront",
      readyToMove: false,
      discount: "12% off first month",
      visitBonus: "$175 Amazon gift card",
      bhkOptions: ["2 BHK", "3 BHK"],
    },
  ])

  // Function to remove a property from saved list
  const removeProperty = (id: string) => {
    setSavedProperties(savedProperties.filter((property) => property.id !== id))
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Tabs */}
      <Tabs defaultValue="all" className="flex-1 overflow-hidden flex flex-col">
        <div className="px-4 pt-3 pb-2">
          <TabsList className="w-full bg-red-100 p-0.5 rounded-full">
            <TabsTrigger
              value="all"
              className="flex-1 rounded-full data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              All Properties
            </TabsTrigger>
            <TabsTrigger
              value="ready"
              className="flex-1 rounded-full data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              Ready to Move
            </TabsTrigger>
            <TabsTrigger
              value="discounted"
              className="flex-1 rounded-full data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              Discounted
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="flex-1 overflow-auto px-4 py-2">
          <div className="space-y-3 pb-4">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} onRemove={removeProperty} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ready" className="flex-1 overflow-auto px-4 py-2">
          <div className="space-y-3 pb-4">
            {savedProperties
              .filter((property) => property.readyToMove)
              .map((property) => (
                <PropertyCard key={property.id} property={property} onRemove={removeProperty} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="discounted" className="flex-1 overflow-auto px-4 py-2">
          <div className="space-y-3 pb-4">
            {savedProperties
              .filter((property) => property.discount)
              .map((property) => (
                <PropertyCard key={property.id} property={property} onRemove={removeProperty} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {savedProperties.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <Home className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-lg font-semibold mb-1">No saved properties</h2>
          <p className="text-sm text-muted-foreground text-center mb-4">You haven&apos;t saved any properties yet.</p>
          <Button className="bg-red-500 hover:bg-red-600">Browse Properties</Button>
        </div>
      )}
       <Footer/>
    </div>
    
  )
}

function PropertyCard({ property, onRemove }: { property: Property; onRemove: (id: string) => void }) {
  return (
    <Card className="overflow-hidden shadow-sm border-gray-100">
      <div className="flex">
        <div className="relative w-1/3 flex-shrink-0">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            width={150}
            height={150}
            className="h-full w-full object-cover"
          />

          <Badge className="absolute left-1 top-1 bg-red-500 text-xs py-0 px-1.5">{property.tag}</Badge>

          {property.readyToMove && (
            <Badge
              variant="outline"
              className="absolute left-1 bottom-1 bg-green-500 text-white border-none text-xs py-0 px-1.5"
            >
              Ready
            </Badge>
          )}
        </div>

        <CardContent className="p-3 w-2/3 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-6 w-6 rounded-full hover:bg-red-50 hover:text-red-500 text-gray-400"
            onClick={() => onRemove(property.id)}
          >
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Remove property</span>
          </Button>

          <div className="mb-1.5">
            <h3 className="font-medium text-sm line-clamp-1">{property.title}</h3>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-3 w-3 mr-0.5 flex-shrink-0" />
              <span className="text-xs line-clamp-1">{property.location}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-red-600 text-sm">{property.price}</span>
            <div className="flex gap-1">
              {property.bhkOptions.slice(0, 1).map((option, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-red-50 text-red-700 border-red-100 px-1.5 py-0"
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-1 mb-2.5 text-xs">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
              <span className="text-muted-foreground">Brokerage:</span>
              <span className="ml-1 font-medium">{property.brokerage}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
              <span className="text-muted-foreground">Discount:</span>
              <span className="ml-1 font-medium">{property.discount.split(" ")[0]}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></div>
              <span className="text-muted-foreground">Visit Bonus:</span>
              <span className="ml-1 font-medium">{property.visitBonus.split(" ")[0]}</span>
            </div>
          </div>

          <div className="flex justify-between gap-2 mt-1">
            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-xs h-8 px-3 rounded-full flex-1">
              Contact
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50 text-xs h-8 px-3 rounded-full flex-1"
            >
              Details
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
   
  )
}

