"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface PropertyFloorPlansProps {
  propertyId: string
}

// Dummy floor plan data based on property ID
const getDummyFloorPlans = (id: string) => {
  const floorPlans = {
    "prop-001": [
      { bhk: "3 BHK", area: "1413 Sq.ft.", price: "₹ 3.94 Cr", pricePerSqft: "₹ 27,884 / sq.ft." },
      { bhk: "4 BHK", area: "1613 Sq.ft.", price: "₹ 4.76 Cr", pricePerSqft: "₹ 29,509 / sq.ft." },
    ],
    "prop-002": [
      { bhk: "3 BHK", area: "1550 Sq.ft.", price: "₹ 5.25 Cr", pricePerSqft: "₹ 33,871 / sq.ft." },
      { bhk: "4 BHK", area: "1850 Sq.ft.", price: "₹ 6.75 Cr", pricePerSqft: "₹ 36,486 / sq.ft." },
      { bhk: "5 BHK", area: "2200 Sq.ft.", price: "₹ 8.50 Cr", pricePerSqft: "₹ 38,636 / sq.ft." },
    ],
    "prop-003": [
      { bhk: "1 BHK", area: "750 Sq.ft.", price: "₹ 2.80 Cr", pricePerSqft: "₹ 37,333 / sq.ft." },
      { bhk: "2 BHK", area: "1050 Sq.ft.", price: "₹ 3.75 Cr", pricePerSqft: "₹ 35,714 / sq.ft." },
      { bhk: "3 BHK", area: "1350 Sq.ft.", price: "₹ 4.75 Cr", pricePerSqft: "₹ 35,185 / sq.ft." },
    ],
  }

  // Return floor plans if they exist, otherwise return default data
  return (
    floorPlans[id as keyof typeof floorPlans] || [
      { bhk: "2 BHK", area: "1100 Sq.ft.", price: "₹ 3.50 Cr", pricePerSqft: "₹ 31,818 / sq.ft." },
      { bhk: "3 BHK", area: "1400 Sq.ft.", price: "₹ 4.50 Cr", pricePerSqft: "₹ 32,142 / sq.ft." },
      { bhk: "4 BHK", area: "1700 Sq.ft.", price: "₹ 5.75 Cr", pricePerSqft: "₹ 33,823 / sq.ft." },
    ]
  )
}

export default function PropertyFloorPlans({ propertyId }: PropertyFloorPlansProps) {
  const floorPlans = getDummyFloorPlans(propertyId)
  const [selectedBHK, setSelectedBHK] = useState("all")

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
        <h3 className="font-semibold text-lg">Floor Plans & Pricing</h3>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {["all", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "6 BHK", "7 BHK"].map((option) => (
          <button
            key={option}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              selectedBHK === option ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setSelectedBHK(option)}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {floorPlans.map((plan, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="border rounded-lg overflow-hidden"
          >
            <div className="relative">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Floor Plan"
                width={300}
                height={200}
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-amber-400 text-white text-xs px-2 py-0.5 rounded-sm">{plan.bhk}</span>
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Super Built-Up Area</span>
                <span>Price</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-semibold">{plan.area}</span>
                <span className="font-semibold">{plan.price}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{plan.pricePerSqft}</span>
              </div>
              <div className="flex justify-between mt-3">
                <button className="text-blue-500 text-xs">View Details</button>
                <button className="text-blue-500 text-xs">Check Charges</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

