// Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Box,
  MessageSquare,
  CheckSquare,
  DollarSign,
  Bot,
  X
} from 'lucide-react';
import { useAuth } from './AuthContext'; // ✅ use Auth context
import { supabase } from '../../supabaseClient';

export default function Sidebar({ collapsed = false, setCollapsed, isMobile = false, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUserRole = async () => {
      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (!error) {
          setIsAdmin(profile?.is_admin);
        } else {
          console.error('Error fetching profile:', error.message);
        }
      }
    };

    getUserRole();
  }, [user]);

    const navItems = [
      ...(isAdmin ? [{ label: 'Dashboard', icon: LayoutDashboard, path: '/' }] : []),
      { label: 'Product', icon: Box, path: '/products' },
      ...(isAdmin ? [
        { label: 'Chat with AI', icon: Bot, path: '/chat' },
        { label: 'To-do list', icon: CheckSquare, path: '/todo' }
      ] : []),
    ];

  return (
    <aside className={`h-full ${collapsed ? 'w-20' : 'w-64'} bg-[#1f2937] text-white transition-all duration-300`}>
      <div className="h-20 flex items-center justify-between px-4 border-b border-gray-700">
        {!collapsed && <div className="text-2xl font-bold">Fourth Division</div>}
        <button
          onClick={isMobile ? onClose : () => setCollapsed(!collapsed)}
          className="text-white p-2 hover:bg-[#374151] rounded"
        >
          {isMobile ? <X size={20} /> : collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
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




