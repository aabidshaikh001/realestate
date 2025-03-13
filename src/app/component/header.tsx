"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CgProfile } from "react-icons/cg";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <motion.header
      className="bg-white p-4 flex items-center justify-between z-10 shadow-sm"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Image 
    src="/logo.png" 
    alt="TREC Logo" 
    width={200} 
    height={50} 
     style={{ filter: "brightness(0) saturate(100%) invert(50%) sepia(92%) saturate(7400%) hue-rotate(0deg)" }}
className="object-contain filter invert-[22%] sepia-[100%] saturate-[10000%] hue-rotate-[0deg] brightness-[103%] contrast-[104%]" 
  />
        </motion.div>
      </div>
      <div className="flex gap-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon">
            <IoNotificationsCircleOutline className="h-7 w-7"  />
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon">
            <CgProfile className="h-7 w-7"  />
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}