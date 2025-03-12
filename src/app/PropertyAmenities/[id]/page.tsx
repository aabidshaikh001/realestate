"use client"

import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { FaArrowLeft } from "react-icons/fa"
import { FaRulerCombined, FaBed, FaBath, FaParking } from "react-icons/fa"

type Amenity = {
  icon: React.ElementType
  label: string
}

// Dummy amenities data based on property ID
const getDummyAmenities = (id: string): Amenity[] => {
  const amenities: Record<string, Amenity[]> = {
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

  return amenities[id] || []
}

export default function PropertyAmenitiesPage() {
  const router = useRouter()
  const params = useParams()
  const propertyId = params.id as string

  const amenities = getDummyAmenities(propertyId)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b shadow-sm">
        <div className="flex items-center px-4 h-14">
          <button onClick={() => router.back()} className="mr-4 p-2 rounded-full hover:bg-gray-200">
            <FaArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">All Amenities</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-16 pb-4 px-4">
        {amenities.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            }}
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
                }}
                className="flex flex-col items-center p-4 border rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  <amenity.icon className="text-gray-500 text-2xl" />
                </div>
                <span className="text-sm text-gray-700 font-medium">{amenity.label}</span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500">No amenities available for this property.</p>
        )}
      </main>
    </div>
  )
}
