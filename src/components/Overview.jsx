import React, { useEffect } from "react";
import HeaderGreen from "../components/HeaderGreen"; // Assuming this is a pre-styled header
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight, Zap, Eye, Brain } from "lucide-react"; // Example icons

export default function Overview() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, delay: 100 }); // Slight delay for smoother entry
  }, []);

  const insightCardsData = [
    {
      icon: <Zap className="w-10 h-10 text-yellow-400 mb-4" />,
      title: "Generate Ideas Faster",
      text: "From color palettes to layouts, AI helps break creative blocks with instant, tailored suggestions.",
      affiliateLink: "[YOUR_AFFILIATE_LINK_FOR_IDEA_TOOL]",
      affiliateText: "Try [AI Idea Tool Name]",
    },
    {
      icon: <Eye className="w-10 h-10 text-yellow-400 mb-4" />,
      title: "Stay Focused on Vision",
      text: "With repetitive tasks handled by AI, designers can focus on storytelling and brand purpose.",
      affiliateLink: "[YOUR_AFFILIATE_LINK_FOR_AUTOMATION_TOOL]",
      affiliateText: "Explore [AI Automation Tool Name]",
    },
  ];

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
              href="[YOUR_AFFILIATE_LINK_OR_TOOLS_PAGE_HERO]" // <-- AFFILIATE LINK
              target="_blank"
              rel="noopener noreferrer sponsored"
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
          {insightCardsData.map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className="bg-[#222831]/70 backdrop-blur-md p-8 rounded-2xl border border-neutral-700/80 shadow-xl hover:border-yellow-400/70 hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-2 group flex flex-col" // Added flex flex-col
            >
              <div className="flex-grow"> {/* Added flex-grow to push link to bottom if desired, or just let it flow naturally */}
                {item.icon}
                <h3 className="text-2xl text-yellow-400 font-semibold mb-3">{item.title}</h3>
                <p className="text-[#B0B0B0] leading-relaxed">{item.text}</p>
              </div>
              {item.affiliateLink && (
                <a
                  href={item.affiliateLink} // <-- AFFILIATE LINK
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-1 mt-auto pt-4 text-yellow-400 hover:text-yellow-300 font-medium group/link" // Added mt-auto to push to bottom, pt-4 for spacing
                >
                  {item.affiliateText} <ArrowRight size={16} className="transition-transform duration-200 group-hover/link:translate-x-0.5" />
                </a>
              )}
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
                    className="lg:col-span-3 prose prose-custom prose-lg lg:prose-xl prose-headings:text-yellow-400 prose-blockquote:border-l-yellow-400 prose-a:text-yellow-400 hover:prose-a:text-yellow-300" // Ensure prose-a styles are what you want for affiliate links too
                    data-aos="fade-right" data-aos-delay="200"
                >
                    <h3>Collaboration, Not Competition</h3>
                    <p>
                    AI isn't here to compete with humans — it's here to support us. Let AI handle the heavy lifting, like <a href="[YOUR_AFFILIATE_LINK_FOR_REPETITIVE_TASKS_TOOL]" target="_blank" rel="noopener noreferrer sponsored">automating repetitive design tasks</a>, while you bring the emotional and strategic vision to the table.
                    </p>
                    <blockquote>
                    “Great design will always need a human soul — AI simply helps amplify our ideas.”
                    </blockquote>
                    <h3>Key Opportunities for Designers</h3>
                    <ul className="grid gap-x-6 gap-y-3 mt-6 mb-10 sm:grid-cols-2">
                    <li>⚡ Rapid idea-to-prototype turnaround <a href="[YOUR_AFFILIATE_LINK_PROTOTYPING_TOOL]" target="_blank" rel="noopener noreferrer sponsored" className="text-yellow-500 hover:underline">(e.g., [AI Prototyping Tool Name])</a></li>
                    <li>🎨 Endless visual experimentation <a href="[YOUR_AFFILIATE_LINK_VISUAL_AI_TOOL]" target="_blank" rel="noopener noreferrer sponsored" className="text-yellow-500 hover:underline">(with tools like [AI Visual Tool Name])</a></li>
                    <li>📊 Smarter user insights and personalization <a href="[YOUR_AFFILIATE_LINK_ANALYTICS_TOOL]" target="_blank" rel="noopener noreferrer sponsored" className="text-yellow-500 hover:underline">(via [AI Analytics Tool Name])</a></li>
                    <li>🛠️ Tools that scale with your imagination</li>
                    </ul>
                </article>

                <div
                    className="lg:col-span-2 grid grid-cols-2 gap-4 "
                    data-aos="fade-left" data-aos-delay="300"
                >
                    <img src="/images/overview-1.jpg" alt="Abstract AI Neural Network" className="rounded-xl object-cover w-full h-48 sm:h-56 border-2 border-neutral-700 hover:border-yellow-400 transition-all duration-300 shadow-lg hover:scale-105" />
                    <img src="/images/overview-2.jpg" alt="Futuristic Programming Interface" className="rounded-xl object-cover w-full h-48 sm:h-56 border-2 border-neutral-700 hover:border-yellow-400 transition-all duration-300 shadow-lg hover:scale-105" />
                    <img src="/images/overview-3.jpg" alt="Technology and Innovation in Machine Learning" className="col-span-2 rounded-xl object-cover w-full h-48 sm:h-64 border-2 border-neutral-700 hover:border-yellow-400 transition-all duration-300 shadow-lg hover:scale-105" />
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
          <a
            href="[YOUR_AFFILIATE_LINK_TO_COMPREHENSIVE_AI_DESIGN_SUITE_OR_COURSE]" // <-- AFFILIATE LINK
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block mt-6 text-yellow-400 font-semibold hover:text-yellow-300 hover:underline text-lg"
          >
            Explore Top AI Design Tools &rarr;
          </a>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-20 lg:mt-28" data-aos="fade-up" data-aos-delay="100">
          <a
            href="[YOUR_AFFILIATE_LINK_OR_TOOLS_PAGE_FOOTER]" // <-- AFFILIATE LINK
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-3 px-10 py-5 bg-yellow-400 text-[#1A1D24] font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:shadow-yellow-400/50 transform hover:scale-105 group text-lg"
          >
            Start Your AI Journey Now
            <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </div>

        <hr className="my-20 lg:my-28 border-neutral-700/70" />

        <p className="text-center text-sm text-[#9CA3AF]">
          ✨ Curated by the Artifex AI Team © {new Date().getFullYear()} <br />
          <span className="text-xs mt-1 block">
            *Affiliate Disclosure: Some links on this page are affiliate links. If you click and make a purchase, we may earn a commission at no extra cost to you.
          </span>
        </p>
      </main>
      {/* Custom prose styles if needed, or configure in tailwind.config.js */}
      {/* Add a general affiliate disclosure in your site's footer or a dedicated page. */}
      <style jsx global>{`
        .prose-custom ul > li::before {
          background-color: #FBBF24 !important; /* Tailwind amber-400 or similar yellow */
          color: #FBBF24 !important;
        }
        /* Updated li to not use ::before for emoji bullets in article */
        .prose-custom ul > li {
            padding-left: 0; /* Remove padding if you're not using ::before for list marker */
        }
        .prose-custom ul > li::marker { /* Standard list bullets can be colored this way if not using ::before */
            /* color: #FBBF24; */ /* Uncomment if you want to style default bullets */
        }
        .prose-custom blockquote {
          border-left-color: #FBBF24 !important; /* Tailwind amber-400 or similar yellow */
          color: #D1D5DB; /* Tailwind gray-300 */
        }
        .prose-custom strong {
          color: #F9FAFB; /* Tailwind gray-50 */
        }
        .prose-custom a { /* Default styling for links within prose, can be overridden by more specific classes */
            color: #FBBF24; /* Tailwind amber-400 or similar yellow */
            text-decoration: none;
        }
        .prose-custom a:hover {
            text-decoration: underline;
            color: #FDE68A; /* Lighter yellow for hover */
        }
      `}</style>
    </div>
  );
}