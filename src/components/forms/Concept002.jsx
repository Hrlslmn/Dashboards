// components/Concept002.jsx
import React from "react";

export default function Concept002() {
  return (
    <div className="min-h-screen flex items-center justify-center font-['Inter',sans-serif]">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl flex flex-col lg:flex-row overflow-hidden border border-gray-200">
        
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-6 sm:px-10 py-10 sm:py-14 space-y-6 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-center lg:text-left">
            Create an account
          </h2>
          <p className="text-white/90 text-center lg:text-left">Join our platform and enjoy the benefits:</p>
          <ul className="space-y-3 text-white/90 text-sm pl-2">
            <li className="flex items-center gap-2"><span className="text-lg">🔒</span> Secure payments with trusted providers</li>
            <li className="flex items-center gap-2"><span className="text-lg">⚡</span> Super fast transfers anytime</li>
            <li className="flex items-center gap-2"><span className="text-lg">💰</span> Competitive commission rates</li>
            <li className="flex items-center gap-2"><span className="text-lg">📊</span> Transparent exchange rates</li>
            <li className="flex items-center gap-2"><span className="text-lg">👍</span> Easy and intuitive dashboard</li>
          </ul>
          <div className="text-xs text-white/60 text-center lg:text-left">
            No credit card required. Cancel anytime.
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 px-6 sm:px-10 py-10 sm:py-14">
          <form className="space-y-6 max-w-md mx-auto w-full">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
              Let's get you started
            </h3>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (999) 287-12-20"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-start gap-2 text-sm text-gray-500">
              <input type="checkbox" className="accent-indigo-600 mt-1" defaultChecked />
              <span>
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:underline">Terms</a> and{" "}
                <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-400 mt-2">
              Already have an account?{" "}
              <a href="#" className="text-indigo-600 hover:underline font-medium">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}


