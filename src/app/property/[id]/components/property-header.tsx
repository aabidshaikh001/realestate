"use client"

import { useRouter } from "next/navigation"
import { FaArrowLeft, FaShareAlt, FaHeart } from "react-icons/fa"

// Dummy property data
const propertyData: Record<string, { name: string; location: string }> = {
  "prop-001": { name: "Luxury Villa", location: "Mumbai, India" },
  "prop-002": { name: "Sea View Apartment", location: "Goa, India" },
  "prop-003": { name: "Modern Penthouse", location: "Delhi, India" },
}

interface PropertyHeaderProps {
  propertyId: string
}

export default function PropertyHeader({ propertyId }: PropertyHeaderProps) {
  const router = useRouter()
  const property = propertyData[propertyId] || { name: "Unknown Property", location: "Unknown Location" }

  return (
    <div className="sticky top-0 z-10 bg-white border-b">
      <div className="flex items-center justify-between p-4">
        <button onClick={() => router.back()} className="flex items-center text-gray-700">
          <FaArrowLeft className="mr-2" />
          <span>{property.name}</span>
        </button>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border flex items-center justify-center">
            <FaShareAlt className="text-gray-600" />
          </button>
          <button className="w-10 h-10 rounded-full border flex items-center justify-center">
            <FaHeart className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}
