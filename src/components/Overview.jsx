import React, { useEffect } from "react";
import HeaderGreen from "../components/HeaderGreen"; // Assuming this is a pre-styled header
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight, Zap, Eye, Brain } from "lucide-react"; // Example icons

export default function Overview() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, delay: 100 }); // Slight delay for smoother entry
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#1A1D24] to-[#222831] text-[#EEEEEE] font-['Inter',sans-serif] overflow-x-hidden">
      <HeaderGreen />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Layout: Side-by-side Hero */}
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
              <div className="relative w-full pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="https://source.unsplash.com/800x450/?abstract,AI,technology" // Thematic poster image
                >
                  {/* Ensure you have a video at this local path or replace with a public URL */}
                  <source src="/images/overview-vid.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* Insight Cards - Refreshed Look */}
        <section className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-28 lg:mb-36">
          {[
            {
              icon: <Zap className="w-10 h-10 text-yellow-400 mb-4" />,
              title: "Generate Ideas Faster",
              text: "From color palettes to layouts, AI helps break creative blocks with instant, tailored suggestions."
            },
            {
              icon: <Eye className="w-10 h-10 text-yellow-400 mb-4" />,
              title: "Stay Focused on Vision",
              text: "With repetitive tasks handled by AI, designers can focus on storytelling and brand purpose."
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

        {/* Article Section + Enhanced Image Gallery */}
        <section className="mb-28 lg:mb-36">
            <div className="text-center mb-16 lg:mb-20">
                <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4" data-aos="fade-up">Design Enhanced by Intelligence</h2>
                <p className="text-lg text-[#CCCCCC] max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                    Artificial Intelligence isn't replacing the creative spark — it's magnifying it. Designers now use tools that analyze patterns, generate unique variations, and simplify workflows.
                </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                <article
                    className="lg:col-span-3 prose prose-custom prose-lg lg:prose-xl prose-headings:text-yellow-400 prose-blockquote:border-l-yellow-400 prose-a:text-yellow-400 hover:prose-a:text-yellow-300"
                    data-aos="fade-right" data-aos-delay="200"
                >
                    <h3>Collaboration, Not Competition</h3>
                    <p>
                    AI isn't here to compete with humans — it's here to support us. Let AI handle the heavy lifting while you bring the emotional and strategic vision to the table.
                    </p>
                    <blockquote>
                    “Great design will always need a human soul — AI simply helps amplify our ideas.”
                    </blockquote>
                    <h3>Key Opportunities for Designers</h3>
                    <ul className="grid gap-x-6 gap-y-3 mt-6 mb-10 sm:grid-cols-2">
                    <li>⚡ Rapid idea-to-prototype turnaround</li>
                    <li>🎨 Endless visual experimentation</li>
                    <li>📊 Smarter user insights and personalization</li>
                    <li>🛠️ Tools that scale with your imagination</li>
                    </ul>
                </article>

                <div
                    className="lg:col-span-2 grid grid-cols-2 gap-4 "
                    data-aos="fade-left" data-aos-delay="300"
                >
                    <img src="images/overview-1.jpg" alt="Abstract AI Neural Network" className="rounded-xl object-cover w-full h-48 sm:h-56 border-2 border-neutral-700 hover:border-yellow-400 transition-all duration-300 shadow-lg hover:scale-105" />
                    <img src="images/overview-2.jpg" alt="Futuristic Programming Interface" className="rounded-xl object-cover w-full h-48 sm:h-56  border-2 border-neutral-700 hover:border-yellow-400 transition-all duration-300 shadow-lg hover:scale-105" />
                    <img src="images/overview-3.jpg" alt="Technology and Innovation in Machine Learning" className="col-span-2 rounded-xl object-cover w-full h-48 sm:h-64 border-2 border-neutral-700 hover:border-yellow-400 transition-all duration-300 shadow-lg hover:scale-105" />
                </div>
            </div>
        </section>


        {/* Stats Banner - More Impactful */}
        <div
          className="bg-gradient-to-r from-yellow-500/10 via-amber-400/10 to-yellow-500/10 backdrop-blur-md mt-28 py-16 px-8 rounded-3xl text-center border border-yellow-500/30 shadow-2xl"
          data-aos="zoom-in-up"
        >
          <Brain className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h3 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200 mb-5">
            Design Smarter, Not Harder
          </h3>
          <p className="text-[#D0D0D0] text-lg sm:text-xl max-w-2xl mx-auto">
            <span className="font-bold text-white">80% of designers</span> using AI tools report faster ideation cycles and significantly higher output satisfaction.*
          </p>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-20 lg:mt-28" data-aos="fade-up" data-aos-delay="100">
          <a
            href="/get-started"
            className="inline-flex items-center gap-3 px-10 py-5 bg-yellow-400 text-[#1A1D24] font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:shadow-yellow-400/50 transform hover:scale-105 group text-lg"
          >
            Start Your AI Journey Now
            <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </div>

        <hr className="my-20 lg:my-28 border-neutral-700/70" />

        <p className="text-center text-sm text-[#9CA3AF]">
          ✨ Curated by the Artifex AI Team © {new Date().getFullYear()}
        </p>
      </main>
      {/* Custom prose styles if needed, or configure in tailwind.config.js */}
      <style jsx global>{`
        .prose-custom ul > li::before {
          background-color: #FFD369 !important; /* Tailwind yellow-400 */
          color: #FFD369 !important; /* Tailwind yellow-400 */
        }
        .prose-custom blockquote {
            border-left-color: #FFD369 !important; /* Tailwind yellow-400 */
            color: #D1D5DB; /* Tailwind gray-300 */
        }
        .prose-custom strong {
            color: #F9FAFB; /* Tailwind gray-50 */
        }
      `}</style>
    </div>
  );
}