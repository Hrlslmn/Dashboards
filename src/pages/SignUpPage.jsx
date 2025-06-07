import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error || !data.user) {
      setErrorMsg(error?.message || 'Sign-up failed');
      return;
    }

    const userId = data.user.id;

    const { error: profileError } = await supabase.from('profiles').insert([
      { id: userId, full_name: fullName }
    ]);

    if (profileError) {
      setErrorMsg(profileError.message);
      return;
    }

    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Create an Account</h1>
        {errorMsg && <p className="text-red-400 text-sm mb-4 text-center">{errorMsg}</p>}

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label htmlFor="full_name" className="text-sm text-slate-300 block mb-1">Full Name</label>
            <input
              type="text"
              id="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-slate-300 block mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-slate-300 block mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-amber-400 hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}
