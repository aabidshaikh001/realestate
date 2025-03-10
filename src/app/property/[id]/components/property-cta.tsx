"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import BookingModal from "./booking-modal"

interface PropertyCTAProps {
  propertyId: string
}

// Dummy CTA data based on property ID
const getDummyCTAData = (id: string) => {
  const ctaData = {
    "prop-001": {
      price: "₹ 3.94 L - 6.01 Cr",
      discount: "Book now & get 5% discount",
    },
    "prop-002": {
      price: "₹ 5.25 L - 8.50 Cr",
      discount: "Early bird discount of 7%",
    },
    "prop-003": {
      price: "₹ 2.80 L - 4.75 Cr",
      discount: "Launch offer: 10% off",
    },
  }

  // Return CTA data if it exists, otherwise return default data
  return (
    ctaData[id as keyof typeof ctaData] || {
      price: "₹ 4.50 L - 7.25 Cr",
      discount: "Special offer: 8% discount",
    }
  )
}

export default function PropertyCTA({ propertyId }: PropertyCTAProps) {
  const ctaData = getDummyCTAData(propertyId)
  const [isModalOpen, setIsModalOpen] = useState(false)


  return (
    <>
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center z-10"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <div>
          <h3 className="font-bold text-lg">{ctaData.price}</h3>
          <p className="text-xs text-gray-500">{ctaData.discount}</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setIsModalOpen(true)}>
            Book Visit
          </Button>
        </motion.div>
      </motion.div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyId={propertyId}
        propertyName={`Property ${propertyId}`}
      />
    </>
  )
}

