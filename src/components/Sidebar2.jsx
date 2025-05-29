import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  UserCircle,
  MessageCircle,
  Truck,
  Package,
  Wrench,
  User,
  FileText,
  BarChart,
  Clock,
  PlusCircle,
  ChevronDown,
} from "lucide-react";
import { supabase } from "../../supabaseClient";

export default function Sidebar() {
  const [openRequest, setOpenRequest] = useState(true);
  const [openAnalysis, setOpenAnalysis] = useState(false);
  const [userProfile, setUserProfile] = useState({
    full_name: "Loading...",
    avatar_url: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUserProfile({
            full_name: profile.full_name,
            avatar_url: profile.avatar_url || getFallbackAvatar(profile.full_name),
          });
        }
      }
    };

    fetchUserProfile();
  }, []);

  const getFallbackAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&bold=true&size=128`;

  return (
    <aside className="w-64 bg-white border-r h-screen flex flex-col justify-between shadow-md">
      {/* Profile Section */}
      <div>
        <div className="p-4 flex items-center gap-3 border-b">
          <img
            src={userProfile.avatar_url || getFallbackAvatar(userProfile.full_name)}
            className="w-10 h-10 rounded-full"
            alt="Profile"
          />
          <div className="text-sm">
            <p className="font-medium truncate">{userProfile.full_name}</p>
            <p className="text-xs text-gray-500 truncate">Logged In</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-3 text-sm text-gray-700">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem icon={<UserCircle size={18} />} label="Partners" />
          <NavItem icon={<MessageCircle size={18} />} label="Chats" badge={7} />
          <NavItem icon={<Truck size={18} />} label="Tracking" active />

          {/* Request Dropdown */}
          <div>
            <button
              className="flex items-center justify-between w-full font-medium hover:text-pink-600"
              onClick={() => setOpenRequest(!openRequest)}
            >
              <span className="flex items-center gap-2">📂 Request</span>
              <ChevronDown className={`transition-transform ${openRequest ? "rotate-180" : ""}`} size={16} />
            </button>
            {openRequest && (
              <ul className="pl-6 mt-2 space-y-2 text-sm text-gray-600">
                <SubItem icon={<Truck size={14} />} label="Trucks" />
                <SubItem icon={<Package size={14} />} label="Cargos" badge={2} />
                <SubItem icon={<Wrench size={14} />} label="Repair" />
                <SubItem icon={<User size={14} />} label="Drivers" />
                <SubItem icon={<FileText size={14} />} label="Reports" badge={3} />
              </ul>
            )}
          </div>

          {/* Analysis Dropdown */}
          <div>
            <button
              className="flex items-center justify-between w-full font-medium hover:text-pink-600"
              onClick={() => setOpenAnalysis(!openAnalysis)}
            >
              <span className="flex items-center gap-2">
                <BarChart size={18} /> Analysis
              </span>
              <ChevronDown className={`transition-transform ${openAnalysis ? "rotate-180" : ""}`} size={16} />
            </button>
            {openAnalysis && (
              <ul className="pl-6 mt-2 space-y-2 text-sm text-gray-600">
                <SubItem icon={<BarChart size={14} />} label="Sales" />
                <SubItem icon={<Clock size={14} />} label="Timelines" />
              </ul>
            )}
          </div>

          <NavItem icon={<Clock size={18} />} label="History" />
        </nav>
      </div>

      {/* Bottom CTA Button */}
      <div className="p-4">
        <button className="w-full bg-pink-600 text-white text-sm py-2 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-pink-700 transition">
          <PlusCircle size={16} /> Create new request
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, badge = 0, active = false }) {
  return (
    <div
      className={`flex items-center justify-between px-2 py-2 rounded-lg cursor-pointer ${
        active ? "bg-pink-100 text-pink-600 font-semibold" : "hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        {label}
      </div>
      {badge > 0 && (
        <span className="bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}

function SubItem({ icon, label, badge = 0 }) {
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        {label}
      </div>
      {badge > 0 && (
        <span className="bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </li>
  );
}

