import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="bg-white border border-green-300 rounded-xl shadow-lg p-8 max-w-md text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-green-700 mb-2">Payment Successful</h1>
        <p className="text-gray-700 mb-6">
          Thank you! Your payment has been received and access is now granted.
        </p>
        <Link
          to="/components/forms"
          className="inline-block px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition"
        >
          Go to Forms
        </Link>
      </div>
    </div>
  );
}
