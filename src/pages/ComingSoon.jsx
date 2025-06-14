import React, { useEffect } from "react";
import { ArrowRight, Hourglass, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ComingSoon() {
    useEffect(() => {
        const updateMousePosition = (ev) => {
            const { clientX, clientY } = ev;
            document.documentElement.style.setProperty('--x', `${clientX}px`);
            document.documentElement.style.setProperty('--y', `${clientY}px`);
        };
        window.addEventListener('mousemove', updateMousePosition);

        AOS.init({ once: true, duration: 1000, delay: 100 });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <>
            <style jsx global>{`
                :root {
                    --x: 50%;
                    --y: 50%;
                }
                .spotlight-bg {
                    background: radial-gradient(circle at var(--x) var(--y), rgba(100, 255, 218, 0.08), transparent 30%), #0a192f;
                }
            `}</style>

            <div className="min-h-screen spotlight-bg flex flex-col justify-center items-center text-slate-200 px-4 text-center">
                <Hourglass className="w-16 h-16 text-[#64FFDA] animate-pulse mb-6" />
                <h1 data-aos="fade-up" className="text-4xl sm:text-5xl font-extrabold mb-4 text-slate-100 leading-tight">
                    CodeCanverse is Almost Here.
                </h1>
                <p data-aos="fade-up" data-aos-delay="100" className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
                    We're crafting something magical — a platform where AI, automation, and code come together to supercharge your creative flow.
                </p>

                <a
                    href="mailto:hello@codecanverse.com"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#64FFDA] text-[#0a192f] font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-[#64FFDA]/20 transform hover:scale-105 group"
                >
                    Notify Me on Launch
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <div className="mt-16 flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#64FFDA]" /> AI-Powered Art
                    </span>
                    <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#64FFDA]" /> Developer Components
                    </span>
                    <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#64FFDA]" /> Smart Automation
                    </span>
                </div>

                <footer className="mt-24 text-slate-500 text-xs">
                    🚀 CodeCanverse © {new Date().getFullYear()} • Built for creators and coders
                </footer>
            </div>
        </>
    );
}
