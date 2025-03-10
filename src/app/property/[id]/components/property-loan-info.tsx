"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface PropertyLoanInfoProps {
  propertyId: string
}

// Dummy loan info data based on property ID
const getDummyLoanInfoData = (id: string) => {
  const loanInfoData = {
    "prop-001": [
      { name: "AXIS BANK", logo: "/placeholder.svg?height=40&width=40" },
      { name: "AXIS BANK", logo: "/placeholder.svg?height=40&width=40" },
    ],
    "prop-002": [
      { name: "HDFC BANK", logo: "/placeholder.svg?height=40&width=40" },
      { name: "ICICI BANK", logo: "/placeholder.svg?height=40&width=40" },
    ],
    "prop-003": [
      { name: "SBI BANK", logo: "/placeholder.svg?height=40&width=40" },
      { name: "KOTAK BANK", logo: "/placeholder.svg?height=40&width=40" },
    ],
  }

  // Return loan info data if it exists, otherwise return default data
  return (
    loanInfoData[id as keyof typeof loanInfoData] || [
      { name: "AXIS BANK", logo: "/placeholder.svg?height=40&width=40" },
      { name: "HDFC BANK", logo: "/placeholder.svg?height=40&width=40" },
    ]
  )
}

export default function PropertyLoanInfo({ propertyId }: PropertyLoanInfoProps) {
  const loanInfoData = getDummyLoanInfoData(propertyId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="p-4 border-b"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Loan Approved By</h3>
        <button className="text-red-500 text-sm">View All</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {loanInfoData.map((bank, index) => (
          <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src={bank.logo || "/placeholder.svg"}
                  alt={bank.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-medium">{bank.name}</span>
            </div>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">MORE BANK</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

