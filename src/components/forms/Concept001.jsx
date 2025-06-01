import React from "react";

export default function Concept001() {
  return (
    <div className="min-h-screen flex items-center justify-center   font-['Inter',sans-serif]">
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl flex flex-col lg:flex-row">

        {/* Left Panel */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#6C63FF] to-[#5145CD] text-white px-6 sm:px-10 py-10 sm:py-16 flex flex-col items-center justify-center text-center space-y-5">
          <div className="text-sm uppercase tracking-widest text-white/70">Welcome</div>
          <h1 className="text-3xl sm:text-4xl font-bold">Hey There!</h1>
          <p className="text-white/90 text-sm leading-relaxed">
            Welcome back. You're just one step away
            <br className="hidden sm:block" />
            from exploring your feed.
          </p>
          <p className="text-white/60 text-sm">Don’t have an account?</p>
          <button className="px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-[#6C63FF] transition text-sm font-medium">
            Sign Up
          </button>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 px-6 sm:px-10 py-10 sm:py-16 bg-white flex items-center justify-center">
          <form className="w-full max-w-sm sm:max-w-md space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#6C63FF]">Sign In</h2>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] shadow-sm transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] shadow-sm transition"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 gap-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-[#6C63FF]" />
                <span>Keep me logged in</span>
              </label>
              <a href="#" className="text-[#F9A826] hover:underline text-right">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#6C63FF] text-white rounded-full font-semibold hover:bg-indigo-600 transition shadow-md"
            >
              Sign In
            </button>

            <div className="text-center text-gray-400 text-sm">or sign in with</div>

            <div className="flex justify-center space-x-4">
              <a href="#" className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">f</a>
              <a href="#" className="w-9 h-9 bg-sky-400 text-white rounded-full flex items-center justify-center hover:bg-sky-500">t</a>
              <a href="#" className="w-9 h-9 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900">in</a>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}




