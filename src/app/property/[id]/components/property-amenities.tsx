"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FaRulerCombined, FaBed, FaBath, FaParking } from "react-icons/fa"

interface PropertyAmenitiesProps {
  propertyId: string
}

// Dummy amenities data based on property ID
const getDummyAmenities = (id: string) => {
  const amenities = {
    "prop-001": [
      { icon: FaRulerCombined, label: "2110 Sqft" },
      { icon: FaBed, label: "3 Beds" },
      { icon: FaBath, label: "1 Bath" },
      { icon: FaParking, label: "1 Garage" },
    ],
    "prop-002": [
      { icon: FaRulerCombined, label: "2500 Sqft" },
      { icon: FaBed, label: "4 Beds" },
      { icon: FaBath, label: "2 Baths" },
      { icon: FaParking, label: "2 Garages" },
    ],
    "prop-003": [
      { icon: FaRulerCombined, label: "1800 Sqft" },
      { icon: FaBed, label: "2 Beds" },
      { icon: FaBath, label: "1 Bath" },
      { icon: FaParking, label: "1 Garage" },
    ],
  }

  return amenities[id as keyof typeof amenities] || []
}

export default function PropertyAmenities({ propertyId }: PropertyAmenitiesProps) {
  const router = useRouter()
  const amenities = getDummyAmenities(propertyId)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="p-4 border-b">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Project Amenities</h3>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {amenities.map((amenity, index) => (
          <motion.div key={index} variants={itemVariants} className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <amenity.icon className="text-gray-500 text-xl" />
            </div>
            <span className="text-xs text-gray-700">{amenity.label}</span>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-4">
        <button
          className="text-red-500 text-sm"
          onClick={() => router.push(`/PropertyAmenities/${propertyId}`)}
        >
          View All
        </button>
      </div>
    </motion.div>
  )
}
