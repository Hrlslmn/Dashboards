import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Success() {
  const [searchParams] = useSearchParams();
  const [component, setComponent] = useState(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchPurchase = async () => {
      if (!sessionId) {
        setError('Missing session ID.');
        return;
      }

      const { data: authData, error: sessionError } = await supabase.auth.getSession();
      const session = authData?.session;

      if (sessionError || !session?.user) {
        setError('You must be logged in.');
        return;
      }

      const user = session.user;

      const { data: sessionData, error: csError } = await supabase
        .from('checkout_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .eq('status', 'completed')
        .maybeSingle();

      if (csError || !sessionData) {
        setError('Session not found or not completed.');
        console.error('❌ Session Fetch Error:', csError);
        return;
      }

      const { data: purchase, error: purchaseError } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', sessionData.product_id)
        .eq('product_type', sessionData.product_type)
        .maybeSingle();

      if (purchaseError || !purchase) {
        setError('Purchase not found.');
        console.error('❌ Purchase Error:', purchaseError);
        return;
      }

      const { data: componentData, error: compError } = await supabase
        .from('components')
        .select('*')
        .eq('id', sessionData.product_id)
        .maybeSingle();

      if (compError || !componentData) {
        setError('Component not found.');
        console.error('❌ Component Error:', compError);
        return;
      }

      setComponent(componentData);

      // 🎉 Trigger confetti once purchase is validated
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    };

    fetchPurchase();
  }, [sessionId]);

  const handleDownload = async () => {
    if (!component?.file_path) return;
    setDownloading(true);

    const { data, error } = await supabase.storage
      .from('component-file')
      .createSignedUrl(component.file_path, 60, { download: true });

    setDownloading(false);

    if (error || !data?.signedUrl) {
      alert('Failed to create download link.');
      return;
    }

    const link = document.createElement('a');
    link.href = data.signedUrl;
    link.download = component.file_path.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 text-center">
      {error ? (
        <div className="bg-red-500 text-white px-6 py-4 rounded-md shadow">
          <p className="font-bold text-lg">❌ {error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-white text-black font-medium rounded hover:bg-gray-200"
          >
            Back to Home
          </button>
        </div>
      ) : component ? (
        <div className="bg-gray-800 p-8 rounded-xl shadow-md max-w-xl w-full">
          <h1 className="text-3xl font-bold text-amber-400 mb-4">🎉 Purchase Successful!</h1>
          <p className="text-gray-300 mb-6">Thank you for purchasing <strong>{component.title}</strong>.</p>
          {component.image_url && (
            <img
              src={component.image_url}
              alt={component.title}
              className="w-full h-64 object-cover rounded mb-6 border border-white/10"
            />
          )}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="bg-amber-400 text-black px-6 py-3 rounded font-semibold flex items-center justify-center gap-2 w-full"
          >
            <Download size={18} />
            {downloading ? 'Preparing...' : 'Download Now'}
          </button>
          <button
            onClick={() => navigate('/dashboards')}
            className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded w-full"
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
        <p className="text-gray-400">Validating your purchase...</p>
      )}
    </div>
  );
}
