import React, { useEffect } from 'react';
import HeaderGreen from '../components/HeaderGreen'; // Assuming this is your styled header
import {
  Shirt,
  Package,
  Instagram,
  FileText,
  Sparkles, // Icon for AI sections
  ArrowRight
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function DesignsPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, delay: 100 });
  }, []);

  const categories = [
    {
      title: "T-Shirt Designs",
      description: "Custom graphics for apparel – anime, streetwear, vintage, and beyond.",
      icon: <Shirt className="w-8 h-8 text-amber-400" />, // Slightly larger icon
      aiAssistance: {
        heading: "AI-Powered Apparel Graphics",
        points: [
          "Generate unique patterns, motifs, and abstract art.",
          "Visualize designs on diverse apparel mockups instantly.",
          "Analyze current fashion trends for fresh, relevant concepts."
        ]
      },
      bgColor: "from-slate-800/70 to-neutral-800/80", // Custom bg per card
      borderColor: "hover:border-pink-500/70"
    },
    {
      title: "Product Mockups",
      description: "Realistic showcases for packaging, bottles, and digital products.",
      icon: <Package className="w-8 h-8 text-amber-400" />,
      aiAssistance: {
        heading: "Intelligent Mockup Generation",
        points: [
          "Automate design placement onto various 3D models.",
          "Generate realistic scenes, lighting, and shadows.",
          "Create multiple high-fidelity variations rapidly."
        ]
      },
      bgColor: "from-slate-800/70 to-neutral-800/80",
      borderColor: "hover:border-sky-500/70"
    },
    {
      title: "Social Media Content",
      description: "Engaging posts, stories, and banners optimized for visual impact.",
      icon: <Instagram className="w-8 h-8 text-amber-400" />,
      aiAssistance: {
        heading: "AI for Social Engagement",
        points: [
          "Craft compelling caption ideas and relevant hashtags.",
          "Adapt designs for multiple platform formats automatically.",
          "Produce short video clips or animated graphics from static assets."
        ]
      },
      bgColor: "from-slate-800/70 to-neutral-800/80",
      borderColor: "hover:border-purple-500/70"
    },
    {
      title: "Print Materials",
      description: "Posters, flyers, and business cards designed with print precision.",
      icon: <FileText className="w-8 h-8 text-amber-400" />,
      aiAssistance: {
        heading: "Smarter Print Design",
        points: [
          "Optimize layouts for readability and visual hierarchy.",
          "Suggest effective color palettes and typography for print.",
          "Generate initial drafts and content variations for brochures."
        ]
      },
      bgColor: "from-slate-800/70 to-neutral-800/80",
      borderColor: "hover:border-teal-500/70"
    },
  ];

  return (
    // Added overflow-x-hidden here
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0a0c10] text-[#E0E0E0] font-sans overflow-x-hidden">
      {/* Background Glow Effects */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-amber-600/15 via-amber-600/5 to-transparent blur-3xl rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-sky-600/15 via-sky-600/5 to-transparent blur-3xl rounded-full animate-pulse-slow animation-delay-2000 pointer-events-none" />
      
      <div className="flex-1 w-full relative z-10">
        <HeaderGreen />
        <main className="px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16 md:pb-24 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-20" data-aos="fade-down">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-transparent bg-clip-text mb-5 !leading-tight tracking-tight">
              Graphic Design Library
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Explore professional visual design work, enhanced by AI insights. Discover how intelligent tools are reshaping creative workflows across different mediums.
            </p>
          </div>

          {/* Category "Blog" Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {categories.map((item, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={`${idx * 100}`}
                className={`bg-gradient-to-br ${item.bgColor} backdrop-blur-lg border border-neutral-700/60 rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-amber-500/15 ${item.borderColor} transition-all duration-300 ease-in-out group flex flex-col`}
              >
                {/* Top section with icon and original description */}
                <div className="flex items-start gap-5 mb-5">
                  <div className="mt-1 bg-amber-400/10 p-3.5 rounded-xl group-hover:bg-amber-400/20 group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-300 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-amber-300 group-hover:text-amber-200 transition-colors mb-1.5">{item.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-neutral-700/50 my-5 md:my-6 group-hover:border-amber-500/30 transition-colors duration-300" />

                {/* AI Assistance Section */}
                <div className="flex-grow">
                  <h4 className="flex items-center text-md md:text-lg font-semibold text-sky-400 group-hover:text-sky-300 transition-colors mb-3">
                    <Sparkles className="w-5 h-5 mr-2.5 text-sky-500" />
                    {item.aiAssistance.heading}
                  </h4>
                  <ul className="space-y-2.5 text-sm text-neutral-400/90">
                    {item.aiAssistance.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-amber-500 mr-2.5 mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
       <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: scale(0.9); }
          50% { opacity: 0.15; transform: scale(1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2.5s; 
        }
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 30%, var(--tw-gradient-to) 70%);
        }
      `}</style>
    </div>
  );
}



