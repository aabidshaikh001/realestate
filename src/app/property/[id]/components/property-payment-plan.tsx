"use client"

import { motion } from "framer-motion"

interface PropertyPaymentPlanProps {
  propertyId: string
}

// Dummy payment plan data based on property ID
const getDummyPaymentPlanData = (id: string) => {
  const paymentPlanData = {
    "prop-001": [
      { payment: "10%", milestone: "Lorem ipsum is simply dummy text of the printing and typesetting industry." },
      { payment: "15%", milestone: "Lorem ipsum is simply dummy text of the printing and typesetting industry." },
      { payment: "25%", milestone: "Lorem ipsum is simply dummy text of the printing and typesetting industry." },
      { payment: "50%", milestone: "Lorem ipsum is simply dummy text of the printing and typesetting industry." },
    ],
    "prop-002": [
      { payment: "20%", milestone: "Booking amount and initial payment for reservation of the property." },
      { payment: "20%", milestone: "Payment due on completion of foundation and ground floor structure." },
      { payment: "30%", milestone: "Payment due on completion of building structure and external walls." },
      { payment: "30%", milestone: "Final payment due on completion and handover of the property." },
    ],
    "prop-003": [
      { payment: "15%", milestone: "Initial booking amount to secure the property." },
      { payment: "20%", milestone: "Payment due on completion of 30% construction work." },
      { payment: "30%", milestone: "Payment due on completion of 60% construction work." },
      { payment: "35%", milestone: "Final payment due on completion and possession." },
    ],
  }

  // Return payment plan data if it exists, otherwise return default data
  return (
    paymentPlanData[id as keyof typeof paymentPlanData] || [
      { payment: "10%", milestone: "Booking amount to reserve the property." },
      { payment: "20%", milestone: "Payment due on completion of foundation work." },
      { payment: "30%", milestone: "Payment due on completion of structure work." },
      { payment: "40%", milestone: "Final payment due on possession." },
    ]
  )
}

export default function PropertyPaymentPlan({ propertyId }: PropertyPaymentPlanProps) {
  const paymentPlanData = getDummyPaymentPlanData(propertyId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-4 border-b"
    >
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Payment Plan</h3>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-5 bg-gray-50 p-3">
          <div className="col-span-1 font-medium">Payment %</div>
          <div className="col-span-4 font-medium">Milestone</div>
        </div>

        {paymentPlanData.map((item, index) => (
          <div key={index} className="grid grid-cols-5 p-3 border-t">
            <div className="col-span-1 font-semibold">{item.payment}</div>
            <div className="col-span-4 text-sm text-gray-600">{item.milestone}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

