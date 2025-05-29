import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Box,
  Store,
  MessageSquare,
  BarChart2,
  FileText,
  CheckSquare,
  DollarSign,
  Bot,
  X
} from 'lucide-react'; // added Bot icon for Chat with AI

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Product', icon: Box, path: '/products' },
  { label: 'Messages', icon: MessageSquare, path: '/messages' },
  { label: 'Chat with AI', icon: Bot, path: '/chat' }, // ✅ Added this line
  { label: 'To-do list', icon: CheckSquare, path: '/todo' },
  { label: 'Finances', icon: DollarSign, path: '/finances' },
];

export default function Sidebar({ collapsed = false, setCollapsed, isMobile = false, onClose }) {
  const navigate = useNavigate();

  return (
    <aside className={`h-full ${collapsed ? 'w-20' : 'w-64'} bg-[#1f2937] text-white transition-all duration-300`}>
      <div className="h-20 flex items-center justify-between px-4 border-b border-gray-700">
        {!collapsed && <div className="text-2xl font-bold">Artifex AI</div>}

        <button
          onClick={isMobile ? onClose : () => setCollapsed(!collapsed)}
          className="text-white p-2 hover:bg-[#374151] rounded"
        >
          {isMobile
            ? <X size={20} />
            : collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />
          }
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map(({ label, icon: Icon, path }) => (
          <div
            key={label}
            onClick={() => navigate(path)}
            className="flex items-center gap-3 p-2 rounded hover:bg-[#374151] cursor-pointer transition"
          >
            <Icon className="w-5 h-5" />
            {!collapsed && <span>{label}</span>}
          </div>
        ))}
      </nav>
    </aside>
  );
}



