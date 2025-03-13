"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Edit2, Mail, Phone, MapPin, Key, FileText, Upload, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PersonalDetailsPage() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="pb-20">
      <header className="flex items-center p-4 border-b">
        <Link href="/profile" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">Personal Details</h1>
        <button className="ml-auto">
          <Edit2 className="h-5 w-5" />
        </button>
      </header>

      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "personal" ? "text-white bg-red-500 rounded-full mx-2 my-2" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Info
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "bank" ? "text-white bg-red-500 rounded-full mx-2 my-2" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("bank")}
        >
          Bank Info
        </button>
      </div>

      {activeTab === "personal" ? (
        <div className="p-4 space-y-4">
          <div className="flex flex-col items-center mb-4">
            <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center overflow-hidden mb-2">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Profile"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold">Sameer</h2>
            <p className="text-gray-500 text-sm">3434674723723987</p>
          </div>

          <FormField label="Email*" value="Sameerverma@gmail.com" icon={<Mail className="h-5 w-5 text-gray-400" />} />
          <FormField label="Phone Number*" value="4037788998" icon={<Phone className="h-5 w-5 text-gray-400" />} />
          <FormField label="Address*" value="Sector 12, Karnal" icon={<MapPin className="h-5 w-5 text-gray-400" />} />
          <FormField label="Pin Number*" value="WO3 32 32XD" icon={<Key className="h-5 w-5 text-gray-400" />} />
          <FormField
            label="RERA Registration Number*"
            value="WO3 32 32XD"
            icon={<FileText className="h-5 w-5 text-gray-400" />}
          />

          <div className="mt-6">
            <p className="mb-2 font-medium">Upload Document*</p>
            <div className="flex items-center border border-gray-300 rounded-lg p-3">
              <div className="flex-shrink-0 mr-3">
                <Image
                  src="/placeholder.svg?height=60&width=40"
                  alt="Document"
                  width={40}
                  height={60}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <Upload className="h-4 w-4 text-red-500" />
                  </div>
                  <span className="text-sm">ID_Card.pdf</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-red-500 text-white py-3 rounded-lg mt-6">DONE</button>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          <FormField
            label="Bank Name*"
            value="State Bank of India"
            icon={<FileText className="h-5 w-5 text-gray-400" />}
          />
          <FormField
            label="Account Number*"
            value="••••••••••••"
            type="password"
            icon={<Key className="h-5 w-5 text-gray-400" />}
          />
          <FormField
            label="Confirm Account Number*"
            value="6045761770434"
            icon={<Key className="h-5 w-5 text-gray-400" />}
          />
          <FormField
            label="IFSC CODE*"
            value="SBIN0001234"
            helpText="Search for IFSC"
            icon={<FileText className="h-5 w-5 text-gray-400" />}
          />
          <FormField label="Recipient Name*" value="Sameer Verma" icon={<User className="h-5 w-5 text-gray-400" />} />

          <button className="w-full bg-red-500 text-white py-3 rounded-lg mt-6">Done</button>
        </div>
      )}

    
    </div>
  )
}

function FormField({
  label,
  value,
  type = "text",
  helpText,
  icon,
}: {
  label: string
  value: string
  type?: string
  helpText?: string
  icon?: React.ReactNode
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={type}
          className={`w-full p-3 border border-gray-300 rounded-lg bg-gray-50 ${icon ? "pl-10" : ""}`}
          value={value}
          readOnly
        />
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>}
        {helpText && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <span className="text-red-500 text-sm">{helpText}</span>
          </div>
        )}
      </div>
    </div>
  )
}

