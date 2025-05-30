import React from 'react';
import HeaderGreen from '../components/HeaderGreen';

export default function ComponentsPage() {
  const components = [
    { title: "Buttons & UI Controls", desc: "Accessible buttons and toggles for seamless UX." },
    { title: "Cards & Layouts", desc: "Versatile containers for clear content structure." },
    { title: "Modals & Alerts", desc: "Smooth transitions and notification elements." },
    { title: "Input Fields & Forms", desc: "Validated inputs with modern design." },
    { title: "Tables & Lists", desc: "Dynamic components to present structured data." },
    { title: "Navigation Elements", desc: "Navbars, tabs, and side menus." },
  ];

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-[#FFD369] mb-4">React Components</h1>
        <p className="text-sm text-[#DDDDDD] mb-10">Reusable and modern component blocks for scalable development.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((item, i) => (
            <div key={i} className="bg-[#393E46] p-5 rounded-xl hover:shadow-xl transition duration-300">
              <h3 className="text-[#FFD369] text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-[#CCCCCC] text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}



