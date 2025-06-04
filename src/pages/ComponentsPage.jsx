import React from 'react'; // Removed useEffect as it's no longer needed for AOS
import { Link } from 'react-router-dom';
import HeaderGreen from '../components/HeaderGreen'; // Assuming this path is correct
import {
  Cpu,
  Layers,
  AlertCircle,
  Table2,
  Menu as MenuIcon,
  ArrowRight,
  LayoutDashboard
} from 'lucide-react';
// Removed: import AOS from 'aos';
// Removed: import 'aos/dist/aos.css';

export default function ComponentsPage() {
  // Removed useEffect hook for AOS initialization

  const components = [
    {
      title: "Cards & Layouts",
      desc: "Versatile containers for clear content structure and flow.",
      icon: <Layers className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />,
      link: "/components/cards"
    },
    {
      title: "Modals & Alerts",
      desc: "Engaging pop-ups and notifications with smooth transitions.",
      icon: <AlertCircle className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />,
      link: "/components/modals"
    },
    {
      title: "Landing Pages",
      desc: "Beautifully designed sections for impactful first impressions.",
      icon: <Cpu className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />,
      link: "/components/landing-pages"
    },
    {
      title: "Tables & Lists",
      desc: "Dynamic components to present structured data effectively.",
      icon: <Table2 className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />,
      link: "/components/tables"
    },
    {
      title: "Navigation Elements",
      desc: "Intuitive navbars, tabs, and side menus for seamless UX.",
      icon: <MenuIcon className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />,
      link: "/components/navigation"
    },
    {
      title: "Dashboards",
      desc: "Admin panels and analytics layouts to power decision-making.",
      icon: <LayoutDashboard className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />,
      link: "/dashboards"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#080a0e] via-[#10141a] to-[#07090d] text-[#E6E6E6] font-['Inter',sans-serif] overflow-x-hidden">
      <HeaderGreen />

      {/* Background Glow Effects (Unaffected by AOS removal) */}
      <div className="hidden sm:block absolute -top-72 -left-72 w-[600px] h-[600px] bg-gradient-radial from-amber-500/20 via-amber-500/5 to-transparent blur-[120px] rounded-full animate-pulse-slow" />
      <div className="hidden sm:block absolute -bottom-96 -right-60 w-[700px] h-[700px] bg-gradient-radial from-sky-500/15 via-sky-500/5 to-transparent blur-[120px] rounded-full animate-pulse-slow animation-delay-2000" />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Panel - AOS attributes removed */}
          <div
            className="w-full lg:col-span-5 bg-gradient-to-br from-[#181C22]/80 to-[#20262E]/90 backdrop-blur-lg rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl border border-neutral-700/60"
            // Removed: data-aos="fade-right"
            // Removed: data-aos-duration="1000"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-transparent bg-clip-text mb-8 leading-tight tracking-tighter">
              Component Showcase
            </h1>
            <p className="text-[#B8B8B8] text-lg sm:text-xl leading-relaxed mb-10">
              Explore a curated library of modern, accessible, and beautifully crafted React components designed for speed and reusability.
            </p>
            <div className="mt-8 border-l-4 border-amber-400 pl-5 sm:pl-6">
              <p className="text-md sm:text-lg text-amber-300/90 italic">
                For developers who love clean UI and productive, inspiring workflows.
              </p>
            </div>
            <Link
              to="/themes"
              className="mt-12 inline-flex items-center gap-3 text-amber-400 font-semibold group hover:text-amber-200 transition-colors duration-300 text-lg hover:bg-amber-500/10 px-3 py-2 rounded-lg -ml-3"
            >
              Explore AI Branding Boards <ArrowRight size={22} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>

          {/* Component Cards Container - AOS attributes removed */}
          <div
            className="w-full lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10"
            // Removed: data-aos="fade-left"
            // Removed: data-aos-duration="1000"
            // Removed: data-aos-delay="250"
          >
            {components.map((item, i) => (
              <Link
                to={item.link}
                key={i}
                // Removed: data-aos="zoom-in-up"
                // Removed: data-aos-delay={i * 150 + 400}
                className="group bg-[#1F242C]/70 backdrop-blur-lg border border-neutral-700/50 rounded-2xl p-6 shadow-xl hover:shadow-amber-400/25 hover:border-amber-400/80 transition-all duration-300 ease-in-out transform hover:-translate-y-2.5 hover:scale-[1.04] relative overflow-hidden"
              >
                <div className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-br from-amber-400/20 via-amber-400/10 to-transparent rounded-2xl blur-lg" />
                <div className="relative z-10">
                  <div className="flex items-start gap-x-4 mb-5">
                    <div className="bg-amber-500/15 p-3.5 rounded-xl group-hover:bg-amber-500/25 group-hover:scale-110 group-hover:rotate-[-10deg] transition-all duration-300 ease-out">
                      {item.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-amber-300 group-hover:text-amber-200 transition-colors duration-300 pt-1.5">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(0.97); }
          50% { opacity: 0.3; transform: scale(1.03); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 9s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2.5s;
        }
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 35%, var(--tw-gradient-to) 75%);
        }
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}