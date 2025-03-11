"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from "lucide-react"

interface BrochureCardProps {
  propertyId: string
}

const brochureData = {
  "prop-001": {
    title: "Sky Apartment Brochure",
    logo: "/placeholder.svg?height=50&width=100",
  },
  "prop-002": {
    title: "Ocean View Brochure",
    logo: "/placeholder.svg?height=50&width=100",
  },
}

export function BrochureCard({ propertyId }: BrochureCardProps) {
  const data = brochureData[propertyId as keyof typeof brochureData] || brochureData["prop-001"]

  return (
    <div className="space-y-3 px-4">
      <h2 className="text-lg font-bold">View official brochure</h2>
      <motion.div whileTap={{ scale: 0.98 }} className="relative overflow-hidden rounded-xl shadow-md">
        <Card className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white cursor-pointer overflow-hidden">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[180px] relative">
            <div className="absolute inset-0 opacity-10 text-[80px] font-bold tracking-wider overflow-hidden whitespace-nowrap flex items-center justify-center">
              BROCHURE
            </div>
            <Image src={data.logo || "/placeholder.svg"} alt="Builder Logo" width={80} height={40} className="mb-4" />
            <h3 className="text-lg font-semibold text-center mb-2">{data.title}</h3>
            <motion.div
              className="flex items-center bg-white/20 rounded-full px-4 py-2 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

