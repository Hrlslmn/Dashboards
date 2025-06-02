import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function Success() {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id'); // 🔍 Stripe passes this on success_url

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!sessionId) return;

      const { data, error } = await supabase
        .from('checkout_sessions')
        .select('*')
        .eq('session_id', sessionId) // ✅ use session_id from query param
        .eq('status', 'completed');

      if (error) {
        console.error('Error fetching session:', error);
      } else {
        setSessionData(data?.[0]);
      }

      setLoading(false);
    };

    fetchCheckoutSession();
  }, [sessionId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold">✅ Payment Successful</h1>
      {sessionData ? (
        <p className="mt-4 text-lg">Thank you! Your product ID: <strong>{sessionData.product_id}</strong></p>
      ) : (
        <p className="mt-4 text-red-500">Session not found or not completed.</p>
      )}
    </div>
  );
}


