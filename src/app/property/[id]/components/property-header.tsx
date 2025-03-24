"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaShareAlt, FaHeart } from "react-icons/fa";

interface PropertyHeaderProps {
  propertyId: string;
}

export default function PropertyHeader({ propertyId }: PropertyHeaderProps) {
  const router = useRouter();
  const [property, setProperty] = useState<{ name: string; location: string }>({
    name: "Loading...",
    location: "Fetching location...",
  });

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await fetch(`https://apimobile-6zp8.onrender.com/api/properties/${propertyId}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setProperty({ name: data.name, location: data.location });
      } catch (error) {
        console.error("Error fetching property:", error);
        setProperty({ name: "Unknown Property", location: "Unknown Location" });
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  
  return (
    <div className="sticky top-0 z-10 bg-white border-b">
      <div className="flex items-center justify-between p-4">
        <button onClick={() => router.back()} className="flex items-center text-gray-700">
          <FaArrowLeft className="mr-2" />
          <span>{property.name}</span>
        </button>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border flex items-center justify-center">
            <FaShareAlt className="text-gray-600" />
          </button>
          <button className="w-10 h-10 rounded-full border flex items-center justify-center">
            <FaHeart className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
