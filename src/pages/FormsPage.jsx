// ✅ src/pages/FormsPage.jsx
import React, { useState, useEffect } from "react";
import HeaderGreen from "../components/HeaderGreen";
import Concept001 from "../components/forms/Concept001";
import Concept002 from "../components/forms/Concept002";
import Concept003 from "../components/forms/Concept003";
import Concept004 from "../components/forms/Concept004";
import { Copy } from "lucide-react";
import { supabase } from "../../supabaseClient";

// Raw source code imports
import concept001Code from "../components/forms/Concept001.jsx?raw";
import concept002Code from "../components/forms/Concept002.jsx?raw";
import concept003Code from "../components/forms/Concept003.jsx?raw";
import concept004Code from "../components/forms/Concept004.jsx?raw";

export default function FormsPage() {
  const [showCode, setShowCode] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handlePay = async () => {
    const { data: { session: userSession } } = await supabase.auth.getSession();
    const accessToken = userSession?.access_token;
    if (!accessToken) return alert("Not logged in");

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name: "Premium Form Concept002", price: 9.99 }),
    });

    const data = await response.json();
    if (data.url) window.location.href = data.url;
  };

  const forms = [
    {
      id: "Concept003",
      title: "Design 003",
      desc: "Modern gradient split login interface.",
      Component: Concept003,
      code: concept003Code,
    },
    {
      id: "Concept002",
      title: "Design 002 (Premium)",
      desc: "Minimal gradient signup interface. Requires payment.",
      Component: Concept002,
      code: concept002Code,
      premium: true,
    },
    {
      id: "Concept001",
      title: "Design 001",
      desc: "Same form with different styling.",
      Component: Concept001,
      code: concept001Code,
      premium: true,
    },
    {
      id: "Concept004",
      title: "Design 004",
      desc: "Lottie animation on top / great for SaaS UI",
      Component: Concept004,
      code: concept004Code,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f25] to-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-9xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFD369] mb-2">
            Input Fields & Forms
          </h1>
          <p className="text-[#CCCCCC] text-lg">
            Tailwind-styled login and input form variations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {forms.map(({ id, title, desc, Component, code, premium }) => (
            <div
              key={id}
              className="bg-[#2B313A] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-[#FFD369] mb-1">
                  {title}
                </h2>
                <p className="text-sm text-[#AAAAAA] mb-4">{desc}</p>
              </div>

          <div className="w-full relative rounded-lg shadow-inner p-4 mb-4 bg-white">
            {premium ? (
              <>
                <div className="blur-sm pointer-events-none opacity-30">
                  <Component />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="bg-[#FFD369] text-[#222831] py-2 px-4 rounded-lg font-bold hover:bg-yellow-400 transition shadow-lg"
                    onClick={handlePay}
                  >
                    Unlock Premium – $9.99
                  </button>
                </div>
              </>
            ) : (
              <Component />
            )}
          </div>

              {!premium && (
                <div className="mt-auto">
                  <button
                    className="bg-[#FFD369] text-[#222831] text-sm px-4 py-1 rounded-full hover:bg-yellow-400"
                    onClick={() => setShowCode(showCode === id ? null : id)}
                  >
                    {showCode === id ? "Hide Code" : "Show Code"}
                  </button>
                  {showCode === id && (
                    <div className="relative bg-[#1f1f1f] text-sm text-gray-200 rounded-lg mt-4 overflow-x-auto max-h-[500px]">
                      <button
                        className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded text-xs hover:bg-yellow-300"
                        onClick={() => {
                          navigator.clipboard.writeText(code);
                        }}
                      >
                        <Copy size={14} className="inline mr-1" /> Copy Code
                      </button>
                      <pre className="p-4 whitespace-pre-wrap break-words text-xs leading-relaxed">
                        <code>{code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
