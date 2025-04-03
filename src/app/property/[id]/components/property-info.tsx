"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { FaBed, FaShareAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import BookingModal from "./booking-modal"
import { useState, useEffect } from "react"

interface PropertyInfoProps {
  propertyId: string
}
interface PropertyData {
  title: string
  CompanyImage: string
  location: string
  rating: number
  bhkOptions: string[]
  price: string
  discount?: string
  visitBonus?: string
}
const fetchPropertyData = async (propertyId: string): Promise<PropertyData | null> => {
  try {
    const res = await fetch(`https://api.realestatecompany.co.in/api/properties/${propertyId}`)
    if (!res.ok) throw new Error("Failed to fetch property data")
    return await res.json() as PropertyData
  } catch (error) {
    console.error("Error fetching property data:", error)
    return null
  }
}




export default function PropertyInfo({ propertyId }: PropertyInfoProps) {
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchPropertyData(propertyId).then((data) => setPropertyData(data))
  }, [propertyId])
   // Parse bhkOptions safely
   let bhkOptions: string[] = []

   try {
     if (propertyData?.bhkOptions && typeof propertyData.bhkOptions === "string") {
       bhkOptions = JSON.parse(propertyData.bhkOptions) // ✅ Parse only if it's a valid string
     } else if (Array.isArray(propertyData?.bhkOptions)) {
       bhkOptions = propertyData.bhkOptions // ✅ Use directly if already an array
     }
   } catch (error) {
     console.error("Error parsing BHK options:", error)
     bhkOptions = []
   }
   

  if (!propertyData) return <p>Loading property details...</p>
  return (
    <div className="p-4 border-b">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Image
                src={propertyData.CompanyImage}  // ✅ Use correct property name
              alt="Builder Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold">{propertyData.title}</h1>
              <p className="text-sm text-gray-500">{propertyData.location}</p>
            </div>
          </div>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-amber-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>
        <button className="text-gray-600">
          <FaShareAlt />
        </button>
      </div>

  
      {/* BHK Options */}
      <div className="flex justify-between mt-6">
        {bhkOptions.map((option, index) => (
          <motion.div key={index} whileHover={{ y: -3 }} className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-md mb-1">
              <FaBed className="text-gray-500" />
            </div>
            <span className="text-xs text-gray-600">{option}</span>
          </motion.div>
        ))}
      </div>


      {/* Price */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">{propertyData.price}</h2>
        <p className="text-sm text-gray-500">{propertyData.discount}</p>
      </div>

      {/* CTA Button */}
      <motion.div className="mt-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button className="w-full rounded-md bg-blue-500 hover:bg-blue-600" onClick={() => setIsModalOpen(true)}>Book Visit</Button>
      </motion.div>

      {/* Visit Bonus */}
      <div className="mt-3 flex justify-center">
        <span className="bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-md">
          {propertyData.visitBonus}
        </span>
      </div>
        <BookingModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              propertyId={propertyId}
              propertyName={`Property ${propertyId}`}
            />
    </div>
    
  )
}

