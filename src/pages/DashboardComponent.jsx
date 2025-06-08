import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderGreen from '../components/HeaderGreen';
import { supabase } from '../../supabaseClient';
import { Download } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

export default function DashboardComponent() {
  const [dashboards, setDashboards] = useState([]);
  const [purchasedIds, setPurchasedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [checkoutLoadingId, setCheckoutLoadingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;

      if (user) {
        const { data: purchases } = await supabase
          .from('purchases')
          .select('product_id')
          .eq('user_id', user.id);

        if (purchases) {
          setPurchasedIds(purchases.map((p) => p.product_id));
        }
      }

      const { data: dashboardData } = await supabase
        .from('dashboards')
        .select('*')
        .order('created_at', { ascending: false });

      if (dashboardData) setDashboards(dashboardData);
      setLoading(false);
    };

    fetchData();
  }, [location]);

  const handleBuy = async (dashboard) => {
    setCheckoutLoadingId(dashboard.id);
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: dashboard.id,
        user_id: (await supabase.auth.getUser()).data.user.id,
      }),
    });

    const session = await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
    setCheckoutLoadingId(null);
  };

  const handleDownload = async (dashboard) => {
    setDownloadingId(dashboard.id);
    const { data, error } = await supabase.storage
      .from('component-file')
      .createSignedUrl(dashboard.file_path, 60);

    if (data?.signedUrl) {
      const a = document.createElement('a');
      a.href = data.signedUrl;
      a.download = `${dashboard.title}.jsx`;
      a.click();
    }

    setDownloadingId(null);
  };

  return (
    <div className="min-h-screen bg-[#222831] text-white">
      <HeaderGreen />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dashboards.map((item) => {
          const isPurchased = purchasedIds.includes(item.id);
          return (
            <div key={item.id} className="p-4 bg-[#393E46] rounded-lg shadow">
              <img src={item.preview_url} alt="preview" className="rounded mb-4" />
              <div className="flex justify-between items-center">
                {isPurchased ? (
                  <button
                    onClick={() => handleDownload(item)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
                  >
                    <Download className="w-4 h-4 mr-1" /> Download
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
