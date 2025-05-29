// components/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function PrivateRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session?.user) {
        const { data: profile, error } = await supabase
          .from('profiles') // Update table name if needed
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        if (!error) setIsAdmin(profile?.is_admin);
      }

      setIsLoading(false);
    };

    fetchSessionAndProfile();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (isLoading) return null;

  if (!session) return <Navigate to="/login" />;

  // 👇 Prevent access to "/" if not admin
  if (location.pathname === '/' && isAdmin === false) {
    return <Navigate to="/products" />;
  }

  return children;
}
