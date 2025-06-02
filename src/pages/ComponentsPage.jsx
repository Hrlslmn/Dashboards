import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderGreen from '../components/HeaderGreen';
import { Cpu, Layers, AlertCircle, Sliders, Table2, Menu } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ComponentsPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const components = [
    {
      title: "Buttons & UI Controls",
      desc: "Accessible buttons and toggles for seamless UX.",
      icon: <Sliders className="w-6 h-6 text-yellow-400" />,
      link: "/components/buttons"
    },
    {
      title: "Cards & Layouts",
      desc: "Versatile containers for clear content structure.",
      icon: <Layers className="w-6 h-6 text-yellow-400" />,
      link: "/components/cards"
    },
    {
      title: "Modals & Alerts",
      desc: "Smooth transitions and notification elements.",
      icon: <AlertCircle className="w-6 h-6 text-yellow-400" />,
      link: "/components/modals"
    },
    {
      title: "Input Fields & Forms",
      desc: "Validated inputs with modern design.",
      icon: <Cpu className="w-6 h-6 text-yellow-400" />,
      link: "/components/forms"
    },
    {
      title: "Tables & Lists",
      desc: "Dynamic components to present structured data.",
      icon: <Table2 className="w-6 h-6 text-yellow-400" />,
      link: "/components/tables"
    },
    {
      title: "Navigation Elements",
      desc: "Navbars, tabs, and side menus.",
      icon: <Menu className="w-6 h-6 text-yellow-400" />,
      link: "/components/navigation"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#1e1f26] to-[#15161b] text-[#EEEEEE] font-['Inter',sans-serif] overflow-hidden">
      <HeaderGreen />

      {/* Background Glow Effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-400 opacity-10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-300 opacity-10 blur-2xl rounded-full" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Intro Panel */}
          <div
            className="lg:col-span-2 bg-[#2B2E3C]/60 backdrop-blur-lg rounded-3xl p-10 shadow-md border border-yellow-500/10"
            data-aos="fade-right"
          >
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-100 text-transparent bg-clip-text mb-4">
              Component Showcase
            </h1>
            <p className="text-[#BBBBBB] text-md leading-relaxed">
              Explore a growing library of modern and accessible components crafted for speed,
              reusability, and beauty.
            </p>
            <div className="mt-6 border-l-4 border-yellow-400 pl-4 text-sm text-yellow-200 italic">
              Designed for developers who love clean UI and productive workflows.
            </div>
          </div>

          {/* Right Card Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6" data-aos="fade-left">
            {components.map((item, i) => (
              <Link
                to={item.link}
                key={i}
                data-aos="zoom-in"
                data-aos-delay={i * 80}
                className="group bg-[#2B2E3C]/60 backdrop-blur-xl border border-[#444654] rounded-2xl p-6 shadow-md hover:shadow-yellow-300/20 hover:border-yellow-400/30 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.03] relative overflow-hidden"
              >
                {/* Glow highlight */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-yellow-400 opacity-5 blur-2xl rounded-full" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-yellow-400/10 p-3 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-yellow-300">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

