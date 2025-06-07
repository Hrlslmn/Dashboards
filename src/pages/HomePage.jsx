import React, { useEffect } from "react";
import HeaderGreen from "../components/HeaderGreen"; // Assuming this is a pre-styled header
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "../../supabaseClient";
import {
  ArrowRight, Zap, Eye, Brain, Rocket, Lightbulb,
  Wand2, TrendingUp
} from "lucide-react"; // Icons

export default function Homepage() {
useEffect(() => {
  const hasLoggedOut = localStorage.getItem('hasLoggedOutOnce');

  if (!hasLoggedOut) {
    const logoutOnFirstVisit = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) await supabase.auth.signOut();
      localStorage.setItem('hasLoggedOutOnce', 'true');
    };

    logoutOnFirstVisit();
  }

  AOS.init({ once: true, duration: 800, delay: 100 });
}, []);


  const coreFeatures = [
    {
      icon: <Lightbulb className="w-12 h-12 text-yellow-400 mb-5" />,
      title: "Intelligent Idea Generation",
      text: "Break through creative ruts with AI-powered brainstorming. Get unique concepts, color palettes, and layout suggestions in seconds.",
      aosDelay: "0",
    },
    {
      icon: <Wand2 className="w-12 h-12 text-yellow-400 mb-5" />,
      title: "Automated Content Creation",
      text: "Generate or refine text, craft stunning visuals, and even produce initial design mockups with our smart AI assistants.",
      aosDelay: "150",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-yellow-400 mb-5" />,
      title: "Predictive Design Analytics",
      text: "Leverage AI to understand user preferences, predict design performance, and make data-driven decisions for impactful results.",
      aosDelay: "300",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#1A1D24] to-[#222831] text-[#EEEEEE] font-['Inter',sans-serif] overflow-x-hidden">
      <HeaderGreen />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* HERO */}
        <section className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-28 lg:mb-36">
          <div data-aos="fade-right" data-aos-duration="1000">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 !leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">
                Empowering Creativity
              </span>
              <br /> with <span className="underline decoration-yellow-400 decoration-4 underline-offset-8">Intelligence</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#CCCCCC] mb-10 leading-relaxed">
              Discover how the fusion of human creativity and artificial intelligence is unlocking new frontiers in design.
              Creators can now do more, faster — and with greater purpose.
            </p>
            <a
              href="/get-started"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-[#1A1D24] font-semibold rounded-full hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/40 transform hover:scale-105 group"
            >
              Start Creating with AI
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-yellow-500/30 hover:border-yellow-400 transition-all duration-300">
              <div className="relative w-full pt-[56.25%]">
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="https://source.unsplash.com/800x450/?abstract,AI,technology,futuristic"
                >
                  <source src="/images/overview-vid.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* INSIGHT CARDS */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-28 lg:mb-36">
          {[
            {
              icon: <Zap className="w-10 h-10 text-yellow-400 mb-4" />,
              title: "Generate Ideas Faster",
              text: "From color palettes to layouts, AI helps break creative blocks with instant, tailored suggestions."
            },
            {
              icon: <Eye className="w-10 h-10 text-yellow-400 mb-4" />,
              title: "Focus on Core Vision",
              text: "With repetitive tasks handled by AI, designers can dedicate more time to storytelling and brand strategy."
            },
            {
              icon: <Rocket className="w-10 h-10 text-yellow-400 mb-4" />,
              title: "Scale Your Creativity",
              text: "Effortlessly adapt designs for multiple platforms and audiences, maintaining consistency and impact."
            }
          ].map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className="bg-[#222831]/70 backdrop-blur-md p-8 rounded-2xl border border-neutral-700/80 shadow-xl hover:border-yellow-400/70 hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {item.icon}
              <h3 className="text-2xl text-yellow-400 font-semibold mb-3">{item.title}</h3>
              <p className="text-[#B0B0B0] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </section>

        {/* FINAL CTA */}
        <div
          className="bg-gradient-to-r from-yellow-500/10 via-amber-400/10 to-yellow-500/10 backdrop-blur-md mt-28 py-16 px-8 rounded-3xl text-center border border-yellow-500/30 shadow-2xl"
          data-aos="zoom-in-up"
        >
          <Brain className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
          <h3 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200 mb-5">
            Design Smarter, Not Harder
          </h3>
          <p className="text-[#D0D0D0] text-lg sm:text-xl max-w-2xl mx-auto">
            <span className="font-bold text-white">80% of designers</span> using AI tools report faster ideation cycles and significantly higher output satisfaction.*
          </p>
          <p className="text-xs text-[#9CA3AF] mt-3">*Based on internal surveys and industry reports.</p>
        </div>

        <hr className="my-20 lg:my-28 border-neutral-700/70" />
        <p className="text-center text-sm text-[#9CA3AF]">
          ✨ Curated by the Code Canverse Team © {new Date().getFullYear()}
        </p>
      </main>
    </div>
  );
}
