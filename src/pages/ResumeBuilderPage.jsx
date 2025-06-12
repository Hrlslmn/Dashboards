import React, { useState } from 'react';
import HeaderGreen from '../components/HeaderGreen';
import { motion, AnimatePresence } from 'framer-motion';

// Simple "loader" component
const Loader = () => (
    <motion.div
        className="flex space-x-2 justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <span className="sr-only">Loading...</span>
        <div className="h-2 w-2 bg-[#64FFDA] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-[#64FFDA] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-[#64FFDA] rounded-full animate-bounce"></div>
    </motion.div>
);

export default function ResumeBuilderPage() {
    const [form, setForm] = useState({
        fullName: '',
        role: '',
        summary: '',
        experience: '',
        education: '',
        skills: '',
        projects: ''
    });

    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPdfUrl('');

        try {
            // Mock API call for demonstration
            await new Promise(resolve => setTimeout(resolve, 3000));
            // Replace with your actual n8n webhook URL
            // const response = await fetch('https://your-n8n-server.com/webhook/ai-resume', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(form),
            // });
            // const data = await response.json();
            const mockPdfUrl = '/resume.pdf'; // Replace with data.pdfUrl

            if (mockPdfUrl) {
                setPdfUrl(mockPdfUrl);
            } else {
                alert('Failed to generate resume. Try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Error generating resume.');
        }

        setLoading(false);
    };

    const formFields = [
        { key: 'fullName', label: 'Full Name', type: 'text', rows: 1 },
        { key: 'role', label: 'Target Role', type: 'text', rows: 1 },
        { key: 'summary', label: 'Professional Summary', type: 'textarea', rows: 4 },
        { key: 'experience', label: 'Work Experience', type: 'textarea', rows: 5 },
        { key: 'education', label: 'Education', type: 'textarea', rows: 3 },
        { key: 'skills', label: 'Skills', type: 'textarea', rows: 3 },
        { key: 'projects', label: 'Projects', type: 'textarea', rows: 4 },
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 font-['Inter'] relative overflow-hidden">
            {/* Enhanced background gradients */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#64FFDA]/15 via-slate-900 to-transparent blur-3xl rounded-full transform -translate-x-1/4 -translate-y-1/4 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-sky-500/10 via-slate-900 to-transparent blur-3xl rounded-full transform translate-x-1/4 translate-y-1/4 pointer-events-none" />

            <HeaderGreen />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20 relative z-10">
                <motion.h1
                    className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-slate-100 to-[#64FFDA] text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    AI-Powered Resume Builder
                </motion.h1>
                <motion.p
                    className="text-center text-slate-400 mb-12"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Enter your details and let our AI craft the perfect resume for you.
                </motion.p>

                <motion.form
                    onSubmit={handleSubmit}
                    className="backdrop-blur-xl bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700/50 shadow-2xl shadow-slate-900/50"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formFields.map(({ key, label, type, rows }, index) => (
                            <motion.div
                                key={key}
                                className={key === 'summary' || key === 'experience' ? 'md:col-span-2' : ''}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            >
                                <label className="block mb-2 text-sm font-medium text-slate-400">{label}</label>
                                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                                    <textarea
                                        rows={rows}
                                        name={key}
                                        value={form[key]}
                                        onChange={handleChange}
                                        className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#64FFDA] focus:border-[#64FFDA] transition-all duration-300"
                                        placeholder={`e.g., ${label}...`}
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto px-12 py-3 bg-[#64FFDA] text-slate-900 font-bold text-lg rounded-lg shadow-lg shadow-[#64FFDA]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: loading ? 1 : 1.05, boxShadow: '0px 0px 20px rgba(100, 255, 218, 0.5)' }}
                            whileTap={{ scale: loading ? 1 : 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            {loading ? <Loader /> : 'Generate with AI'}
                        </motion.button>
                    </div>
                </motion.form>

                <AnimatePresence>
                    {pdfUrl && (
                        <motion.div
                            className="mt-12 text-center backdrop-blur-xl bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-2xl"
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-slate-100 to-[#64FFDA] text-transparent bg-clip-text">Your Resume is Ready!</h2>
                            <p className='text-slate-400 mb-6'>Download your professionally crafted resume below.</p>
                            <motion.a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-[#64FFDA] text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-[#52e6c6] shadow-lg shadow-[#64FFDA]/20"
                                whileHover={{ scale: 1.05, boxShadow: '0px 0px 20px rgba(100, 255, 218, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            >
                                Download Your Resume
                            </motion.a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}