"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface PropertyImagesProps {
  propertyId: string
}

// Dummy data based on property ID
const getDummyPropertyData = (id: string) => {
  const properties = {
    "prop-001": {
      image: "/placeholder.svg?height=400&width=800",
      title: "Sky Dandelions Apartment",
      brokerage: "5% Brokerage",
      tag: "Best Seller",
      readyToMove: true,
    },
    "prop-002": {
      image: "/placeholder.svg?height=400&width=800",
      title: "Green Valley Villa",
      brokerage: "3% Brokerage",
      tag: "Premium",
      readyToMove: true,
    },
    "prop-003": {
      image: "/placeholder.svg?height=400&width=800",
      title: "Urban Heights Condo",
      brokerage: "4% Brokerage",
      tag: "New Launch",
      readyToMove: false,
    },
  }

  // Return property data if it exists, otherwise return default data
  return (
    properties[id as keyof typeof properties] || {
      image: "/placeholder.svg?height=400&width=800",
      title: `Property ${id}`,
      brokerage: "4.5% Brokerage",
      tag: "Featured",
      readyToMove: false,
    }
  )
}

export default function PropertyImages({ propertyId }: PropertyImagesProps) {
  const propertyData = getDummyPropertyData(propertyId)

  return (
    <div className="relative">
      <Image
        src={propertyData.image || "/placeholder.svg"}
        alt={propertyData.title}
        width={800}
        height={400}
        className="w-full h-[300px] object-cover"
      />

      {/* Tags */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md">RERA</span>
        <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md">{propertyData.brokerage}</span>
      </div>

      <div className="absolute top-4 right-4">
        <span className="bg-amber-400 text-white text-xs px-3 py-1 rounded-md">{propertyData.tag}</span>
      </div>

      <div className="absolute bottom-4 left-4">
        <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded-md">
          {propertyData.readyToMove ? "Ready to Move" : "Under Construction"}
        </span>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
        >
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Thumbnail"
            width={40}
            height={40}
            className="w-full h-full rounded-full object-cover"
          />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
        >
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Thumbnail"
            width={40}
            height={40}
            className="w-full h-full rounded-full object-cover"
          />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
        >
          <span className="text-gray-700 font-medium">+3</span>
        </motion.button>
      </div>
    </div>
  )
}

