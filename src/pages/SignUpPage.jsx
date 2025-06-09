import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiGithub, FiFeather } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

// A simple button component for social logins
const SocialButton = ({ icon, text, onClick }) => (
  <button
    type="button" // Important to prevent form submission
    onClick={onClick}
    className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
  >
    {icon}
    <span className="ml-3">{text}</span>
  </button>
);

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setErrorMsg('You must agree to the terms and services.');
      return;
    }
    setLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
    } else if (data.user) {
        // Supabase now handles inserting the user metadata (full_name) automatically
        // upon sign-up if you pass it in the options as above.
        // You might see a confirmation email step here.
      alert('Sign-up successful! Please check your email to confirm your account.');
      navigate('/login');
    }
    setLoading(false);
  };
  
  // Placeholder for social login
  const handleSocialLogin = async (provider) => {
    // Supabase social login logic
    alert(`Signing up with ${provider}... (functionality to be implemented)`);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* --- Left Branding Pane --- */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-12 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <FiFeather size={60} className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold tracking-tight">Join The Community</h1>
          <p className="mt-4 text-lg text-purple-200">
            Create an account to start your journey with Code Canverse.
          </p>
        </motion.div>
      </div>

      {/* --- Right Form Pane --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-center text-gray-900">
              Create your account
            </h2>
          </div>

          {/* Error Message */}
          {errorMsg && (
             <div className="text-sm text-center px-3 py-2 bg-red-100 border border-red-300 text-red-700 rounded-lg">
               {errorMsg}
             </div>
           )}

          {/* Sign-up Form */}
          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
               <p className="mt-2 text-xs text-gray-500">Must be at least 6 characters long.</p>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="terms" name="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms</a> and{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}