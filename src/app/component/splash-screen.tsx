"use client"

import { motion } from "framer-motion"
import { Building2 } from "lucide-react"

export default function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
          animate={{
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
        >
          <Building2 className="h-12 w-12 text-white" />
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.3,
            }}
          />
        </motion.div>

        <motion.div
          className="text-3xl font-bold flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.span
            className="text-blue-500"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            NESTO
          </motion.span>
          <motion.span
            className="text-gray-800"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.2,
            }}
          >
            HUB
          </motion.span>
        </motion.div>

        <motion.p
          className="text-gray-500 mt-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Find your dream property
        </motion.p>

        <motion.div
          className="mt-8 flex space-x-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

