import React from 'react';
import HeaderGreen from '../components/HeaderGreen';

export default function DesignsPage() {
  const categories = [
    {
      title: "T-Shirt Designs",
      description: "Explore custom-made t-shirt graphics including anime, streetwear, and vintage styles.",
    },
    {
      title: "Product Mockups",
      description: "Showcasing packaging, bottles, and digital product mockups tailored for branding.",
    },
    {
      title: "Social Media Content",
      description: "Instagram posts, stories, and banners designed for visual impact.",
    },
    {
      title: "Print Materials",
      description: "Posters, flyers, and business cards designed with print precision.",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#222831] font-sans text-[#EEEEEE]">
      <div className="flex-1 w-full">
        <HeaderGreen />
        <main className="p-6 pt-28 md:pt-24 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#FFD369] tracking-tight">Graphic Design Library</h1>
            <p className="mt-2 text-[#CCCCCC] text-sm">
              A categorized collection of professional visual design work across different mediums.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {categories.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#393E46] border border-[#2a2f36] rounded-xl p-6 shadow group hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-[#FFD369] mb-2">{item.title}</h3>
                <p className="text-sm text-[#EEEEEE]">{item.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}




