import React from 'react';
import { Link } from 'react-router-dom';
import HeaderGreen from '../components/HeaderGreen';
import { motion } from 'framer-motion';
import {
    Cpu,
    Layers,
    AlertCircle,
    Table2,
    Menu as MenuIcon,
    ArrowRight,
    LayoutDashboard
} from 'lucide-react';

// Animation variants for Framer Motion
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};


export default function ComponentsPage() {
    const components = [
        {
            title: "Cards & Layouts",
            desc: "Versatile containers for clear content structure and flow.",
            icon: <Layers className="w-7 h-7 text-[#64FFDA]" />,
            link: "/components/cards"
        },
        {
            title: "Modals & Alerts",
            desc: "Engaging pop-ups and notifications with smooth transitions.",
            icon: <AlertCircle className="w-7 h-7 text-[#64FFDA]" />,
            link: "/components/modals"
        },
        {
            title: "Landing Pages",
            desc: "Beautifully designed sections for impactful first impressions.",
            icon: <Cpu className="w-7 h-7 text-[#64FFDA]" />,
            link: "/components/landing-pages"
        },
        {
            title: "Tables & Lists",
            desc: "Dynamic components to present structured data effectively.",
            icon: <Table2 className="w-7 h-7 text-[#64FFDA]" />,
            link: "/components/tables"
        },
        {
            title: "Navigation Elements",
            desc: "Intuitive navbars, tabs, and side menus for seamless UX.",
            icon: <MenuIcon className="w-7 h-7 text-[#64FFDA]" />,
            link: "/components/navigation"
        },
        {
            title: "Dashboards",
            desc: "Admin panels and analytics layouts to power decision-making.",
            icon: <LayoutDashboard className="w-7 h-7 text-[#64FFDA]" />,
            link: "/dashboards"
        }
    ];

    return (
        <div className="relative min-h-screen bg-slate-900 text-slate-300 font-['Inter',sans-serif] overflow-x-hidden">
            <HeaderGreen />

            {/* Background Glow Effects - Styled to match the brand */}
            <div className="absolute -top-60 -left-60 w-[500px] h-[500px] bg-gradient-to-r from-[#64FFDA]/20 to-slate-900/0 blur-[120px] rounded-full" />
            <div className="absolute -bottom-80 -right-80 w-[600px] h-[600px] bg-gradient-to-l from-[#64FFDA]/10 to-slate-900/0 blur-[100px] rounded-full" />

            <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left Panel */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full lg:col-span-5 bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl border border-slate-700/80"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-100 to-[#64FFDA] text-transparent bg-clip-text mb-6 leading-tight tracking-tight">
                            Component Showcase
                        </h1>
                        <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-8">
                            Explore a curated library of modern, accessible, and beautifully crafted React components designed for speed and reusability.
                        </p>
                        <div className="mt-8 border-l-4 border-[#64FFDA] pl-5 sm:pl-6">
                            <p className="text-md sm:text-lg text-[#64FFDA]/90 italic">
                                For developers who love clean UI and productive, inspiring workflows.
                            </p>
                        </div>
                        <Link
                            to="/themes"
                            className="mt-12 inline-flex items-center gap-3 text-[#64FFDA] font-semibold group hover:text-white transition-colors duration-300 text-lg hover:bg-[#64FFDA]/10 px-3 py-2 rounded-lg -ml-3"
                        >
                            Explore AI Branding Boards <ArrowRight size={22} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                        </Link>
                    </motion.div>

                    {/* Component Cards Container */}
                    <motion.div
                        variants={containerVariants}
                        className="w-full lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {components.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
                            >
                                <Link
                                    to={item.link}
                                    className="group block h-full bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl hover:border-[#64FFDA]/60 transition-colors duration-300 ease-in-out relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#64FFDA]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-center gap-x-4 mb-4">
                                            <div className="bg-[#64FFDA]/10 p-3 rounded-xl group-hover:scale-110 group-hover:rotate-[-10deg] transition-all duration-300 ease-out">
                                                {item.icon}
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-semibold text-slate-200 pt-1">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm sm:text-base text-slate-400 leading-relaxed flex-grow">
                                            {item.desc}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}