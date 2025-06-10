import React, { useEffect, Suspense } from "react";
import HeaderGreen from "../components/HeaderGreen"; // Assuming this is styled appropriately
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "../../supabaseClient";
import {
    Code2, Paintbrush2, Puzzle, Sparkles, BrainCircuit, ArrowRight,
    LayoutDashboard, Layers, Zap, Star, Users, GitBranch,
} from "lucide-react";

export default function Homepage() {
    useEffect(() => {
        // This effect creates the interactive spotlight background
        const updateMousePosition = (ev) => {
            const { clientX, clientY } = ev;
            document.documentElement.style.setProperty('--x', `${clientX}px`);
            document.documentElement.style.setProperty('--y', `${clientY}px`);
        };
        window.addEventListener('mousemove', updateMousePosition);

        // Standard AOS and Supabase logic
        const hasLoggedOut = localStorage.getItem('hasLoggedOutOnce');
        if (!hasLoggedOut) {
            const logoutOnFirstVisit = async () => {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) await supabase.auth.signOut();
                localStorage.setItem('hasLoggedOutOnce', 'true');
            };
            logoutOnFirstVisit();
        }
        AOS.init({ once: true, duration: 1000, delay: 100 });
        
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    const techStack = [
        "React", "AI", "TailwindCSS", "Figma", "Next.js", "Supabase", "Vercel", "Automation", "UI/UX"
    ];

    return (
        <>
            {/* The root div now handles the spotlight effect with the original color */}
            <style jsx global>{`
                :root {
                    --x: 50%;
                    --y: 50%;
                }
                .spotlight-bg {
                    background: radial-gradient(circle at var(--x) var(--y), rgba(100, 255, 218, 0.08), transparent 30%), #0a192f;
                }
            `}</style>
            
            <div className="min-h-screen spotlight-bg text-slate-300 font-['Inter',sans-serif] overflow-x-hidden">
                <Suspense><HeaderGreen /></Suspense>

                <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                    {/* HERO */}
                    <section className="text-center mb-32 sm:mb-40">
                        <div data-aos="fade-up">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 text-slate-100 !leading-tight">
                                Where Art & Code
                                <br />
                                <span className="text-[#64FFDA]">
                                    Converge.
                                </span>
                            </h1>
                            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
                                Welcome to CodeCanverse. A seamlessly integrated platform where AI-driven art and developer-focused tools unite to accelerate your creative workflow.
                            </p>
                            <a
                                href="/get-started"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[#64FFDA] text-[#0a192f] font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-[#64FFDA]/20 transform hover:scale-105 group"
                            >
                                Start Creating
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </div>
                    </section>

                    {/* BENTO GRID FEATURES */}
                    <section className="mb-32 sm:mb-40">
                        <h2 className="text-4xl font-bold text-center text-slate-100 mb-12" data-aos="fade-up">A New Creative Toolkit</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                             {/* Large Card */}
                            <div data-aos="fade-up" className="group relative p-8 col-span-1 lg:col-span-2 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#64FFDA]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <Paintbrush2 className="w-12 h-12 text-[#64FFDA] mb-5" />
                                    <h3 className="text-2xl text-slate-100 font-semibold mb-3">AI-Powered Art Studio</h3>
                                    <p className="text-slate-400 leading-relaxed">From abstract concepts to photorealistic images, our AI translates your prompts into breathtaking visuals. Perfect for generating assets, inspiration, or finished masterpieces.</p>
                                </div>
                            </div>
                            {/* Small Card */}
                            <div data-aos="fade-up" data-aos-delay="100" className="group relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-2xl overflow-hidden">
                               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#64FFDA]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <Zap className="w-12 h-12 text-[#64FFDA] mb-5" />
                                    <h3 className="text-2xl text-slate-100 font-semibold mb-3">Creative Automation</h3>
                                    <p className="text-slate-400">Automate repetitive design tasks and get smart suggestions.</p>
                                </div>
                            </div>
                             {/* Small Card */}
                            <div data-aos="fade-up" data-aos-delay="200" className="group relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#64FFDA]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <Layers className="w-12 h-12 text-[#64FFDA] mb-5" />
                                    <h3 className="text-2xl text-slate-100 font-semibold mb-3">Modular Systems</h3>
                                    <p className="text-slate-400">Build with components that are designed to work together perfectly.</p>
                                </div>
                            </div>
                            {/* Large Card */}
                            <div data-aos="fade-up" data-aos-delay="300" className="group relative p-8 col-span-1 lg:col-span-2 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#64FFDA]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <Code2 className="w-12 h-12 text-[#64FFDA] mb-5" />
                                    <h3 className="text-2xl text-slate-100 font-semibold mb-3">Developer-Ready Components</h3>
                                    <p className="text-slate-400 leading-relaxed">Access a library of production-ready React components. Beautifully designed, fully responsive, and easily customizable with TailwindCSS.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* INFINITE SCROLLING TICKER */}
                    <section className="relative w-full overflow-hidden bg-slate-800/30 py-4 my-24 sm:my-32 border-y border-slate-700" data-aos="zoom-in">
                        <div className="flex animate-infinite-scroll group-hover:pause">
                            {techStack.concat(techStack).map((tech, index) => (
                                <div key={index} className="flex items-center mx-6">
                                    <Star className="w-5 h-5 text-[#64FFDA] mr-3" />
                                    <span className="text-lg font-medium text-slate-300 whitespace-nowrap">{tech}</span>
                                </div>
                            ))}
                        </div>
                         <style jsx>{`
                            @keyframes infinite-scroll {
                                from { transform: translateX(0); }
                                to { transform: translateX(-50%); }
                            }
                            .animate-infinite-scroll {
                                display: flex;
                                width: calc(2 * ${techStack.length * 150}px); /* Adjust multiplier based on your content */
                                animation: infinite-scroll 40s linear infinite;
                            }
                            .group-hover\\:pause:hover {
                                animation-play-state: paused;
                            }
                        `}</style>
                    </section>


                    {/* CTA */}
                    <div
                        className="bg-slate-800 mt-28 py-16 px-8 rounded-3xl text-center border border-slate-700 shadow-2xl"
                        data-aos="zoom-in-up"
                    >
                        <BrainCircuit className="w-16 h-16 text-[#64FFDA] mx-auto mb-6 animate-pulse" />
                        <h3 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
                            Ready to Build Smarter?
                        </h3>
                        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
                            Join a growing community of developers and designers leveraging automation, art, and modular code to ship projects faster.
                        </p>
                        <a
                            href="/get-started"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#64FFDA] text-[#0a192f] font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-[#64FFDA]/20 transform hover:scale-105 group"
                        >
                            Start For Free
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </div>

                    <footer className="mt-32 text-center text-slate-500 text-sm">
                        <p className="mb-2">🚀 Powered by the CodeCanverse Team © {new Date().getFullYear()}</p>
                        <p>A new dimension for digital creators.</p>
                    </footer>
                </main>
            </div>
        </>
    );
}