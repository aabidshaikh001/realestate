"use client"

import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Share2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Dummy about data based on property ID
const getDummyAboutData = (id: string) => {
  const aboutData = {
    "prop-001":
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    "prop-002":
      "Green Valley Villa is a premium residential project offering luxurious villas with modern amenities.",
    "prop-003":
      "Urban Heights Condo is a modern residential development in the heart of Surabaya with smart home features.",
  }

  return (
    aboutData[id as keyof typeof aboutData] ||
    "This property features modern architecture and premium amenities designed for comfortable living."
  )
}

export default function AboutProjectPage() {
  const router = useRouter()
  const params = useParams()
  const propertyId = params.id as string // Get dynamic property ID
  const aboutData = getDummyAboutData(propertyId)

  // Share button functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "About This Project",
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between px-4 h-14">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">About Project</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-14 pb-4">
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Project Overview</h2>
          <p className="text-gray-600 leading-relaxed">{aboutData}</p>
        </div>
      </main>
    </div>
  )
}
