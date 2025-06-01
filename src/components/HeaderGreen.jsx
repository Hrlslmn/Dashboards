import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Monitor,
  Image,
  Palette,
  FolderKanban,
  Menu,
  X,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { supabase } from "../../supabaseClient";

const navLinks = [
  { icon: <LayoutDashboard size={18} />, label: "Overview", path: "/" },
  { icon: <Monitor size={18} />, label: "React Components", path: "/components" },
  { icon: <Image size={18} />, label: "Graphic Designs", path: "/designs" },
  { icon: <Palette size={18} />, label: "AI Branding Board", path: "/themes" },
  { icon: <FolderKanban size={18} />, label: "Collections", path: "/collections" },
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
          <h1 className="text-xl font-bold text-[#FFD369] tracking-tight">Artifex</h1>
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

      {/* Mobile Dropdown */}
      {open && (
        <nav className="md:hidden px-4 pb-4 bg-[#222831] border-t border-[#393E46]">
          {navLinks.map(({ icon, label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition text-sm ${
                location.pathname === path
                  ? "bg-[#FFD369] text-[#222831]"
                  : "text-[#EEEEEE] hover:bg-[#393E46]"
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}

          {/* Auth Mobile */}
          <div className="mt-3 border-t border-[#393E46] pt-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm bg-[#FFD369] text-[#222831] rounded-md hover:bg-yellow-400"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-[#FFD369] text-[#222831] rounded-md hover:bg-yellow-400"
              >
                <LogIn size={16} />
                Login
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

