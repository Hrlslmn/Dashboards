import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeaderGreen from "../components/HeaderGreen";
import { supabase } from "../../supabaseClient";
import { Copy, Download, Check, X } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

export default function FormsPage() {
  const [purchasedIds, setPurchasedIds] = useState([]);
  const [components, setComponents] = useState([]);
  const [showCode, setShowCode] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [buyingId, setBuyingId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: purchases } = await supabase
          .from("purchases")
          .select("product_id")
          .eq("user_id", user.id);

        if (purchases) {
          setPurchasedIds(purchases.map((p) => p.product_id));
        }
      }

      const { data: componentData } = await supabase
        .from("components")
        .select("*")
        .order("created_at", { ascending: false });

      if (componentData) setComponents(componentData);
    };

    fetchData();
  }, [location]);

  const handleBuy = async (component) => {
    setBuyingId(component.id);
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: component.id,
        user_id: (await supabase.auth.getUser()).data.user.id,
      }),
    });

    const session = await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
    setBuyingId(null);
  };

  const handleDownload = async (component) => {
    setDownloadingId(component.id);
    const { data, error } = await supabase.storage
      .from("component-file")
      .createSignedUrl(component.file_path, 60);

    if (data?.signedUrl) {
      const a = document.createElement("a");
      a.href = data.signedUrl;
      a.download = `${component.title}.jsx`;
      a.click();
    }

    setDownloadingId(null);
  };

  return (
    <div className="min-h-screen bg-[#222831] text-white">
      <HeaderGreen />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {components.map((component) => {
          const isPurchased = purchasedIds.includes(component.id);
          return (
            <div key={component.id} className="p-4 bg-[#393E46] rounded-lg shadow">
              <img
                src={component.preview_url}
                alt="preview"
                className="rounded mb-4"
              />
              <div className="flex justify-between items-center">
                {isPurchased ? (
                  <button
                    onClick={() => handleDownload(component)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
                  >
                    <Download className="w-4 h-4 mr-1" /> Download
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(component)}
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
