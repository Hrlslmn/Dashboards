// src/components/DesignCategoryCard.jsx
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function DesignCategoryCard({ item, idx }) {
  return (
    <div
      key={idx}
      data-aos="fade-up"
      data-aos-delay={`${idx * 100}`}
      className={`bg-gradient-to-br ${item.bgColor} backdrop-blur-lg border border-neutral-700/60 rounded-2xl p-6 sm:p-7 md:p-8 shadow-xl ${item.borderColor} transition-all duration-300 ease-in-out group flex flex-col`}
    >
      <div className="flex items-start gap-5 mb-5">
        <div className="mt-1 bg-amber-400/10 p-3.5 rounded-xl group-hover:bg-amber-400/20 group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-300 flex-shrink-0">
          {item.icon}
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-300 group-hover:text-amber-200 transition-colors mb-1.5">
            {item.title}
          </h3>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      <hr className="border-neutral-700/50 my-4 sm:my-5 md:my-6 group-hover:border-amber-500/30 transition-colors duration-300" />

      <div className="flex-grow">
        <h4 className="flex items-center text-base sm:text-lg font-semibold text-sky-400 group-hover:text-sky-300 transition-colors mb-3">
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
  );
}
