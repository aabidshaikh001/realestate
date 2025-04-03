"use client"
import { useState, useEffect } from "react";
import Image from "next/image"
import { motion } from "framer-motion"

interface PropertyFloorPlansProps {
  propertyId: string
}

interface FloorPlan {
  bhk: string;
  area: string;
  price: string;
  pricePerSqft: string;
}

export default function PropertyFloorPlans({ propertyId }: PropertyFloorPlansProps) {
  const [floorPlan, setFloorPlan] = useState<FloorPlan | null>(null); // Change to a single object
  const [selectedBHK, setSelectedBHK] = useState("all");

  useEffect(() => {
    const fetchFloorPlan = async () => {
      try {
        const response = await fetch(`https://api.realestatecompany.co.in/api/floorplan/${propertyId}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setFloorPlan(data || null); // Set single object instead of array
      } catch (error) {
        console.error("Error fetching floor plan:", error);
        setFloorPlan(null); // Default to null if fetching fails
      } 
    };

    fetchFloorPlan();
  }, [propertyId]);

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

      {floorPlan ? (
        <motion.div
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
              <span className="bg-amber-400 text-white text-xs px-2 py-0.5 rounded-sm">{floorPlan.bhk}</span>
            </div>
          </div>
          <div className="p-3">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Super Built-Up Area</span>
              <span>Price</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-semibold">{floorPlan.area}</span>
              <span className="font-semibold">{floorPlan.price}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{floorPlan.pricePerSqft}</span>
            </div>
            <div className="flex justify-between mt-3">
              <button className="text-blue-500 text-xs">View Details</button>
              <button className="text-blue-500 text-xs">Check Charges</button>
            </div>
          </div>
        </motion.div>
      ) : (
        <p className="text-gray-500 text-sm">No floor plan available.</p>
      )}
    </motion.div>
  )
}
