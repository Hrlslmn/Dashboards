import React, { useState } from 'react';
import HeaderGreen from '../components/HeaderGreen';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../supabaseClient';

const Loader = () => (
  <motion.div
    className="flex space-x-2 justify-center items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <span className="sr-only">Loading...</span>
    <div className="h-2 w-2 bg-slate-900 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="h-2 w-2 bg-slate-900 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="h-2 w-2 bg-slate-900 rounded-full animate-bounce"></div>
  </motion.div>
);

const getAspectRatio = (resolution) => {
  const [width, height] = resolution.split('x');
  return `${width} / ${height}`;
};

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
  const [copied, setCopied] = useState(false);

  const toneOptions = [
    'Friendly & Engaging', 'Professional & Formal', 'Witty & Humorous',
    'Inspirational & Motivational', 'Authoritative & Informative',
    'Casual & Conversational', 'Empathetic & Supportive', 'Playful & Fun', 'Urgent & Direct',
  ];

  const imageStyleOptions = ['natural', 'vivid'];
  const resolutionOptions = ['1024x1024', '1792x1024', '1024x1792'];
  const platformOptions = ['Instagram', 'Facebook', 'LinkedIn', 'X (Twitter)'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    setCopied(false);

    try {
      // Step 1: Trigger image generation via serverless
      const generateRes = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: form.topic,
          audience: form.audience,
        }),
      });

      const generateData = await generateRes.json();
      const imageUid = generateData.uid;

      if (!imageUid) throw new Error("No UID returned from Bannerbear");

      // Step 2: Poll for image completion
      let imageUrl = null;
      for (let i = 0; i < 10; i++) {
        const statusRes = await fetch(`/api/image-status?uid=${imageUid}`);
        const statusData = await statusRes.json();
        if (statusData.image_url) {
          imageUrl = statusData.image_url;
          break;
        }
        await new Promise((r) => setTimeout(r, 2000));
      }

      if (!imageUrl) throw new Error("Image generation timed out");

      // Step 3: Upload image to Supabase
      const blobRes = await fetch(imageUrl);
      const blob = await blobRes.blob();
      const fileExt = blob.type.split('/')[1] || 'png';
      const fileName = `social-images/bannerbear-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("code-canverse-bucket")
        .upload(fileName, blob, {
          contentType: blob.type,
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = await supabase.storage
        .from("code-canverse-bucket")
        .getPublicUrl(fileName);

      setResult({ imageUrl: publicUrlData.publicUrl, caption: '' });

    } catch (err) {
      console.error("Bannerbear frontend error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.caption) {
      navigator.clipboard.writeText(result.caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
          transition={{ duration: 0.5 }}
        >
          AI Social Media Image Generator
        </motion.h1>
        <motion.p
          className="text-slate-400 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Instantly create high-quality marketing images with just a few inputs.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.form
            onSubmit={handleSubmit}
            className="backdrop-blur-xl bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl space-y-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[{ name: 'topic', label: 'Topic / Product', placeholder: 'e.g. Eco-friendly water bottles' },
              { name: 'audience', label: 'Target Audience', placeholder: 'e.g. Hikers, students, eco-conscious buyers' }]
              .map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-sm mb-2 font-medium text-slate-400">{label}</label>
                  <input
                    id={name}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#64FFDA]"
                  />
                </div>
              ))}

            {[{ id: 'tone', label: 'Tone', options: toneOptions },
              { id: 'imageStyle', label: 'Image Style', options: imageStyleOptions },
              { id: 'resolution', label: 'Resolution', options: resolutionOptions },
              { id: 'platform', label: 'Platform', options: platformOptions }]
              .map(({ id, label, options }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm mb-2 font-medium text-slate-400">{label}</label>
                  <select
                    id={id}
                    name={id}
                    value={form[id]}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200"
                  >
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#64FFDA] text-slate-900 font-bold py-3 rounded-md hover:bg-opacity-90 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed flex justify-center items-center"
            >
              <AnimatePresence mode="wait">
                {loading ? <Loader key="loader" /> : <span key="text">Generate Image</span>}
              </AnimatePresence>
            </button>
          </motion.form>

          <motion.div
            className="rounded-2xl border border-slate-700 bg-slate-800/30 p-4 sm:p-6 flex flex-col items-center justify-center transition-all duration-300"
            style={{ aspectRatio: getAspectRatio(form.resolution) }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loading-preview" className="text-slate-500 text-center">
                  <Loader />
                  <p className="mt-4">Generating your masterpiece...</p>
                </motion.div>
              )}
              {error && (
                <motion.div key="error-message" className="text-center text-red-400">
                  <p><strong>Generation Failed</strong></p>
                  <p className="text-sm mt-2">{error}</p>
                </motion.div>
              )}
              {result?.imageUrl && !loading && !error && (
                <motion.div
                  key="image-result"
                  className="w-full h-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={result.imageUrl}
                    alt="Generated AI content"
                    className="rounded-lg shadow-lg w-full h-full object-contain"
                  />
                </motion.div>
              )}
              {!result && !loading && !error && (
                <motion.div key="placeholder" className="text-slate-500 text-center">
                  <p>Your generated image will appear here.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
