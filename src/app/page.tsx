"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Mic, Building2, HomeIcon, Map, Store, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SplashScreen from "./component/splash-screen"
import Header from "./component/header"
import Footer from "./component/footer"
import PropertyCard, { type Property } from "./component/property-card"
const properties: Property[] = [
  {
    id: "prop-001",
    title: "Sky Dandelions Apartment",
    location: "Luxury Apartment in Malang, Jakarta",
    price: "₹ 3.94 L - 6.01 Cr",
    image: "/placeholder.svg?height=200&width=300",
    brokerage: "5% Brokerage",
    tag: "Best Seller",
    readyToMove: true,
    discount: "Book now & get 5% discount",
    visitBonus: "Get Rs 500 Per Visit",
    bhkOptions: ["2 BHK", "3 BHK", "4 BHK", "6 BHK"],
  },
  {
    id: "prop-002",
    title: "Green Valley Villa",
    location: "Premium Villa in Bandung, Indonesia",
    price: "₹ 5.25 L - 8.50 Cr",
    image: "/placeholder.svg?height=200&width=300",
    brokerage: "3% Brokerage",
    tag: "Premium",
    readyToMove: true,
    discount: "Early bird discount of 7%",
    visitBonus: "Get Rs 750 Per Visit",
    bhkOptions: ["3 BHK", "4 BHK", "5 BHK"],
  },
  {
    id: "prop-003",
    title: "Urban Heights Condo",
    location: "Modern Condo in Surabaya, Indonesia",
    price: "₹ 2.80 L - 4.75 Cr",
    image: "/placeholder.svg?height=200&width=300",
    brokerage: "4% Brokerage",
    tag: "New Launch",
    readyToMove: false,
    discount: "Launch offer: 10% off",
    visitBonus: "Get Rs 500 Per Visit",
    bhkOptions: ["1 BHK", "2 BHK", "3 BHK"],
  },
]

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50 pb-16"
          >
            {/* Header */}
            <Header />

            {/* Search Bar */}
            <motion.div
              className="p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search here..." className="pl-10 pr-10 rounded-full border-gray-200" />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mic className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Featured Banner */}
            <motion.div
              className="relative h-48 mx-4 rounded-lg overflow-hidden mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image src="/placeholder.svg?height=192&width=384" alt="Summer Vacation" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <motion.div
                className="absolute bottom-0 left-0 p-4 text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold">Summer Vacation</h2>
                <p className="flex items-center">
                  All discount up to
                  <motion.span
                    className="ml-1 text-yellow-400 font-bold"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  >
                    40%
                  </motion.span>
                </p>
              </motion.div>
            </motion.div>

            {/* Categories */}
            <motion.div
              className="px-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Categories</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Flats / Apartment", icon: Building2 },
                  { name: "Farmhouse / Villa", icon: HomeIcon },
                  { name: "Plots / Lands", icon: Map },
                  { name: "Commercial", icon: Store },
                ].map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.4 }}
                    whileHover={{ scale: 1.05, backgroundColor: "#f0f7ff" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href="#" className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm h-full">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                        <category.icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-sm">{category.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Promoted Properties */}
            <motion.div className="px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Promoted Property</h3>
                <Link href="#" className="text-sm text-blue-500 flex items-center">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>
            </motion.div>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

