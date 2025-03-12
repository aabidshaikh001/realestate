"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

// Define types for our data structure
type Review = {
  id: number
  name: string
  avatar: string
  rating: number
  review: string
}

type RatingsData = {
  [propertyId: string]: Review[]
}

// Organize ratings by property ID
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

interface RatingsProps {
  propertyId: string
}

export function Ratings({ propertyId }: RatingsProps) {
  const [expandedReview, setExpandedReview] = useState<number | null>(null)
  const router = useRouter()

  // Get reviews for the current property ID or show empty array if not found
  const propertyReviews = propertyId && ratings[propertyId] ? ratings[propertyId].slice(0, 2) : []

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="flex-row items-center justify-between pb-2 pt-4 px-4">
        <h2 className="text-lg font-bold">Ratings</h2>
        <Button
          variant="link"
          className="text-blue-600 font-semibold p-0 h-auto text-sm"
          onClick={() => router.push(`/ratings/${propertyId}`)}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-4">
        {propertyReviews.length > 0 ? (
          propertyReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-50/50 shadow-sm">
                <CardContent className="p-4 space-y-3">
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
                  <div className="text-sm text-gray-600 leading-relaxed">
                    <AnimatePresence>
                      {expandedReview === review.id ? (
                        <motion.p
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {review.review}
                        </motion.p>
                      ) : (
                        <p>{review.review.slice(0, 100)}...</p>
                      )}
                    </AnimatePresence>
                    <Button
                      variant="link"
                      className="text-blue-600 p-0 h-auto text-sm font-semibold mt-1"
                      onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                    >
                      {expandedReview === review.id ? "Read less" : "Read more"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No ratings available for this property.</p>
        )}
      </CardContent>
    </Card>
  )
}