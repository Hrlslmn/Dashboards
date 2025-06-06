import React, { useState, useEffect } from "react";
import HeaderGreen from "../components/HeaderGreen";
import { supabase } from "../../supabaseClient";
import { Copy, Download, Check } from "lucide-react";

export default function DashboardsPage() {
  const [components, setComponents] = useState([]);
  const [purchasedIds, setPurchasedIds] = useState([]);
  const [showCode, setShowCode] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (user) {
        const { data: purchases } = await supabase
          .from("purchases")
          .select("product_id, product_type")
          .eq("user_id", user.id)
          .eq("product_type", "dashboard");

        setPurchasedIds(purchases?.map(p => p.product_id) || []);
      }

      const { data, error } = await supabase
        .from("dashboard")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching dashboards:", error);
      } else {
        setComponents(data);
      }
    };

    fetchData();
  }, []);

  const handleBuy = async (productId, title) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: title,
        price: 2.99,
        productId,
        productType: "dashboard"
      }),
    });

    const result = await res.json();
    if (result?.url) {
      window.location.href = result.url;
    } else {
      console.error("Checkout error:", result.error);
    }
  };

  const handleDownload = async (filePath, id) => {
    setDownloadingId(id);
    const { data, error } = await supabase
      .storage
      .from("dashboard-file")
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <HeaderGreen />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-16 sm:mb-20">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 text-transparent bg-clip-text">
            Dashboard Designs
          </h1>
          <p className="text-[#BFCBD9] text-lg">Professional admin dashboards for modern apps.</p>
        </div>

        {components.length === 0 ? (
          <p className="text-center text-slate-400">Loading dashboards...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {components.map(({ id, title, description, code, file_path, image_path }) => (
              <div
                key={id}
                className="bg-slate-800/70 border border-slate-700 rounded-xl shadow-xl flex flex-col hover:-translate-y-1 transition transform"
              >
                {image_path && (
                  <div className="w-full h-80 bg-[#1e1e2e] flex items-center justify-center border-b border-slate-700">
                    <img
                      src={image_path}
                      alt={title}
                      onClick={() => setModalImage(image_path)}
                      className="max-h-full max-w-full object-contain cursor-zoom-in"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-sky-400 mb-2">{title || "Untitled Dashboard"}</h2>
                  <p className="text-sm text-slate-300 mb-5">{description || "No description available."}</p>

                  <div className="mt-auto flex flex-wrap gap-3 items-center">
                    {file_path ? (
                      purchasedIds.includes(id) ? (
                        <button
                          onClick={() => handleDownload(file_path, id)}
                          className="inline-flex items-center gap-2 bg-sky-400 text-slate-900 text-sm px-5 py-2.5 rounded-lg font-semibold hover:bg-sky-300 transition shadow-md"
                        >
                          <Download size={16} />
                          {downloadingId === id ? "Preparing..." : "Download"}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBuy(id, title)}
                          className="inline-flex items-center gap-2 bg-pink-500 text-white text-sm px-5 py-2.5 rounded-lg font-semibold hover:bg-pink-400 transition shadow-md"
                        >
                          Unlock for $2.99
                        </button>
                      )
                    ) : (
                      <button
                        className="inline-flex items-center gap-2 bg-sky-400 text-slate-900 text-sm px-5 py-2.5 rounded-lg font-semibold hover:bg-sky-300 transition"
                        onClick={() => setShowCode(showCode === id ? null : id)}
                      >
                        {showCode === id ? "Hide Code" : "Show Code"}
                      </button>
                    )}
                    {code && !file_path && (
                      <button
                        className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-sky-400 text-sm px-4 py-2.5 rounded-lg font-semibold"
                        onClick={() => handleCopyCode(code, id)}
                      >
                        {copiedId === id ? <Check size={16} /> : <Copy size={16} />}
                        {copiedId === id ? "Copied!" : "Copy Code"}
                      </button>
                    )}
                  </div>
                </div>

                {showCode === id && code && (
                  <div className="bg-[#1a1e2a] text-sm text-gray-200 rounded-b-xl border-t border-slate-700 overflow-hidden">
                    <pre className="p-5 pt-6 whitespace-pre-wrap break-words text-xs leading-normal max-h-[400px] overflow-y-auto">
                      <code>{code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div
            className="zoom-container rounded-lg shadow-xl"
            style={{
              backgroundImage: `url(${modalImage})`,
              width: "100%",
              height: "90vh",
              backgroundSize: "45%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              cursor: "zoom-out",
            }}
          />
        </div>
      )}
    </div>
  );
}
