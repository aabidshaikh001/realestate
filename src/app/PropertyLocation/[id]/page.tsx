"use client"

import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FaStore, FaUtensils, FaHospital, FaSubway } from "react-icons/fa"

// Dummy location data based on property ID
const getDummyLocationData = (id: string) => {
  const locations = {
    "prop-001": [
      { icon: FaStore, label: "Mini Market", distance: "200m" },
      { icon: FaUtensils, label: "Canteen", distance: "200m" },
      { icon: FaHospital, label: "Hospital", distance: "200m" },
      { icon: FaSubway, label: "Station", distance: "200m" },
    ],
    "prop-002": [
      { icon: FaStore, label: "Mini Market", distance: "150m" },
      { icon: FaUtensils, label: "Restaurant", distance: "300m" },
      { icon: FaHospital, label: "Hospital", distance: "500m" },
      { icon: FaSubway, label: "Station", distance: "1km" },
    ],
    "prop-003": [
      { icon: FaStore, label: "Supermarket", distance: "100m" },
      { icon: FaUtensils, label: "Food Court", distance: "250m" },
      { icon: FaHospital, label: "Clinic", distance: "350m" },
      { icon: FaSubway, label: "Bus Stop", distance: "150m" },
    ],
  }

  return locations[id as keyof typeof locations] || []
}

export default function PropertyLocation() {
  const router = useRouter()
  const params = useParams()
  const propertyId = params.id as string

  const locationData = getDummyLocationData(propertyId)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between px-4 h-14">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Nearby Locations</h1>
          <div className="w-10"></div> {/* Placeholder for spacing */}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-4 px-4">
        {locationData.length > 0 ? (
          <div className="space-y-4">
            {locationData.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border rounded-lg p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
                  <location.icon className="text-gray-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">{location.label}</h3>
                  <p className="text-sm text-gray-600">{location.distance} away</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No location data available.</p>
        )}
      </main>
    </div>
  )
}
