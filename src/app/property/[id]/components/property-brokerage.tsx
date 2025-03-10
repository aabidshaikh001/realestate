"use client"

import { motion } from "framer-motion"

interface PropertyBrokerageProps {
  propertyId: string
}

// Dummy brokerage data based on property ID
const getDummyBrokerageData = (id: string) => {
  const brokerageData = {
    "prop-001": "5%",
    "prop-002": "3%",
    "prop-003": "4%",
  }

  // Return brokerage data if it exists, otherwise return default data
  return brokerageData[id as keyof typeof brokerageData] || "4.5%"
}

export default function PropertyBrokerage({ propertyId }: PropertyBrokerageProps) {
  const brokerageData = getDummyBrokerageData(propertyId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="p-4 border-b"
    >
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Brokerage Payout Plan</h3>
      </div>

      <div className="border rounded-lg p-4">
        <h4 className="font-semibold">Brokerage {brokerageData}</h4>
        <p className="text-sm text-gray-500 mt-1">Platform charges & applicable taxes shall be deducted</p>
      </div>
    </motion.div>
  )
}

