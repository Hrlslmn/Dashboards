import React from 'react';
import HeaderGreen from '../components/HeaderGreen';

export default function CollectionsPage() {
  const collections = [
    {
      title: "Dark Mode UI Kit",
      description: "Sleek components designed for modern dark-themed apps.",
      image: "https://via.placeholder.com/400x250?text=Dark+Mode+UI+Kit",
    },
    {
      title: "Vintage Manga Tees",
      description: "Classic anime-style t-shirt designs.",
      image: "https://via.placeholder.com/400x250?text=Manga+Tees",
    },
    {
      title: "Startup Brand Boards",
      description: "Modern startup-ready brand kits.",
      image: "https://via.placeholder.com/400x250?text=Brand+Boards",
    },
    {
      title: "Ecommerce Mockups",
      description: "Realistic product mockups for digital stores.",
      image: "https://via.placeholder.com/400x250?text=Mockups",
    },
  ];

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-[#FFD369] mb-4">Design Collections</h1>
        <p className="text-sm text-[#DDDDDD] mb-10">Browse curated design groups—from UI kits to print-ready packs.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((item, idx) => (
            <div key={idx} className="bg-[#393E46] rounded-xl overflow-hidden shadow hover:shadow-2xl hover:scale-[1.02] transition duration-300">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#FFD369] mb-1">{item.title}</h3>
                <p className="text-sm text-[#CCCCCC]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}



