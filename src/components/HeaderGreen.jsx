import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Monitor,
  Image,
  Palette,
  FolderKanban,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { icon: <LayoutDashboard size={18} />, label: "Overview", path: "/" },
  { icon: <Monitor size={18} />, label: "React Components", path: "/components" },
  { icon: <Image size={18} />, label: "Graphic Designs", path: "/designs" },
  { icon: <Palette size={18} />, label: "AI Branding Board", path: "/themes" },
  { icon: <FolderKanban size={18} />, label: "Collections", path: "/collections" },
];

export default function HeaderGreen() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#222831] shadow-md text-[#EEEEEE] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            className="sm:hidden text-[#FFD369] focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-[#FFD369] tracking-tight">
            Artifex 
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-6 text-sm font-medium">
          {navLinks.map(({ icon, label, path }) => (
            <Link
              key={label}
              to={path}
              className={`flex items-center gap-2 transition px-3 py-1.5 rounded-md ${
                location.pathname === path
                  ? "bg-[#FFD369] text-[#222831]"
                  : "hover:bg-[#393E46]"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <nav className="sm:hidden px-4 pb-4 bg-[#222831] border-t border-[#393E46]">
          {navLinks.map(({ icon, label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition text-sm ${
                location.pathname === path
                  ? "bg-[#FFD369] text-[#222831]"
                  : "text-[#EEEEEE] hover:bg-[#393E46]"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}





