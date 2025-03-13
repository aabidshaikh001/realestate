"use client";

import { useState, useEffect, useMemo } from "react"; // Import useMemo
import Link from "next/link";
import { HomeIcon, Star, Plus, Mic, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname(); // Get the current pathname
  const [activeTab, setActiveTab] = useState("home");

  // Memoize the navItems array to prevent unnecessary recreations
  const navItems = useMemo(
    () => [
      { name: "Home", icon: HomeIcon, id: "home", href: "/" },
      { name: "Saved", icon: Star, id: "saved", href: "/saved" },
      { name: "Add", icon: Plus, id: "add", href: "/add" },
      { name: "Chat", icon: Mic, id: "chat", href: "/chat" },
      { name: "Profile", icon: Menu, id: "profile", href: "/profile" },
    ],
    [] // Empty dependency array means navItems is only created once
  );

  // Update activeTab based on the current pathname
  useEffect(() => {
    const currentTab = navItems.find((item) => item.href === pathname)?.id;
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [pathname, navItems]); // Add navItems to the dependency array

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-2">
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <Link key={item.id} href={item.href} onClick={() => setActiveTab(item.id)}>
            <button
              className={`flex flex-col items-center justify-center p-2 relative ${
                activeTab === item.id ? "text-red-500" : "text-gray-500"
              }`}
            >
              {item.id === "add" ? (
                <div className="bg-red-500 rounded-full p-3 -mt-5 mb-1 text-white">
                  <item.icon className="h-5 w-5" />
                </div>
              ) : (
                <item.icon className="h-5 w-5" />
              )}
              <span className="text-xs mt-1">{item.name}</span>
              {activeTab === item.id && (
                <div className="absolute bottom-0 w-6 h-1 bg-red-500 rounded-t-full" />
              )}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}