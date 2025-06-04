import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient'; // Assuming this path is correct
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
    AOS.init({ duration: 1000, once: true, delay: 100 }); // Slightly longer duration for smoother effect
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Login successful! Redirecting...');
      // Optionally, handle rememberMe logic here (e.g., set session persistence)
      setTimeout(() => navigate('/'), 1500);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 px-4 py-12 font-sans relative overflow-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          className: '!bg-gray-700 !text-white shadow-xl border !border-gray-600', // Modernized toast
          success: { iconTheme: { primary: '#8B5CF6', secondary: 'white' } }, // Purple for success
          error: { iconTheme: { primary: '#F472B6', secondary: 'white' } }, // Pink for error
        }}
      />

      {/* Enhanced Ambient Glow Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 -left-1/4 w-full h-full md:w-[120%] md:h-[120%] bg-gradient-radial from-purple-600/12 via-purple-600/0 to-transparent blur-[100px] rounded-full animate-pulse-slower" />
        <div className="absolute -bottom-1/3 -right-1/4 w-full h-full md:w-[120%] md:h-[120%] bg-gradient-radial from-sky-500/12 via-sky-500/0 to-transparent blur-[100px] rounded-full animate-pulse-slower animation-delay-4000" />
      </div>

      <div
        data-aos="fade-up" // Changed animation for a smoother entrance
        data-aos-duration="800"
        className="relative z-10 w-full max-w-md bg-gray-800/70 backdrop-blur-lg border border-gray-700/60 rounded-xl shadow-2xl" // Slightly less rounded, more standard blur
      >
        <div className="p-8 sm:p-10 md:p-12"> {/* Consistent padding */}
          <div className="text-center mb-10"> {/* Increased bottom margin */}
            {/* Removed GIF for a cleaner, typography-focused design */}
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 leading-tight tracking-tight">
              Welcome to Code Canverse
            </h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base">Sign in to continue your journey.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3.5 pl-12 pr-4 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500 shadow-sm transition-colors duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full p-3.5 pl-12 pr-12 border border-gray-600 bg-gray-700/50 text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500 shadow-sm transition-colors duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
              <label className="flex items-center text-gray-300 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 h-4 w-4 rounded border-gray-500 bg-gray-700 text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
                />
                <span className="group-hover:text-gray-100 transition-colors duration-200">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200 font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white py-3.5 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <LogInIcon size={22} />
              Sign In
            </button>

            <p className="text-sm text-center pt-4 text-gray-400">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 hover:underline font-semibold transition-colors duration-200">
                Sign Up Free
              </Link>
            </p>
          </form>
        </div>
      </div>

      <footer className="absolute bottom-6 text-center w-full text-gray-500 text-xs z-20">
        &copy; {new Date().getFullYear()} Codecanverse. All rights reserved.
      </footer>

      <style>{`
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.03; transform: scale(0.9); }
          50% { opacity: 0.1; transform: scale(1); }
        }
        .animate-pulse-slower {
          animation: pulse-slower 12s infinite ease-in-out;
        }
        .animation-delay-4000 { /* Slightly adjusted delay */
          animation-delay: 4s;
        }
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 30%, var(--tw-gradient-to) 70%);
        }
        // Custom focus style for checkbox if needed, Tailwind handles most
        // input[type="checkbox"]:focus {
        //   box-shadow: 0 0 0 2px var(--tw-ring-offset-color), 0 0 0 4px var(--tw-ring-color);
        // }
      `}</style>
    </div>
  );
}


