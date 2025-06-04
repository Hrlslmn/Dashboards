import React, { useState, useEffect } from "react";
import HeaderGreen from "../components/HeaderGreen";
import { supabase } from "../../supabaseClient";
import { Copy, Download, Check } from "lucide-react";

export default function DashboardsPage() {
  const [components, setComponents] = useState([]);
  const [showCode, setShowCode] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const fetchDashboards = async () => {
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
    fetchDashboards();
  }, []);

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = async (filePath, id) => {
    setDownloadingId(id);

    const { data, error } = await supabase.storage
      .from("dashboard-file") // ✅ Bucket name
      .createSignedUrl(filePath, 60, { download: true }); // ✅ file_path must match full path

    setDownloadingId(null);

    if (error || !data?.signedUrl) {
      console.error("Download error:", error?.message || error);
      alert("Download failed. Ensure file_path is correct and file exists in Supabase Storage.");
      return;
    }

    const link = document.createElement("a");
    link.href = data.signedUrl;
    link.download = filePath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Zoom follow effect
  useEffect(() => {
    const zoomContainer = document.querySelector(".zoom-container");

    const handleMouseMove = (e) => {
      if (!zoomContainer || !modalImage) return;
      const { left, top, width, height } = zoomContainer.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      zoomContainer.style.backgroundPosition = `${x}% ${y}%`;
    };

    if (zoomContainer && modalImage) {
      zoomContainer.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (zoomContainer) {
        zoomContainer.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [modalImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-16 sm:mb-20 px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 text-transparent bg-clip-text">
              Dashboard Designs
            </span>
          </h1>
          <p className="text-[#BFCBD9] text-lg sm:text-xl max-w-2xl mx-auto">
            Browse modern admin panel layouts, analytics screens, and UI dashboards crafted for professional apps.
          </p>
        </div>

        {components.length === 0 ? (
          <p className="text-center text-slate-400">Loading dashboards or none found...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {components.map(({ id, title, description, code, file_path, image_path }) => (
              <div
                key={id}
                className="bg-slate-800/70 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl hover:shadow-sky-400/30 transition-all duration-300 flex flex-col transform hover:-translate-y-1 max-h-[90vh] overflow-y-auto custom-scrollbar"
              >
                {image_path && (
                  <div className="w-full h-80 rounded-t-xl overflow-hidden border-b border-slate-700 bg-[#1e1e2e] flex items-center justify-center">
                    <img
                      src={image_path}
                      alt={title}
                      onClick={() => setModalImage(image_path)}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 cursor-zoom-in"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-sky-400 mb-2">{title || "Untitled Dashboard"}</h2>
                  <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                    {description || "No description available."}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-3 items-center">
                    {file_path ? (
                      <button
                        onClick={() => handleDownload(file_path, id)}
                        className="inline-flex items-center gap-2 bg-sky-400 text-slate-900 text-sm px-5 py-2.5 rounded-lg font-semibold hover:bg-sky-300 transition shadow-md hover:shadow-sky-400/40"
                      >
                        <Download size={16} />
                        {downloadingId === id ? "Preparing..." : "Download"}
                      </button>
                    ) : (
                      <button
                        className="inline-flex items-center gap-2 bg-sky-400 text-slate-900 text-sm px-5 py-2.5 rounded-lg font-semibold hover:bg-sky-300 transition shadow-md"
                        onClick={() => setShowCode(showCode === id ? null : id)}
                      >
                        {showCode === id ? "Hide Code" : "Show Code"}
                      </button>
                    )}
                    {code && !file_path && (
                      <button
                        className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-sky-400 text-sm px-4 py-2.5 rounded-lg font-semibold transition"
                        onClick={() => handleCopyCode(code, id)}
                      >
                        {copiedId === id ? <Check size={16} /> : <Copy size={16} />}
                        {copiedId === id ? "Copied!" : "Copy Code"}
                      </button>
                    )}
                  </div>
                </div>

                {showCode === id && code && (
                  <div className="relative bg-[#1a1e2a] text-sm text-gray-200 rounded-b-xl border-t border-slate-700 overflow-hidden flex-shrink-0">
                    <pre className="p-5 pt-6 whitespace-pre-wrap break-words text-xs leading-normal max-h-[400px] overflow-y-auto custom-scrollbar">
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
            }}
          />
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(22, 26, 32, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4a5568;
          border-radius: 4px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #718096;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4a5568 rgba(22, 26, 32, 0.5);
        }

        .zoom-container {
          width: 100%;
          height: 90vh;
          max-width: 90vw;
          background-repeat: no-repeat;
          background-size: 45%;
          background-position: center;
          cursor: zoom-out;
        }
      `}</style>
    </div>
  );
}
