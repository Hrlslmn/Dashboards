import React, { useState } from "react";
import HeaderGreen from "../components/HeaderGreen";
import { Copy, X } from "lucide-react";

export default function ModalsPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [showCode, setShowCode] = useState(null);
  const [toastVisible, setToastVisible] = useState(null);

  const modalExamples = [
    {
      id: "basic",
      title: "Basic Modal",
      description: "Simple modal with content and dismiss button.",
      jsx: (
        <div className="text-white">
          <h2 className="text-xl font-bold mb-2">Basic Modal</h2>
          <p>This is a centered modal with essential content.</p>
        </div>
      ),
      code: `<div className="text-white">
  <h2 className="text-xl font-bold">Basic Modal</h2>
  <p>This is a centered modal with essential content.</p>
</div>`,
    },
    {
      id: "confirm-dialog",
      title: "Confirm Dialog",
      description: "Used to confirm irreversible actions.",
      jsx: (
        <div className="text-white">
          <h2 className="text-xl font-bold mb-2">Are you absolutely sure?</h2>
          <p className="mb-4 text-sm">
            This action cannot be undone. This will permanently delete your file.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-1 text-sm rounded bg-[#393E46] hover:bg-[#4A5058]"
            >
              Cancel
            </button>
            <button className="px-4 py-1 text-sm rounded bg-red-500 hover:bg-red-600 text-white">
              Yes, Delete
            </button>
          </div>
        </div>
      ),
      code: `<div className="text-white">
  <h2 className="text-xl font-bold">Are you absolutely sure?</h2>
  <p>This action cannot be undone. This will permanently delete your file.</p>
  <div className="flex justify-end gap-3">
    <button className="bg-[#393E46] px-4 py-1 rounded">Cancel</button>
    <button className="bg-red-500 text-white px-4 py-1 rounded">Yes, Delete</button>
  </div>
</div>`,
    },
    {
      id: "success-toast",
      title: "Success Toast",
      description: "Triggers a success message at bottom.",
      jsx: (
        <div className="text-white">
          <p>Click to show success toast.</p>
          <button
            onClick={() => {
              setToastVisible("success");
              setTimeout(() => setToastVisible(null), 3000);
            }}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Show Success
          </button>
        </div>
      ),
      code: `<div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow">
  Success! Your action was completed.
</div>`,
    },
    {
      id: "error-toast",
      title: "Error Toast",
      description: "Shows an error notification.",
      jsx: (
        <div className="text-white">
          <p>Click to show error message.</p>
          <button
            onClick={() => {
              setToastVisible("error");
              setTimeout(() => setToastVisible(null), 3000);
            }}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Show Error
          </button>
        </div>
      ),
      code: `<div className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded shadow">
  Error! Something went wrong.
</div>`,
    },
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f25] to-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFD369] drop-shadow mb-2">
            Modals & Alerts
          </h1>
          <p className="text-[#CCCCCC] text-lg">
            Lightweight pop-ups and toast notifications using Tailwind + React.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {modalExamples.map((item) => (
            <div
              key={item.id}
              className="bg-[#2E3440] border border-[#393E46] rounded-xl p-5 transition hover:scale-[1.02]"
            >
              <h3 className="text-lg font-bold text-[#FFD369] mb-2">{item.title}</h3>
              <p className="text-[#CCCCCC] text-sm mb-4">{item.description}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveModal(item.id)}
                  className="px-4 py-1 text-sm rounded-full bg-[#FFD369] text-[#222831] hover:bg-yellow-400"
                >
                  View Modal
                </button>
                <button
                  onClick={() =>
                    setShowCode(showCode === item.id ? null : item.id)
                  }
                  className="px-4 py-1 text-sm rounded-full bg-transparent border border-[#FFD369] text-[#FFD369] hover:bg-[#FFD3691A]"
                >
                  {showCode === item.id ? "Hide Code" : "View Code"}
                </button>
              </div>

              {showCode === item.id && (
                <div className="relative bg-[#1f1f1f] text-xs text-[#EEEEEE] p-4 rounded mt-4 overflow-auto">
                  <pre className="whitespace-pre-wrap">{item.code}</pre>
                  <button
                    onClick={() => copyToClipboard(item.code)}
                    className="absolute top-2 right-2 text-white text-xs bg-[#FFD369] text-[#222831] px-2 py-1 rounded hover:bg-yellow-300"
                  >
                    <Copy size={14} className="inline mr-1" /> Copy
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal Overlay + Animation */}
        {activeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative bg-[#2E3440] border border-[#FFD36933] rounded-xl shadow-lg p-6 w-[90%] max-w-md animate-fadeIn scale-95 animate-in">
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-2 right-2 text-[#FFD369] hover:text-yellow-300"
              >
                <X size={20} />
              </button>
              {modalExamples.find((m) => m.id === activeModal)?.jsx}
            </div>
          </div>
        )}

        {/* Toasts */}
        {toastVisible === "success" && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow z-50 animate-fadeIn">
            ✅ Success! Your action was completed.
          </div>
        )}
        {toastVisible === "error" && (
          <div className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded shadow z-50 animate-fadeIn">
            ❌ Error! Something went wrong.
          </div>
        )}
      </main>

      {/* Tailwind animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}


