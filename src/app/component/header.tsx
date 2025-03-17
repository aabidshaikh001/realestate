"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CgProfile } from "react-icons/cg"
import { IoNotificationsCircleOutline } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/auth-provider"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, LogIn, Settings} from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"


type User = {
  id: string
  email: string
  name?: string
  phone?: string
  address?: string
  pinNumber?: string
  reraNumber?: string
  document?: string[]
  bankName?: string
  accountNumber?: string
  confirmAccountNumber?: string
  ifscCode?: string
  recipientName?: string
  image?: string // Add this line
}

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [notificationCount, setNotificationCount] = useState(3)
 

  const handleProfileClick = () => {
    router.push("/profile")
  }

  const handleNotificationsClick = () => {
    // Reset notification count when clicked
    setNotificationCount(0)
    // Here you would typically open a notifications panel
    // For now, we'll just alert
    alert("Notifications panel would open here")
  }

 

  return (
    <motion.header
      className="bg-white dark:bg-gray-900 p-4 flex items-center justify-between z-10 shadow-sm"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/")}
          className="cursor-pointer"
        >
          <Image
            src="/logo.png"
            alt="TREC Logo"
            width={200}
            height={50}
            style={{ filter: "brightness(0) saturate(100%) invert(50%) sepia(92%) saturate(7400%) hue-rotate(0deg)" }}
            className="object-contain filter invert-[22%] sepia-[100%] saturate-[10000%] hue-rotate-[0deg] brightness-[103%] contrast-[104%]"           />
        </motion.div>
      </div>

     

      {/* Right Side Icons */}
      <div className="flex gap-4 items-center">
     

        {/* Notifications */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" onClick={handleNotificationsClick}>
                <div className="relative">
                  <IoNotificationsCircleOutline className="h-7 w-7" />
                  {notificationCount > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                      variant="destructive"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </div>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon">
                {user?.image ? ( // Safely check if user.image exists/
                  <Image
                    src={user?.image} 
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <CgProfile className="h-7 w-7" />
                )}
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {isAuthenticated ? (
              <>
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>My Account</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={() => router.push("/login")} className="cursor-pointer">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Sign in</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  )
}