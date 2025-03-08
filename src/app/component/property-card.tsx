"use client";

import Image from "next/image"
import { Share2 } from "lucide-react"
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
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="relative">
        {/* Property Image */}
        <Image
          src={property.image || "/placeholder.svg"}
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
          <span className="bg-amber-400 text-white text-xs font-medium px-3 py-1 rounded-full">{property.tag}</span>
        </div>

        {/* Ready to Move Tag */}
        {property.readyToMove && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/70 text-white text-xs font-medium px-3 py-1 rounded-md">Ready to Move</span>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M3 9v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9" />
                  <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                </svg>
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
              <Button className="bg-white text-red-600 border border-red-700 hover:bg-red-50">Book Visit</Button>
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

