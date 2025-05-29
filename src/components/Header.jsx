import React, { useEffect, useState } from 'react';
import { Menu, LogIn, LogOut } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Header({ onMenuClick }) {
  const [japanTime, setJapanTime] = useState('');
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({ full_name: '', avatar_url: '' });
  const navigate = useNavigate();

  // Update Japan time every second
  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setJapanTime(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch user session and profile
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      const currentUser = session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', currentUser.id)
          .single();

        if (profile) {
          setUserProfile(profile);
        } else {
          console.warn('Profile fetch error:', profileError);
        }
      }
    };

    fetchProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', currentUser.id)
          .single();

        if (profile) {
          setUserProfile(profile);
        }
      } else {
        setUser(null);
        setUserProfile({ full_name: '', avatar_url: '' });
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile({ full_name: '', avatar_url: '' });
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userProfile.full_name || 'User'
  )}&background=random&bold=true&size=128`;

  return (
    <header className="bg-white shadow-sm flex items-center justify-between px-4 py-3 border-b">
      <button onClick={onMenuClick} className="text-gray-600 md:hidden">
        <Menu size={24} />
      </button>

      <h1 className="text-xl font-bold text-gray-800">MindPilot Dashboard</h1>

      <div className="flex items-center gap-5 text-sm text-gray-600">
        <span>🕒 Japan Time: <span className="font-medium">{japanTime}</span></span>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-700">
              Welcome, <strong>{userProfile.full_name || 'User'}</strong>
            </span>
            <img
              src={userProfile.avatar_url || fallbackAvatar}
              alt="User Avatar"
              className="w-9 h-9 rounded-full border shadow-sm"
            />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition"
          >
            <LogIn size={18} />
            Login
          </button>
        )}
      </div>
    </header>
  );
}



