import React, { useEffect } from "react";
import HeaderGreen from "../components/HeaderGreen";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Overview() {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      {/* Header */}
      <HeaderGreen />

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 md:px-10 pt-12 pb-20">
        {/* Intro Section */}
        <section className="text-center mb-16" data-aos="fade-down">
          <span className="text-sm uppercase tracking-widest text-[#FFD369] font-semibold">
            Design & AI Synergy
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#EEEEEE] mt-3 drop-shadow-sm">
            Empowering Creativity with{" "}
            <span className="text-[#FFD369]">Intelligence</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#CCCCCC] max-w-2xl mx-auto">
            Discover how the fusion of human creativity and artificial intelligence is unlocking new frontiers in design, enabling creators to do more, faster — and with purpose.
          </p>
        </section>

        {/* Hero Banner */}
        <div
          className="rounded-xl overflow-hidden w-full max-w-5xl mx-auto shadow-lg mb-16 border border-[#393E46]"
          data-aos="zoom-in"
        >
          <div className="relative w-full pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <video
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/images/overview-vid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Insight Cards */}
        <section className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2" data-aos="fade-up">
          <div className="bg-[#2E3440] p-6 rounded-xl shadow-md border border-[#393E46]">
            <h4 className="text-[#FFD369] text-xl font-semibold mb-2">Generate Ideas Faster</h4>
            <p className="text-[#CCCCCC]">From color palettes to layouts, AI helps break creative blocks with instant suggestions.</p>
          </div>
          <div className="bg-[#2E3440] p-6 rounded-xl shadow-md border border-[#393E46]">
            <h4 className="text-[#FFD369] text-xl font-semibold mb-2">Stay Focused on Vision</h4>
            <p className="text-[#CCCCCC]">With repetitive tasks handled by AI, designers can focus on storytelling and brand purpose.</p>
          </div>
        </section>

        {/* Article Content */}
        <article
          className="prose prose-invert prose-lg lg:prose-xl max-w-4xl mx-auto mt-20 prose-headings:text-[#FFD369] prose-blockquote:border-[#FFD369] prose-a:text-[#FFD369]"
          data-aos="fade-up"
        >
          <h2>Design Enhanced by Intelligence</h2>
          <p>
            Artificial Intelligence isn't replacing the creative spark — it's magnifying it. Designers now use tools that analyze patterns, generate unique variations, and simplify workflows.
          </p>

          <h3>Collaboration, Not Competition</h3>
          <p>
            AI isn't here to compete with humans — it's here to support us. Let AI handle the heavy lifting while you bring the emotional and strategic vision to the table.
          </p>

          <blockquote>
            “Great design will always need a human soul — AI simply helps amplify our ideas.”
          </blockquote>

          <h3>Key Opportunities for Designers</h3>
          <ul className="grid gap-4 mt-6 mb-10 sm:grid-cols-2">
            <li>⚡ Rapid idea-to-prototype turnaround</li>
            <li>🎨 Endless visual experimentation</li>
            <li>📊 Smarter user insights and personalization</li>
            <li>🛠️ Tools that scale with your imagination</li>
          </ul>
        </article>

        {/* Image Gallery */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4" data-aos="zoom-in-up">
          <img src="/images/overview-2.jpg" alt="Workflow AI" className="rounded-xl object-cover h-60 w-full border border-[#393E46]" />
          <img src="/images/overview-3.jpg" alt="AI UI" className="rounded-xl object-cover h-60 w-full border border-[#393E46]" />
          <img src="/images/overview-4.jpg" alt="Creative Desk" className="rounded-xl object-cover h-60 w-full border border-[#393E46]" />
        </div>

        {/* Stats Section */}
        <div className="bg-[#2B313A] mt-24 py-10 px-6 rounded-2xl text-center border border-[#393E46]" data-aos="fade-up">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD369] mb-3">Design Smarter, Not Harder</h3>
          <p className="text-[#CCCCCC] text-lg">80% of designers using AI tools report faster ideation and higher output satisfaction.*</p>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <a href="/get-started" className="inline-block px-6 py-3 bg-[#FFD369] text-[#222831] font-semibold rounded-full hover:bg-yellow-400 transition">
            Start Creating with AI
          </a>
        </div>

        <hr className="my-12 border-[#393E46]" />

        <p className="text-center text-sm text-[#AAAAAA]">
          ✨ Curated by the Artifex AI Team © 2025
        </p>
      </main>
    </div>
  );
}



