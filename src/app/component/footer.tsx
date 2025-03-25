"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { HomeIcon, Plus, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { MdCurrencyRupee } from "react-icons/md";
import { BsBuildingsFill } from "react-icons/bs";

export default function Footer() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

  const navItems = useMemo(
    () => [
      { name: "Home", icon: HomeIcon, id: "home", href: "/" },
      { name: "Properties", icon: BsBuildingsFill, id: "Properties", href: "/Properties" },
      { name: "Visit", icon: Plus, id: "visit", href: "#" }, // Prevents page reload
      { name: "Revenue", icon: MdCurrencyRupee, id: "Revenue", href: "/Revenue" },
      { name: "Profile", icon: Menu, id: "profile", href: "/profile" },
    ],
    []
  );

  useEffect(() => {
    const currentTab = navItems.find((item) => item.href === pathname)?.id;
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [pathname, navItems]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-2">
      <div className="flex justify-between items-center relative">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === "visit") {
                setIsMenuOpen(!isMenuOpen);
              } else {
                setActiveTab(item.id);
              }
            }}
            className={`flex flex-col items-center justify-center p-2 relative ${
              activeTab === item.id ? "text-red-500" : "text-gray-500"
            }`}
          >
            {item.id === "visit" ? (
              <div className="bg-red-500 rounded-full p-3 -mt-8 mb-1 text-white">
                <item.icon className="h-7 w-7" />
              </div>
            ) : (
              <item.icon className="h-7 w-7" />
            )}
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Floating Menu */}
      {isMenuOpen && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-lg w-48 p-2">
          {[
            { name: "Book a Visit", href: "/book-visit" },
            { name: "Add New Customer", href: "/add-customer" },
            { name: "Raise Query", href: "/raise-query" },
            { name: "EMI Calculator", href: "/emi-calculator" },
          ].map((item, index) => (
            <Link key={index} href={item.href}>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 block"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
