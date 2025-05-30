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

          {/* AI-Generated Banner */}
          <div
            className="rounded-xl overflow-hidden w-[70%] h-auto justify-self-center shadow-lg mb-12 border border-[#393E46]"
            data-aos="zoom-in"
          >
            <img
              src="/images/overview-1.jpg"
              alt="AI Design Banner"
              className="w-full h-40 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>


        {/* Article Content */}
        <article
          className="prose prose-invert prose-lg lg:prose-xl max-w-4xl mx-auto prose-headings:text-[#FFD369] prose-blockquote:border-[#FFD369] prose-a:text-[#FFD369]"
          data-aos="fade-up"
        >
          <h2>Design Enhanced by Intelligence</h2>
          <p>
            Artificial Intelligence isn't replacing the creative spark — it's magnifying it. Today, designers have tools that analyze patterns, generate unique variations, and offer assistance in ways that make the creative process more efficient and meaningful.
          </p>

          <h3>Collaboration, Not Competition</h3>
          <p>
            The rise of AI in design isn't about replacing human touch. Instead, it's about collaboration — where AI acts as a partner, offering suggestions, performing repetitive tasks, and letting designers focus on what truly matters: storytelling, vision, and emotion.
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

          <p>
            As we enter a new era of design, those who embrace AI are finding themselves empowered with tools that stretch the limits of creativity. It's no longer about choosing between tradition and innovation — it's about blending both to design experiences that matter.
          </p>

          {/* Closing Section */}
          <div className="mt-16 text-center">
            <h3 className="text-[#FFD369] text-2xl font-bold mb-2">
              Ready to create with confidence?
            </h3>
            <p className="text-[#CCCCCC] text-lg">
              Embrace the tools, lead with vision, and shape the future of design — one intelligent idea at a time.
            </p>
          </div>

          <hr className="my-12 border-[#393E46]" />

          <p className="text-center text-sm text-[#AAAAAA]">
            ✨ Curated by the DevBoard Team • Powered by React + AI • © 2025
          </p>
        </article>
      </main>
    </div>
  );
}



