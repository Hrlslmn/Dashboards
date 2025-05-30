import React, { useEffect, useState } from 'react';
import { Menu, LogIn, LogOut } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Header({ onMenuClick }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({ full_name: '', avatar_url: '' });
  const navigate = useNavigate();

  // Fetch user session and profile
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session }
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

      <h1 className="text-lg sm:text-xl font-bold text-gray-800 whitespace-nowrap">Fourth Division</h1>

      <div className="flex items-center gap-3 sm:gap-5 text-sm sm:text-base text-gray-600">
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-gray-700 hidden sm:inline">
              Welcome, <strong>{userProfile.full_name || 'User'}</strong>
            </span>
            <img
              src={userProfile.avatar_url || fallbackAvatar}
              alt="User Avatar"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border shadow-sm"
            />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition"
          >
            <LogIn size={18} />
            <span className="hidden sm:inline">Login</span>
          </button>
        )}
      </div>
    </header>
  );
}



