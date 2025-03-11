"use client"

import { ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

// Define proper interfaces for our data
interface Project {
  name: string
  location: string
}

interface BuilderDetails {
  name: string
  established: string
  logo: string
  overview: string
  experience: string
  certifications: string
  projects: Project[]
}

// Extended builder data with more details
const builderDetailsData: Record<string, BuilderDetails> = {
  "prop-001": {
    name: "Sky Builders",
    established: "1995",
    logo: "/placeholder.svg",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    experience:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    certifications:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    projects: [
      { name: "Skyline Towers", location: "Downtown" },
      { name: "Green Valley Villas", location: "Suburb East" },
      { name: "Ocean View Apartments", location: "Coastal Area" },
      { name: "Mountain Retreat Homes", location: "Highland District" },
    ],
  },
  "prop-002": {
    name: "Horizon Developers",
    established: "2001",
    logo: "/placeholder.svg",
    overview:
      "Horizon Developers is known for creating sustainable and modern living spaces with a focus on community development and environmental responsibility.",
    experience:
      "With over two decades of experience, Horizon has completed more than 50 residential and commercial projects across the country, earning multiple awards for design excellence.",
    certifications: "ISO 9001, Green Building Council Certified, Energy Star Partner",
    projects: [
      { name: "Horizon Heights", location: "City Center" },
      { name: "Sunrise Residences", location: "East End" },
      { name: "Urban Lofts", location: "Arts District" },
      { name: "Parkview Condos", location: "Riverside" },
    ],
  },
}

export default function BuilderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [builderData, setBuilderData] = useState<BuilderDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data based on the ID
    const data = builderDetailsData[id as keyof typeof builderDetailsData] || builderDetailsData["prop-001"]
    setBuilderData(data)
    setLoading(false)
  }, [id])

  const handleShare = async () => {
    try {
      await navigator.share({
        title: builderData?.name || "Builder Details",
        url: window.location.href,
      })
    } catch (error) {
      console.log("Sharing failed", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading builder details...</p>
      </div>
    )
  }

  if (!builderData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Builder details not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-10">
        <div className="flex items-center justify-between px-4 h-14 bg-white">
        <Button
  onClick={() => router.back()}
  className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow hover:bg-gray-100 transition"
  aria-label="Go back"
>
  <ArrowLeft className="h-5 w-5 text-gray-700" />
  <span className="text-gray-700">Back</span>
</Button>

          <h1 className="text-lg font-semibold">About the Builder</h1>
          <Button variant="ghost" size="icon" className="text-gray-700" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="pt-14 px-4 pb-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4 py-4">
            <Image
              src={builderData.logo || "/placeholder.svg"}
              alt="Builder Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-xl font-bold">{builderData.name}</h2>
              <p className="text-sm text-gray-500">Established {builderData.established}</p>
            </div>
          </div>

          <section>
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{builderData.overview}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{builderData.experience}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Projects Completed</h3>
            <div className="grid grid-cols-2 gap-4">
              {builderData.projects.map((project: Project, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <Image
                    src="/placeholder.svg"
                    alt={`Project ${project.name}`}
                    width={150}
                    height={100}
                    className="rounded-lg mb-2 w-full"
                  />
                  <h4 className="font-medium text-sm">{project.name}</h4>
                  <p className="text-xs text-gray-500">{project.location}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Certifications</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{builderData.certifications}</p>
          </section>
        </div>
      </main>
    </div>
  )
}

