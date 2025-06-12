// src/pages/ResumePortfolioPage.jsx
import React from 'react';
import HeaderGreen from '../components/HeaderGreen';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const points = [
  "Craft compelling professional summaries and bullet points with AI.",
  "Auto-layout experience, education, and projects into modern formats.",
  "Export beautiful, recruiter-ready resumes and portfolios as PDFs.",
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' }
  })
};

export default function ResumePortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300 font-['Inter',sans-serif] relative">
      {/* Glow effects */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-[#64FFDA]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-[#64FFDA]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <HeaderGreen />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-24 pb-20 max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-slate-100 to-[#64FFDA] text-transparent bg-clip-text mb-5 tracking-tight">
            AI Resume & Portfolio Generator
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Generate professional resumes and personal portfolios with AI – ready to export and impress.
          </p>
        </motion.div>

        <div className="space-y-6">
          {points.map((text, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-start gap-4 bg-slate-800/50 border border-slate-700 rounded-xl p-5"
            >
              <FileText className="w-6 h-6 text-[#64FFDA] mt-1" />
              <p className="text-slate-300 text-base">{text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="/resume-builder"
            className="inline-block bg-[#64FFDA] text-slate-900 font-semibold py-3 px-6 rounded-xl hover:bg-[#52e6c6] transition"
          >
            Start Generating Now →
          </a>
        </motion.div>
      </main>

      <style jsx="true" global>{`
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </div>
  );
}
