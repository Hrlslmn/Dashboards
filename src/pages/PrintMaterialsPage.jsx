import React from 'react';
import HeaderGreen from '../components/HeaderGreen';
import { motion } from 'framer-motion';

const PrintMaterialsPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="px-4 sm:px-6 lg:px-8 pt-20 pb-20 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold text-[#64FFDA] mb-6"
        >
          Print Materials
        </motion.h1>
        <p className="text-slate-400 mb-8">
          Posters, flyers, and business cards designed with print precision.
        </p>
        <ul className="space-y-4">
          <li className="bg-slate-800 p-4 rounded-lg border border-slate-700">🖋️ Optimize layouts for readability and visual hierarchy.</li>
          <li className="bg-slate-800 p-4 rounded-lg border border-slate-700">🎨 Suggest effective color palettes and typography for print.</li>
          <li className="bg-slate-800 p-4 rounded-lg border border-slate-700">📰 Generate initial drafts and content variations for brochures.</li>
        </ul>
      </main>
    </div>
  );
};

export default PrintMaterialsPage;