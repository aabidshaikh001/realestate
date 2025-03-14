"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  ArrowLeft,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Key,
  FileText,
  Upload,
  User,
  X,
  Eye,
  EyeOff,
  Search,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PersonalDetailsPage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSearchingIFSC, setIsSearchingIFSC] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Personal Info Form State
  const [personalInfo, setPersonalInfo] = useState({
    name: "Sameer",
    id: "3434674723723987",
    email: "Sameerverma@gmail.com",
    phone: "4037788998",
    address: "Sector 12, Karnal",
    pinNumber: "WO3 32 32XD",
    reraNumber: "WO3 32 32XD",
    document: "ID_Card.pdf",
  })

  // Bank Info Form State
  const [bankInfo, setBankInfo] = useState({
    bankName: "State Bank of India",
    accountNumber: "6045761770434",
    confirmAccountNumber: "6045761770434",
    ifscCode: "SBIN0001234",
    recipientName: "Sameer Verma",
  })

  // Form Validation State
  const [errors, setErrors] = useState<Record<string, string>>({})

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // IFSC Search Results
  const [ifscResults, setIfscResults] = useState([
    { code: "SBIN0001234", bank: "State Bank of India", branch: "Karnal Main" },
    { code: "SBIN0005678", bank: "State Bank of India", branch: "Sector 12" },
    { code: "HDFC0001234", bank: "HDFC Bank", branch: "Karnal" },
  ])

  console.log(setIfscResults)
  console.log(selectedFile)

  const handleEditToggle = () => {
    if (isEditing) {
      // If we're currently editing, this acts as a cancel button
      setIsEditing(false)
      // Reset form data to original values
      // In a real app, you would fetch the latest data from the server
    } else {
      setIsEditing(true)
    }
  }

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleBankInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBankInfo((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }

    // If changing account number, clear confirm account number if it doesn't match
    if (name === "accountNumber" && bankInfo.confirmAccountNumber && value !== bankInfo.confirmAccountNumber) {
      setErrors((prev) => ({ ...prev, confirmAccountNumber: "Account numbers do not match" }))
    } else if (name === "confirmAccountNumber" && value !== bankInfo.accountNumber) {
      setErrors((prev) => ({ ...prev, confirmAccountNumber: "Account numbers do not match" }))
    } else if (name === "confirmAccountNumber" && value === bankInfo.accountNumber) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.confirmAccountNumber
        return newErrors
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPersonalInfo((prev) => ({ ...prev, document: file.name }))

      // Create a preview URL for the file
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!personalInfo.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) newErrors.email = "Email is invalid"

    if (!personalInfo.phone) newErrors.phone = "Phone number is required"
    else if (!/^\d{10}$/.test(personalInfo.phone.replace(/\D/g, ""))) newErrors.phone = "Phone number must be 10 digits"

    if (!personalInfo.address) newErrors.address = "Address is required"
    if (!personalInfo.pinNumber) newErrors.pinNumber = "PIN number is required"
    if (!personalInfo.reraNumber) newErrors.reraNumber = "RERA number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateBankInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!bankInfo.bankName) newErrors.bankName = "Bank name is required"

    if (!bankInfo.accountNumber) newErrors.accountNumber = "Account number is required"
    else if (!/^\d{9,18}$/.test(bankInfo.accountNumber.replace(/\D/g, "")))
      newErrors.accountNumber = "Account number must be 9-18 digits"

    if (!bankInfo.confirmAccountNumber) newErrors.confirmAccountNumber = "Confirm account number is required"
    else if (bankInfo.accountNumber !== bankInfo.confirmAccountNumber)
      newErrors.confirmAccountNumber = "Account numbers do not match"

    if (!bankInfo.ifscCode) newErrors.ifscCode = "IFSC code is required"
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankInfo.ifscCode)) newErrors.ifscCode = "IFSC code is invalid"

    if (!bankInfo.recipientName) newErrors.recipientName = "Recipient name is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSavePersonalInfo = () => {
    if (validatePersonalInfo()) {
      // In a real app, you would send this data to your server
      alert("Personal information saved successfully!")
      setIsEditing(false)
    }
  }

  const handleSaveBankInfo = () => {
    if (validateBankInfo()) {
      // In a real app, you would send this data to your server
      alert("Bank information saved successfully!")
      setIsEditing(false)
    }
  }

  const handleSelectIFSC = (ifsc: string) => {
    setBankInfo((prev) => ({ ...prev, ifscCode: ifsc }))
    setIsSearchingIFSC(false)
  }

  return (
    <div className="pb-20">
      <header className="flex items-center p-4 border-b">
        <Link href="/profile" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">Personal Details</h1>
        <button className="ml-auto" onClick={handleEditToggle}>
          {isEditing ? <X className="h-5 w-5 text-red-500" /> : <Edit2 className="h-5 w-5" />}
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
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center overflow-hidden mb-2">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              {isEditing && (
                <button
                  className="absolute bottom-0 right-0 bg-red-500 rounded-full p-1"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Edit2 className="h-4 w-4 text-white" />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </button>
              )}
            </div>
            <h2 className="text-lg font-semibold">{personalInfo.name}</h2>
            <p className="text-gray-500 text-sm">{personalInfo.id}</p>
          </div>

          <FormField
            label="Email*"
            name="email"
            value={personalInfo.email}
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            isEditing={isEditing}
            onChange={handlePersonalInfoChange}
            error={errors.email}
          />
          <FormField
            label="Phone Number*"
            name="phone"
            value={personalInfo.phone}
            icon={<Phone className="h-5 w-5 text-gray-400" />}
            isEditing={isEditing}
            onChange={handlePersonalInfoChange}
            error={errors.phone}
          />
          <FormField
            label="Address*"
            name="address"
            value={personalInfo.address}
            icon={<MapPin className="h-5 w-5 text-gray-400" />}
            isEditing={isEditing}
            onChange={handlePersonalInfoChange}
            error={errors.address}
          />
          <FormField
            label="Pin Number*"
            name="pinNumber"
            value={personalInfo.pinNumber}
            icon={<Key className="h-5 w-5 text-gray-400" />}
            isEditing={isEditing}
            onChange={handlePersonalInfoChange}
            error={errors.pinNumber}
          />
          <FormField
            label="RERA Registration Number*"
            name="reraNumber"
            value={personalInfo.reraNumber}
            icon={<FileText className="h-5 w-5 text-gray-400" />}
            isEditing={isEditing}
            onChange={handlePersonalInfoChange}
            error={errors.reraNumber}
          />

          <div className="mt-6">
            <p className="mb-2 font-medium">Upload Document*</p>
            <div className="flex items-center border border-gray-300 rounded-lg p-3">
              <div className="flex-shrink-0 mr-3">
                {previewUrl ? (
                  <Image
                    src={previewUrl || "/placeholder.svg"}
                    alt="Document"
                    width={40}
                    height={60}
                    className="object-cover rounded"
                  />
                ) : (
                  <Image
                    src="/placeholder.svg?height=60&width=40"
                    alt="Document"
                    width={40}
                    height={60}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <Upload className="h-4 w-4 text-red-500" />
                  </div>
                  <span className="text-sm">{personalInfo.document}</span>
                </div>
              </div>
              {isEditing && (
                <button
                  className="ml-2 text-red-500"
                  onClick={() => document.getElementById("document-upload")?.click()}
                >
                  Change
                  <input id="document-upload" type="file" className="hidden" onChange={handleFileChange} />
                </button>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="flex space-x-3 mt-6">
              <button className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="flex-1 bg-red-500 text-white py-3 rounded-lg" onClick={handleSavePersonalInfo}>
                Save
              </button>
            </div>
          ) : (
            <button className="w-full bg-red-500 text-white py-3 rounded-lg mt-6" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>
      ) : (
        <div className="p-4 space-y-4">
          <FormField
            label="Bank Name*"
            name="bankName"
            value={bankInfo.bankName}
            icon={<FileText className="h-5 w-5 text-gray-400" />}
            isEditing={isEditing}
            onChange={handleBankInfoChange}
            error={errors.bankName}
          />
          <FormField
            label="Account Number*"
            name="accountNumber"
            value={bankInfo.accountNumber}
            type={showPassword ? "text" : "password"}
            icon={<Key className="h-5 w-5 text-gray-400" />}
            isEditing={isEditing}
            onChange={handleBankInfoChange}
            error={errors.accountNumber}
            endAdornment={
              isEditing && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              )
            }
          />
          <FormField
            label="Confirm Account Number*"
            name="confirmAccountNumber"
            value={bankInfo.confirmAccountNumber}
            icon={<Key className="h-5 w-5 text-gray-400" />}
            isEditing={isEditing}
            onChange={handleBankInfoChange}
            error={errors.confirmAccountNumber}
          />
          <div className="relative">
            <FormField
              label="IFSC CODE*"
              name="ifscCode"
              value={bankInfo.ifscCode}
              icon={<FileText className="h-5 w-5 text-gray-400" />}
              isEditing={isEditing}
              onChange={handleBankInfoChange}
              error={errors.ifscCode}
              helpText={isEditing ? "Search for IFSC" : undefined}
              onHelpTextClick={() => setIsSearchingIFSC(true)}
            />

            {isSearchingIFSC && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-2">
                  <div className="relative mb-2">
                    <input
                      type="text"
                      placeholder="Search IFSC code..."
                      className="w-full p-2 pl-8 border border-gray-300 rounded"
                    />
                    <Search className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {ifscResults.map((result, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectIFSC(result.code)}
                      >
                        <div className="font-medium">{result.code}</div>
                        <div className="text-xs text-gray-500">
                          {result.bank} - {result.branch}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <FormField
            label="Recipient Name*"
            name="recipientName"
            value={bankInfo.recipientName}
            icon={<User className="h-5 w-5 text-gray-400" />}
            isEditing={isEditing}
            onChange={handleBankInfoChange}
            error={errors.recipientName}
          />

          {isEditing ? (
            <div className="flex space-x-3 mt-6">
              <button className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="flex-1 bg-red-500 text-white py-3 rounded-lg" onClick={handleSaveBankInfo}>
                Save
              </button>
            </div>
          ) : (
            <button className="w-full bg-red-500 text-white py-3 rounded-lg mt-6" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>
      )}

    </div>
  )
}

interface FormFieldProps {
  label: string
  name: string
  value: string
  icon?: React.ReactNode
  type?: string
  helpText?: string
  isEditing: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  endAdornment?: React.ReactNode
  onHelpTextClick?: () => void
}

function FormField({
  label,
  name,
  value,
  type = "text",
  helpText,
  icon,
  isEditing,
  onChange,
  error,
  endAdornment,
  onHelpTextClick,
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          className={`w-full p-3 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 ${icon ? "pl-10" : ""} ${isEditing ? "bg-white" : "bg-gray-50"}`}
          value={value}
          onChange={onChange}
          readOnly={!isEditing}
        />
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>}
        {endAdornment}
        {helpText && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={onHelpTextClick}>
            <span className="text-red-500 text-sm cursor-pointer">{helpText}</span>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

