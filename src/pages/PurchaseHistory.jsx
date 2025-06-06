import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import HeaderGreen from "../components/HeaderGreen";

export default function PurchaseHistory() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("purchases")
        .select("*")
        .eq("user_id", session.user.id)
        .order("purchased_at", { ascending: false });

      if (!error && data) {
        const componentIds = data.filter(p => p.product_type === "component").map(p => p.product_id);
        const dashboardIds = data.filter(p => p.product_type === "dashboard").map(p => p.product_id);

        const [components, dashboards] = await Promise.all([
          supabase.from("components").select("id, title, image_url").in("id", componentIds),
          supabase.from("dashboard").select("id, title, image_path").in("id", dashboardIds)
        ]);

        const merged = data.map(p => {
          const sourceTable = p.product_type === "component" ? components.data : dashboards.data;
          const product = sourceTable?.find(i => i.id === p.product_id);
          return {
            ...p,
            title: product?.title || "Untitled",
            image: product?.image_url || product?.image_path || null
          };
        });

        setPurchases(merged);
      }

      setLoading(false);
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 sm:px-10 py-12 font-['Inter']">
      <HeaderGreen />
      <h1 className="text-3xl font-extrabold mb-8 text-center">🧾 Purchase History</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading purchases...</p>
      ) : purchases.length === 0 ? (
        <p className="text-center text-gray-500">No purchases yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {purchases.map((p) => (
            <div
              key={p.id}
              className="bg-slate-800 p-5 rounded-xl border border-slate-600 shadow-md flex gap-4"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-20 h-20 object-cover rounded-lg border border-slate-700"
                />
              )}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">{p.title}</h2>
                  <p className="text-sm text-gray-400">{p.product_type.toUpperCase()}</p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Purchased: {new Date(p.purchased_at).toLocaleString()}</p>
                  <p>Source: {p.source} | ${p.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
