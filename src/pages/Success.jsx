// src/pages/Success.jsx
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-100 text-green-800 px-4 text-center">
      <CheckCircle size={72} className="text-green-600 animate-bounce mb-4" />
      <h1 className="text-4xl font-extrabold mb-2">Payment Successful!</h1>
      <p className="text-lg text-green-700 max-w-md">
        Thank you for your purchase. Your transaction has been completed, and a confirmation email will be sent to you shortly.
      </p>
      <Link
        to="/products"
        className="mt-8 bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

