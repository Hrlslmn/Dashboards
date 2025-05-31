import React, { useState } from "react";
import HeaderGreen from "../components/HeaderGreen";
import { Copy } from "lucide-react";

export default function NavigationPage() {
  const [showCode, setShowCode] = useState(null);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
  };

  const examples = [
    {
      id: "navbar",
      title: "Top Navigation Bar",
      desc: "Standard responsive navbar with logo and links.",
      code: `<header className="bg-[#393E46] p-4 flex justify-between items-center rounded-md">
  <h1 className="text-[#FFD369] text-lg font-bold">MySite</h1>
  <nav className="space-x-4">
    <a href="#" className="text-[#EEEEEE] hover:underline">Home</a>
    <a href="#" className="text-[#EEEEEE] hover:underline">About</a>
    <a href="#" className="text-[#EEEEEE] hover:underline">Contact</a>
  </nav>
</header>`,
      jsx: (
        <header className="bg-[#393E46] p-4 flex justify-between items-center rounded-md">
          <h1 className="text-[#FFD369] text-lg font-bold">MySite</h1>
          <nav className="space-x-4">
            <a href="#" className="text-[#EEEEEE] hover:underline">Home</a>
            <a href="#" className="text-[#EEEEEE] hover:underline">About</a>
            <a href="#" className="text-[#EEEEEE] hover:underline">Contact</a>
          </nav>
        </header>
      ),
    },
    {
      id: "tabs",
      title: "Tab Navigation",
      desc: "Horizontal tab interface with active state.",
      code: `<div className="flex border-b border-[#393E46]">
  {["Overview", "Features", "Pricing"].map((tab, i) => (
    <button
      key={i}
      className="px-4 py-2 text-sm text-[#EEEEEE] hover:text-[#FFD369] border-b-2 border-transparent hover:border-[#FFD369]"
    >
      {tab}
    </button>
  ))}
</div>`,
      jsx: (
        <div className="flex border-b border-[#393E46]">
          {["Overview", "Features", "Pricing"].map((tab, i) => (
            <button
              key={i}
              className="px-4 py-2 text-sm text-[#EEEEEE] hover:text-[#FFD369] border-b-2 border-transparent hover:border-[#FFD369]"
            >
              {tab}
            </button>
          ))}
        </div>
      ),
    },
    {
      id: "breadcrumb",
      title: "Breadcrumbs",
      desc: "Path indicator for navigation hierarchy.",
      code: `<nav className="text-sm text-[#CCCCCC]">
  <span className="text-[#FFD369]">Home</span> / Dashboard / Settings
</nav>`,
      jsx: (
        <nav className="text-sm text-[#CCCCCC]">
          <span className="text-[#FFD369]">Home</span> / Dashboard / Settings
        </nav>
      ),
    },
    {
      id: "sidebar",
      title: "Vertical Sidebar",
      desc: "Simple sidebar with active highlight.",
      code: `<aside className="bg-[#2E3440] p-4 w-48 rounded-md space-y-2">
  {["Dashboard", "Projects", "Reports"].map((item, i) => (
    <a key={i} href="#" className="block text-[#EEEEEE] hover:bg-[#393E46] px-3 py-2 rounded">
      {item}
    </a>
  ))}
</aside>`,
      jsx: (
        <aside className="bg-[#2E3440] p-4 w-48 rounded-md space-y-2">
          {["Dashboard", "Projects", "Reports"].map((item, i) => (
            <a key={i} href="#" className="block text-[#EEEEEE] hover:bg-[#393E46] px-3 py-2 rounded">
              {item}
            </a>
          ))}
        </aside>
      ),
    },
    {
      id: "mobile-menu",
      title: "Mobile Hamburger Menu",
      desc: "Toggleable menu for mobile nav.",
      code: `<div className="sm:hidden">
  <button className="text-[#FFD369]">☰ Menu</button>
  <div className="mt-2 bg-[#393E46] rounded shadow p-3 space-y-2">
    <a href="#" className="block text-[#EEEEEE]">Home</a>
    <a href="#" className="block text-[#EEEEEE]">About</a>
    <a href="#" className="block text-[#EEEEEE]">Contact</a>
  </div>
</div>`,
      jsx: (
        <div className="sm:hidden">
          <button className="text-[#FFD369]">☰ Menu</button>
          <div className="mt-2 bg-[#393E46] rounded shadow p-3 space-y-2">
            <a href="#" className="block text-[#EEEEEE]">Home</a>
            <a href="#" className="block text-[#EEEEEE]">About</a>
            <a href="#" className="block text-[#EEEEEE]">Contact</a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f25] to-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFD369] drop-shadow mb-2">
            Navigation Elements
          </h1>
          <p className="text-[#CCCCCC] text-lg">Explore headers, tabs, and side menus built with Tailwind CSS.</p>
        </div>

        <div className="space-y-12">
          {examples.map((ex) => (
            <div key={ex.id} className="bg-[#2B313A] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#FFD369] mb-1">{ex.title}</h2>
              <p className="text-sm text-[#AAAAAA] mb-4">{ex.desc}</p>
              {ex.jsx}
              <div className="mt-4 flex gap-4">
                <button
                  className="bg-[#FFD369] text-[#222831] text-sm px-4 py-1 rounded-full hover:bg-yellow-400"
                  onClick={() => setShowCode(showCode === ex.id ? null : ex.id)}
                >
                  {showCode === ex.id ? "Hide Code" : "View Code"}
                </button>
              </div>
              {showCode === ex.id && (
                <div className="relative mt-4 bg-[#1f1f1f] text-xs p-4 rounded overflow-auto">
                  <pre>{ex.code}</pre>
                  <button
                    onClick={() => copyToClipboard(ex.code)}
                    className="absolute top-2 right-2 text-white bg-[#FFD369] text-xs px-2 py-1 rounded hover:bg-yellow-300"
                  >
                    <Copy size={14} className="inline mr-1" /> Copy
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

