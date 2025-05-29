// pages/Product.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const sampleProducts = [
  {
    id: 1,
    name: 'AI Art Generator',
    price: '$29.99',
    stock: 24,
    image: 'https://source.unsplash.com/random/300x300?art',
  },
  {
    id: 2,
    name: 'Brand Launch Kit',
    price: '$59.99',
    stock: 13,
    image: 'https://source.unsplash.com/random/300x300?startup',
  },
  {
    id: 3,
    name: 'CRM Dashboard',
    price: '$75.00',
    stock: 8,
    image: 'https://source.unsplash.com/random/300x300?dashboard',
  },
  {
    id: 4,
    name: 'E-Commerce Theme',
    price: '$49.99',
    stock: 16,
    image: 'https://source.unsplash.com/random/300x300?ecommerce',
  },
  {
    id: 5,
    name: 'Marketing Toolkit',
    price: '$39.99',
    stock: 12,
    image: 'https://source.unsplash.com/random/300x300?marketing',
  },
  {
    id: 6,
    name: 'Invoice Generator',
    price: '$19.99',
    stock: 32,
    image: 'https://source.unsplash.com/random/300x300?invoice',
  },
];

export default function ProductPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F5F7FB] relative overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
          <div className="fixed z-50 top-0 left-0 h-full">
            <Sidebar collapsed={false} onClose={() => setMobileOpen(false)} isMobile />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileOpen((prev) => !prev)} />
        <main className="p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Product Catalog</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h2>
                <p className="text-sm text-gray-500 mb-1">
                  Price: <span className="text-gray-700">{product.price}</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Stock: <span className="text-gray-700">{product.stock}</span>
                </p>
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                  View Product
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

