import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Mail, Lock, LogIn as LogInIcon, Eye, EyeOff } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, delay: 100 });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8 font-sans relative overflow-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          className: '!bg-slate-700 !text-white shadow-lg',
          success: { iconTheme: { primary: '#34D399', secondary: 'white' } },
          error: { iconTheme: { primary: '#F87171', secondary: 'white' } },
        }}
      />

      {/* Ambient Glow Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/3 w-[150%] h-[150%] bg-gradient-radial from-amber-700/15 via-amber-700/0 to-transparent blur-3xl rounded-full animate-pulse-slower" />
        <div className="absolute -bottom-1/2 -right-1/3 w-[150%] h-[150%] bg-gradient-radial from-sky-700/15 via-sky-700/0 to-transparent blur-3xl rounded-full animate-pulse-slower animation-delay-3000" />
      </div>

      <div
        data-aos="zoom-in-up"
        className="relative z-10 w-full max-w-md sm:max-w-lg bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl"
      >
        <div className="p-8 sm:p-10 md:p-12">
          <div className="text-center mb-8">
            <img
              src="images/login-img.gif"
              alt="Login Theme Graphic"
              className="mx-auto w-32 h-auto mb-6 rounded-lg opacity-80 transition-opacity"
            />
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 leading-tight tracking-tight">
              Login to Codecanverse
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3.5 pl-12 border border-slate-600/70 bg-slate-700/40 text-neutral-100 rounded-xl focus:ring-2 focus:ring-amber-500 placeholder-neutral-400 shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full p-3.5 pl-12 pr-12 border border-slate-600/70 bg-slate-700/40 text-neutral-100 rounded-xl focus:ring-2 focus:ring-amber-500 placeholder-neutral-400 shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-amber-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
              <label className="flex items-center text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2.5 h-4 w-4 rounded border-slate-500 text-amber-500"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-amber-400 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 py-3.5 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/40"
            >
              <LogInIcon size={22} />
              Sign In
            </button>

            <p className="text-sm text-center mt-8 text-neutral-400">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-amber-400 hover:underline font-semibold">
                Sign Up Free
              </Link>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.03; transform: scale(0.9); }
          50% { opacity: 0.1; transform: scale(1); }
        }
        .animate-pulse-slower {
          animation: pulse-slower 12s infinite ease-in-out;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 30%, var(--tw-gradient-to) 70%);
        }
      `}</style>
    </div>
  );
}


