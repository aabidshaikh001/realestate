"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Mic, Building2, HomeIcon, Map, Store, ChevronRight, Share2, Home, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "./component/header"
import Footer from "./component/footer"

// Property interface moved inside page.tsx
export interface Property {
  id: string
  title: string
  location: string
  price: string
  images: string[]
  brokerage: string
  tag: string
  readyToMove: boolean
  discount: string
  visitBonus: string
  bhkOptions: string[]
}

// PropertyCard component moved inside page.tsx
function PropertyCard({ property }: { property: Property }) {
  const bhkOptions = typeof property.bhkOptions === "string"
  ? JSON.parse(property.bhkOptions) 
  : [];
  const imagesArray: string[] = Array.isArray(property.images)
  ? property.images
  : JSON.parse(property.images || "[]");


  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 max-w-sm">
      <div className="relative">
      {imagesArray.length > 0 ? (
  <Image
    src={imagesArray[0]} // Display the first image
    alt={property.title}
    width={400}
    height={200}
    className="w-full h-[180px] object-cover"
  />
) : (
  <Image
    src="/placeholder.svg?height=200&width=400"
    alt="Placeholder Image"
    width={400}
    height={200}
    className="w-full h-[180px] object-cover"
  />
)}

     
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
             {Array.isArray(bhkOptions) ? (
  bhkOptions.map((option, index) => (
    <div key={index} className="flex flex-col items-center">
      <div className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md">
        <Home size={16} className="text-gray-500" />
      </div>
      <span className="text-xs text-gray-600 mt-1">{option}</span>
    </div>
  ))
) : (
  <p className="text-sm text-gray-500">No BHK options available</p>
)}
             </div>
     
             {/* Price and Discount */}
             <div className="mt-4">
               <div className="flex items-center justify-between">
                 <div>
                   <h4 className="font-bold text-xl text-gray-900">{property.price}</h4>
                   <p className="text-xs text-gray-500 mt-1">{property.discount}</p>
                 </div>
                 <div>
                 <Link href={`/property/${property.id}`}>
                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                       <Button className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50">Book Visit</Button>
                     </motion.div>
                   </Link>        </div>
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

// Array of images for the banner
const bannerImages = [
  "https://destinationcompress.s3.ap-south-1.amazonaws.com/d939795c-e1c2-4e56-9bc5-16d7b9f6f35f.jpg",
  "https://cbvalueaddrealty.in/wp-content/uploads/2021/07/Raffles-Park-Luxury-Villa.jpg",
  "https://5.imimg.com/data5/SELLER/Default/2022/7/QA/GZ/BO/79515996/whatsapp-image-2022-06-25-at-2-13-17-pm-500x500.jpeg",
]

export default function HomeMain() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("https://apimobile-6zp8.onrender.com/api/properties"); // Replace with your actual API endpoint
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
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
        <AnimatePresence mode="wait">
          <motion.img
            key={bannerImages[currentIndex]}
            src={bannerImages[currentIndex]}
            alt="Featured Banner"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
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
      <motion.div className="px-4 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
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
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                  <category.icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-sm">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Promoted Properties */}
      <motion.div className="px-4 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Promoted Property</h3>
          <Link href="#" className="text-sm text-red-500 flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : properties.length === 0 ? (
          <p className="text-center text-gray-500">No properties available.</p>
        ) : (
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
        )}
      </motion.div>

      {/* Footer */}
      <Footer />
    </motion.div>
  )
}

