"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaStore, FaUtensils, FaHospital, FaSubway, FaPlus } from "react-icons/fa"
import { useEffect, useState } from "react"

interface Location {
  icon: string // Will store the icon name from the API
  label: string
  distance: string
}

interface PropertyLocationProps {
  propertyId: string
}

// Mapping API icon names to React Icons
const iconMapping: Record<string, JSX.Element> = {
  store: <FaStore className="text-gray-500 text-xl" />,
  restaurant: <FaUtensils className="text-gray-500 text-xl" />,
  hospital: <FaHospital className="text-gray-500 text-xl" />,
  subway: <FaSubway className="text-gray-500 text-xl" />,
}

export default function PropertyLocation({ propertyId }: PropertyLocationProps) {
  const router = useRouter()
  const [locationData, setLocationData] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(`https://api.realestatecompany.co.in/api/location/${propertyId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch location data")
        }
        const data = await response.json()
        setLocationData(data) // Assuming API returns an array of { icon, label, distance }
      } catch (err) {
        console.error("Error loading location data:", err); // ✅ Logs the error
        setError(`Failed to load location data: ${err instanceof Error ? err.message : String(err)}`); // ✅ Uses the error
      }
       finally {
        setLoading(false)
      }
    }

    fetchLocationData()
  }, [propertyId])

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
        <h3 className="font-semibold text-lg">Location Advantages</h3>
      </div>

      <motion.div variants={itemVariants} className="h-[200px] bg-gray-100 rounded-lg relative overflow-hidden mb-6">
        <Image src="/placeholder.svg?height=200&width=400" alt="Map" fill className="object-cover" />
        <div className="absolute right-2 top-2 flex flex-col gap-2">
          <button className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-md">
            <FaPlus className="text-gray-700 text-sm" />
          </button>
          <button className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-md">
            <FaPlus className="text-gray-700 text-sm transform rotate-45" />
          </button>
        </div>
      </motion.div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : locationData.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {locationData.map((location, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center mb-1">
                {iconMapping[location.icon] || <FaStore className="text-gray-500 text-xl" />}
              </div>
              <span className="text-xs text-gray-700">{location.label}</span>
              <span className="text-xs text-gray-500">{location.distance}</span>
            </motion.div>
          ))}
        </div>
      ) : (
        <p>No location information available.</p>
      )}

      {/* View All Button */}
      <div className="flex justify-center mt-4">
        <button
          className="text-red-500 text-sm"
          onClick={() => router.push(`/PropertyLocation/${propertyId}`)}
        >
          View All
        </button>
      </div>
    </motion.div>
  )
}
