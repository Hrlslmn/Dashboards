// Success.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function Success() {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;

      const { data, error } = await supabase
        .from('checkout_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .eq('status', 'completed');

      if (!error && data?.[0]) {
        setSessionData(data[0]);
      }
      setLoading(false);
    };

    fetchSession();
  }, [sessionId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  if (!sessionData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 text-center">
        <h1 className="text-3xl font-bold mb-4">Session not found or not completed.</h1>
        <p>Please contact support if you believe this is a mistake.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">✅ Purchase Successful!</h1>
        <p className="mb-6">Thank you for purchasing. You can now return to the page and download your product.</p>
        <a href="/components" className="bg-amber-400 text-black px-6 py-3 rounded font-semibold hover:bg-amber-300 transition">Go to Components</a>
      </div>
    </div>
  );
}
