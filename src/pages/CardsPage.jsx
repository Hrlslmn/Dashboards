import React, { useState } from "react";
import { Star, ClipboardCopy, Check } from "lucide-react";
import HeaderGreen from "../components/HeaderGreen";

export default function CardsPage() {
  const [selectedCode, setSelectedCode] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleToggleCode = (index, code) => {
    if (selectedCode === index) {
      setSelectedCode(null);
    } else {
      setSelectedCode(index);
      navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    }
  };

  const cards = [
    {
      label: "Basic Card",
      jsx: (
        <div className="bg-[#393E46] p-6 rounded-xl shadow-md transition hover:scale-[1.02]">
          <h3 className="text-[#FFD369] text-lg font-bold mb-2">
            Basic Card
          </h3>
          <p className="text-[#CCCCCC]">
            Simple layout with a title and body content.
          </p>
        </div>
      ),
      code: `<div className="bg-[#393E46] p-6 rounded-xl shadow-md">
  <h3 className="text-[#FFD369] text-lg font-bold mb-2">Basic Card</h3>
  <p className="text-[#CCCCCC]">Simple layout with a title and body content.</p>
</div>`,
    },
    {
  label: "App Feature",
  jsx: (
    <div className="bg-[#2E3440] p-4 rounded-xl text-left shadow-sm border border-[#3B4252] sm:p-6">
      <h3 className="text-[#FFD369] font-semibold text-base mb-1">Offline Mode</h3>
      <p className="text-[#CCCCCC] text-sm">Access your content even without internet connection.</p>
    </div>
  ),
  code: `<div className="bg-[#2E3440] p-4 rounded-xl text-left shadow-sm border border-[#3B4252] sm:p-6">
  <h3 className="text-[#FFD369] font-semibold text-base mb-1">Offline Mode</h3>
  <p className="text-[#CCCCCC] text-sm">Access your content even without internet connection.</p>
</div>`,
},
    {
      label: "Icon Card",
      jsx: (
        <div className="bg-[#2E3440] p-6 rounded-xl border border-[#393E46] transition hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-[#FFD369]" />
            <h3 className="text-[#FFD369] text-lg font-bold">Icon Card</h3>
          </div>
          <p className="text-[#CCCCCC]">
            Highlight info with icons & visuals.
          </p>
        </div>
      ),
      code: `<div className="bg-[#2E3440] p-6 rounded-xl border border-[#393E46]">
  <div className="flex items-center gap-3 mb-4">
    <Star className="w-6 h-6 text-[#FFD369]" />
    <h3 className="text-[#FFD369] text-lg font-bold">Icon Card</h3>
  </div>
  <p className="text-[#CCCCCC]">Highlight info with icons & visuals.</p>
</div>`,
    },
    {
      label: "Action Card",
      jsx: (
        <div className="bg-[#393E46] p-6 rounded-xl shadow-md transition hover:scale-[1.02]">
          <h3 className="text-[#FFD369] text-lg font-bold mb-2">
            Card with Actions
          </h3>
          <p className="text-[#CCCCCC] mb-4">
            Include buttons or toggles for interaction.
          </p>
          <button className="bg-[#FFD369] text-[#222831] px-4 py-1 rounded-full font-semibold hover:bg-yellow-400 transition">
            Action
          </button>
        </div>
      ),
      code: `<div className="bg-[#393E46] p-6 rounded-xl shadow-md">
  <h3 className="text-[#FFD369] text-lg font-bold mb-2">Card with Actions</h3>
  <p className="text-[#CCCCCC] mb-4">Include buttons or toggles for interaction.</p>
  <button className="bg-[#FFD369] text-[#222831] px-4 py-1 rounded-full font-semibold hover:bg-yellow-400 transition">
    Action
  </button>
</div>`,
    },
    {
      label: "Gradient Border",
      jsx: (
        <div className="p-[2px] bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-xl hover:scale-[1.02] transition">
          <div className="bg-[#222831] p-6 rounded-[10px]">
            <h3 className="text-[#FFD369] text-lg font-bold mb-2">
              Gradient Border
            </h3>
            <p className="text-[#CCCCCC]">
              Eye-catching visual with styled border.
            </p>
          </div>
        </div>
      ),
      code: `<div className="p-[2px] bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-xl">
  <div className="bg-[#222831] p-6 rounded-[10px]">
    <h3 className="text-[#FFD369] text-lg font-bold mb-2">Gradient Border</h3>
    <p className="text-[#CCCCCC]">Eye-catching visual with styled border.</p>
  </div>
</div>`,
    },
    {
      label: "Image Card",
      jsx: (
        <div className="rounded-xl overflow-hidden shadow-lg transition hover:scale-[1.02] bg-[#2E3440]">
          <img
            src="/images/card-1.jpg"
            alt="Tech"
            className="w-full h-40 object-cover"
          />
          <div className="p-5">
            <h3 className="text-[#FFD369] text-lg font-semibold mb-2">
              Image Card
            </h3>
            <p className="text-[#CCCCCC]">
              Useful for previews or visual content.
            </p>
          </div>
        </div>
      ),
      code: `<div className="rounded-xl overflow-hidden shadow-lg bg-[#2E3440]">
  <img src="/images/card-1.jpg" alt="Tech" className="w-full h-40 object-cover" />
  <div className="p-5">
    <h3 className="text-[#FFD369] text-lg font-semibold mb-2">Image Card</h3>
    <p className="text-[#CCCCCC]">Useful for previews or visual content.</p>
  </div>
</div>`,
    },
    {
      label: "Neon Glow Card",
      jsx: (
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <div className="relative bg-[#222831] p-6 rounded-lg leading-none">
            <h3 className="text-[#FFD369] text-lg font-bold mb-2">
              Neon Glow Card
            </h3>
            <p className="text-[#CCCCCC]">
              A card with a cool neon glow effect on hover.
            </p>
          </div>
        </div>
      ),
      code: `<div className="relative group">
  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
  <div className="relative bg-[#222831] p-6 rounded-lg leading-none">
    <h3 className="text-[#FFD369] text-lg font-bold mb-2">Neon Glow Card</h3>
    <p className="text-[#CCCCCC]">A card with a cool neon glow effect on hover.</p>
  </div>
</div>`,
    },
    {
      label: "Animated Border Card",
      jsx: (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gray-900 ring-1 ring-gray-900/5 rounded-lg leading-none p-6">
            <h3 className="text-[#FFD369] text-lg font-bold mb-2">
              Animated Border
            </h3>
            <p className="text-[#CCCCCC]">
              A card with an animated border that appears on hover.
            </p>
          </div>
        </div>
      ),
      code: `<div className="relative group">
  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
  <div className="relative bg-gray-900 ring-1 ring-gray-900/5 rounded-lg leading-none p-6">
    <h3 className="text-[#FFD369] text-lg font-bold mb-2">Animated Border</h3>
    <p className="text-[#CCCCCC]">A card with an animated border that appears on hover.</p>
  </div>
</div>`,
    },
    {
      label: "Interactive Shadow Card",
      jsx: (
        <div className="bg-[#2E3440] p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/50 transition-shadow duration-300">
          <h3 className="text-[#FFD369] text-lg font-bold mb-2">
            Interactive Shadow
          </h3>
          <p className="text-[#CCCCCC]">
            A card with a shadow that grows and changes color on hover.
          </p>
        </div>
      ),
      code: `<div className="bg-[#2E3440] p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/50 transition-shadow duration-300">
  <h3 className="text-[#FFD369] text-lg font-bold mb-2">Interactive Shadow</h3>
  <p className="text-[#CCCCCC]">A card with a shadow that grows and changes color on hover.</p>
</div>`,
    },
    {
  label: "Glow Grid Card",
  jsx: (
    <div className="relative bg-[#111827] p-6 rounded-xl shadow-xl overflow-hidden group transition hover:scale-[1.02]">
      <div className="absolute inset-0 bg-[radial-gradient(#FFD36933_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      <div className="relative z-10">
        <h3 className="text-[#FFD369] text-lg font-bold mb-2">Glow Grid</h3>
        <p className="text-[#CCCCCC]">Patterned layout with glowing dots.</p>
      </div>
    </div>
  ),
  code: `<div className="relative bg-[#111827] p-6 rounded-xl shadow-xl overflow-hidden group">
  <div className="absolute inset-0 bg-[radial-gradient(#FFD36933_1px,transparent_1px)] bg-[size:20px_20px]"></div>
  <div className="relative z-10">
    <h3 className="text-[#FFD369] text-lg font-bold mb-2">Glow Grid</h3>
    <p className="text-[#CCCCCC]">Patterned layout with glowing dots.</p>
  </div>
</div>`,
},
{
  label: "Floating Label Card",
  jsx: (
    <div className="bg-[#2E3440] p-6 rounded-lg relative shadow-md transition hover:scale-[1.02]">
      <div className="absolute -top-3 left-4 bg-[#FFD369] text-[#222831] text-xs px-3 py-0.5 rounded-full font-semibold shadow">
        NEW
      </div>
      <h3 className="text-[#FFD369] text-lg font-bold mb-2">Floating Label</h3>
      <p className="text-[#CCCCCC]">This card features a floating label tag for emphasis.</p>
    </div>
  ),
  code: `<div className="bg-[#2E3440] p-6 rounded-lg relative shadow-md">
  <div className="absolute -top-3 left-4 bg-[#FFD369] text-[#222831] text-xs px-3 py-0.5 rounded-full font-semibold shadow">
    NEW
  </div>
  <h3 className="text-[#FFD369] text-lg font-bold mb-2">Floating Label</h3>
  <p className="text-[#CCCCCC]">This card features a floating label tag for emphasis.</p>
</div>`,
},
{
  label: "Terminal Style Card",
  jsx: (
    <div className="bg-[#1A1A1D] text-[#00FF00] font-mono p-6 rounded-lg border border-[#00FF00] transition hover:scale-[1.02]">
      <h3 className="text-lg font-bold mb-2">Terminal Log</h3>
      <p>~/projects/ai-code $ npm start</p>
      <p className="text-[#CCCCCC]"> Compiling... done!</p>
    </div>
  ),
  code: `<div className="bg-[#1A1A1D] text-[#00FF00] font-mono p-6 rounded-lg border border-[#00FF00]">
  <h3 className="text-lg font-bold mb-2">Terminal Log</h3>
  <p>~/projects/ai-code $ npm start</p>
  <p className="text-[#CCCCCC]">&gt; Compiling... done!</p>
</div>`,
},
{
  label: "Retro Pixel",
  jsx: (
    <div className="bg-[#1A1A1A] border-2 border-dashed border-[#FFD369] text-[#00FF00] font-mono text-sm p-6 rounded-lg transition hover:scale-[1.02]">
      <h3 className="text-lg mb-2">8-Bit Retro</h3>
      <p>Pixel-style nostalgia for retro fans 🎮</p>
    </div>
  ),
  code: `<div className="bg-[#1A1A1A] border-2 border-dashed border-[#FFD369] text-[#00FF00] font-mono text-sm p-6 rounded-lg">
  <h3 className="text-lg mb-2">8-Bit Retro</h3>
  <p>Pixel-style nostalgia for retro fans 🎮</p>
</div>`,
},
{
  label: "Matrix Code",
  jsx: (
    <div className="relative bg-[#0F0F0F] text-[#00FF00] font-mono p-6 rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition">
      <div className="absolute inset-0 opacity-20 animate-pulse bg-[linear-gradient(to_bottom,#00ff00_20%,transparent_20%,transparent_80%,#00ff00_80%)] bg-[length:100%_10px]"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-2">Matrix Mode</h3>
        <p>Enter the green stream of code.</p>
      </div>
    </div>
  ),
  code: `<div className="relative bg-[#0F0F0F] text-[#00FF00] font-mono p-6 rounded-xl overflow-hidden">
  <div className="absolute inset-0 opacity-20 animate-pulse bg-[linear-gradient(to_bottom,#00ff00_20%,transparent_20%,transparent_80%,#00ff00_80%)] bg-[length:100%_10px]"></div>
  <div className="relative z-10">
    <h3 className="text-lg font-bold mb-2">Matrix Mode</h3>
    <p>Enter the green stream of code.</p>
  </div>
</div>`,
},
{
  label: "Mirror Glass",
  jsx: (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 text-white hover:scale-[1.02] transition">
      <h3 className="text-lg font-bold mb-2">Mirror Glass</h3>
      <p className="text-sm text-white/70">Sleek, frosted mirror-like interface.</p>
    </div>
  ),
  code: `<div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 text-white">
  <h3 className="text-lg font-bold mb-2">Mirror Glass</h3>
  <p className="text-sm text-white/70">Sleek, frosted mirror-like interface.</p>
</div>`,
},
{
  label: "Secure Vault",
  jsx: (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 shadow-inner hover:scale-[1.02] transition">
      <h3 className="text-[#FFD369] text-lg font-bold mb-2">Vault Lock</h3>
      <p className="text-gray-300">Protect sensitive UI sections like a pro.</p>
    </div>
  ),
  code: `<div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 shadow-inner">
  <h3 className="text-[#FFD369] text-lg font-bold mb-2">Vault Lock</h3>
  <p className="text-gray-300">Protect sensitive UI sections like a pro.</p>
</div>`,
},
{
  label: "Pulsing Icon",
  jsx: (
    <div className="bg-[#2E3440] p-6 rounded-xl shadow-md transition hover:scale-[1.03] flex items-start gap-4">
      <div className="relative">
        <div className="w-10 h-10 bg-[#FFD369] rounded-full flex items-center justify-center animate-pulse shadow-lg">
          <Star className="w-5 h-5 text-[#222831]" />
        </div>
      </div>
      <div>
        <h3 className="text-[#FFD369] text-lg font-bold mb-1">Highlight</h3>
        <p className="text-[#CCCCCC] text-sm">Icon pulses with attention-grabbing motion.</p>
      </div>
    </div>
  ),
  code: `<div className="bg-[#2E3440] p-6 rounded-xl shadow-md flex items-start gap-4">
  <div className="relative">
    <div className="w-10 h-10 bg-[#FFD369] rounded-full flex items-center justify-center animate-pulse shadow-lg">
      <Star className="w-5 h-5 text-[#222831]" />
    </div>
  </div>
  <div>
    <h3 className="text-[#FFD369] text-lg font-bold mb-1">Highlight</h3>
    <p className="text-[#CCCCCC] text-sm">Icon pulses with attention-grabbing motion.</p>
  </div>
</div>`,
},
{
  label: "Bouncing Icon",
  jsx: (
    <div className="bg-[#222831] p-6 rounded-xl shadow-inner hover:shadow-xl hover:scale-[1.03] transition">
      <div className="flex items-center gap-3 mb-3">
        <div className="animate-bounce text-[#FFD369]">
          <ClipboardCopy className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#FFD369]">Bouncy Tools</h3>
      </div>
      <p className="text-[#CCCCCC]">This card features a bouncing clipboard icon for tool emphasis.</p>
    </div>
  ),
  code: `<div className="bg-[#222831] p-6 rounded-xl shadow-inner hover:shadow-xl transition">
  <div className="flex items-center gap-3 mb-3">
    <div className="animate-bounce text-[#FFD369]">
      <ClipboardCopy className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-bold text-[#FFD369]">Bouncy Tools</h3>
  </div>
  <p className="text-[#CCCCCC]">This card features a bouncing clipboard icon for tool emphasis.</p>
</div>`,
},
{
  label: "Notepad Style",
  jsx: (
    <div className="bg-white text-[#222831] p-6 rounded-xl shadow border-l-[5px] border-[#FFD369] font-serif">
      <h3 className="text-lg font-bold mb-2">Note Block</h3>
      <p className="text-sm text-[#393E46]">A clean, paper-like block for written content.</p>
    </div>
  ),
  code: `<div className="bg-white text-[#222831] p-6 rounded-xl shadow border-l-[5px] border-[#FFD369] font-serif">
  <h3 className="text-lg font-bold mb-2">Note Block</h3>
  <p className="text-sm text-[#393E46]">A clean, paper-like block for written content.</p>
</div>`,
},
{
  label: "Stone Texture",
  jsx: (
    <div className="bg-[#2B2B2B] p-6 rounded-xl text-[#FFD369] border border-[#3A3A3A] bg-[url('https://www.transparenttextures.com/patterns/stone.png')]">
      <h3 className="text-lg font-bold mb-2">Stone Texture</h3>
      <p className="text-[#CCCCCC] text-sm">Texture adds depth for material design fans.</p>
    </div>
  ),
  code: `<div className="bg-[#2B2B2B] p-6 rounded-xl text-[#FFD369] border border-[#3A3A3A] bg-[url('https://www.transparenttextures.com/patterns/stone.png')]">
  <h3 className="text-lg font-bold mb-2">Stone Texture</h3>
  <p className="text-[#CCCCCC] text-sm">Texture adds depth for material design fans.</p>
</div>`,
},
{
  label: "Tropical Card",
  jsx: (
    <div className="bg-gradient-to-tr from-green-200 via-yellow-100 to-pink-200 p-6 rounded-xl border border-[#FFD369] text-[#2E3440] shadow-inner">
      <h3 className="text-lg font-bold mb-2">Tropical Vibes</h3>
      <p className="text-sm">Perfect for vacation apps or sunny themes.</p>
    </div>
  ),
  code: `<div className="bg-gradient-to-tr from-green-200 via-yellow-100 to-pink-200 p-6 rounded-xl border border-[#FFD369] text-[#2E3440] shadow-inner">
  <h3 className="text-lg font-bold mb-2">Tropical Vibes</h3>
  <p className="text-sm">Perfect for vacation apps or sunny themes.</p>
</div>`,
},
{
  label: "Lab Data",
  jsx: (
    <div className="bg-[#111827] text-[#E5E7EB] border-l-4 border-[#FFD369] p-6 rounded-md">
      <h3 className="text-lg font-bold mb-2">Lab Entry</h3>
      <ul className="text-sm list-disc ml-5">
        <li>Experiment #23</li>
        <li>Status: Complete</li>
        <li>Temp: 37°C</li>
      </ul>
    </div>
  ),
  code: `<div className="bg-[#111827] text-[#E5E7EB] border-l-4 border-[#FFD369] p-6 rounded-md">
  <h3 className="text-lg font-bold mb-2">Lab Entry</h3>
  <ul className="text-sm list-disc ml-5">
    <li>Experiment #23</li>
    <li>Status: Complete</li>
    <li>Temp: 37°C</li>
  </ul>
</div>`,
},
    {
      label: "Glassmorphism",
      jsx: (
        <div className="backdrop-blur-md bg-[#ffffff0a] border border-[#FFD36933] rounded-xl p-6 transition hover:scale-[1.02]">
          <h3 className="text-[#FFD369] text-lg font-bold mb-2">
            Glassmorphism
          </h3>
          <p className="text-[#CCCCCC]">
            Transparent with blur effect for modern UI.
          </p>
        </div>
      ),
      code: `<div className="backdrop-blur-md bg-[#ffffff0a] border border-[#FFD36933] rounded-xl p-6">
  <h3 className="text-[#FFD369] text-lg font-bold mb-2">Glassmorphism</h3>
  <p className="text-[#CCCCCC]">Transparent with blur effect for modern UI.</p>
</div>`,
    },
{
  label: "Dev Badge",
  jsx: (
    <div className="bg-[#1F2937] p-4 rounded-lg flex flex-col items-start gap-2 text-sm text-[#E5E7EB] sm:flex-row sm:items-center sm:justify-between">
      <span className="font-medium text-[#FFD369]">React Developer</span>
      <span className="text-xs bg-[#FFD369] text-[#222831] px-2 py-0.5 rounded-full">Pro</span>
    </div>
  ),
  code: `<div className="bg-[#1F2937] p-4 rounded-lg flex flex-col items-start gap-2 text-sm text-[#E5E7EB] sm:flex-row sm:items-center sm:justify-between">
  <span className="font-medium text-[#FFD369]">React Developer</span>
  <span className="text-xs bg-[#FFD369] text-[#222831] px-2 py-0.5 rounded-full">Pro</span>
</div>`,
},
{
  label: "Receipt Summary",
  jsx: (
    <div className="bg-white text-[#222831] rounded-md p-4 border border-[#FFD369] shadow-sm w-full max-w-sm mx-auto">
      <h3 className="font-bold text-sm mb-2">Order #884920</h3>
      <div className="text-xs flex justify-between">
        <span>Total</span>
        <span className="font-semibold">$42.00</span>
      </div>
    </div>
  ),
  code: `<div className="bg-white text-[#222831] rounded-md p-4 border border-[#FFD369] shadow-sm w-full max-w-sm mx-auto">
  <h3 className="font-bold text-sm mb-2">Order #884920</h3>
  <div className="text-xs flex justify-between">
    <span>Total</span>
    <span className="font-semibold">$42.00</span>
  </div>
</div>`,
},
{
  label: "Nav Shortcut",
  jsx: (
    <div className="bg-[#222831] p-4 rounded-lg border border-[#393E46] flex items-center justify-between sm:gap-4">
      <div>
        <h3 className="text-[#FFD369] font-semibold text-sm">Dashboard</h3>
        <p className="text-xs text-[#CCCCCC]">Quick access panel</p>
      </div>
      <ClipboardCopy className="w-4 h-4 text-[#FFD369]" />
    </div>
  ),
  code: `<div className="bg-[#222831] p-4 rounded-lg border border-[#393E46] flex items-center justify-between sm:gap-4">
  <div>
    <h3 className="text-[#FFD369] font-semibold text-sm">Dashboard</h3>
    <p className="text-xs text-[#CCCCCC]">Quick access panel</p>
  </div>
  <ClipboardCopy className="w-4 h-4 text-[#FFD369]" />
</div>`,
},
{
  label: "Travel Info",
  jsx: (
    <div className="bg-[#2B2D42] p-5 rounded-xl text-white text-sm sm:p-6">
      <h3 className="text-[#FFD369] font-bold text-base mb-2">Tokyo → Seoul</h3>
      <p className="text-[#CCCCCC]">Departure: 9:30 AM | Gate: A2</p>
    </div>
  ),
  code: `<div className="bg-[#2B2D42] p-5 rounded-xl text-white text-sm sm:p-6">
  <h3 className="text-[#FFD369] font-bold text-base mb-2">Tokyo → Seoul</h3>
  <p className="text-[#CCCCCC]">Departure: 9:30 AM | Gate: A2</p>
</div>`,
},
{
  label: "Mini Stat",
  jsx: (
    <div className="bg-[#1A1F25] text-white p-4 rounded-md w-full sm:max-w-[200px] border border-[#2E3440]">
      <h4 className="text-xs text-[#CCCCCC] mb-1">Monthly Visitors</h4>
      <p className="text-xl font-bold text-[#FFD369]">12.4K</p>
    </div>
  ),
  code: `<div className="bg-[#1A1F25] text-white p-4 rounded-md w-full sm:max-w-[200px] border border-[#2E3440]">
  <h4 className="text-xs text-[#CCCCCC] mb-1">Monthly Visitors</h4>
  <p className="text-xl font-bold text-[#FFD369]">12.4K</p>
</div>`,
},
{
  label: "Futuristic HUD",
  jsx: (
    <div className="relative bg-[#0F172A] p-6 rounded-xl border border-[#22D3EE] shadow-[0_0_15px_#22D3EE55] hover:scale-[1.02] transition">
      <h3 className="text-[#22D3EE] text-lg font-bold mb-2">Futuristic HUD</h3>
      <p className="text-[#94A3B8]">Sci-fi interface style for modern dashboards.</p>
    </div>
  ),
  code: `<div className="relative bg-[#0F172A] p-6 rounded-xl border border-[#22D3EE] shadow-[0_0_15px_#22D3EE55]">
  <h3 className="text-[#22D3EE] text-lg font-bold mb-2">Futuristic HUD</h3>
  <p className="text-[#94A3B8]">Sci-fi interface style for modern dashboards.</p>
</div>`,
},
{
  label: "Aurora Fade",
  jsx: (
    <div className="bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-6 rounded-xl text-white hover:scale-[1.02] transition shadow-md">
      <h3 className="text-lg font-bold mb-2">Aurora Fade</h3>
      <p className="text-sm">Smooth gradient transitions mimicking the Northern Lights.</p>
    </div>
  ),
  code: `<div className="bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-6 rounded-xl text-white">
  <h3 className="text-lg font-bold mb-2">Aurora Fade</h3>
  <p className="text-sm">Smooth gradient transitions mimicking the Northern Lights.</p>
</div>`,
},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f25] to-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFD369] drop-shadow mb-2">
            Cards & Layouts
          </h1>
          <p className="text-[#CCCCCC] text-lg">
            Click the button to copy and toggle the JSX code.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div key={index}>
              {card.jsx}
              <button
                onClick={() => handleToggleCode(index, card.code)}
                className="mt-4 inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full font-medium transition bg-[#FFD369] text-[#222831] hover:bg-yellow-400"
              >
                {copiedIndex === index ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ClipboardCopy className="w-4 h-4" />
                )}
                {selectedCode === index ? "Hide Code" : "Copy Code"}
              </button>

              {selectedCode === index && (
                <pre className="text-xs text-[#FFD369] bg-[#1d1f23] p-3 rounded-lg mt-3 shadow-inner whitespace-pre-wrap">
                  {card.code}
                </pre>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
