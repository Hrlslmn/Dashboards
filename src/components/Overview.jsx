import React, { useEffect } from "react";
import HeaderGreen from "../components/HeaderGreen";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Overview() {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1d24] via-[#222831] to-[#1a1d24] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Section Layout: Side-by-side */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-6">
              Empowering Creativity
              <br /> with <span className="underline decoration-yellow-400">Intelligence</span>
            </h1>
            <p className="text-lg text-[#CCCCCC] mb-8">
              Discover how the fusion of human creativity and artificial intelligence is unlocking new frontiers in design.
              Creators can now do more, faster — and with greater purpose.
            </p>
            <a
              href="/get-started"
              className="inline-block px-6 py-3 bg-[#FFD369] text-[#222831] font-semibold rounded-full hover:bg-yellow-400 transition duration-300 shadow-md"
            >
              Start Creating with AI
            </a>
          </div>

          <div data-aos="zoom-in">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-[#393E46]">
              <div className="relative w-full pt-[56.25%]">
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/images/overview-vid.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* Insight Cards */}
        <section className="grid md:grid-cols-2 gap-8 mt-24" data-aos="fade-up">
          {[
            {
              title: "Generate Ideas Faster",
              text: "From color palettes to layouts, AI helps break creative blocks with instant suggestions."
            },
            {
              title: "Stay Focused on Vision",
              text: "With repetitive tasks handled by AI, designers can focus on storytelling and brand purpose."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#2F3640]/60 backdrop-blur-lg p-6 rounded-2xl border border-[#393E46] shadow-md hover:shadow-yellow-400/10 transition"
            >
              <h3 className="text-xl text-yellow-400 font-semibold mb-2">{item.title}</h3>
              <p className="text-[#CCCCCC]">{item.text}</p>
            </div>
          ))}
        </section>

        {/* Article Section + Image Gallery */}
        <section className="mt-28 grid lg:grid-cols-2 gap-12 items-start">
          <article
            className="prose prose-invert prose-lg lg:prose-xl prose-headings:text-[#FFD369] prose-blockquote:border-l-[#FFD369] prose-a:text-[#FFD369]"
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
            <ul className="grid gap-3 mt-6 mb-10 sm:grid-cols-2">
              <li>⚡ Rapid idea-to-prototype turnaround</li>
              <li>🎨 Endless visual experimentation</li>
              <li>📊 Smarter user insights and personalization</li>
              <li>🛠️ Tools that scale with your imagination</li>
            </ul>
          </article>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
            data-aos="zoom-in-up"
          >
            <img src="/images/overview-2.jpg" alt="Workflow AI" className="rounded-xl object-cover h-60 w-full border border-[#393E46]" />
            <img src="/images/overview-3.jpg" alt="AI UI" className="rounded-xl object-cover h-60 w-full border border-[#393E46]" />
            <img src="/images/overview-4.jpg" alt="Creative Desk" className="rounded-xl object-cover h-60 w-full border border-[#393E46]" />
          </div>
        </section>

        {/* Stats Banner */}
        <div
          className="bg-[#2B313A]/60 backdrop-blur mt-28 py-12 px-8 rounded-2xl text-center border border-[#393E46] shadow-sm"
          data-aos="fade-up"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD369] mb-4">Design Smarter, Not Harder</h3>
          <p className="text-[#CCCCCC] text-lg">80% of designers using AI tools report faster ideation and higher output satisfaction.*</p>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16" data-aos="fade-up">
          <a
            href="/get-started"
            className="inline-block px-6 py-3 bg-[#FFD369] text-[#222831] font-semibold rounded-full hover:bg-yellow-400 transition duration-300 shadow-md"
          >
            Start Your AI Journey
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




