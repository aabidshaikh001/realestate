"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HomeIcon, Star, Plus, Mic, Menu } from "lucide-react"

export default function Footer() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-2"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.8, type: "spring" }}
    >
      <div className="flex justify-between items-center">
        {[
          { name: "Home", icon: HomeIcon, id: "home" },
          { name: "Saved", icon: Star, id: "saved" },
          { name: "Add", icon: Plus, id: "add" },
          { name: "Chat", icon: Mic, id: "chat" },
          { name: "Profile", icon: Menu, id: "profile" },
        ].map((item) => (
          <motion.button
            key={item.id}
            className={`flex flex-col items-center justify-center p-2 ${
              activeTab === item.id ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(item.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {item.id === "add" ? (
              <div className="bg-red-500 rounded-full p-3 -mt-5 mb-1 text-white">
                <item.icon className="h-5 w-5" />
              </div>
            ) : (
              <item.icon className="h-5 w-5" />
            )}
            <span className="text-xs mt-1">{item.name}</span>
            {activeTab === item.id && (
              <motion.div
                className="absolute bottom-0 w-6 h-1 bg-red-500 rounded-t-full"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

