import React from 'react';
import { Link } from 'react-router-dom';
import HeaderGreen from '../components/HeaderGreen';
import { Cpu, Layers, AlertCircle, Sliders, Table2, Menu } from 'lucide-react';

export default function ComponentsPage() {
  const components = [
    {
      title: "Buttons & UI Controls",
      desc: "Accessible buttons and toggles for seamless UX.",
      icon: <Sliders className="w-6 h-6 text-[#FFD369]" />,
      link: "/components/buttons"
    },
    {
      title: "Cards & Layouts",
      desc: "Versatile containers for clear content structure.",
      icon: <Layers className="w-6 h-6 text-[#FFD369]" />,
      link: "/components/cards"
    },
    {
      title: "Modals & Alerts",
      desc: "Smooth transitions and notification elements.",
      icon: <AlertCircle className="w-6 h-6 text-[#FFD369]" />,
      link: "/components/modals"
    },
    {
      title: "Input Fields & Forms",
      desc: "Validated inputs with modern design.",
      icon: <Cpu className="w-6 h-6 text-[#FFD369]" />,
      link: "/components/forms"
    },
    {
      title: "Tables & Lists",
      desc: "Dynamic components to present structured data.",
      icon: <Table2 className="w-6 h-6 text-[#FFD369]" />,
      link: "/components/tables"
    },
    {
      title: "Navigation Elements",
      desc: "Navbars, tabs, and side menus.",
      icon: <Menu className="w-6 h-6 text-[#FFD369]" />,
      link: "/components/navigation"
    }
  ];

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFD369] drop-shadow-sm mb-3">
            React Components
          </h1>
          <p className="text-[#CCCCCC] text-base sm:text-lg max-w-2xl mx-auto">
            Modern, reusable UI building blocks crafted for speed, consistency, and accessibility.
          </p>
        </div>

        {/* Component Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {components.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className="bg-gradient-to-br from-[#2F3640] to-[#1E1F26] border border-[#393E46] rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 ease-in-out group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#FFD3691A] p-3 rounded-full group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#FFD369]">{item.title}</h3>
              </div>
              <p className="text-[#CCCCCC] text-sm leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}




