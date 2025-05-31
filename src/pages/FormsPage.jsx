import React, { useState } from "react";
import HeaderGreen from "../components/HeaderGreen";
import Concept001 from "../components/forms/Concept001";
import Concept002 from "../components/forms/Concept002";
import Concept003 from "../components/forms/Concept003";
import Concept004 from "../components/forms/Concept004";
import { Copy } from "lucide-react";

// Raw source code
import concept001Code from "../components/forms/Concept001.jsx?raw";
import concept002Code from "../components/forms/Concept002.jsx?raw";
import concept003Code from "../components/forms/Concept003.jsx?raw";
import concept004Code from "../components/forms/Concept004.jsx?raw";

export default function FormsPage() {
  const [showCode, setShowCode] = useState(null);

  const forms = [
    {
      id: "Concept001",
      title: "Design 001",
      desc: "Modern gradient split login interface.",
      Component: Concept001,
      code: concept001Code,
    },
    {
      id: "Concept002",
      title: "Design 002",
      desc: "Minimal gradient signup interface.",
      Component: Concept002,
      code: concept002Code,
    },
    {
      id: "Concept003",
      title: "Design 003",
      desc: "Same form with different styling.",
      Component: Concept003,
      code: concept003Code,
    },
    {
      id: "Concept004",
      title: "Design 004",
      desc: "Lottie animation on top (can be swapped with a GIF)/Perfect for startup-style SaaS UI",
      Component: Concept004,
      code: concept004Code,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f25] to-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-9xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFD369] mb-2">
            Input Fields & Forms
          </h1>
          <p className="text-[#CCCCCC] text-lg">
            Tailwind-styled login and input form variations.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {forms.map(({ id, title, desc, Component, code }) => (
            <div
              key={id}
              className="bg-[#2B313A] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-[#FFD369] mb-1">
                  {title}
                </h2>
                <p className="text-sm text-[#AAAAAA] mb-4">{desc}</p>
              </div>

              {/* Fully visible, responsive form container */}
              <div className="w-full bg-white rounded-lg shadow-inner p-4 mb-4">
                <Component />
              </div>

              <div className="mt-auto">
                <button
                  className="bg-[#FFD369] text-[#222831] text-sm px-4 py-1 rounded-full hover:bg-yellow-400"
                  onClick={() => setShowCode(showCode === id ? null : id)}
                >
                  {showCode === id ? "Hide Code" : "Show Code"}
                </button>
                {showCode === id && (
                  <div className="relative bg-[#1f1f1f] text-sm text-gray-200 rounded-lg mt-4 overflow-x-auto max-h-[500px]">
                    <button
                      className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded text-xs hover:bg-yellow-300"
                      onClick={() => {
                        navigator.clipboard.writeText(code);
                      }}
                    >
                      <Copy size={14} className="inline mr-1" /> Copy Code
                    </button>
                    <pre className="p-4 whitespace-pre-wrap break-words text-xs leading-relaxed">
                      <code>{code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

