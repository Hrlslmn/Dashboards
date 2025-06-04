import React from 'react';
import { LayoutDashboard, BarChart, Users, Settings, Bell, LogOut } from 'lucide-react';

const stats = [
  { title: 'Total Users', value: '8,542', icon: <Users className="w-5 h-5" />, color: 'bg-[#F4E7E1] text-[#521C0D]' },
  { title: 'Revenue', value: '$45,310', icon: <BarChart className="w-5 h-5" />, color: 'bg-[#FF9B45] text-white' },
  { title: 'Sessions', value: '1,320', icon: <LayoutDashboard className="w-5 h-5" />, color: 'bg-[#D5451B] text-white' },
  { title: 'Updates', value: '12', icon: <Settings className="w-5 h-5" />, color: 'bg-[#521C0D] text-white' },
];

const notifications = [
  '🧾 New invoice created',
  '👤 New admin added',
  '📈 Weekly traffic spike',
  '🔔 Settings backup complete'
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#F4E7E1] shadow-lg px-6 py-8 hidden md:block">
        <h1 className="text-2xl font-bold text-[#521C0D] mb-10">BrandDash</h1>
        <nav className="space-y-4 text-[#521C0D] font-medium">
          <a href="#" className="flex items-center gap-3 hover:text-[#D5451B]">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-[#D5451B]">
            <Users className="w-5 h-5" /> Users
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-[#D5451B]">
            <Settings className="w-5 h-5" /> Settings
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-[#D5451B]">
            <LogOut className="w-5 h-5" /> Logout
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-gray-50 p-6">
        {/* Topbar */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#521C0D]">Dashboard Overview</h2>
          <div className="flex gap-4 items-center">
            <Bell className="w-5 h-5 text-[#D5451B]" />
            <div className="w-10 h-10 rounded-full bg-[#FF9B45] text-white flex items-center justify-center font-bold">HR</div>
          </div>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-xl p-5 shadow-md flex justify-between items-center" style={{ backgroundColor: stat.color.includes('#') ? stat.color.split(' ')[0].replace('bg-', '') : '' }}>
              <div>
                <p className="text-sm text-gray-700 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-[#521C0D] mb-4">Performance Chart</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              (Insert Chart.js or Recharts Here)
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-[#521C0D] mb-4">Notifications</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {notifications.map((note, i) => (
                <li key={i}>🔸 {note}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
