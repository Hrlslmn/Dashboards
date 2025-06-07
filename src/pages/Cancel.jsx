import React from "react";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="bg-white border border-red-300 rounded-xl shadow-lg p-8 max-w-md text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-red-700 mb-2">Payment Cancelled</h1>
        <p className="text-gray-700 mb-6">
          Your payment was cancelled. You can try again anytime.
        </p>
        <Link
          to="/components/landing-pages"
          className="inline-block px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition"
        >
          Return to Forms
        </Link>
      </div>
    </div>
  );
}

