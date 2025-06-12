// src/components/DesignCategoryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function DesignCategoryCard({ item }) {
  return (
    <Link to={item.link}>
      <div
        className={`
          group border rounded-xl p-6 bg-gradient-to-br ${item.bgColor} 
          transition-all duration-300 ease-in-out transform hover:scale-[1.02] 
          ${item.borderColor} hover:shadow-[0_0_0_2px_rgba(100,255,218,0.3)]
        `}
      >
        <div className="flex items-center gap-3 mb-4">
          {item.icon}
          <h3 className="text-xl font-semibold text-white group-hover:text-[#64FFDA] transition-colors duration-200">
            {item.title}
          </h3>
        </div>

        <p className="text-slate-400 text-sm mb-4 group-hover:text-slate-300 transition-colors">
          {item.description}
        </p>

        <div className="text-sm text-slate-300 space-y-1">
          <strong className="block text-white mb-1">{item.aiAssistance.heading}</strong>
          <ul className="list-disc list-inside">
            {item.aiAssistance.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
