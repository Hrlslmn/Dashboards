import React, { useState } from 'react';
import HeaderGreen from '../components/HeaderGreen'; // Adjust path if needed
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../supabaseClient'; // Adjust path if needed

// Loader component for the generate button
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

const SocialMediaContentPage = () => {
  // State for form inputs
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

  // Form options
  const toneOptions = [
    'Friendly & Engaging', 'Professional & Formal', 'Witty & Humorous',
    'Inspirational & Motivational', 'Authoritative & Informative',
    'Casual & Conversational', 'Empathetic & Supportive', 'Playful & Fun', 'Urgent & Direct',
  ];

  const imageStyleOptions = ['natural', 'vivid'];
  const resolutionOptions = ['1024x1024', '1792x1024', '1024x1792'];
  const platformOptions = ['Instagram', 'Facebook', 'LinkedIn', 'X (Twitter)'];

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  // Aspect ratio derived from resolution for styling the preview container
  const getAspectRatio = (resolution) => {
    const [width, height] = resolution.split('x');
    return `${width} / ${height}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Step 1: Call the n8n webhook to generate the image
      const response = await fetch("https://codecanverse.app.n8n.cloud/webhook/166a60e9-ff76-4866-ba21-26b4b5655ca7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate image. Status: ${response.status}`);
      }

      // Step 2: Get the image data as a blob
      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error("Received empty image data from the server.");
      }
      const fileExt = blob.type.split("/")[1] || 'png';
      const fileName = `social-images/generated-${Date.now()}.${fileExt}`;

      // Step 3: Upload the image blob to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("code-canverse-bucket")
        .upload(fileName, blob, {
          contentType: blob.type,
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Step 4: Get the public URL of the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from("code-canverse-bucket")
        .getPublicUrl(fileName);

      if (!publicUrlData || !publicUrlData.publicUrl) {
         throw new Error("Could not retrieve public URL for the image.");
      }
      
      setResult({ imageUrl: publicUrlData.publicUrl });

    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-['Inter',sans-serif] relative overflow-hidden">
      {/* Background decorative gradients */}
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
          {/* Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            className="backdrop-blur-xl bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl space-y-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { name: 'topic', label: 'Topic / Product', placeholder: 'e.g. Eco-friendly water bottles' },
              { name: 'audience', label: 'Target Audience', placeholder: 'e.g. Hikers, students, eco-conscious buyers' }
            ].map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-sm mb-2 font-medium text-slate-400">{label}</label>
                  <input
                    id={name}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#64FFDA] transition-shadow duration-300"
                  />
                </div>
              ))}

            <div>
              <label htmlFor="tone" className="block text-sm mb-2 font-medium text-slate-400">Tone</label>
              <select id="tone" name="tone" value={form.tone} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#64FFDA]">
                {toneOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="imageStyle" className="block text-sm mb-2 font-medium text-slate-400">Image Style</label>
              <select id="imageStyle" name="imageStyle" value={form.imageStyle} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#64FFDA]">
                {imageStyleOptions.map(style => <option key={style} value={style}>{style}</option>)}
              </select>
            </div>
            
            <div>
              <label htmlFor="resolution" className="block text-sm mb-2 font-medium text-slate-400">Resolution</label>
              <select id="resolution" name="resolution" value={form.resolution} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#64FFDA]">
                {resolutionOptions.map(res => <option key={res} value={res}>{res}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="platform" className="block text-sm mb-2 font-medium text-slate-400">Platform</label>
              <select id="platform" name="platform" value={form.platform} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#64FFDA]">
                {platformOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

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

          {/* Image Preview Section */}
          <motion.div
            className="rounded-2xl border border-slate-700 bg-slate-800/30 p-4 sm:p-6 flex items-center justify-center transition-all duration-300"
            style={{ aspectRatio: getAspectRatio(form.resolution) }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loading-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-slate-500">
                  <Loader />
                  <p className="mt-4">Generating your masterpiece...</p>
                </motion.div>
              )}
              {error && (
                <motion.div key="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-red-400">
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
                    alt="Generated AI social media content"
                    className="rounded-lg shadow-lg w-full h-full object-contain"
                  />
                </motion.div>
              )}
              {!result && !loading && !error && (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-500 text-center">
                  <p>Your generated image will appear here.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SocialMediaContentPage;