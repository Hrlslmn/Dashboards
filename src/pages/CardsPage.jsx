import React, { useState } from "react";
import HeaderGreen from "../components/HeaderGreen";
import { Star } from "lucide-react";

export default function CardsPage() {
  const [selectedCode, setSelectedCode] = useState(null);

  const handleClick = (code) => {
    setSelectedCode(code);
    navigator.clipboard.writeText(code);
  };

  const cards = [
    {
      label: "Basic Card",
      jsx: (
        <div className="bg-[#393E46] p-6 rounded-xl shadow-md transition hover:scale-[1.02]">
          <h3 className="text-[#FFD369] text-lg font-bold mb-2">Basic Card</h3>
          <p className="text-[#CCCCCC]">
            Simple layout with a title and body content.
          </p>
        </div>
      ),
      code: `<div className="bg-[#393E46] p-6 rounded-xl shadow-md">
  <h3 className="text-[#FFD369] text-lg font-bold mb-2">Basic Card</h3>
  <p className="text-[#CCCCCC]">Simple layout with a title and body content.</p>
</div>`,
    },
    {
      label: "Glassmorphism",
      jsx: (
        <div className="backdrop-blur-md bg-[#ffffff0a] border border-[#FFD36933] rounded-xl p-6 transition hover:scale-[1.02]">
          <h3 className="text-[#FFD369] text-lg font-bold mb-2">Glassmorphism</h3>
          <p className="text-[#CCCCCC]">Transparent with blur effect for modern UI.</p>
        </div>
      ),
      code: `<div className="backdrop-blur-md bg-[#ffffff0a] border border-[#FFD36933] rounded-xl p-6">
  <h3 className="text-[#FFD369] text-lg font-bold mb-2">Glassmorphism</h3>
  <p className="text-[#CCCCCC]">Transparent with blur effect for modern UI.</p>
</div>`,
    },
    {
      label: "Icon Card",
      jsx: (
        <div className="bg-[#2E3440] p-6 rounded-xl border border-[#393E46] transition hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-[#FFD369]" />
            <h3 className="text-[#FFD369] text-lg font-bold">Icon Card</h3>
          </div>
          <p className="text-[#CCCCCC]">Highlight info with icons & visuals.</p>
        </div>
      ),
      code: `<div className="bg-[#2E3440] p-6 rounded-xl border border-[#393E46]">
  <div className="flex items-center gap-3 mb-4">
    <Star className="w-6 h-6 text-[#FFD369]" />
    <h3 className="text-[#FFD369] text-lg font-bold">Icon Card</h3>
  </div>
  <p className="text-[#CCCCCC]">Highlight info with icons & visuals.</p>
</div>`,
    },
    {
      label: "Action Card",
      jsx: (
        <div className="bg-[#393E46] p-6 rounded-xl shadow-md transition hover:scale-[1.02]">
          <h3 className="text-[#FFD369] text-lg font-bold mb-2">Card with Actions</h3>
          <p className="text-[#CCCCCC] mb-4">
            Include buttons or toggles for interaction.
          </p>
          <button className="bg-[#FFD369] text-[#222831] px-4 py-1 rounded-full font-semibold hover:bg-yellow-400 transition">
            Action
          </button>
        </div>
      ),
      code: `<div className="bg-[#393E46] p-6 rounded-xl shadow-md">
  <h3 className="text-[#FFD369] text-lg font-bold mb-2">Card with Actions</h3>
  <p className="text-[#CCCCCC] mb-4">Include buttons or toggles for interaction.</p>
  <button className="bg-[#FFD369] text-[#222831] px-4 py-1 rounded-full font-semibold hover:bg-yellow-400 transition">
    Action
  </button>
</div>`,
    },
    {
      label: "Gradient Border",
      jsx: (
        <div className="p-[2px] bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-xl hover:scale-[1.02] transition">
          <div className="bg-[#222831] p-6 rounded-[10px]">
            <h3 className="text-[#FFD369] text-lg font-bold mb-2">Gradient Border</h3>
            <p className="text-[#CCCCCC]">Eye-catching visual with styled border.</p>
          </div>
        </div>
      ),
      code: `<div className="p-[2px] bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-xl">
  <div className="bg-[#222831] p-6 rounded-[10px]">
    <h3 className="text-[#FFD369] text-lg font-bold mb-2">Gradient Border</h3>
    <p className="text-[#CCCCCC]">Eye-catching visual with styled border.</p>
  </div>
</div>`,
    },
    ,
    {
      label: "Image Card",
      jsx: (
        <div className="rounded-xl overflow-hidden shadow-lg transition hover:scale-[1.02] bg-[#2E3440]">
          <img
            src="/images/card-1.jpg"
            alt="Tech"
            className="w-full h-40 object-cover"
          />
          <div className="p-5">
            <h3 className="text-[#FFD369] text-lg font-semibold mb-2">
              Image Card
            </h3>
            <p className="text-[#CCCCCC]">Useful for previews or visual content.</p>
          </div>
        </div>
      ),
      code: `<div className="rounded-xl overflow-hidden shadow-lg bg-[#2E3440]">
  <img src="/images/card-1.jpg" alt="Tech" className="w-full h-40 object-cover" />
  <div className="p-5">
    <h3 className="text-[#FFD369] text-lg font-semibold mb-2">Image Card</h3>
    <p className="text-[#CCCCCC]">Useful for previews or visual content.</p>
  </div>
</div>`,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f25] to-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFD369] drop-shadow mb-2">
            Cards & Layouts
          </h1>
          <p className="text-[#CCCCCC] text-lg">
            Click any card to view and copy its React JSX code.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div key={i} onClick={() => handleClick(card.code)} className="cursor-pointer">
              {card.jsx}
              {selectedCode === card.code && (
                <pre className="text-xs text-[#FFD369] bg-[#1d1f23] p-3 rounded-lg mt-3 shadow-inner whitespace-pre-wrap">
                  {card.code}
                </pre>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
