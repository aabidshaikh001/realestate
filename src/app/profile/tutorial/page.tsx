"use client"

import { useState, useRef } from "react"
import { ArrowLeft, Edit2, BookOpen, Play, Pause, ChevronRight, CheckCircle, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"


interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  thumbnail: string
  videoUrl: string
  completed: boolean
  locked: boolean
}

interface TutorialSection {
  id: string
  title: string
  tutorials: Tutorial[]
}

export default function TutorialPage() {
  const [activeVideo, setActiveVideo] = useState<Tutorial | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Dummy data for tutorials
  const tutorialSections: TutorialSection[] = [
    {
      id: "section1",
      title: "Getting Started",
      tutorials: [
        {
          id: "tut1",
          title: "Welcome to the Platform",
          description: "An introduction to our platform and its features",
          duration: "2:30",
          thumbnail: "/placeholder.svg?height=120&width=200",
          videoUrl: "https://example.com/video1.mp4",
          completed: true,
          locked: false,
        },
        {
          id: "tut2",
          title: "Setting Up Your Profile",
          description: "Learn how to set up your profile for maximum visibility",
          duration: "4:15",
          thumbnail: "/placeholder.svg?height=120&width=200",
          videoUrl: "https://example.com/video2.mp4",
          completed: true,
          locked: false,
        },
        {
          id: "tut3",
          title: "Understanding the Dashboard",
          description: "Navigate through the dashboard and understand key metrics",
          duration: "3:45",
          thumbnail: "/placeholder.svg?height=120&width=200",
          videoUrl: "https://example.com/video3.mp4",
          completed: false,
          locked: false,
        },
      ],
    },
    {
      id: "section2",
      title: "Advanced Features",
      tutorials: [
        {
          id: "tut4",
          title: "Property Listings",
          description: "How to create effective property listings",
          duration: "5:20",
          thumbnail: "/placeholder.svg?height=120&width=200",
          videoUrl: "https://example.com/video4.mp4",
          completed: false,
          locked: false,
        },
        {
          id: "tut5",
          title: "Client Management",
          description: "Tips for managing client relationships",
          duration: "6:10",
          thumbnail: "/placeholder.svg?height=120&width=200",
          videoUrl: "https://example.com/video5.mp4",
          completed: false,
          locked: true,
        },
        {
          id: "tut6",
          title: "Marketing Strategies",
          description: "Effective marketing strategies for real estate",
          duration: "7:30",
          thumbnail: "/placeholder.svg?height=120&width=200",
          videoUrl: "https://example.com/video6.mp4",
          completed: false,
          locked: true,
        },
      ],
    },
  ]

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    setProgress(100)
    // Mark tutorial as completed
    if (activeVideo) {
      // In a real app, you would update this in your database
      alert(`Congratulations! You've completed "${activeVideo.title}"`)
    }
  }

  const handleSelectVideo = (tutorial: Tutorial) => {
    if (tutorial.locked) {
      alert("This tutorial is locked. Complete previous tutorials to unlock.")
      return
    }
    setActiveVideo(tutorial)
    setIsPlaying(false)
    setProgress(0)
  }

  return (
    <div className="pb-20">
      <header className="flex items-center p-4 border-b">
        <Link href="/profile" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">Tutorials</h1>
        <button className="ml-auto">
          <Edit2 className="h-5 w-5" />
        </button>
      </header>

      {activeVideo ? (
        <div>
          <div className="relative bg-black">
            <video
              ref={videoRef}
              className="w-full h-56 object-contain"
              poster={activeVideo.thumbnail}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnd}
            >
              <source src={activeVideo.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute bottom-0 left-0 right-0">
              <div className="bg-gray-800 bg-opacity-50 p-2">
                <div className="relative h-1 bg-gray-500 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 bg-opacity-70 rounded-full p-4"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
            </button>
          </div>

          <div className="p-4">
            <h2 className="text-xl font-semibold mb-1">{activeVideo.title}</h2>
            <p className="text-gray-600 mb-4">{activeVideo.description}</p>

            <button className="text-red-500 font-medium" onClick={() => setActiveVideo(null)}>
              Back to Tutorials
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center mb-6">
            <div className="bg-red-100 rounded-full p-2 mr-3">
              <BookOpen className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold">Learning Center</h2>
          </div>

          <div className="space-y-6">
            {tutorialSections.map((section) => (
              <div key={section.id}>
                <h3 className="font-medium text-lg mb-3">{section.title}</h3>
                <div className="space-y-3">
                  {section.tutorials.map((tutorial) => (
                    <div
                      key={tutorial.id}
                      className={`border border-gray-200 rounded-lg overflow-hidden ${
                        tutorial.locked ? "opacity-70" : ""
                      }`}
                      onClick={() => handleSelectVideo(tutorial)}
                    >
                      <div className="flex">
                        <div className="relative w-24 h-20 flex-shrink-0">
                          <Image
                            src={tutorial.thumbnail || "/placeholder.svg"}
                            alt={tutorial.title}
                            fill
                            className="object-cover"
                          />
                          {tutorial.locked && (
                            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                              <Lock className="h-6 w-6 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="p-3 flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{tutorial.title}</h4>
                            {tutorial.completed && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1 mb-1">{tutorial.description}</p>
                          <div className="flex justify-between items-center text-xs">
                            <span>{tutorial.duration}</span>
                            {!tutorial.locked && (
                              <span className="text-red-500 flex items-center">
                                Watch
                                <ChevronRight className="h-3 w-3 ml-1" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <h3 className="font-medium mb-2">Your Progress</h3>
            <div className="relative h-2 bg-gray-200 rounded-full mb-2">
              <div className="absolute top-0 left-0 h-full bg-red-500 rounded-full" style={{ width: "30%" }} />
            </div>
            <p className="text-sm text-gray-600">3 of 10 tutorials completed (30%)</p>
          </div>
        </div>
      )}

    
    </div>
  )
}

