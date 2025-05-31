import React from "react";
import { Lock, Mail } from "lucide-react";

export default function Concept003() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] font-['Inter',sans-serif]">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-1 tracking-wide">Welcome Back</h1>
          <p className="text-sm text-gray-300">Log in to your account to continue</p>
        </div>

        <form className="space-y-6">
          <div className="relative">
            <label className="block text-sm mb-1 text-gray-200">Email</label>
            <div className="flex items-center border border-white/20 rounded-lg bg-white/5 backdrop-blur px-3 py-2 focus-within:ring-2 focus-within:ring-[#FFD369] transition">
              <Mail className="w-5 h-5 mr-2 text-gray-300" />
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm mb-1 text-gray-200">Password</label>
            <div className="flex items-center border border-white/20 rounded-lg bg-white/5 backdrop-blur px-3 py-2 focus-within:ring-2 focus-within:ring-[#FFD369] transition">
              <Lock className="w-5 h-5 mr-2 text-gray-300" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-300">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-[#FFD369]" />
              Remember me
            </label>
            <a href="#" className="text-[#FFD369] hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#FFD369] text-[#1a1f25] font-semibold rounded-lg hover:bg-yellow-400 transition-all shadow-lg"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-[#FFD369] hover:underline font-medium">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
