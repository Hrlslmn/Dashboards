import React, { useState } from 'react';
import HeaderGreen from '../components/HeaderGreen';
import { Loader2, Rocket } from 'lucide-react';

export default function ButtonsPage() {
  const [selectedCode, setSelectedCode] = useState(null);

  const Tooltip = ({ text, children }) => (
    <div className="relative group w-full text-center">
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#000000cc] text-white text-xs px-3 py-1 rounded-md shadow-md opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none z-20">
        {text}
      </div>
      {children}
    </div>
  );

  const handleClick = (jsxCode) => {
    setSelectedCode(jsxCode);
    navigator.clipboard.writeText(jsxCode);
  };

  const buttons = [
    {
      label: 'Primary',
      text: 'Used for main actions like Submit, Save, etc.',
      className: 'bg-[#FFD369] text-[#222831] hover:bg-yellow-400',
      code: `<button className="bg-[#FFD369] text-[#222831] px-5 py-2 rounded-full hover:bg-yellow-400">Primary</button>`
    },
    {
      label: 'Secondary',
      text: 'Secondary button for less critical actions.',
      className: 'bg-[#393E46] text-white hover:bg-[#4A5058]',
      code: `<button className="bg-[#393E46] text-white px-5 py-2 rounded-full hover:bg-[#4A5058]">Secondary</button>`
    },
    {
      label: 'Icon Button',
      text: 'Button with an icon and label.',
      className: 'flex items-center justify-center gap-2 bg-[#FFD369] text-[#222831] hover:bg-yellow-400',
      icon: <Rocket className="w-4 h-4" />,
      code: `<button className="flex items-center gap-2 bg-[#FFD369] text-[#222831] px-5 py-2 rounded-full hover:bg-yellow-400">
  <Rocket className="w-4 h-4" /> Launch
</button>`
    },
    {
      label: 'Loading...',
      text: 'Button with loading spinner.',
      className: 'flex items-center justify-center gap-2 bg-[#FFD369] text-[#222831] hover:bg-yellow-400',
      icon: <Loader2 className="w-4 h-4 animate-spin" />,
      code: `<button className="flex items-center gap-2 bg-[#FFD369] text-[#222831] px-5 py-2 rounded-full hover:bg-yellow-400">
  <Loader2 className="w-4 h-4 animate-spin" /> Loading...
</button>`
    },
    {
      label: 'Outline',
      text: 'Outline style button with border only.',
      className: 'border border-[#FFD369] text-[#FFD369] bg-transparent hover:bg-[#FFD3691A]',
      code: `<button className="border border-[#FFD369] text-[#FFD369] px-5 py-2 rounded-full bg-transparent hover:bg-[#FFD3691A]">Outline</button>`
    },
    {
      label: 'Glass Effect',
      text: 'Glassmorphism effect using backdrop blur.',
      className: 'bg-[#FFD3691A] backdrop-blur-md border border-[#FFD36940] text-[#FFD369] hover:bg-[#FFD36933]',
      code: `<button className="bg-[#FFD3691A] backdrop-blur-md border border-[#FFD36940] text-[#FFD369] px-6 py-2 rounded-xl hover:bg-[#FFD36933]">Glass Effect</button>`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f25] to-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFD369] drop-shadow mb-2">
            Buttons & UI Controls
          </h1>
          <p className="text-[#CCCCCC] text-lg">
            Click a button to copy its React JSX code.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {buttons.map((btn, index) => (
            <Tooltip text={btn.text} key={index}>
              <div className="space-y-2">
                <button
                  className={`w-full py-2 px-5 rounded-full font-semibold transition-all duration-300 transform hover:scale-[1.03] active:scale-95 ${btn.className}`}
                  onClick={() => handleClick(btn.code)}
                >
                  {btn.icon && btn.icon}
                  {btn.label}
                </button>
                {selectedCode === btn.code && (
                  <pre className="text-xs text-[#FFD369] bg-[#1d1f23] p-3 rounded-lg shadow-inner overflow-auto whitespace-pre-wrap">
                    {btn.code}
                  </pre>
                )}
              </div>
            </Tooltip>
          ))}
        </div>
      </main>
    </div>
  );
}



