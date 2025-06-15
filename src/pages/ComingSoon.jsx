import React, { useEffect } from "react";
import { Hourglass, Sparkles, Code, Wind } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ComingSoon() {
    useEffect(() => {
        const updateMousePosition = (ev) => {
            // GSAP might be better for performance here, but this is fine for a simple effect.
            const { clientX, clientY } = ev;
            document.documentElement.style.setProperty('--x', `${clientX}px`);
            document.documentElement.style.setProperty('--y', `${clientY}px`);
        };

        window.addEventListener('mousemove', updateMousePosition);

        AOS.init({
            once: true,
            duration: 1200, // Slightly longer duration for a smoother feel
            easing: 'ease-out-cubic', // A more refined easing function
        });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <>
            {/* Using styled-jsx for component-scoped and global styles */}
            <style jsx global>{`
                :root {
                    --x: 50%;
                    --y: 50%;
                    --brand-color: #7DF9FF; /* Electric Blue, for a more modern tech feel */
                    --background-color: #020c1b; /* A deeper, darker navy */
                    --light-background-color: #0a192f;
                    --text-primary: #e6f1ff;
                    --text-secondary: #a8b2d1;
                }
                body {
                    background-color: var(--background-color);
                }
                .spotlight-bg {
                    background: radial-gradient(circle at var(--x) var(--y), rgba(125, 249, 255, 0.07), transparent 40%), var(--background-color);
                    color: var(--text-secondary);
                }
                .brand-text {
                    color: var(--brand-color);
                }
                /* Adding a subtle glow to the brand text for emphasis */
                .brand-glow {
                    text-shadow: 0 0 8px rgba(125, 249, 255, 0.3);
                }
            `}</style>

            <div className="min-h-screen spotlight-bg flex flex-col justify-center items-center px-4 text-center overflow-hidden">

                <div data-aos="fade-down" data-aos-delay="100">
                    <Hourglass className="w-16 h-16 brand-text animate-spin" style={{ animationDuration: '3s' }} />
                </div>

                <h1 data-aos="fade-up" data-aos-delay="200" className="text-4xl sm:text-6xl font-black mt-8 mb-4 text-primary leading-tight brand-glow">
                    Something <span className="brand-text">Awesome</span> is Coming
                </h1>

                <p data-aos="fade-up" data-aos-delay="400" className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                    Welcome to <span className="font-semibold text-white">CodeCanverse</span>. We're building a next-generation platform to merge AI-driven creativity with powerful development tools. Get ready to innovate faster.
                </p>

                <div data-aos="fade-up" data-aos-delay="600" className="flex flex-col sm:flex-row items-center justify-center gap-6 text-base">
                    <FeatureItem icon={<Code />} text="Intuitive Components" />
                    <FeatureItem icon={<Sparkles />} text="AI-Powered Design" />
                    <FeatureItem icon={<Wind />} text="Workflow Automation" />
                </div>

                <footer className="absolute bottom-6 text-xs text-slate-600">
                    CodeCanverse © {new Date().getFullYear()} | The future of creation is loading...
                </footer>
            </div>
        </>
    );
}

// A reusable component for feature items to keep the main return block clean
const FeatureItem = ({ icon, text }) => (
    <div className="flex items-center gap-3 bg-[var(--light-background-color)] bg-opacity-50 border border-slate-800 px-4 py-2 rounded-full">
        <span className="brand-text">{React.cloneElement(icon, { className: "w-5 h-5" })}</span>
        <span className="text-sm font-medium text-slate-300">{text}</span>
    </div>
);