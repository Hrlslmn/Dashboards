import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderGreen from '../components/HeaderGreen';
import { supabase } from '../../supabaseClient';
import { Download, X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import TestInsertButton from '../components/TestButton'; // Import the test button

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
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (user) {
        const { data: purchases, error: purchaseError } = await supabase
          .from('purchases')
          .select('product_id')
          .eq('user_id', user.id)
          .eq('product_type', 'dashboard');

        if (purchaseError) {
          console.error("Failed to fetch purchases:", purchaseError.message);
        } else {
          setPurchasedIds(Array.isArray(purchases) ? purchases.map(p => p.product_id) : []);
        }
      }

      const { data, error } = await supabase
        .from('dashboard')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching dashboards:', error);
      else setDashboards(data);

      setLoading(false);
    };

    fetchData();
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') fetchData();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [location]);

  const handleBuy = async (productId, title) => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user?.id) {
      alert("You must be logged in to make a purchase.");
      return;
    }

    setCheckoutLoadingId(productId);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: title,
          price: 0.5,
          productId,
          productType: "dashboard",
          user_id: user.id,
        }),
      });

      const result = await res.json();
      setCheckoutLoadingId(null);

      if (result?.sessionId) {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        await stripe.redirectToCheckout({ sessionId: result.sessionId });
      } else if (result?.url) {
        window.location.href = result.url;
      } else {
        alert("Missing Stripe session URL");
      }
    } catch (err) {
      setCheckoutLoadingId(null);
      alert("Checkout failed.");
    }
  };

  const handleDownload = async (filePath, id) => {
    setDownloadingId(id);

    const { data, error } = await supabase
      .storage
      .from('dashboard-file')
      .createSignedUrl(filePath, 60, { download: true });

    setDownloadingId(null);

    if (!data?.signedUrl || error) {
      alert("Download failed.");
      return;
    }

    const link = document.createElement('a');
    link.href = data.signedUrl;
    link.download = filePath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white px-4 relative">
      <HeaderGreen />
      <TestInsertButton /> {/* Include the test insert button */}
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-4xl font-bold text-center mb-10 drop-shadow">📊 Dashboard Designs</h1>

        {loading ? (
          <p className="text-center text-slate-300">Loading dashboards...</p>
        ) : dashboards.length === 0 ? (
          <p className="text-center text-slate-500">No dashboards found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {dashboards.map((dash) => (
              <div
                key={dash.id}
                className="relative bg-[#1f2937] border border-slate-600 rounded-xl p-5 shadow-lg"
              >
                {purchasedIds.includes(dash.id) && (
                  <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow">
                    ✅ Purchased
                  </span>
                )}
                {dash.image_path && (
                  <img
                    src={dash.image_path}
                    alt={dash.title}
                    className="w-full h-80 object-cover rounded-md mb-4 cursor-pointer hover:opacity-90"
                    onClick={() => setPreviewImage(dash.image_path)}
                  />
                )}
                <h2 className="text-xl font-semibold mb-1 text-[#38bdf8]">{dash.title}</h2>
                <p className="text-sm text-slate-300 mb-4">{dash.description}</p>

                {purchasedIds.includes(dash.id) ? (
                  <button
                    onClick={() => handleDownload(dash.file_path, dash.id)}
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold py-2 px-4 rounded-md"
                  >
                    <Download size={18} />
                    {downloadingId === dash.id ? "Preparing..." : "Download"}
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(dash.id, dash.title)}
                    className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-black font-semibold py-2 px-4 rounded-md"
                    disabled={checkoutLoadingId === dash.id}
                  >
                    {checkoutLoadingId === dash.id
                      ? "Redirecting to checkout..."
                      : `Unlock for just – $${dash.price || 0.5}`}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white bg-red-600 hover:bg-red-500 p-2 rounded-full"
            onClick={() => setPreviewImage(null)}
          >
            <X size={20} />
          </button>
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-3xl w-full max-h-[90vh] rounded-md shadow-lg border border-white/10"
          />
        </div>
      )}
      
    </div>

  );
}
