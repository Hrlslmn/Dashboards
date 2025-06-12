import React, { lazy, Suspense } from 'react';
import HeaderGreen from '../components/HeaderGreen';
import { motion } from 'framer-motion';
import { Shirt, Instagram, FileText } from 'lucide-react';

// Lazy-load the card for performance
const DesignCategoryCard = lazy(() => import('../components/DesignCategoryCard'));

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function DesignsPage() {
  const categories = [
    {
      title: "T-Shirt Designs",
      description: "Custom graphics for apparel – anime, streetwear, vintage, and beyond.",
      icon: <Shirt className="w-8 h-8 text-[#64FFDA]" />,
      link: "/designs/tshirt", // linked page
      aiAssistance: {
        heading: "AI-Powered Apparel Graphics",
        points: [
          "Generate unique patterns, motifs, and abstract art.",
          "Visualize designs on diverse apparel mockups instantly.",
          "Analyze current fashion trends for fresh, relevant concepts."
        ]
      },
      bgColor: "from-slate-800/50 to-slate-900/50",
      borderColor: "hover:border-[#64FFDA]/80"
    },
    {
      title: "Social Media Content",
      description: "Engaging posts, stories, and banners optimized for visual impact.",
      icon: <Instagram className="w-8 h-8 text-[#64FFDA]" />,
      link: "/designs/socialmedia",
      aiAssistance: {
        heading: "AI for Social Engagement",
        points: [
          "Craft compelling caption ideas and relevant hashtags.",
          "Adapt designs for multiple platform formats automatically.",
          "Produce short video clips or animated graphics from static assets."
        ]
      },
      bgColor: "from-slate-800/50 to-slate-900/50",
      borderColor: "hover:border-[#64FFDA]/80"
    },
    {
      title: "Print Materials",
      description: "Posters, flyers, and business cards designed with print precision.",
      icon: <FileText className="w-8 h-8 text-[#64FFDA]" />,
      link: "/designs/print",
      aiAssistance: {
        heading: "Smarter Print Design",
        points: [
          "Optimize layouts for readability and visual hierarchy.",
          "Suggest effective color palettes and typography for print.",
          "Generate initial drafts and content variations for brochures."
        ]
      },
      bgColor: "from-slate-800/50 to-slate-900/50",
      borderColor: "hover:border-[#64FFDA]/80"
    },
    {
      title: "Resume & Portfolio",
      description: "Generate polished resumes and portfolio PDFs with AI-powered summaries and layout suggestions.",
      icon: <FileText className="w-8 h-8 text-[#64FFDA]" />,
      link: "/resume-builder",
      aiAssistance: {
        heading: "AI Resume & Portfolio Generator",
        points: [
          "Craft compelling professional summaries and experience blurbs.",
          "Auto-layout structured content into export-ready formats.",
          "Download beautiful, recruiter-friendly PDF resumes and portfolios."
        ]
      },
      bgColor: "from-slate-800/50 to-slate-900/50",
      borderColor: "hover:border-[#64FFDA]/80"
    }
  ];

  return (
    <div className="min-h-screen h-full flex flex-col bg-slate-900 text-slate-300 font-['Inter',sans-serif] overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-[#64FFDA]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-[#64FFDA]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="flex-1 w-full relative z-10">
        <HeaderGreen />
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14 sm:mb-20"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-100 to-[#64FFDA] text-transparent bg-clip-text mb-5 tracking-tight">
              AI-Powered Design Studio
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Explore professional visual design categories, each enhanced with powerful AI-driven tools to spark your creativity.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Suspense fallback={<div className="text-center text-slate-400 col-span-full">Loading designs...</div>}>
              {categories.map((item, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <DesignCategoryCard item={item} />
                </motion.div>
              ))}
            </Suspense>
          </motion.div>
        </main>
      </div>

      {/* Gradient utility style */}
      <style jsx global>{`
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </div>
  );
}
