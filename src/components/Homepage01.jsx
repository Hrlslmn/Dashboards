import React, { useState, useEffect } from "react";
import { Menu, X, Bell, Layers, Users } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-[#f7f6ff] text-[#1e1e2f] font-sans scroll-smooth">
      {/* Header */}
      <header className="flex justify-between items-center px-6 lg:px-20 py-6 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-purple-600 tracking-tight">Mutmiz</h1>
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <a href="#services" className="hover:text-purple-600">Services</a>
          <a href="#how-it-works" className="hover:text-purple-600">How it works</a>
          <a href="#features" className="hover:text-purple-600">Features</a>
          <a href="#agents" className="hover:text-purple-600">Agents</a>
          <a href="#pricing" className="hover:text-purple-600">Pricing</a>
          <a href="#affiliate" className="hover:text-purple-600">Affiliate</a>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow">
          <nav className="flex flex-col space-y-4 text-sm font-medium text-gray-700">
            <a href="#services" className="hover:text-purple-600">Services</a>
            <a href="#how-it-works" className="hover:text-purple-600">How it works</a>
            <a href="#features" className="hover:text-purple-600">Features</a>
            <a href="#agents" className="hover:text-purple-600">Agents</a>
            <a href="#pricing" className="hover:text-purple-600">Pricing</a>
            <a href="#affiliate" className="hover:text-purple-600">Affiliate</a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#ece8ff] to-[#f3f1ff] pt-24 pb-36 text-center overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight" data-aos="fade-down">
          Maximize Your <span className="text-purple-600">Productivity</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto" data-aos="fade-up">
          Organize Your Tasks and Take Control with One Task Manager App
        </p>
        <button className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:scale-105 transition duration-300" data-aos="zoom-in">
          Learn More
        </button>

        {/* App UI Mockup */}
        <div className="mt-16 relative z-10" data-aos="fade-up">
          <div className="mx-auto w-[340px] h-[580px] bg-white/70 backdrop-blur-md rounded-[2rem] border border-purple-200 shadow-2xl p-6 text-left">
            <div className="w-16 h-16 bg-purple-200 rounded-xl mb-4" />
            <h4 className="text-lg font-semibold text-purple-700">Task Dashboard</h4>
            <p className="text-sm text-gray-500 mt-2">Visualize your ongoing tasks and projects effortlessly</p>
            <div className="mt-8 grid gap-4">
              <div className="h-4 w-40 bg-purple-100 rounded" />
              <div className="h-4 w-48 bg-purple-200 rounded" />
              <div className="h-4 w-36 bg-purple-100 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 lg:px-20 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800" data-aos="fade-down">
          Comprehensive <span className="text-purple-600">Feature Set</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            { title: "Current Workflow", desc: "Stay aligned with tasks and progress in real-time.", icon: <Layers className="w-8 h-8 mx-auto text-purple-500 mb-4" /> },
            { title: "Hub View Projects", desc: "Access all projects across your team with one tap.", icon: <Users className="w-8 h-8 mx-auto text-purple-500 mb-4" /> },
            { title: "Smart Notifications", desc: "Timely alerts keep your priorities in check.", icon: <Bell className="w-8 h-8 mx-auto text-purple-500 mb-4" /> },
          ].map(({ title, desc, icon }, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
              data-aos="fade-up"
              data-aos-delay={`${i * 100}`}
            >
              {icon}
              <h4 className="text-lg font-semibold text-purple-700 mb-2">{title}</h4>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center text-sm text-gray-500">
          Used by over <span className="font-bold text-purple-600">100M+</span> teams worldwide
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-500 to-purple-700 text-white text-center rounded-t-[3rem]">
        <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" data-aos="fade-up">
          Ready? Let’s Start with Mutmiz
        </h3>
        <p className="max-w-xl mx-auto mb-8 text-white/80" data-aos="fade-up" data-aos-delay="100">
          And Get Awesome Experience Managing Your Projects & Tasks.
        </p>
        <button className="px-8 py-3 rounded-full bg-white text-purple-700 font-semibold hover:bg-gray-100 transition duration-300" data-aos="zoom-in">
          Get Started
        </button>
      </section>
    </div>
  );
}

