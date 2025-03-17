"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "@/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import LoadingSpinner from "@/components/loading-spinner"
import {
  LogOut,
  Edit2,
  User,
  FileText,
  CreditCard,
  ArrowLeft,
  Phone,
  MapPin,
  Key,
  Mail,
  ChevronRight,
  Shield,
  Download,
  Building,
} from "lucide-react"

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")

  // Mock document data with types
  const documentData = user?.document
    ? [
        { name: user.document[0] || "aadhaar_card.pdf", type: "Aadhaar Card" },
        { name: user.document[1] || "pan_card.pdf", type: "PAN Card" },
      ]
    : []

  // Check if user skipped auth
  useEffect(() => {
    const skippedAuth = localStorage.getItem("authSkipped")
    if (!isAuthenticated && !skippedAuth) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  const isGuest = !isAuthenticated

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center p-4 border-b bg-white shadow-sm sticky top-0 z-10">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">My Profile</h1>
        {isAuthenticated && (
          <button className="ml-auto text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors" onClick={logout}>
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </header>

      {isGuest ? (
        <div className="p-4">
          <Card className="mb-8 overflow-hidden border-none shadow-md">
            <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <CardHeader className="pb-2">
              <CardTitle>Guest Mode</CardTitle>
              <CardDescription>You are browsing as a guest. Sign in to access all features.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-6 py-6">
              <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center -mt-20 border-4 border-white shadow">
                <User className="h-12 w-12 text-blue-500" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">Welcome, Guest</h2>
                <p className="text-muted-foreground">Create an account to save your information</p>
              </div>
              <div className="flex space-x-4">
                <Button asChild size="lg">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/register">Create Account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="flex border-b bg-white shadow-sm sticky top-16 z-10">
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "personal" ? "text-white bg-primary rounded-full mx-2 my-2" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("personal")}
            >
              Personal Info
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "bank" ? "text-white bg-primary rounded-full mx-2 my-2" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("bank")}
            >
              Bank Info
            </button>
          </div>

          {activeTab === "personal" ? (
  <div className="p-4 space-y-6">
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Background Gradient Section */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        <Button asChild className="absolute top-4 right-4" variant="outline" size="sm">
          <Link href="/add-profile">
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Profile
          </Link>
        </Button>

        {/* Profile Image Overlay */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "Profile"}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          ) : (
            <User className="h-16 w-16 text-blue-500" />
          )}
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="flex flex-col items-center mt-16 mb-6">
          <h2 className="text-2xl font-bold mt-4">{user?.name || "User"}</h2>
          <p className="text-gray-500 text-sm">{user?.id}</p>
        </div>

        {/* User Information */}
        <div className="space-y-4">
          <InfoItem icon={<Mail className="h-5 w-5 text-blue-500" />} label="Email" value={user?.email} />
          <InfoItem icon={<Phone className="h-5 w-5 text-blue-500" />} label="Phone" value={user?.phone || "Not provided"} />
          <InfoItem icon={<MapPin className="h-5 w-5 text-blue-500" />} label="Address" value={user?.address || "Not provided"} />
          <InfoItem icon={<Key className="h-5 w-5 text-blue-500" />} label="PIN Number" value={user?.pinNumber || "Not provided"} />
          <InfoItem icon={<Shield className="h-5 w-5 text-blue-500" />} label="RERA Number" value={user?.reraNumber || "Not provided"} />
        </div>
      </div>
    </div>

    {/* Documents Section */}
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FileText className="h-5 w-5 mr-2 text-blue-500" />
        Documents
      </h2>

      {documentData.length > 0 ? (
        <div className="space-y-3">
          {documentData.map((doc, index) => (
            <div
              key={index}
              className="flex items-center border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 mr-3">
                <div className="w-12 h-16 bg-blue-50 rounded flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{doc.name}</span>
                  <span className="text-xs text-gray-500">{doc.type}</span>
                </div>
              </div>
              <button className="text-blue-500 p-2 hover:bg-blue-50 rounded-full transition-colors">
                <Download className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
          <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No documents uploaded</p>
          <Button asChild variant="link" className="mt-2">
            <Link href="/add-profile">Upload Documents</Link>
          </Button>
        </div>
      )}
    </div>
  </div>
) : (
            <div className="p-4 space-y-6">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                  <Button asChild className="absolute top-4 right-4" variant="outline" size="sm">
                    <Link href="/add-profile">
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit Bank Details
                    </Link>
                  </Button>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                    Bank Information
                  </h2>

                  <div className="space-y-4">
                    <InfoItem
                      icon={<Building className="h-5 w-5 text-blue-500" />}
                      label="Bank Name"
                      value={user?.bankName || "Not provided"}
                    />

                    <InfoItem
                      icon={<CreditCard className="h-5 w-5 text-blue-500" />}
                      label="Account Number"
                      value={
                        user?.accountNumber
                          ? `${user.accountNumber.substring(0, 4)}...${user.accountNumber.substring(
                              user.accountNumber.length - 4,
                            )}`
                          : "Not provided"
                      }
                      isSecure
                    />

                    <InfoItem
                      icon={<FileText className="h-5 w-5 text-blue-500" />}
                      label="IFSC Code"
                      value={user?.ifscCode || "Not provided"}
                    />

                    <InfoItem
                      icon={<User className="h-5 w-5 text-blue-500" />}
                      label="Recipient Name"
                      value={user?.recipientName || "Not provided"}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

                <div className="space-y-2">
                  <Link
                    href="#"
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Download className="h-5 w-5 text-blue-500" />
                      </div>
                      <span>Download Bank Statement</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Shield className="h-5 w-5 text-blue-500" />
                      </div>
                      <span>Verify Account</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | undefined; // Allow undefined
  isSecure?: boolean;
}

function InfoItem({ icon, label, value, isSecure }: InfoItemProps) {
  return (
    <div className="flex items-center border-b border-gray-100 pb-4">
      <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">
          {value}
          {isSecure && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
              <Shield className="h-3 w-3 mr-1" />
              Secure
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

