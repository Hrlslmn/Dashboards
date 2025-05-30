import React from 'react';
import SidebarGreen from '../components/Sidebar3';

export default function HomePage() {
  return (
    <div className="min-h-screen flex bg-[#e6f0ea] font-['Inter',sans-serif]">
      {/* Sidebar */}
      <SidebarGreen />

      {/* Main Content */}
      <main className="flex-1 px-10 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#3db382]">Welcome to My Design Showcase</h1>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow hover:shadow-lg transition">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="w-9 h-9 rounded-full border-2 border-[#3db382]"
            />
            <span className="font-medium text-[#267554] text-sm">Hairul Sulaiman</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 transition-all hover:shadow-2xl animate-fadeIn">
          <h2 className="text-2xl font-semibold text-[#2f855a] mb-4">About This Site</h2>
          <p className="text-gray-700 mb-6">
              This platform serves as a curated showcase of creative work, featuring modern React components and original graphic designs. It functions as a visual portfolio for developers and designers—designed with precision, styled for elegance, and built to inspire.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#e6f0ea] rounded-lg p-5 shadow hover:bg-[#d2eae0] transition-all duration-300">
              <h3 className="font-bold text-lg text-[#3db382] mb-2">✨ Featured Component</h3>
              <p className="text-sm text-gray-700">Check out my custom animated dashboard UI made with Tailwind and Lucide icons.</p>
            </div>
            <div className="bg-[#e6f0ea] rounded-lg p-5 shadow hover:bg-[#d2eae0] transition-all duration-300">
              <h3 className="font-bold text-lg text-[#3db382] mb-2">🎨 Graphic Design</h3>
              <p className="text-sm text-gray-700">Explore original t-shirt art and posters inspired by anime and streetwear.</p>
            </div>
            <div className="bg-[#e6f0ea] rounded-lg p-5 shadow hover:bg-[#d2eae0] transition-all duration-300">
              <h3 className="font-bold text-lg text-[#3db382] mb-2">⚙️ UI Experiments</h3>
              <p className="text-sm text-gray-700">From dark themes to animated cards, explore unique React UI snippets.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

