import React from "react";
import {
  Home,
  Users,
  Lock,
  Settings,
  LifeBuoy,
  MessageSquare,
  BarChart2,
  ShoppingBag,
  UserPlus,
} from "lucide-react";

// Sidebar navigation items
const navLinks = [
  { icon: <Home size={20} />, label: "Home" },
  { icon: <Users size={20} />, label: "User Control" },
  { icon: <UserPlus size={20} />, label: "Access Request" },
  { icon: <BarChart2 size={20} />, label: "Admin" },
  { icon: <Settings size={20} />, label: "Settings" },
  { icon: <LifeBuoy size={20} />, label: "Support" },
  { icon: <MessageSquare size={20} />, label: "Chat" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-[#e6f0ea] font-['Inter',sans-serif]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#3db382] flex flex-col justify-between rounded-2xl m-4 shadow-2xl transition-all duration-500">
        <div>
          <h1 className="text-2xl font-bold text-white mb-10 ml-4 mt-4 tracking-tight">
            M - SoftTech
          </h1>
          <nav className="space-y-2">
            {navLinks.map((item, idx) => (
              <NavItem key={idx} icon={item.icon} label={item.label} />
            ))}
          </nav>
        </div>
        <div className="text-center my-6">
          <div className="flex items-center justify-center">
            <img
              src="https://img.icons8.com/fluency/96/000000/online-support.png"
              alt="support"
              className="w-16 h-16 rounded-full border-4 border-white shadow-md"
            />
          </div>
          <div className="text-xs text-white mt-2">24/7 Support service</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 pt-6 pb-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-[#3db382]">Dashboard</h2>
          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow hover:shadow-lg transition">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-[#3db382]"
            />
            <span className="font-medium text-[#2f855a] text-sm">
              Haris Ashraf
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-7">
          <StatCard
            icon={<ShoppingBag className="text-[#3db382]" size={32} />}
            title="Sales"
            value="67,343"
            subtitle="↑ 5.5% from last month"
            color="green"
          />
          <StatCard
            icon={<Lock className="text-[#3db382]" size={32} />}
            title="Purchases"
            value="2,343"
            subtitle="↓ 2.1% from last month"
            color="red"
          />
          <StatCard
            icon={<BarChart2 className="text-[#3db382]" size={32} />}
            title="Orders"
            value="35,343"
            subtitle="↑ 5.5% from last month"
            color="green"
          />
        </div>

        {/* 3 Main Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overview */}
          <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between animate-fadeIn">
            <h3 className="font-semibold text-[#3db382] mb-4">Overview</h3>
            {["+1345", "-2345", "-1345", "-2345"].map((val, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center px-3 py-2 mb-2 rounded transition 
                ${idx === 0 ? "bg-[#e6f0ea] font-bold" : ""}
                hover:bg-[#f4f6f8]`}
              >
                <span>Member Profit</span>
                <span
                  className={`font-semibold ${
                    val.startsWith("+") ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Total Sale */}
          <div className="bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-5 animate-fadeIn">
            <h3 className="font-semibold text-[#3db382] mb-5">Total Sale</h3>
            <div className="relative flex items-center justify-center mb-3">
              {/* Animated Circle Progress */}
              <svg className="w-24 h-24" viewBox="0 0 36 36">
                <path
                  className="text-[#e6f0ea]"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#3db382] transition-all duration-700"
                  strokeDasharray="70, 100"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text
                  x="50%"
                  y="54%"
                  textAnchor="middle"
                  fill="#3db382"
                  fontSize="11"
                  fontWeight="bold"
                  dy=".3em"
                >
                  70%
                </text>
              </svg>
            </div>
            <button className="mt-3 px-4 py-1 rounded-full bg-[#e6f0ea] text-[#3db382] text-xs font-semibold shadow hover:bg-[#3db382] hover:text-white transition">
              View All
            </button>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-xl shadow-lg p-5 animate-fadeIn flex flex-col">
            <h3 className="font-semibold text-[#3db382] mb-4">Activity</h3>
            <ul className="space-y-3 flex-1">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-400">●</span>
                <span className="text-xs text-gray-700">
                  Lorem Ipsum is simply dummy text of the printing industry.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-green-500">●</span>
                <span className="text-xs text-gray-700">
                  Lorem Ipsum is simply dummy text of the printing industry.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-red-500">●</span>
                <span className="text-xs text-gray-700">
                  Lorem Ipsum is simply dummy text of the printing industry.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-400">●</span>
                <span className="text-xs text-gray-700">
                  Lorem Ipsum is simply dummy text of the printing industry.
                </span>
              </li>
            </ul>
            <button className="mt-5 px-4 py-1 rounded-full bg-[#e6f0ea] text-[#3db382] text-xs font-semibold shadow hover:bg-[#3db382] hover:text-white transition">
              View All
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sidebar navigation item with hover/active effects
function NavItem({ icon, label }) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-2.5 rounded-lg cursor-pointer transition 
      text-white text-base font-medium hover:bg-[#267554] hover:scale-[1.05] shadow-sm active:scale-95"
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

// Stats card with animated elevation
function StatCard({ icon, title, value, subtitle, color }) {
  return (
    <div className="relative bg-white rounded-xl shadow-lg p-5 flex flex-col gap-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center bg-[#e6f0ea] rounded-full w-12 h-12 shadow group-hover:bg-[#3db382] group-hover:text-white transition">
        {icon}
      </div>
      <div className="mt-8" />
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-extrabold text-gray-800">{value}</div>
      <div
        className={`text-xs ${
          color === "green" ? "text-green-600" : "text-red-500"
        }`}
      >
        {subtitle}
      </div>
    </div>
  );
}
