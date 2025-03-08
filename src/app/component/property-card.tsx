"use client"

import Image from "next/image"
import { Share2, Home, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Property {
  id: string
  title: string
  location: string
  price: string
  image: string
  brokerage: string
  tag: string
  readyToMove: boolean
  discount: string
  visitBonus: string
  bhkOptions: string[]
}

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 max-w-sm">
      <div className="relative">
        {/* Property Image */}
        <Image
          src={property.image || "/placeholder.svg?height=200&width=400"}
          alt={property.title}
          width={400}
          height={200}
          className="w-full h-[180px] object-cover"
        />

        {/* Brokerage Tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            {property.brokerage}
          </span>
        </div>

        {/* Best Seller Tag */}
        <div className="absolute top-3 right-3">
          <span className="bg-amber-400 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
            <Award className="w-3 h-3" />
            {property.tag}
          </span>
        </div>

        {/* Ready to Move Tag */}
        {property.readyToMove && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/70 text-white text-xs font-medium px-3 py-1 rounded-md flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Ready to Move
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Property Details */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-800">{property.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{property.location}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Share2 size={18} />
          </button>
        </div>

        {/* BHK Options */}
        <div className="flex gap-2 mt-4">
          {property.bhkOptions.map((option, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md">
                <Home size={16} className="text-gray-500" />
              </div>
              <span className="text-xs text-gray-600 mt-1">{option}</span>
            </div>
          ))}
        </div>

        {/* Price and Discount */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xl text-gray-900">{property.price}</h4>
              <p className="text-xs text-gray-500 mt-1">{property.discount}</p>
            </div>
            <div>
              <Button className="bg-white text-red-600 border border-red-600 hover:bg-red-50">Book Visit</Button>
            </div>
          </div>
        </div>

        {/* Visit Bonus */}
        {property.visitBonus && (
          <div className="mt-3">
            <span className="bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-md">
              {property.visitBonus}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

