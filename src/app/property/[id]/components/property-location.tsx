"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { FaStore, FaUtensils, FaHospital, FaSubway, FaPlus } from "react-icons/fa"

interface PropertyLocationProps {
  propertyId: string
}

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

  // Return location data if it exists, otherwise return default data
  return (
    locations[id as keyof typeof locations] || [
      { icon: FaStore, label: "Convenience Store", distance: "250m" },
      { icon: FaUtensils, label: "Cafeteria", distance: "300m" },
      { icon: FaHospital, label: "Medical Center", distance: "400m" },
      { icon: FaSubway, label: "Metro", distance: "350m" },
    ]
  )
}

export default function PropertyLocation({ propertyId }: PropertyLocationProps) {
  const locationData = getDummyLocationData(propertyId)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
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

      <div className="grid grid-cols-4 gap-4">
        {locationData.map((location, index) => (
          <motion.div key={index} variants={itemVariants} className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <location.icon className="text-gray-500 text-xl" />
            </div>
            <span className="text-xs text-gray-700">{location.label}</span>
            <span className="text-xs text-gray-500">{location.distance}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button className="text-red-500 text-sm">View All</button>
      </div>
    </motion.div>
  )
}

