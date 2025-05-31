import React from "react";

export default function Concept006() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#e9f0fb] to-[#ffffff] flex items-center justify-center px-4 font-['Inter',sans-serif]">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.1)] p-8 sm:p-10 text-center transform hover:scale-[1.01] transition duration-300 ease-in-out">

        {/* Animated Graphic */}
        <img
          src="/images/login-img.gif"
          alt="Login animation"
          className="w-28 sm:w-32 mx-auto mb-6 drop-shadow-md"
        />

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Welcome to *Company*</h2>
        <p className="text-sm text-gray-500 mb-6">Sign in to continue your journey</p>

        {/* Form */}
        <form className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition shadow-sm"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition shadow-sm"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition shadow-md"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline font-medium">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
