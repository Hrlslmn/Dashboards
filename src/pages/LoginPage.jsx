import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiGrid } from 'react-icons/fi';

// Component for the animated shapes in the background
const FloatingShape = ({ top, left, size, duration, delay }) => (
  <motion.div
    className="absolute rounded-full bg-white/10"
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    style={{ top, left, width: size, height: size }}
  />
);

export default function CalmLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* --- Left Branding Pane (Now with dynamic elements) --- */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-12 text-white relative overflow-hidden">
        {/* Floating shapes for a dynamic background */}
        <FloatingShape top="15%" left="10%" size={120} duration={12} delay={0} />
        <FloatingShape top="70%" left="20%" size={40} duration={8} delay={1} />
        <FloatingShape top="50%" left="80%" size={90} duration={10} delay={0.5} />
        <FloatingShape top="25%" left="65%" size={30} duration={7} delay={2} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center z-10"
        >
          <FiGrid size={60} className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold tracking-tight">Your Digital Canvas</h1>
          <p className="mt-4 text-lg text-purple-200 max-w-sm mx-auto">
            Where ideas take shape and projects come to life.
          </p>
        </motion.div>
      </div>

      {/* --- Right Form Pane (with floating labels) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-center text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to continue to Code Canverse
            </p>
          </div>
          
          {errorMsg && (
             <div className="text-sm text-center px-3 py-2 bg-red-100 border border-red-300 text-red-700 rounded-lg">
               {errorMsg}
             </div>
           )}

          <form onSubmit={handleLogin} className="space-y-6 pt-4">
            {/* Email Input with Floating Label */}
            <div className="relative group">
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-3 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                placeholder=" " 
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                <FiMail className="inline-block mr-1 -mt-1" />
                Email Address
              </label>
            </div>

            {/* Password Input with Floating Label */}
            <div className="relative group">
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-3 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                 <FiLock className="inline-block mr-1 -mt-1" />
                Password
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/40"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up today
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}