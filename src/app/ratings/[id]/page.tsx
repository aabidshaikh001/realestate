"use client"

import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { ArrowLeft, Share2, MoreVertical, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define the type for reviews
type Review = {
  id: number
  name: string
  avatar: string
  rating: number
  review: string
}

// Define the type for ratings data
type RatingsData = {
  [propertyId: string]: Review[]
}

// Sample ratings data
const ratings: RatingsData = {
  "prop-001": [
    {
      id: 1,
      name: "Sameer Sharma",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      review:
        "My wife and I had a dream of downsizing from our house in Cape Elizabeth into a small condo closer to where we work and play in Portland. David and his skilled team helped make that dream a reality. The sale went smoothly, and we just closed on an ideal new place we're excited to call home...",
    },
    {
      id: 2,
      name: "Sameer Sharma",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      review:
        "My wife and I had a dream of downsizing from our house in Cape Elizabeth into a small condo closer to where we work and play in Portland. David and his skilled team helped make that dream a reality. The sale went smoothly, and we just closed on an ideal new place we're excited to call home...",
    },
    {
      id: 3,
      name: "Sakib Shaikh",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      review:
        "My wife and I had a dream of downsizing from our house in Cape Elizabeth into a small condo closer to where we work and play in Portland. David and his skilled team helped make that dream a reality. The sale went smoothly, and we just closed on an ideal new place we're excited to call home...",
    },
  ],
  "prop-002": [
    {
      id: 1,
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      rating: 4,
      review:
        "The property was exactly what we were looking for. Great location and amenities. The agent was very helpful throughout the entire process...",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      review:
        "Exceptional service from start to finish. The team was responsive and made our first home buying experience smooth and enjoyable...",
    },
  ],
}

export default function RatingsPage() {
  const router = useRouter()
  const params = useParams() // Get dynamic route params
  const propertyId = params.id as string // Ensure propertyId is a string

  // Get reviews for the given propertyId
  const propertyReviews = ratings[propertyId] || []

  // Share button functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Property Ratings",
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between px-4 h-14">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Ratings</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-14 pb-4">
        <div className="space-y-4 p-4">
          {propertyReviews.length > 0 ? (
            propertyReviews.map((review) => (
              <div key={review.id} className="bg-white border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{review.review}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews available for this property.</p>
          )}
        </div>
      </main>
    </div>
  )
}
