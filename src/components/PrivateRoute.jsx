import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function PrivateRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setSession(data.session);
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  if (loading) return null; // Or show a loader
  if (!session) return <Navigate to="/login" replace />;

  return children;
}