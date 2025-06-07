// pages/Success.jsx

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { CheckCircle } from 'lucide-react';

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sessionValid, setSessionValid] = useState(false);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('checkout_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .eq('status', 'completed')
        .single();

      if (!error && data) {
        setSessionValid(true);
      }

      setLoading(false);
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300 text-lg">
        Verifying your purchase...
      </div>
    );
  }

  if (!sessionValid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-900 text-red-600 text-center px-4">
        <p className="text-xl font-semibold mb-3">❌ Session not found or not completed.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Please contact support if you believe this is a mistake.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-900 text-center px-4">
      <CheckCircle className="text-green-500 mb-4" size={64} />
      <h1 className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Your content is now unlocked. You can access it anytime from your dashboard.
      </p>
      <button
        onClick={() => navigate('/dashboards')}
        className="px-6 py-2 text-sm font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition duration-200"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
