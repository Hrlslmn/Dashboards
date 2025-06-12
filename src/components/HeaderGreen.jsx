import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Monitor,
    Image,
    Palette,
    LogIn,
    LogOut,
    User,
    Menu,
    X,
    ShieldCheck,
    GitBranch,
} from "lucide-react";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../components/AuthContext";

const navLinks = [
    { icon: <LayoutDashboard size={20} />, label: "Home", path: "/" },
    { icon: <Monitor size={20} />, label: "UI Components", path: "/components" },
    { icon: <Image size={20} />, label: "Designs", path: "/designs" },
    { icon: <Palette size={20} />, label: "Branding", path: "/themes" },
];

export default function HeaderGreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { user, loading } = useAuth();
    const [profile, setProfile] = useState({ full_name: "", is_admin: false });

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                const { data: profileData } = await supabase
                    .from("profiles")
                    .select("full_name, is_admin")
                    .eq("id", user.id)
                    .single();
                setProfile(profileData || { full_name: "User", is_admin: false });
            } else {
                setProfile({ full_name: "", is_admin: false });
            }
        };
        fetchProfile();
    }, [user]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const handleLinkClick = () => setOpen(false);

    return (
        <>
            <header className="bg-slate-900/70 backdrop-blur-xl text-slate-300 sticky top-0 z-40 border-b border-slate-700/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                    {/* Mobile toggle & logo */}
                    <div className="flex items-center gap-3">
                        <button
                            aria-label="Toggle mobile menu"
                            className="md:hidden text-[#64FFDA] hover:text-white focus:outline-none transition-colors z-50"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <X size={26} /> : <Menu size={26} />}
                        </button>
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src="/images/logo.png"
                                alt="CodeCanverse Logo"
                                className="h-[120px] w-auto transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="sr-only">CodeCanverse</span>
                        </Link>
                    </div>

                    {/* Navigation links */}
                    <nav className="hidden md:flex items-center gap-2">
                        {navLinks.map(({ icon, label, path }) => (
                            <Link
                                key={label}
                                to={path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out group ${
                                    location.pathname === path
                                        ? "bg-[#64FFDA]/10 text-[#64FFDA]"
                                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                                }`}
                            >
                                <span className="transition-transform group-hover:scale-110">{icon}</span>
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right-side auth */}
                    <div className="hidden md:flex items-center gap-4">
                        {!loading && user ? (
                            <>
                                {profile.is_admin && (
                                    <span className="flex items-center gap-1.5 text-xs bg-[#64FFDA]/10 text-[#64FFDA] px-3 py-1.5 rounded-full font-semibold">
                                        <ShieldCheck size={14} />
                                        Admin
                                    </span>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-sm text-[#64FFDA] font-semibold px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-[#64FFDA]/10"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            !loading && (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 text-sm bg-[#64FFDA] hover:bg-opacity-90 text-[#0a192f] font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-[#64FFDA]/10 hover:shadow-lg hover:shadow-[#64FFDA]/20"
                                >
                                    <LogIn size={18} />
                                    Login
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            <div
                className={`md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-slate-900 z-30 transition-all duration-300 ease-in-out ${
                    open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
            >
                <nav className="flex flex-col space-y-2 p-6">
                    {navLinks.map(({ icon, label, path }) => (
                        <Link
                            key={label}
                            to={path}
                            onClick={handleLinkClick}
                            className={`flex items-center gap-4 px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                                location.pathname === path
                                    ? "bg-[#64FFDA]/10 text-[#64FFDA]"
                                    : "text-slate-300 hover:text-[#64FFDA] hover:bg-slate-800"
                            }`}
                        >
                            {icon}
                            {label}
                        </Link>
                    ))}
                    <div className="border-t border-slate-700 my-4 !mt-6 pt-6">
                        {!loading && user ? (
                            <div className="flex flex-col items-start gap-4">
                                {profile.is_admin && (
                                    <span className="flex items-center gap-1.5 text-xs bg-[#64FFDA]/10 text-[#64FFDA] px-3 py-1.5 rounded-full font-semibold">
                                        <ShieldCheck size={14} />
                                        Admin
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        handleLinkClick();
                                        handleLogout();
                                    }}
                                    className="w-full flex items-center gap-4 px-4 py-3 rounded-md text-base font-medium text-slate-300 hover:text-[#64FFDA] hover:bg-slate-800"
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            !loading && (
                                <Link
                                    to="/login"
                                    onClick={handleLinkClick}
                                    className="w-full flex items-center gap-2 text-sm bg-[#64FFDA] hover:bg-opacity-90 text-[#0a192f] font-semibold px-4 py-3 rounded-lg transition-colors duration-200 justify-center"
                                >
                                    <LogIn size={18} />
                                    Login
                                </Link>
                            )
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
}
