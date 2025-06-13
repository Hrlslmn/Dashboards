import React, { useState } from 'react';
import HeaderGreen from '../components/HeaderGreen';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => (
  <motion.div className="flex space-x-2 justify-center items-center">
    <span className="sr-only">Loading...</span>
    <div className="h-2 w-2 bg-slate-900 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="h-2 w-2 bg-slate-900 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="h-2 w-2 bg-slate-900 rounded-full animate-bounce"></div>
  </motion.div>
);

const SocialMediaContentPage = () => {
  const [form, setForm] = useState({
    topic: '',
    audience: '',
    tone: 'Friendly & Engaging',
    platform: 'Instagram',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const toneOptions = [
    'Friendly & Engaging',
    'Professional & Formal',
    'Witty & Humorous',
    'Inspirational & Motivational',
    'Authoritative & Informative',
    'Casual & Conversational',
    'Empathetic & Supportive',
    'Playful & Fun',
    'Urgent & Direct',
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://codecanverse.app.n8n.cloud/webhook/166a60e9-ff76-4866-ba21-26b4b5655ca7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to generate image");

      const data = await response.json();

      if (!data.imageUrl) throw new Error("Missing imageUrl in response");

      setResult({ imageUrl: data.imageUrl });
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to generate content. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-['Inter',sans-serif] relative overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-[#64FFDA]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-gradient-radial from-sky-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <HeaderGreen />

      <main className="px-4 sm:px-6 lg:px-8 pt-24 pb-20 max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-slate-100 to-[#64FFDA] text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          AI Social Media Image Generator
        </motion.h1>
        <motion.p
          className="text-slate-400 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Instantly create high-quality marketing images with just a few inputs.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-xl bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl space-y-5"
          >
            {[
              { name: 'topic', label: 'Topic / Product', placeholder: 'e.g. Modern cat food' },
              { name: 'audience', label: 'Target Audience', placeholder: 'e.g. Cat owners, pet lovers' },
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-sm mb-1 text-slate-400">{label}</label>
                <input
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-[#64FFDA]"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm mb-1 text-slate-400">Tone</label>
              <select
                name="tone"
                value={form.tone}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200"
              >
                {toneOptions.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-400">Platform</label>
              <select
                name="platform"
                value={form.platform}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200"
              >
                <option>Instagram</option>
                <option>Facebook</option>
                <option>LinkedIn</option>
                <option>X (Twitter)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#64FFDA] text-slate-900 font-bold py-3 rounded-md hover:bg-opacity-90 transition"
            >
              {loading ? <Loader /> : "Generate Image"}
            </button>
          </form>

          {/* Preview */}
          <motion.div
            className="rounded-2xl border border-slate-700 bg-slate-800/30 p-6 min-h-[350px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence>
              {result?.imageUrl ? (
                <img
                  src={result.imageUrl}
                  alt="Generated AI"
                  className="rounded-lg border border-slate-600 shadow-lg max-h-[400px] w-full object-contain"
                />
              ) : (
                <div className="text-slate-500 text-center">
                  <p>No image yet. Fill the form and click generate.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SocialMediaContentPage;
