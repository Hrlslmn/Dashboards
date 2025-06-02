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
} from "lucide-react";
import { supabase } from "../../supabaseClient";

const navLinks = [
  { icon: <LayoutDashboard size={18} />, label: "Home", path: "/" },
  { icon: <Monitor size={18} />, label: "React Components", path: "/components" },
  { icon: <Image size={18} />, label: "Graphic Designs", path: "/designs" },
  { icon: <Palette size={18} />, label: "AI Branding Board", path: "/themes" },
];

export default function HeaderGreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ full_name: "", is_admin: false });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return;

      setUser(user);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, is_admin")
        .eq("id", user.id)
        .single();

      if (!profileError && profileData) {
        setProfile(profileData);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile({ full_name: "", is_admin: false });
    navigate("/login");
  };

  return (
    <header className="bg-[#222831] text-[#EEEEEE] sticky top-0 z-50 shadow-sm border-b border-[#393E46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-[#FFD369] focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold text-[#FFD369] tracking-tight">Codecanverse</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(({ icon, label, path }) => (
            <Link
              key={label}
              to={path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                location.pathname === path
                  ? "bg-[#FFD369] text-[#222831]"
                  : "hover:bg-[#393E46] text-[#EEEEEE]"
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>

        {/* User Info / Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <User size={18} />
              <span className="text-sm font-medium">{profile.full_name}</span>
              {profile.is_admin && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-[#FFD369] text-[#222831] rounded-full">
                  Admin
                </span>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm bg-[#FFD369] text-[#222831] px-3 py-1 rounded-md hover:bg-yellow-400 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm bg-[#FFD369] text-[#222831] px-3 py-1 rounded-md hover:bg-yellow-400 transition"
            >
              <LogIn size={16} />
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 left-0 h-full w-64 bg-[#222831] shadow-xl z-50 animate-slideIn">
            <div className="p-5 space-y-4">
              <h2 className="text-lg font-semibold text-[#FFD369]">Menu</h2>

              {navLinks.map(({ icon, label, path }) => (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === path
                      ? "bg-[#FFD369] text-[#222831]"
                      : "text-[#EEEEEE] hover:bg-[#393E46]"
                  }`}
                >
                  {icon}
                  {label}
                </Link>
              ))}

              <div className="pt-4 border-t border-[#393E46]">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-[#FFD369] text-[#222831] rounded-md hover:bg-yellow-400"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-[#FFD369] text-[#222831] rounded-md hover:bg-yellow-400"
                  >
                    <LogIn size={18} />
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
