"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface PropertyAboutProps {
  propertyId: string
}

// Dummy about data based on property ID
const getDummyAboutData = (id: string) => {
  const aboutData = {
    "prop-001":
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    "prop-002":
      "Green Valley Villa is a premium residential project offering luxurious villas with modern amenities.",
    "prop-003":
      "Urban Heights Condo is a modern residential development in the heart of Surabaya with smart home features.",
  }

  return (
    aboutData[id as keyof typeof aboutData] ||
    "This property features modern architecture and premium amenities designed for comfortable living."
  )
}

export default function PropertyAbout({ propertyId }: PropertyAboutProps) {
  const router = useRouter()
  const aboutData = getDummyAboutData(propertyId)

  // Handle "View Details" button click
  const handleViewDetails = () => {
    router.push(`/About-Project/${propertyId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-4 border-b"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">About the Project</h3>
        <button onClick={handleViewDetails} className="text-red-500 text-sm">
          View Details
        </button>
      </div>

      <p className="text-sm text-gray-600">{aboutData}</p>
    </motion.div>
  )
}
