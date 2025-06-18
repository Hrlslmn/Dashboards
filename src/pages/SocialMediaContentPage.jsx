import React, { useEffect, useState } from 'react';
import HeaderGreen from '../components/HeaderGreen';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../supabaseClient';

const Loader = () => (
  <motion.div className="flex space-x-2 justify-center items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
    <span className="sr-only">Loading...</span>
    <div className="h-2 w-2 bg-slate-900 rounded-full animate-bounce [animation-delay:-0.3s]" />
    <div className="h-2 w-2 bg-slate-900 rounded-full animate-bounce [animation-delay:-0.15s]" />
    <div className="h-2 w-2 bg-slate-900 rounded-full animate-bounce" />
  </motion.div>
);

const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="w-5 h-5 border-2 border-t-transparent border-[#64FFDA] rounded-full animate-spin"></div>
    <span className="ml-2 text-slate-400">Checking image quota...</span>
  </div>
);

const getAspectRatio = (resolution) => {
  const [width, height] = resolution.split('x');
  return `${width} / ${height}`;
};

const DAILY_LIMIT = 10;

export default function SocialMediaContentPage() {
  const [form, setForm] = useState({
    topic: '',
    audience: '',
    tone: 'Friendly & Engaging',
    platform: 'Instagram',
    imageStyle: 'natural',
    resolution: '1024x1024',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [imageCountToday, setImageCountToday] = useState(0);
  const [quotaLoading, setQuotaLoading] = useState(true);

  const remainingQuota = DAILY_LIMIT - imageCountToday;

  useEffect(() => {
    const fetchUsage = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return setQuotaLoading(false);

      try {
        const res = await fetch("/api/usage-today", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id })
        });
        const { count } = await res.json();
        setImageCountToday(count || 0);
      } catch (err) {
        console.error("Failed to fetch quota", err);
      } finally {
        setQuotaLoading(false);
      }
    };
    fetchUsage();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (remainingQuota <= 0) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const genRes = await fetch("/api/generate-openai-image-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: form.topic,
          audience: form.audience,
          imageStyle: form.imageStyle
        }),
      });
      const { imageUrl } = await genRes.json();
      if (!imageUrl) throw new Error("Failed to generate image");

      const uploadRes = await fetch("/api/upload-to-supabase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, userId: user.id }),
      });
      const { publicUrl } = await uploadRes.json();
      if (!publicUrl) throw new Error("Upload to Supabase failed");

      setResult({ imageUrl: publicUrl });
      setImageCountToday(prev => prev + 1);
    } catch (err) {
      console.error("Image generation error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-['Inter',sans-serif] relative overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-[#64FFDA]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-gradient-radial from-sky-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <HeaderGreen />

      <main className="px-4 sm:px-6 lg:px-8 pt-24 pb-20 max-w-7xl mx-auto">
        <motion.h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-slate-100 to-[#64FFDA] text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          AI Social Media Image Generator
        </motion.h1>

        <div className="text-center mb-6">
          {quotaLoading ? <Spinner /> : (
            <p className="text-slate-400">
              {remainingQuota > 0
                ? `You can generate ${remainingQuota} more images today.`
                : "You’ve reached today’s generation limit (10 images)."}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.form onSubmit={handleSubmit}
            className="backdrop-blur-xl bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl space-y-5"
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>

            <div>
              <label className="block text-sm mb-2 font-medium text-slate-400">Topic / Product</label>
              <input name="topic" value={form.topic} onChange={handleChange}
                placeholder="e.g. Eco-friendly water bottles" required
                className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200" />
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium text-slate-400">Target Audience</label>
              <input name="audience" value={form.audience} onChange={handleChange}
                placeholder="e.g. Students, Hikers" required
                className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200" />
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium text-slate-400">Image Style</label>
              <select name="imageStyle" value={form.imageStyle} onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200">
                <option value="natural">Natural</option>
                <option value="vivid">Vivid</option>
              </select>
            </div>

            <button type="submit" disabled={loading || remainingQuota <= 0}
              className="w-full bg-[#64FFDA] text-slate-900 font-bold py-3 rounded-md hover:bg-opacity-90 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed flex justify-center items-center">
              <AnimatePresence mode="wait">
                {loading ? <Loader key="loader" /> : <span key="text">Generate Image</span>}
              </AnimatePresence>
            </button>
          </motion.form>

          <motion.div
            className="rounded-2xl border border-slate-700 bg-slate-800/30 p-4 sm:p-6 flex flex-col items-center justify-center"
            style={{ aspectRatio: getAspectRatio(form.resolution) }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <AnimatePresence mode="wait">
              {loading && <motion.div key="loading" className="text-slate-500 text-center"><Loader /><p className="mt-4">Generating your image...</p></motion.div>}
              {error && <motion.div key="error" className="text-red-400 text-center"><p><strong>Error:</strong> {error}</p></motion.div>}
              {result?.imageUrl && !loading && !error && (
                <motion.img key="img" src={result.imageUrl} alt="Generated AI content"
                  className="rounded-lg shadow-lg w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} />
              )}
              {!result && !loading && !error && <motion.div key="placeholder" className="text-slate-500 text-center">Your generated image will appear here.</motion.div>}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
