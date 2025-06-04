// src/pages/DesignsPage.jsx
import React, { useEffect, lazy, Suspense } from 'react';
import HeaderGreen from '../components/HeaderGreen';
import {
  Shirt, Package, Instagram, FileText
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DesignCategoryCard = lazy(() => import('../components/DesignCategoryCard'));

export default function DesignsPage() {
  useEffect(() => {
    AOS.init({ duration: 400, once: true, easing: 'ease-in-out' });
  }, []);

  const categories = [
    {
      title: "T-Shirt Designs",
      description: "Custom graphics for apparel – anime, streetwear, vintage, and beyond.",
      icon: <Shirt className="w-8 h-8 text-amber-400" />,
      aiAssistance: {
        heading: "AI-Powered Apparel Graphics",
        points: [
          "Generate unique patterns, motifs, and abstract art.",
          "Visualize designs on diverse apparel mockups instantly.",
          "Analyze current fashion trends for fresh, relevant concepts."
        ]
      },
      bgColor: "from-slate-800/70 to-neutral-800/80",
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
    }
  ];

  return (
    <div className="min-h-screen h-full flex flex-col bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0a0c10] text-[#E0E0E0] font-sans overflow-hidden relative">
      <div className="hidden sm:block absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-amber-600/15 via-amber-600/5 to-transparent blur-xl rounded-full animate-pulse-slow pointer-events-none" />
      <div className="hidden sm:block absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-sky-600/15 via-sky-600/5 to-transparent blur-xl rounded-full animate-pulse-slow animation-delay-2000 pointer-events-none" />

      <div className="flex-1 w-full relative z-10">
        <HeaderGreen />
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-10 max-w-7xl mx-auto overflow-hidden">
          <div className="text-center mb-14 sm:mb-20" data-aos="fade-down">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-transparent bg-clip-text mb-5 tracking-tight">
              Graphic Design Ideas
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Explore professional visual design work, enhanced by AI insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            <Suspense fallback={<div className="text-center text-neutral-400">Loading designs...</div>}>
              {categories.map((item, idx) => (
                <DesignCategoryCard key={idx} item={item} idx={idx} />
              ))}
            </Suspense>
          </div>
        </main>
      </div>

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

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







