import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    const userId = data?.user?.id;

    if (userId) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: userId, full_name: name }]);

      if (profileError) {
        setErrorMsg(profileError.message);
        return;
      }
    }

    navigate('/'); // Or redirect to /login if email verification is required
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-indigo-200 px-4">
      <div className="flex w-full max-w-5xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-indigo-200">
        
        {/* Left Side Graphic */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white w-1/2 p-10">
          <h2 className="text-4xl font-bold mb-3">Join Artifex 🧠</h2>
          <p className="text-base text-center leading-relaxed opacity-90">
            Sign up to build, create, and collaborate<br /> inside your dashboard.
          </p>
        </div>

        {/* Right Side Form */}
        <form
          onSubmit={handleSignUp}
          className="w-full md:w-1/2 p-10 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create your account
          </h2>

          {errorMsg && (
            <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>
          )}

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Sign Up
          </button>

          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:underline font-medium">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}


