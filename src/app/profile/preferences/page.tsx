"use client"

import { ArrowLeft, Edit2, ChevronDown, MapPin, Home, Briefcase, Building, Plus } from "lucide-react"
import Link from "next/link"


export default function PreferencesPage() {
  return (
    <div className="pb-20">
      <header className="flex items-center p-4 border-b">
        <Link href="/profile" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">Preferences</h1>
        <button className="ml-auto">
          <Edit2 className="h-5 w-5" />
        </button>
      </header>

      <div className="p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
              Locality*
            </div>
          </label>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex flex-wrap gap-2">
              <Chip label="Gurgaon, Haryana" selected />
              <Chip label="Karnal, Haryana" selected />
              <Chip label="Delhi, NCR" />
              <Chip label="Add more" isAdd />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-1 text-gray-500" />
              Property Type*
            </div>
          </label>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex flex-wrap gap-2">
              <Chip label="Residential" selected />
              <Chip label="Commercial" selected />
              <Chip label="Industrial" />
              <Chip label="Add more" isAdd />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-1 text-gray-500" />
              Experience (in years)*
            </div>
          </label>
          <div className="relative">
            <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 appearance-none">
              <option>5-10 years</option>
              <option>Less than 2 years</option>
              <option>2-5 years</option>
              <option>10+ years</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-1 text-gray-500" />
              Top 3 Builders with whom you have work*
            </div>
          </label>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex flex-wrap gap-2">
              <Chip label="DLF Builders" selected />
              <Chip label="Godrej Properties" selected />
              <Chip label="Prestige Group" />
              <Chip label="Add more" isAdd />
            </div>
          </div>
        </div>

        <button className="w-full bg-red-500 text-white py-3 rounded-lg mt-6">Done</button>
      </div>

    </div>
  )
}

function Chip({ label, selected = false, isAdd = false }: { label: string; selected?: boolean; isAdd?: boolean }) {
  return (
    <div
      className={`px-3 py-1 rounded-full text-sm flex items-center ${
        isAdd
          ? "bg-white border border-gray-200 text-red-500"
          : selected
            ? "bg-white border border-gray-200 shadow-sm"
            : "bg-white border border-gray-200"
      }`}
    >
      {isAdd && <Plus className="h-3 w-3 mr-1" />}
      {label}
    </div>
  )
}

