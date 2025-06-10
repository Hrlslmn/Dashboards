import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { motion } from 'framer-motion';
import { Mail, Lock, GitBranch, Code2, Paintbrush, BrainCircuit, Layers, Sparkles } from 'lucide-react';

// Animation variants for the main container
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Animate children one after another
        },
    },
};

// Animation variants for child elements
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function LoginPageV3() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setErrorMsg(error.message);
        } else {
            navigate('/');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex bg-slate-900 text-slate-300 font-['Inter',sans-serif]">
            {/* --- Left Branding Panel --- */}
            <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-black/20 p-12 relative overflow-hidden border-r border-slate-800">
                {/* Animated Dot Grid Background */}
                <div className="absolute inset-0 z-0 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] animate-pan-slow"></div>

                <motion.div 
                    className="relative z-10 flex flex-col items-center text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Floating Icon Constellation */}
                    <motion.div className="relative w-64 h-64 mb-8 flex items-center justify-center">
                        <motion.div animate={{ y: [-5, 5], transition: { yoyo: Infinity, duration: 3, ease: "easeInOut"} }}>
                           <Paintbrush size={48} className="absolute text-[#64FFDA] top-0 left-12 opacity-80" />
                        </motion.div>
                         <motion.div animate={{ y: [6, -6], x: [-3, 3], transition: { yoyo: Infinity, duration: 4, ease: "easeInOut"} }}>
                           <Code2 size={40} className="absolute text-[#64FFDA] bottom-8 right-2 opacity-70" />
                        </motion.div>
                         <motion.div animate={{ scale: [1, 1.05], transition: { yoyo: Infinity, duration: 2.5, ease: "easeInOut"} }}>
                            <BrainCircuit size={64} className="text-[#64FFDA]" />
                        </motion.div>
                         <motion.div animate={{ y: [8, -8], transition: { yoyo: Infinity, duration: 3.5, ease: "easeInOut"} }}>
                           <Layers size={32} className="absolute text-[#64FFDA] top-12 right-8 opacity-60" />
                         </motion.div>
                         <motion.div animate={{ x: [-7, 7], transition: { yoyo: Infinity, duration: 3.2, ease: "easeInOut"} }}>
                           <Sparkles size={36} className="absolute text-[#64FFDA] bottom-10 left-4 opacity-70" />
                        </motion.div>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight text-slate-100">
                        A New Creative Dimension
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mt-4 text-lg text-slate-400 max-w-sm mx-auto">
                        Where AI-driven art and developer-focused tools unite to accelerate your workflow.
                    </motion.p>
                </motion.div>
            </div>

            {/* --- Right Form Panel --- */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
                <motion.div
                    className="w-full max-w-md"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="text-center lg:text-left mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 group mb-4">
                            <GitBranch size={32} className="text-[#64FFDA] transition-all duration-300 group-hover:rotate-[-12deg]" />
                            <h1 className="text-2xl font-bold text-slate-200">CodeCanverse</h1>
                        </Link>
                        <h2 className="text-3xl font-bold text-slate-100">Welcome Back</h2>
                        <p className="mt-1 text-sm text-slate-400">Sign in to access your canvas.</p>
                    </motion.div>
                    
                    {errorMsg && (
                       <motion.div layout className="text-sm text-center px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg mb-6">
                           {errorMsg}
                       </motion.div>
                    )}

                    <motion.form variants={itemVariants} onSubmit={handleLogin} className="space-y-6">
                        {/* Email Input */}
                        <div className="relative group">
                            <Mail className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-slate-400 group-focus-within:text-[#64FFDA] transition-colors" />
                            <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-3 text-sm text-slate-200 bg-slate-800/60 rounded-lg border border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#64FFDA] peer transition-colors" placeholder=" " />
                            <label htmlFor="email" className="absolute text-sm text-slate-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-900 px-2 left-9 peer-focus:px-2 peer-focus:text-[#64FFDA] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                                Email Address
                            </label>
                        </div>
                        {/* Password Input */}
                        <div className="relative group">
                            <Lock className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-slate-400 group-focus-within:text-[#64FFDA] transition-colors" />
                            <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full pl-10 pr-3 py-3 text-sm text-slate-200 bg-slate-800/60 rounded-lg border border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-[#64FFDA] peer transition-colors" placeholder=" " />
                            <label htmlFor="password" className="absolute text-sm text-slate-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-900 px-2 left-9 peer-focus:px-2 peer-focus:text-[#64FFDA] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                                Password
                            </label>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 bg-slate-700 border-slate-600 text-[#64FFDA] focus:ring-[#64FFDA] rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-slate-400">Remember me</label>
                            </div>
                            <Link to="/forgot-password" className="font-medium text-[#64FFDA] hover:text-white transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-[#0a192f] bg-[#64FFDA] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-[#64FFDA] disabled:opacity-60 transition-all duration-300 hover:shadow-lg hover:shadow-[#64FFDA]/20">
                            {loading ? 'Signing in...' : 'Sign In'}
                        </motion.button>
                    </motion.form>
                    <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-[#64FFDA] hover:text-white transition-colors">
                            Sign up today
                        </Link>
                    </motion.p>
                </motion.div>
            </div>
             <style jsx>{`
                @keyframes pan-slow {
                    to { background-position: 24px 24px; }
                }
                .animate-pan-slow {
                    animation: pan-slow 3s linear infinite;
                }
            `}</style>
        </div>
    );
}