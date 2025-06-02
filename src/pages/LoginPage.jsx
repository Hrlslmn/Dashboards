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
    setTimeout(() => navigate('/'), 1500); // This goes to Overview
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#222831] px-4 font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex w-full max-w-5xl bg-[#393E46] shadow-2xl rounded-3xl overflow-hidden border border-[#393E46] text-[#EEEEEE]">
        
        {/* Side Graphic Panel */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#FFD369] to-[#f5c84c] w-1/2 p-10">
          <h2 className="text-4xl font-bold mb-3 text-[#222831]">Welcome Back 👋</h2>
          <img
            src="/images/login-img.gif"
            alt="Login Graphic"
            className="mt-6 w-[250px] h-auto drop-shadow-lg"
          />
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="w-full md:w-1/2 p-10 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-[#FFD369]">
            Login to Code Canvas
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-[#555] bg-[#2c3038] text-[#EEEEEE] rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-[#FFD369] placeholder:text-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-[#555] bg-[#2c3038] text-[#EEEEEE] rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-[#FFD369] placeholder:text-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 accent-[#FFD369]"
              />
              Remember me
            </label>
            <a href="#" className="text-[#FFD369] hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD369] hover:bg-[#f0c85b] text-[#222831] py-3 rounded-xl font-semibold transition duration-300"
          >
            Sign In
          </button>

          <p className="text-sm text-center mt-6 text-[#CCCCCC]">
            Don’t have an account?{' '}
            <a href="/signup" className="text-[#FFD369] hover:underline font-medium">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}


