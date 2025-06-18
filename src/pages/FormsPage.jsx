// FormsPage.jsx (Stripe removed, free downloads enabled)
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderGreen from "../components/HeaderGreen";
import { supabase } from "../../supabaseClient";
import { Download, X } from "lucide-react";

export default function FormsPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("components")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching forms:", error);
      else setForms(data);

      setLoading(false);
    };

    fetchData();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") fetchData();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [location]);

  const handleDownload = async (filePath, id) => {
    setDownloadingId(id);

    const { data, error } = await supabase
      .storage
      .from("component-file")
      .createSignedUrl(filePath, 60, { download: true });

    setDownloadingId(null);

    if (!data?.signedUrl || error) {
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
    <div className="min-h-screen bg-[#111827] text-white px-4 relative">
      <HeaderGreen />
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-4xl font-bold text-center mb-10 drop-shadow">🧾 React Form Designs</h1>

        {loading ? (
          <p className="text-center text-slate-300">Loading forms...</p>
        ) : forms.length === 0 ? (
          <p className="text-center text-slate-500">No forms found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {forms.map((form) => (
              <div
                key={form.id}
                className="relative bg-[#1f2937] border border-slate-600 rounded-xl p-5 shadow-lg"
              >
                {form.image_url && (
                  <img
                    src={form.image_url}
                    alt={form.title}
                    className="w-full h-80 object-cover rounded-md mb-4 cursor-pointer hover:opacity-90"
                    onClick={() => setPreviewImage(form.image_url)}
                  />
                )}
                <h2 className="text-xl font-semibold mb-1 text-[#38bdf8]">{form.title}</h2>
                <p className="text-sm text-slate-300 mb-4">{form.description}</p>

                <button
                  onClick={() => handleDownload(form.file_path, form.id)}
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold py-2 px-4 rounded-md"
                >
                  <Download size={18} />
                  {downloadingId === form.id ? "Preparing..." : "Download"}
                </button>
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
            className="w-full max-w-3xl aspect-auto object-contain max-h-[90vh] rounded-md shadow-lg border border-white/10"
          />
        </div>
      )}
    </div>
  );
}
