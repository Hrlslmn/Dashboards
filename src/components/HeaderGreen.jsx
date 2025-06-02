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
  ShieldCheck
} from "lucide-react";
import { supabase } from "../../supabaseClient"; // Ensure this path is correct

const navLinks = [
  { icon: <LayoutDashboard size={22} />, label: "Home", path: "/" },
  { icon: <Monitor size={22} />, label: "React Components", path: "/components" },
  { icon: <Image size={22} />, label: "Graphic Designs", path: "/designs" },
  { icon: <Palette size={22} />, label: "AI Branding Board", path: "/themes" },
];

export default function HeaderGreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ full_name: "", is_admin: false });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user: authUser }, error } = await supabase.auth.getUser();
      if (error || !authUser) {
        setUser(null);
        setProfile({ full_name: "", is_admin: false });
        return;
      }
      setUser(authUser);
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, is_admin")
        .eq("id", authUser.id)
        .single();
      if (!profileError && profileData) {
        setProfile(profileData);
      } else {
        setProfile({ full_name: "User", is_admin: false });
      }
    };
    fetchUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        if (currentUser) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("full_name, is_admin")
            .eq("id", currentUser.id)
            .single();
          if (!profileError && profileData) {
            setProfile(profileData);
          } else {
            setProfile({ full_name: "User", is_admin: false });
          }
        } else {
          setProfile({ full_name: "", is_admin: false });
        }
      }
    );
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    if (open) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  }, [open]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false); 
    navigate("/login");
  };

  const handleLinkClick = () => {
    setOpen(false); 
  };

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
              <Palette size={28} className="text-amber-400 group-hover:text-amber-300 transition-colors duration-300 transform group-hover:rotate-[-12deg]"/>
              <h1 className="text-xl font-bold text-amber-400 group-hover:text-amber-300 tracking-tight transition-colors duration-300">
                Codecanverse
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map(({ icon, label, path }) => (
              <Link
                key={label}
                to={path}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out group
                  ${
                    location.pathname === path
                      ? "bg-amber-400/10 text-amber-300 shadow-inner"
                      : "text-neutral-300 hover:bg-slate-700/50 hover:text-amber-400"
                  }`}
              >
                <span className={`transition-transform duration-200 ${location.pathname === path ? "" : "group-hover:scale-110"}`}>{icon}</span>
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
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
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-1.5 rounded-lg transition-colors duration-200 shadow hover:shadow-md"
              >
                <LogIn size={18} />
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* --- Full-Screen Mobile Menu Overlay --- */}
      <div
        className={`
          fixed inset-0 z-50 
          bg-gray-900/95 backdrop-blur-md 
          p-6 flex flex-col
          transition-opacity duration-300 ease-in-out 
          md:hidden 
          ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        {/* Top Section: Logo and Close Button */}
        <div className="flex justify-between items-center mb-10 flex-shrink-0">
          <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2 group">
            <Palette size={30} className="text-amber-400 group-hover:text-amber-300 transition-colors duration-300 transform group-hover:rotate-[-12deg]"/>
            <h2 className="text-2xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">Codecanverse</h2>
          </Link>
          <button onClick={() => setOpen(false)} aria-label="Close mobile menu" className="text-neutral-300 hover:text-amber-400 p-2">
            <X size={28}/>
          </button>
        </div>

        {/* Navigation Links - Centered and takes up available space */}
        <nav className="flex flex-col items-center justify-center gap-y-6 my-auto text-center overflow-y-auto">
          {navLinks.map(({ icon, label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={handleLinkClick}
              className={`
                w-full max-w-xs flex items-center justify-center gap-3.5 px-6 py-4 rounded-lg 
                text-xl font-medium transition-colors duration-200 ease-in-out group
                ${
                  location.pathname === path
                    ? "bg-amber-400/15 text-amber-300"
                    : "text-neutral-100 hover:bg-gray-700/70 hover:text-amber-300"
                }
              `}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Auth Section - At the bottom */}
        <div className="pt-8 mt-auto border-t border-gray-700/50 flex-shrink-0">
          {user ? (
            <>
              <div className="flex items-center justify-center gap-3 px-3 text-neutral-200">
                <User size={22} />
                <span className="font-medium text-lg truncate">{profile.full_name || "User"}</span>
                {profile.is_admin && (
                  <span className="ml-2 text-xs bg-sky-500/20 text-sky-400 px-2.5 py-1 rounded-full font-medium border border-sky-500/30 flex-shrink-0">
                    Admin
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-lg bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-semibold transition-colors mt-4" // Added mt-4 for spacing
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={handleLinkClick}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-lg bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-semibold transition-colors"
            >
              <LogIn size={20} />
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}