import React from 'react';
import HeaderGreen from '../components/HeaderGreen';

export default function ThemesPage() {
  const brandingBoards = [
    { title: "Maryan Herbal", image: "/images/board-1.png" },
    { title: "Keyla", image: "/images/board-2.png" },
    { title: "Surf Mania", image: "/images/board-3.png" },
    { title: "Tropicana Treasure", image: "/images/board-4.png" },
    { title: "Miyagi Sushi", image: "/images/board-5.png" },
    { title: "Tropicana Treasures 2", image: "/images/board-6.png" },
  ];

  return (
    <div className="min-h-screen flex bg-[#1A1D23] font-sans text-[#EEEEEE]">
      <div className="flex-1 w-full">
        <HeaderGreen />
        <main className="p-6 pt-28 md:pt-24 max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFD369] tracking-tight">
              AI Branding Boards
            </h1>
            <p className="mt-4 text-[#CCCCCC] text-lg max-w-2xl mx-auto">
              Instantly generate world-class branding kits powered by AI – crafted to make your startup or enterprise look unforgettable.
            </p>
          </div>

          {/* Branding Boards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {brandingBoards.map((board, idx) => (
              <div
                key={idx}
                className="bg-[#2A2F38] rounded-xl overflow-hidden shadow-xl group hover:scale-[1.02] transition-all duration-300"
              >
                <img
                  src={board.image}
                  alt={board.title}
                  className="w-full h-56 object-cover group-hover:brightness-110 transition duration-300"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-[#FFD369]">{board.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Why Branding Matters */}
          <section className="mb-20 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#FFD369] mb-4">Why Branding Matters – Especially Now</h2>
            <p className="text-[#CCCCCC] text-base leading-relaxed mb-6">
              In today’s saturated markets, branding isn’t just a visual layer – it’s your first impression, your story, and your positioning strategy rolled into one.
              Whether you're a nimble startup or an agile business unit within an MNC, having a cohesive brand builds trust, credibility, and memorability at every customer touchpoint.
            </p>
            <ul className="text-left text-[#EEEEEE] text-sm space-y-3 list-disc list-inside">
              <li><strong>Stand out:</strong> Visually differentiate in a crowded digital space.</li>
              <li><strong>Build loyalty:</strong> Consistency builds emotional connection and recognition.</li>
              <li><strong>Close deals faster:</strong> A strong brand accelerates trust in both B2B and B2C settings.</li>
              <li><strong>Raise capital with ease:</strong> Investors back confident, clearly branded visions.</li>
            </ul>
          </section>

          {/* AI Advantage Section */}
          <section className="mb-20 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#FFD369] mb-4">How AI Supercharges Your Design Workflow</h2>
            <p className="text-[#CCCCCC] text-base mb-6">
              Traditional branding takes weeks and thousands of dollars. With our AI engine, you can get polished, pitch-ready branding kits in minutes – with zero design skills required.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-left">
              <div className="bg-[#2A2F38] p-6 rounded-xl shadow-md">
                <h4 className="font-bold text-[#FFD369] mb-2">⚡ Instant Generation</h4>
                <p className="text-[#DDDDDD]">Enter your idea and let AI create logos, palettes, and boards in seconds.</p>
              </div>
              <div className="bg-[#2A2F38] p-6 rounded-xl shadow-md">
                <h4 className="font-bold text-[#FFD369] mb-2">🎯 Brand Consistency</h4>
                <p className="text-[#DDDDDD]">No more mismatched styles. Get cohesive visual systems for all platforms.</p>
              </div>
              <div className="bg-[#2A2F38] p-6 rounded-xl shadow-md">
                <h4 className="font-bold text-[#FFD369] mb-2">💡 Startup-Ready</h4>
                <p className="text-[#DDDDDD]">Perfect for MVP launches, pitch decks, and investor meetings.</p>
              </div>
              <div className="bg-[#2A2F38] p-6 rounded-xl shadow-md">
                <h4 className="font-bold text-[#FFD369] mb-2">🌍 Scales with You</h4>
                <p className="text-[#DDDDDD]">From local businesses to global brands, update or pivot your look instantly.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-[#FFD369] text-[#1A1D23] p-10 rounded-2xl text-center shadow-2xl mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">Design Your Brand in 60 Seconds</h3>
            <p className="text-sm sm:text-base mb-6 max-w-2xl mx-auto">
              Founders, marketers, and designers: jumpstart your next venture with the power of AI. No guesswork, no delays — just pure creative acceleration.
            </p>
            <a
              href="/create"
              className="inline-block bg-[#1A1D23] hover:bg-black text-white font-medium px-6 py-3 rounded-full transition-all"
            >
              🚀 Generate My Brand Kit
            </a>
          </section>

        </main>
      </div>
    </div>
  );
}
