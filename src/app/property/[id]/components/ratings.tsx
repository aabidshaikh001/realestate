"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

const reviews = [
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
]

export function Ratings() {
  const [expandedReview, setExpandedReview] = useState<number | null>(null)

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="flex-row items-center justify-between pb-2 pt-4 px-4">
        <h2 className="text-lg font-bold">Ratings</h2>
        <Button variant="link" className="text-blue-600 font-semibold p-0 h-auto text-sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-4">
        {reviews.map((review) => (
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
        ))}
      </CardContent>
    </Card>
  )
}

