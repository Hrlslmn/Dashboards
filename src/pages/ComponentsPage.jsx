import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderGreen from '../components/HeaderGreen';
import {
  Cpu,
  Layers,
  AlertCircle,
  Sliders,
  Table2,
  Menu as MenuIcon,
  ArrowRight
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ComponentsPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      delay: 100,
      // disable: 'phone' // Uncomment this if animations cause mobile issues
    });
  }, []);

  const components = [
    {
      title: "Buttons & UI Controls",
      desc: "Accessible buttons and toggles for seamless UX.",
      icon: <Sliders className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors" />,
      link: "/components/buttons"
    },
    {
      title: "Cards & Layouts",
      desc: "Versatile containers for clear content structure.",
      icon: <Layers className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors" />,
      link: "/components/cards"
    },
    {
      title: "Modals & Alerts",
      desc: "Smooth transitions and notification elements.",
      icon: <AlertCircle className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors" />,
      link: "/components/modals"
    },
    {
      title: "Input Fields & Forms",
      desc: "Validated inputs with modern design.",
      icon: <Cpu className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors" />,
      link: "/components/forms"
    },
    {
      title: "Tables & Lists",
      desc: "Dynamic components to present structured data.",
      icon: <Table2 className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors" />,
      link: "/components/tables"
    },
    {
      title: "Navigation Elements",
      desc: "Navbars, tabs, and side menus.",
      icon: <MenuIcon className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors" />,
      link: "/components/navigation"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#E0E0E0] font-['Inter',sans-serif] overflow-x-hidden">
      <HeaderGreen />

      {/* Background Glow Effects - hidden on mobile */}
      <div className="hidden sm:block absolute -top-60 -left-60 w-[500px] h-[500px] bg-gradient-radial from-amber-500/20 via-amber-500/5 to-transparent blur-3xl rounded-full animate-pulse-slow" />
      <div className="hidden sm:block absolute -bottom-80 -right-40 w-[600px] h-[600px] bg-gradient-radial from-sky-500/15 via-sky-500/5 to-transparent blur-3xl rounded-full animate-pulse-slow animation-delay-2000" />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Panel */}
          <div
            className="w-full lg:col-span-5 bg-gradient-to-br from-[#1A1D24]/70 to-[#222831]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-neutral-700/70"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-transparent bg-clip-text mb-6 leading-tight tracking-tight">
              Component Showcase
            </h1>
            <p className="text-[#B0B0B0] text-base sm:text-lg leading-relaxed mb-8">
              Explore a curated library of modern, accessible, and beautifully crafted React components designed for speed and reusability.
            </p>
            <div className="mt-6 border-l-4 border-amber-500 pl-4 sm:pl-6">
              <p className="text-sm sm:text-md text-amber-300/90 italic">
                For developers who love clean UI and productive, inspiring workflows.
              </p>
            </div>
            <Link
              to="/themes"
              className="mt-10 inline-flex items-center gap-2.5 text-amber-400 font-semibold group hover:text-amber-300 transition-colors"
            >
              Explore AI Branding Boards <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Component Cards */}
          <div
            className="w-full lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            {components.map((item, i) => (
              <Link
                to={item.link}
                key={i}
                data-aos="zoom-in-up"
                data-aos-delay={i * 100}
                className="group bg-neutral-800/50 backdrop-blur-2xl border border-neutral-700/80 rounded-2xl p-6 shadow-xl hover:shadow-amber-500/20 hover:border-amber-500/50 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-[1.03] relative overflow-hidden"
              >
                <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl blur-md" />
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-amber-400/10 p-3.5 rounded-xl group-hover:bg-amber-400/20 group-hover:scale-110 group-hover:rotate-[-8deg] transition-all duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-amber-300 group-hover:text-amber-200 transition-colors pt-1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(0.95); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 30%, var(--tw-gradient-to) 70%);
        }
      `}</style>
    </div>
  );
}
