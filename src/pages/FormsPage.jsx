import React, { useEffect, useState } from "react";
import HeaderGreen from "../components/HeaderGreen";
import { Copy, Download, Check, ShoppingCart } from "lucide-react";
import { supabase } from "../../supabaseClient";

export default function FormsPage() {
  const [components, setComponents] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [showCode, setShowCode] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Always fetch fresh session on mount
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchComponents = async () => {
      const { data, error } = await supabase
        .from("components")
        .select("*")
        .eq("category", "Input Fields & Forms")
        .order("created_at", { ascending: false });

      if (!error) setComponents(data);
    };
    fetchComponents();
  }, []);

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleBuy = async (component) => {
    if (!session?.user?.id) {
      alert("Please log in to purchase.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: component.title,
          price: component.price || 1,
          productId: component.id,
          productType: "component",
          userId: session.user.id
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout API failed:", err);
      alert("Failed to initiate checkout.");
    }
  };

  return (
    <div className="min-h-screen bg-[#222831] text-white font-inter">
      <HeaderGreen />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Input Fields & Forms</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {components.map((comp) => (
            <div key={comp.id} className="bg-[#393E46] p-4 rounded-xl shadow-lg border border-[#FFD369]/10">
              <h2 className="text-xl font-semibold mb-3">{comp.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: comp.preview_html }} />
              <div className="mt-4 flex justify-between items-center gap-2">
                <button
                  onClick={() => setShowCode(showCode === comp.id ? null : comp.id)}
                  className="text-sm px-3 py-1 bg-amber-500 hover:bg-amber-600 rounded-md font-medium text-slate-900"
                >
                  {showCode === comp.id ? "Hide Code" : "View Code"}
                </button>
                <button
                  onClick={() => handleBuy(comp)}
                  className="flex items-center gap-1 text-sm px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md"
                >
                  <ShoppingCart size={16} />
                  Buy
                </button>
              </div>
              {showCode === comp.id && (
                <div className="mt-3 relative">
                  <pre className="bg-black/80 p-3 rounded text-xs overflow-x-auto">
                    {comp.jsx_code}
                  </pre>
                  <button
                    onClick={() => handleCopyCode(comp.jsx_code, comp.id)}
                    className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    {copiedId === comp.id ? (
                      <>
                        <Check size={14} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
