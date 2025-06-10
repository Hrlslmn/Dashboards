import React from 'react';
import { Link } from 'react-router-dom';
import HeaderGreen from '../components/HeaderGreen';
import { motion } from 'framer-motion';
import {
    Zap,
    Target,
    Lightbulb,
    Globe,
    CheckCircle,
    Rocket
} from 'lucide-react';

// Animation variant for sections to fade in as they enter the viewport
const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

export default function ThemesPage() {
    const brandingBoards = [
        { title: "Maryan Herbal", image: "/images/board-1.png", id: "board1" },
        { title: "Keyla", image: "/images/board-2.png", id: "board2" },
        { title: "Surf Mania", image: "/images/board-3.png", id: "board3" },
        { title: "Tropicana Treasure", image: "/images/board-4.png", id: "board4" },
        { title: "Miyagi Sushi", image: "/images/board-5.png", id: "board5" },
        { title: "Ethereal Glow", image: "/images/board-6.png", id: "board6" }
    ];

    const whyBrandingPoints = [
        { text: "Visually differentiate in a crowded digital landscape." },
        { text: "Build emotional connections and lasting recognition through consistency." },
        { text: "Accelerate trust and shorten sales cycles in both B2B & B2C." },
        { text: "Attract investment with a confident, clearly defined brand vision." }
    ];

    const aiAdvantages = [
        {
            title: "Instant Generation",
            desc: "Enter your idea and let AI create logos, palettes, and entire brand boards in mere seconds.",
            icon: <Zap className="w-7 h-7 text-[#64FFDA]" />
        },
        {
            title: "Brand Consistency",
            desc: "No more mismatched styles. Get cohesive visual systems designed for all your platforms.",
            icon: <Target className="w-7 h-7 text-[#64FFDA]" />
        },
        {
            title: "Startup-Ready",
            desc: "Perfect for MVP launches, compelling pitch decks, and crucial investor meetings.",
            icon: <Lightbulb className="w-7 h-7 text-[#64FFDA]" />
        },
        {
            title: "Scales With You",
            desc: "From local businesses to global enterprises, update or pivot your brand's look instantly.",
            icon: <Globe className="w-7 h-7 text-[#64FFDA]" />
        }
    ];

    return (
        // ✅ FIX 1: The root element is a flex column that takes up the minimum height of the screen.
        <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300 font-['Inter',sans-serif] relative">
            {/* On-brand Background Glows */}
            <div className="absolute -top-1/3 -left-1/4 w-[65vw] h-[65vw] bg-gradient-radial from-[#64FFDA]/10 to-transparent blur-3xl rounded-full pointer-events-none z-0" />
            <div className="absolute -bottom-1/3 -right-1/4 w-[65vw] h-[65vw] bg-gradient-radial from-[#64FFDA]/10 to-transparent blur-3xl rounded-full pointer-events-none z-0" />

            {/* ✅ FIX 2: The Header, Main, and Footer are now direct children of the flex container. */}
            <HeaderGreen />
            
            {/* ✅ FIX 3: `flex-1` is now on the <main> tag. This makes it expand to fill all available space, pushing the footer down. */}
            <main className="flex-1 w-full relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-20 sm:pb-24">
                    {/* Intro Section */}
                    <motion.section 
                        className="text-center mb-16 sm:mb-24"
                        initial="hidden"
                        animate="visible"
                        variants={sectionVariants}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-100 to-[#64FFDA] text-transparent bg-clip-text mb-6 leading-tight tracking-tight">
                            AI Branding Boards
                        </h1>
                        <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                            Instantly generate world-class branding kits powered by AI – crafted to make your startup or enterprise unforgettable.
                        </p>
                    </motion.section>

                    {/* Branding Boards Section */}
                    <motion.section 
                        className="mb-20 sm:mb-24"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {brandingBoards.map((board) => (
                                <motion.div
                                    key={board.id}
                                    variants={sectionVariants}
                                    whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
                                    className="bg-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl group border border-slate-700/70 hover:border-[#64FFDA]/50 transition-colors duration-300"
                                >
                                    <div className="relative overflow-hidden h-56 sm:h-64">
                                        <img src={board.image} alt={board.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                            <button onClick={() => { /* Logic to open modal */ }} className="text-sm bg-[#64FFDA] text-slate-900 px-5 py-2.5 rounded-full font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white">
                                                View Board
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-5 bg-slate-800/80">
                                        <h3 className="text-lg sm:text-xl font-semibold text-slate-200 group-hover:text-white transition-colors">
                                            {board.title}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Why Branding Section */}
                    <motion.section 
                        className="mb-20 sm:mb-28 max-w-4xl mx-auto text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={sectionVariants}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-6 tracking-tight">
                            Why Branding Matters – <span className="text-[#64FFDA]">Especially Now</span>
                        </h2>
                        <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10">
                            In today’s saturated markets, branding isn’t just a visual layer – it’s your first impression, your story, and your positioning strategy rolled into one.
                        </p>
                        <ul className="space-y-5 text-left px-2 sm:px-6">
                            {whyBrandingPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start text-base sm:text-lg text-slate-300">
                                    <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#64FFDA] mr-3.5 mt-0.5 flex-shrink-0" />
                                    <span>{point.text}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* AI Advantage Section */}
                    <motion.section 
                        className="mb-20 sm:mb-28 max-w-5xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={sectionVariants}
                    >
                       <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-6 tracking-tight">
                                How AI <span className="text-[#64FFDA]">Supercharges</span> Your Design Workflow
                            </h2>
                            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                                Traditional branding takes weeks and thousands of dollars. With our AI engine, get polished, pitch-ready branding kits in minutes – zero design skills required.
                            </p>
                       </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-left">
                            {aiAdvantages.map((adv, idx) => (
                                <div key={idx} className="bg-slate-800/50 backdrop-blur-md border border-slate-700/70 rounded-2xl p-6 md:p-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-[#64FFDA]/10 rounded-lg">
                                            {adv.icon}
                                        </div>
                                        <h4 className="text-xl font-semibold text-slate-200">
                                            {adv.title}
                                        </h4>
                                    </div>
                                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{adv.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* CTA Section */}
                    <motion.section
                        className="bg-slate-800/50 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-3xl text-center shadow-2xl border border-slate-700/70"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={sectionVariants}
                    >
                        <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-[#64FFDA] mx-auto mb-6" />
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-slate-100 to-[#64FFDA] bg-clip-text text-transparent mb-6 tracking-tight">
                            Design Your Brand in 60 Seconds
                        </h3>
                        <p className="text-slate-400 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                            Founders, marketers, and designers: jumpstart your next venture with the power of AI. No guesswork, no delays — just pure creative acceleration.
                        </p>
                        <Link
                            to="/create-brand-kit"
                            className="inline-flex items-center justify-center gap-3 bg-[#64FFDA] text-slate-900 font-bold px-8 py-3.5 rounded-full text-base sm:text-lg hover:bg-white transition-all duration-300 shadow-xl hover:shadow-[#64FFDA]/40 transform hover:scale-105 group"
                        >
                            <Rocket size={22} className="transition-transform duration-300 group-hover:rotate-[15deg]" />
                            Generate My Brand Kit
                        </Link>
                    </motion.section>
                </div>
            </main>

            {/* ✅ FIX 4: A simple footer is added to anchor the bottom of the page. */}
            <footer className="w-full text-center p-4 text-slate-500 text-sm border-t border-slate-800">
                <p>CodeCanverse © {new Date().getFullYear()}</p>
            </footer>

            <style jsx global>{`
                 .bg-gradient-radial {
                   background-image: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
                 }
              `}</style>
        </div>
    );
}