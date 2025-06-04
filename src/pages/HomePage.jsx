import React, { useEffect } from "react";
import HeaderGreen from "../components/HeaderGreen"; // Assuming this is a pre-styled header
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight, Zap, Eye, Brain, Rocket, Lightbulb, Wand2, TrendingUp, MessageSquareQuote, Users } from "lucide-react"; // Example icons

export default function Homepage() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, delay: 100 }); // Slight delay for smoother entry
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

  const testimonials = [
    {
      quote: "Artifex AI has revolutionized our workflow. We're producing higher quality designs in a fraction of the time. It's a game-changer!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Placeholder avatar
      name: "Alex Chen",
      title: "Lead Designer, Innovatech",
      aosDelay: "0",
    },
    {
      quote: "The AI-powered suggestions are incredibly insightful. It's like having a creative partner that's available 24/7. Our team's output has soared.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg", // Placeholder avatar
      name: "Sarah Miller",
      title: "Creative Director, StudioFlow",
      aosDelay: "150",
    }
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
                  poster="https://source.unsplash.com/800x450/?abstract,AI,technology,futuristic" // Thematic poster image
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

        {/* Article Section + Enhanced Image Gallery */}
        <section className="mb-28 lg:mb-36">
            <div className="text-center mb-16 lg:mb-20">
                <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4" data-aos="fade-up">Design Enhanced by Intelligence</h2>
                <p className="text-lg text-[#CCCCCC] max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                    Artificial Intelligence isn't replacing the creative spark — it's magnifying it. Designers now use tools that analyze patterns, generate unique variations, and simplify workflows, leading to unprecedented innovation.
                </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                <article
                    className="lg:col-span-3 prose prose-custom prose-lg lg:prose-xl prose-headings:text-yellow-400 prose-blockquote:border-l-yellow-400 prose-a:text-yellow-400 hover:prose-a:text-yellow-300"
                    data-aos="fade-right" data-aos-delay="200"
                >
                    <h3>Collaboration, Not Competition</h3>
                    <p>
                    AI isn't here to compete with humans — it's here to support us. Imagine a tireless assistant that handles the heavy lifting, data analysis, and initial drafts, freeing you to bring the emotional intelligence, strategic vision, and unique human touch to every project.
                    </p>
                    <blockquote>
                    “Great design will always need a human soul — AI simply helps amplify our ideas and reach new creative peaks.”
                    </blockquote>
                    <h3>Key Opportunities Unleashed</h3>
                    <ul className="grid gap-x-6 gap-y-4 mt-6 mb-10 sm:grid-cols-2 not-prose"> {/* Added not-prose to custom style li */}
                        {[
                            { text: "Rapid idea-to-prototype turnaround", icon: "⚡" },
                            { text: "Endless visual experimentation", icon: "🎨" },
                            { text: "Smarter user insights & personalization", icon: "📊" },
                            { text: "Tools that scale with your imagination", icon: "🛠️" },
                            { text: "Automated variant generation", icon: "✨" },
                            { text: "Enhanced accessibility in designs", icon: "♿" }
                        ].map((item, index) => (
                             <li key={index} className="flex items-start p-3 bg-[#283141]/50 rounded-lg border border-neutral-700/60 hover:border-yellow-500/50 transition-colors duration-300">
                                <span className="text-xl mr-3">{item.icon}</span>
                                <span className="text-[#D0D0D0]">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                    <p>
                        The future of design is a synergy between human ingenuity and artificial intelligence. Embrace the tools that empower you to create more effectively and with greater impact.
                    </p>
                </article>

                <div
                    className="lg:col-span-2 grid grid-cols-2 gap-4 "
                    data-aos="fade-left" data-aos-delay="300"
                >
                    <img src="/images/overview-1.jpg" alt="Abstract AI Neural Network" className="rounded-xl object-cover w-full h-48 sm:h-56 border-2 border-neutral-700 hover:border-yellow-400 transition-all duration-300 shadow-lg hover:scale-105" />
                    <img src="/images/overview-2.jpg" alt="Futuristic Programming Interface" className="rounded-xl object-cover w-full h-48 sm:h-56  border-2 border-neutral-700 hover:border-yellow-400 transition-all duration-300 shadow-lg hover:scale-105" />
                    <img src="/images/overview-3.jpg" alt="Technology and Innovation in Machine Learning" className="col-span-2 rounded-xl object-cover w-full h-48 sm:h-64 border-2 border-neutral-700 hover:border-yellow-400 transition-all duration-300 shadow-lg hover:scale-105" />
                </div>
            </div>
        </section>

        {/* New Section: Explore Core AI Features */}
        <section className="mb-28 lg:mb-36">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 mb-4" data-aos="fade-up">
              Unlock Creative Superpowers
            </h2>
            <p className="text-lg text-[#CCCCCC] max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Our AI platform is packed with features designed to augment your creative process, not replace it. Explore how Artifex AI can elevate your work.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {coreFeatures.map((feature, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={feature.aosDelay}
                className="bg-[#1A1D24]/80 backdrop-blur-lg p-8 rounded-2xl border border-neutral-700/70 shadow-xl hover:border-yellow-400/60 hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-2 group flex flex-col items-center text-center"
              >
                {feature.icon}
                <h3 className="text-2xl text-yellow-400 font-semibold mb-3">{feature.title}</h3>
                <p className="text-[#B0B0B0] leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>



        {/* Stats Banner - More Impactful */}
        <div
          className="bg-gradient-to-r from-yellow-500/10 via-amber-400/10 to-yellow-500/10 backdrop-blur-md mt-28 py-16 px-8 rounded-3xl text-center border border-yellow-500/30 shadow-2xl"
          data-aos="zoom-in-up"
        >
          <Brain className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" /> {/* Added subtle pulse animation */}
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
      {/* Custom prose styles if needed, or configure in tailwind.config.js */}
      <style jsx global>{`
        .prose-custom ul > li::before {
          // This might be overridden by direct styling on li elements if 'not-prose' is used on ul
          background-color: #FFD369 !important; /* Tailwind yellow-400 */
          color: #FFD369 !important; /* Tailwind yellow-400 */
        }
        .prose-custom blockquote {
            border-left-color: #FFD369 !important; /* Tailwind yellow-400 */
            color: #D1D5DB; /* Tailwind gray-300 */
            font-style: italic;
        }
        .prose-custom strong {
            color: #F9FAFB; /* Tailwind gray-50 */
        }
        // Additional global styles if absolutely necessary, prefer Tailwind utilities
        .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.7;
                transform: scale(1.05);
            }
        }
      `}</style>
    </div>
  );
}