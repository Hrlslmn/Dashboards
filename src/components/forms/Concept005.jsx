import React from 'react';
import { User, Lock } from 'lucide-react';

export default function LoginForm() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-800 to-green-600">
      <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-80 border border-white/20">
        {/* Top avatar circle */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-900 p-4 rounded-full border-4 border-white/30">
          <User className="text-white" size={32} />
        </div>

        <div className="mt-8 space-y-5">
          {/* Email Field */}
          <div className="flex items-center bg-white/20 px-4 py-2 rounded">
            <User className="text-white mr-3" size={18} />
            <input
              type="email"
              placeholder="Email ID"
              className="bg-transparent outline-none text-white w-full placeholder-white"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center bg-white/20 px-4 py-2 rounded">
            <Lock className="text-white mr-3" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-white w-full placeholder-white"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center text-sm text-white/80">
            <label className="flex items-center">
              <input type="checkbox" className="accent-green-700 mr-2" />
              Remember me
            </label>
            <button className="hover:underline">Forgot Password?</button>
          </div>

          {/* Login Button */}
          <button className="w-full py-2 bg-green-900 text-white rounded mt-2 hover:bg-green-800 transition-all">
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}