// src/pages/TShirtDesignPage.jsx
import React, { useState } from 'react';
import HeaderGreen from '../components/HeaderGreen';

export default function TShirtDesignPage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateDesign = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageUrl('');

    try {
      const response = await fetch('https://your-n8n-server.com/webhook/tshirt-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      alert('Failed to generate T-shirt design.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <HeaderGreen />

      <main className="max-w-3xl mx-auto pt-24 px-4 pb-20">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8 text-[#64FFDA]">
          T-Shirt Design Generator
        </h1>

        {/* AI Generation Form */}
        <form onSubmit={generateDesign} className="space-y-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your design: ‘anime skull with fire, vintage look’"
            rows={4}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-4 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#64FFDA] text-slate-900 font-semibold py-3 rounded-lg hover:bg-[#52e6c6] transition"
          >
            {loading ? 'Generating...' : 'Generate Design'}
          </button>
        </form>

        {/* Generated Result */}
        {imageUrl && (
          <div className="mt-10 text-center">
            <img src={imageUrl} alt="Generated T-Shirt Design" className="mx-auto rounded-lg" />
            <a href={imageUrl} download className="mt-4 inline-block text-[#64FFDA] underline">
              Download Image
            </a>
          </div>
        )}

        {/* Premade Designs Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-[#64FFDA] mb-4">Explore Ready-Made Designs</h2>

          {/* AI Designs */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-2 text-white">AI-Generated Picks</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                '/mockups/ai1.png',
                '/mockups/ai2.png',
                '/mockups/ai3.png',
                '/mockups/ai4.png'
              ].map((src, i) => (
                <img key={i} src={src} alt={`AI Design ${i}`} className="rounded shadow-lg" />
              ))}
            </div>
          </div>

          {/* Designer Picks */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Designer Favorites</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                '/mockups/designer1.png',
                '/mockups/designer2.png',
                '/mockups/designer3.png'
              ].map((src, i) => (
                <img key={i} src={src} alt={`Designer Design ${i}`} className="rounded shadow-lg" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
