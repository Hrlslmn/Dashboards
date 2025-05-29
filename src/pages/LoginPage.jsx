import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Login successful');
      setTimeout(() => navigate('/'), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-indigo-200 dark:from-gray-900 dark:to-indigo-950 px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex w-full max-w-5xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-indigo-200 dark:border-gray-800">
        
        {/* Side Graphic Panel */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 w-1/2 p-10">
          <h2 className="text-4xl font-bold mb-3 text-white">Welcome Back 👋</h2>
          <p className="text-base text-center leading-relaxed text-white/90">
            Sign in to manage your <br /> Artifex workspace
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="w-full md:w-1/2 p-10 flex flex-col justify-center dark:text-white"
        >
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
            Login to Artifex
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm dark:text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 accent-indigo-600"
              />
              Remember me
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Sign In
          </button>

          <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
            Don’t have an account?{' '}
            <a href="/signup" className="text-indigo-600 hover:underline font-medium dark:text-indigo-400">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

