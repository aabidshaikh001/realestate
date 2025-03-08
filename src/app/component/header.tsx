"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Share2, Menu } from "lucide-react"
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
          <Image src="/placeholder.svg?height=32&width=32" alt="Nestohub Logo" width={32} height={32} />
        </motion.div>
        <motion.span
          className="ml-2 font-bold text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-blue-500">NESTO</span>
          <span className="text-gray-800">HUB</span>
        </motion.span>
      </div>
      <div className="flex gap-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}

