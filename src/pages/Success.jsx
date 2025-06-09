import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-400 mb-4">✅ Purchase Successful!</h1>
        <p className="text-lg mb-6">Thank you for your payment.</p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}