"use client"
import {
  ArrowLeft,
  ChevronRight,
  LogOut,
  Edit2,
  User,
  Settings,
  Users,
  FileText,
  HelpCircle,
  MessageSquare,
  BookOpen,
  
} from "lucide-react"
import type React from "react"

import Image from "next/image"
import Link from "next/link"
import Footer from "../component/footer"


export default function ProfilePage() {
  return (
    <div className="pb-20">
      <header className="flex items-center p-4 border-b">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">Profile</h1>
        <button className="ml-auto">
          <Edit2 className="h-5 w-5" />
        </button>
      </header>

      <div className="flex flex-col items-center py-6">
        <div className="relative mb-2">
          <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
            <Image
              src="/placeholder.svg?height=96&width=96"
              alt="Profile"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-red-500 rounded-full p-1">
            <Edit2 className="h-4 w-4 text-white" />
          </div>
        </div>
        <h2 className="text-xl font-semibold">Sameer</h2>
        <p className="text-gray-500 text-sm">3434674723723987</p>
      </div>

      <div className="px-4 space-y-2">
        <ProfileMenuItem
          icon={<User className="h-5 w-5 text-red-500" />}
          title="Personal details"
          href="/profile/personal-details"
        />
        <ProfileMenuItem
          icon={<Settings className="h-5 w-5 text-red-500" />}
          title="Preferences"
          href="/profile/preferences"
        />
        <ProfileMenuItem
          icon={<Users className="h-5 w-5 text-red-500" />}
          title="Community Support"
          href="/profile/community"
        />
        <ProfileMenuItem
          icon={<FileText className="h-5 w-5 text-red-500" />}
          title="Terms & Conditions"
          href="/profile/terms"
        />
        <ProfileMenuItem
          icon={<HelpCircle className="h-5 w-5 text-red-500" />}
          title="Support"
          href="/profile/support"
        />
        <ProfileMenuItem
          icon={<MessageSquare className="h-5 w-5 text-red-500" />}
          title="Raise Query"
          href="/profile/query"
        />
        <ProfileMenuItem
          icon={<BookOpen className="h-5 w-5 text-red-500" />}
          title="Tutorial"
          href="/profile/tutorial"
        />
        <button className="flex items-center w-full py-3 text-red-500">
          <span className="flex items-center justify-center w-8 h-8 mr-3">
            <LogOut className="h-5 w-5 text-red-500" />
          </span>
          <span>Sign Out</span>
        </button>
      </div>

     
      <Footer/>

    
    </div>
  )
}

function ProfileMenuItem({ icon, title, href }: { icon: React.ReactNode; title: string; href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between py-3 px-2 bg-gray-50 rounded-lg">
      <div className="flex items-center">
        <span className="flex items-center justify-center w-8 h-8 mr-3">{icon}</span>
        <span>{title}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </Link>
  )
}

