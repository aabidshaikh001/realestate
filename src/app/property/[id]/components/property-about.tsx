"use client"

import { motion } from "framer-motion"

interface PropertyAboutProps {
  propertyId: string
}

// Dummy about data based on property ID
const getDummyAboutData = (id: string) => {
  const aboutData = {
    "prop-001":
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    "prop-002":
      "Green Valley Villa is a premium residential project offering luxurious villas with modern amenities. Nestled in a serene environment, these villas provide a perfect blend of comfort and elegance. The project features spacious layouts, high-quality construction, and premium finishes throughout. Each villa is designed to maximize natural light and ventilation, creating a healthy living environment for residents.",
    "prop-003":
      "Urban Heights Condo is a modern residential development in the heart of Surabaya. The project offers contemporary living spaces with smart home features and energy-efficient design. Residents enjoy panoramic city views, convenient access to urban amenities, and a vibrant community atmosphere.",
  }

  // Return about data if it exists, otherwise return default data
  return (
    aboutData[id as keyof typeof aboutData] ||
    "This property features modern architecture and premium amenities designed for comfortable living. The development includes thoughtfully designed spaces, quality materials, and attention to detail throughout. Residents will enjoy the perfect balance of privacy and community in this exceptional residential project."
  )
}

export default function PropertyAbout({ propertyId }: PropertyAboutProps) {
  const aboutData = getDummyAboutData(propertyId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-4 border-b"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">About the Project</h3>
        <button className="text-red-500 text-sm">View Details</button>
      </div>

      <p className="text-sm text-gray-600">{aboutData}</p>
    </motion.div>
  )
}

