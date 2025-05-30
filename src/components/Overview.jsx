import React, { useEffect } from "react";
import HeaderGreen from "../components/HeaderGreen"; // ✅ responsive header
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
        {/* Header Section */}
        <section className="text-center mb-16" data-aos="fade-down">
          <span className="text-sm uppercase tracking-widest text-[#FFD369] font-semibold">
            Design & AI
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#EEEEEE] mt-3 drop-shadow-sm">
            The Intersection of <span className="text-[#FFD369]">Design</span> &{" "}
            <span className="text-[#FFD369]">AI</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#CCCCCC] max-w-2xl mx-auto">
            Explore how cutting-edge creativity and machine intelligence are merging to define the next era of user experiences.
          </p>
        </section>

        {/* Hero Image */}
        <div
          className="rounded-2xl overflow-hidden shadow-xl mb-14 border border-[#393E46]"
          data-aos="zoom-in"
        >
          <img
            src="/images/overview-1.jpg"
            alt="Design and AI"
            className="w-full h-60 sm:h-[28rem] object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Article Content */}
        <article
          className="prose prose-invert prose-lg lg:prose-xl max-w-4xl mx-auto prose-headings:text-[#FFD369] prose-blockquote:border-[#FFD369] prose-a:text-[#FFD369]"
          data-aos="fade-up"
        >
          <h2>Design Reinvented by Algorithms</h2>
          <p>
            Artificial Intelligence has revolutionized how designers approach creativity. Instead of starting with a blank canvas, AI can generate countless layout suggestions, color palettes, or even complete brand kits — all based on user behavior or brief input.
          </p>

          <blockquote>
            “Designers won't be replaced by AI — but those who use AI will replace those who don't.”
          </blockquote>

          <h3>Human + Machine = Super Creativity</h3>
          <p>
            The future belongs to creators who embrace tools that enhance their abilities. Think AI-generated illustrations, responsive interfaces built in seconds, and code written from a single design prompt. The possibilities are limitless.
          </p>

          <ul>
            <li>✨ Faster Prototyping</li>
            <li>🎨 Infinite Creative Explorations</li>
            <li>⚙️ Smarter, data-driven UX</li>
          </ul>

          <p>
            As AI continues to learn and adapt, the role of the designer will evolve — from executors to curators of ideas. This synergy marks a golden age of design where inspiration meets automation.
          </p>

          <hr className="my-10 border-[#393E46]" />

          <p className="text-center text-sm text-[#AAAAAA]">
            🧠 Curated by the DevBoard Team • Powered by React + AI • © 2025
          </p>
        </article>
      </main>
    </div>
  );
}



