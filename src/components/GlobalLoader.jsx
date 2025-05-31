import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function GlobalLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 400); // adjust as needed
    return () => clearTimeout(timeout);
  }, [location]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#FFD369]" size={48} />
    </div>
  );
}
