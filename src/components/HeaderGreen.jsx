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
  ShieldCheck // Example for a potential new icon or admin icon
} from "lucide-react";
import { supabase } from "../../supabaseClient"; //

const navLinks = [
  { icon: <LayoutDashboard size={20} />, label: "Home", path: "/" }, //
  { icon: <Monitor size={20} />, label: "React Components", path: "/components" }, //
  { icon: <Image size={20} />, label: "Graphic Designs", path: "/designs" }, //
  { icon: <Palette size={20} />, label: "AI Branding Board", path: "/themes" }, //
];

export default function HeaderGreen() {
  const location = useLocation(); //
  const navigate = useNavigate(); //
  const [open, setOpen] = useState(false); //
  const [user, setUser] = useState(null); //
  const [profile, setProfile] = useState({ full_name: "", is_admin: false }); //

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user: authUser }, error } = await supabase.auth.getUser(); //
      if (error || !authUser) {
        setUser(null); // Ensure user is null if fetch fails or no user
        setProfile({ full_name: "", is_admin: false });
        return;
      }

      setUser(authUser); //

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, is_admin")
        .eq("id", authUser.id)
        .single(); //

      if (!profileError && profileData) {
        setProfile(profileData); //
      } else {
         setProfile({ full_name: "User", is_admin: false }); // Default if profile fetch fails
      }
    };

    fetchUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
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
    document.body.style.overflow = open ? "hidden" : "auto"; //
  }, [open]); //

  const handleLogout = async () => {
    await supabase.auth.signOut(); //
    // State updates will be handled by onAuthStateChange
    navigate("/login"); //
  };

  return (
    <header className="bg-slate-900/80 backdrop-blur-lg text-neutral-200 sticky top-0 z-50 shadow-xl border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-amber-400 hover:text-amber-300 focus:outline-none transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
          <Link to="/" className="flex items-center gap-2 group">
            {/* You can replace this with an SVG logo */}
            <Palette size={28} className="text-amber-400 group-hover:text-amber-300 transition-colors duration-300 transform group-hover:rotate-[-12deg]"/>
            <h1 className="text-xl font-bold text-amber-400 group-hover:text-amber-300 tracking-tight transition-colors duration-300">
              Codecanverse
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
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

        {/* User Info / Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {profile.is_admin && (
                <span className="hidden sm:flex items-center gap-1.5 text-xs bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full font-medium border border-sky-500/30">
                  <ShieldCheck size={14} />
                  Admin
                </span>
              )}
               <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-1.5 rounded-lg transition-colors duration-200 shadow hover:shadow-md"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
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

      {/* Mobile Side Drawer */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Drawer Panel */}
          <div className={`fixed top-0 left-0 h-full w-72 bg-slate-900/95 backdrop-blur-xl shadow-2xl z-50 animate-slideIn border-r border-slate-700/50 md:hidden`}>
            <div className="p-6 space-y-2">
              <div className="flex justify-between items-center mb-6">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 group">
                    <Palette size={26} className="text-amber-400 group-hover:text-amber-300 transition-colors duration-300 transform group-hover:rotate-[-12deg]"/>
                    <h2 className="text-lg font-bold text-amber-400 group-hover:text-amber-300 transition-colors">Codecanverse</h2>
                </Link>
                <button onClick={() => setOpen(false)} className="text-neutral-400 hover:text-amber-400">
                    <X size={24}/>
                </button>
              </div>

              {navLinks.map(({ icon, label, path }) => (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ease-in-out group
                    ${
                      location.pathname === path
                        ? "bg-amber-400/10 text-amber-300 shadow-inner"
                        : "text-neutral-200 hover:bg-slate-700/70 hover:text-amber-400"
                    }`}
                >
                  {icon}
                  {label}
                </Link>
              ))}

              <div className="pt-6 border-t border-slate-700/50">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2 mb-3 text-neutral-300">
                        <User size={20} />
                        <span className="font-medium">{profile.full_name || "User"}</span>
                        {profile.is_admin && (
                            <span className="ml-auto text-xs bg-sky-500/20 text-sky-400 px-2.5 py-1 rounded-full font-medium border border-sky-500/30">
                            Admin
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => {handleLogout(); setOpen(false);}}
                        className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-base bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-semibold transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-base bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-semibold transition-colors"
                  >
                    <LogIn size={20} />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}