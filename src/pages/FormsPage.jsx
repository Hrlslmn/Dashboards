import React, { useState, useEffect } from "react";
import HeaderGreen from "../components/HeaderGreen";
import { supabase } from "../../supabaseClient";
import { Copy, Download, Check, X } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';

export default function FormsPage() {
  const [purchasedIds, setPurchasedIds] = useState([]);
  const [components, setComponents] = useState([]);
  const [showCode, setShowCode] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: purchases } = await supabase
          .from("purchases")
          .select("product_id, product_type")
          .eq("user_id", session.user.id)
          .eq("product_type", "component");

        setPurchasedIds(purchases?.map(p => p.product_id) || []);
      }

      const { data, error } = await supabase
        .from("components")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setComponents(data);
    };

    fetchData();
  }, []);

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleBuy = async (productId, title) => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user?.id) {
      console.error("No user session or ID found");
      alert("You must be logged in to make a purchase.");
      return;
    }

    const userId = session.user.id;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: title,
          price: 2.99,
          productId,
          productType: "component",
          user_id: userId, // ✅ send user_id here
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Checkout API failed:", res.status, errorText);
        return;
      }

      const result = await res.json();

      if (result?.sessionId) {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        await stripe.redirectToCheckout({ sessionId: result.sessionId });
      } else if (result?.url) {
        window.location.href = result.url;
      } else {
        console.error("Missing session URL");
      }
    } catch (err) {
      console.error("Checkout request error:", err);
    }
  };


  const handleDownload = async (filePath, id) => {
    setDownloadingId(id);
    const { data, error } = await supabase
      .storage
      .from("component-file")
      .createSignedUrl(filePath, 60, { download: true });

    setDownloadingId(null);

    if (!data?.signedUrl || error) {
      console.error("Download error:", error?.message || error);
      alert("Download failed.");
      return;
    }

    const link = document.createElement("a");
    link.href = data.signedUrl;
    link.download = filePath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <HeaderGreen />
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-10">Component Marketplace</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {components.map(({ id, title, description, file_path, image_path, image_url, code }) => {
            const imgSrc = image_url || image_path;

            return (
              <div key={id} className="bg-slate-800 rounded-xl p-6 shadow hover:shadow-lg transition">
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-64 object-cover rounded-md mb-4 cursor-pointer hover:opacity-90"
                    onClick={() => setModalImage(imgSrc)}
                  />
                )}
                <h2 className="text-xl font-semibold text-amber-400 mb-2">{title}</h2>
                <p className="text-gray-400 text-sm mb-4">{description}</p>
                <div className="flex gap-4 flex-wrap">
                  {file_path ? (
                    purchasedIds.includes(id) ? (
                      <button onClick={() => handleDownload(file_path, id)} className="bg-amber-400 text-black px-4 py-2 rounded">
                        <Download size={16} />
                        {downloadingId === id ? "Preparing..." : "Download"}
                      </button>
                    ) : (
                      <button onClick={() => handleBuy(id, title)} className="bg-pink-500 text-white px-4 py-2 rounded">
                        Unlock for $2.99
                      </button>
                    )
                  ) : (
                    <button onClick={() => setShowCode(showCode === id ? null : id)} className="bg-slate-600 px-4 py-2 rounded">
                      {showCode === id ? "Hide Code" : "Show Code"}
                    </button>
                  )}
                  {code && !file_path && (
                    <button onClick={() => handleCopyCode(code, id)} className="bg-gray-700 px-4 py-2 rounded text-amber-300">
                      {copiedId === id ? <Check size={16} /> : <Copy size={16} />} {copiedId === id ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
                {showCode === id && (
                  <pre className="mt-4 text-sm bg-gray-800 p-4 rounded overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {modalImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white bg-red-600 hover:bg-red-500 p-2 rounded-full z-50"
            onClick={() => setModalImage(null)}
          >
            <X size={20} />
          </button>
          <img
            src={modalImage}
            alt="Preview"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-md shadow-lg border border-white/10"
          />
        </div>
      )}
    </div>
  );
}
