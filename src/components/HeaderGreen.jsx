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
} from "lucide-react";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../components/AuthContext";

const navLinks = [
  { icon: <LayoutDashboard size={22} />, label: "Home", path: "/" },
  { icon: <Monitor size={22} />, label: "Tailwind UI Components", path: "/components" },
  { icon: <Image size={22} />, label: "Graphic Designs", path: "/designs" },
  { icon: <Palette size={22} />, label: "AI Branding Board", path: "/themes" },
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
    document.body.classList.toggle("mobile-menu-open", open);
    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [open]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleLinkClick = () => setOpen(false);

  return (
    <>
      <header className="bg-slate-900/80 backdrop-blur-lg text-neutral-200 sticky top-0 z-40 shadow-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle mobile menu"
              className="md:hidden text-amber-400 hover:text-amber-300 focus:outline-none transition-colors z-50"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
            <Link to="/" className="flex items-center gap-2 group">
              <Palette size={28} className="text-amber-400 group-hover:text-amber-300 transition-colors transform group-hover:rotate-[-12deg]" />
              <h1 className="text-xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                Code Canverse
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map(({ icon, label, path }) => (
              <Link
                key={label}
                to={path}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out group ${
                  location.pathname === path
                    ? "bg-amber-400/10 text-amber-300 shadow-inner"
                    : "text-neutral-300 hover:bg-slate-700/50 hover:text-amber-400"
                }`}
              >
                <span className={`${location.pathname === path ? "" : "group-hover:scale-110"} transition-transform`}>
                  {icon}
                </span>
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {!loading && user ? (
              <>
                {profile.is_admin && (
                  <span className="flex items-center gap-1.5 text-xs bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full font-medium border border-sky-500/30">
                    <ShieldCheck size={14} />
                    Admin
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-1.5 rounded-lg transition-colors duration-200 shadow hover:shadow-md"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              !loading && (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-sm bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-1.5 rounded-lg transition-colors duration-200 shadow hover:shadow-md"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              )
            )}
          </div>
        </div>
      </header>

      {/* ✅ Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700 shadow-lg z-30 relative">
          <nav className="flex flex-col space-y-2 px-6 py-4">
            {navLinks.map(({ icon, label, path }) => (
              <Link
                key={label}
                to={path}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === path
                    ? "bg-amber-500/20 text-amber-300"
                    : "text-neutral-300 hover:text-amber-400 hover:bg-slate-700/40"
                }`}
              >
                {icon}
                {label}
              </Link>
            ))}

            {!loading && user ? (
              <>
                {profile.is_admin && (
                  <span className="flex items-center gap-1.5 text-xs bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full font-medium border border-sky-500/30">
                    <ShieldCheck size={14} />
                    Admin
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="mt-2 flex items-center gap-2 text-sm bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="mt-2 flex items-center gap-2 text-sm bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <LogIn size={18} />
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
