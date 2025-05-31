import React from 'react';
import HeaderGreen from '../components/HeaderGreen';
import {
  Shirt,
  Package,
  Instagram,
  FileText,
} from 'lucide-react';

export default function DesignsPage() {
  const categories = [
    {
      title: "T-Shirt Designs",
      description: "Explore custom-made t-shirt graphics including anime, streetwear, and vintage styles.",
      icon: <Shirt className="w-6 h-6 text-[#FFD369]" />,
    },
    {
      title: "Product Mockups",
      description: "Showcasing packaging, bottles, and digital product mockups tailored for branding.",
      icon: <Package className="w-6 h-6 text-[#FFD369]" />,
    },
    {
      title: "Social Media Content",
      description: "Instagram posts, stories, and banners designed for visual impact.",
      icon: <Instagram className="w-6 h-6 text-[#FFD369]" />,
    },
    {
      title: "Print Materials",
      description: "Posters, flyers, and business cards designed with print precision.",
      icon: <FileText className="w-6 h-6 text-[#FFD369]" />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#222831] font-sans text-[#EEEEEE]">
      <div className="flex-1 w-full">
        <HeaderGreen />
        <main className="p-6 pt-28 md:pt-24 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFD369] drop-shadow-sm mb-3">
              Graphic Design Library
            </h1>
            <p className="text-[#CCCCCC] text-base sm:text-lg max-w-2xl mx-auto">
              A categorized collection of professional visual design work across different mediums.
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {categories.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[#2F3640] to-[#1E1F26] border border-[#393E46] rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 ease-in-out group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#FFD3691A] p-3 rounded-full group-hover:scale-110 transition">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#FFD369]">{item.title}</h3>
                </div>
                <p className="text-[#CCCCCC] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}




