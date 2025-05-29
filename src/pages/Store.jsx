// pages/Store.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Store, DollarSign, Users } from 'lucide-react';

const storeStats = [
  { title: 'Total Stores', value: '18', icon: <Store />, change: '+12%' },
  { title: 'Total Revenue', value: '$124,300', icon: <DollarSign />, change: '+8%' },
  { title: 'Active Sellers', value: '92', icon: <Users />, change: '+5%' },
];

const stores = [
  { id: 1, name: 'Tech Haven', location: 'New York', sales: '$24,500', status: 'Active' },
  { id: 2, name: 'DesignHub', location: 'San Francisco', sales: '$18,900', status: 'Active' },
  { id: 3, name: 'Code Mart', location: 'Austin', sales: '$12,300', status: 'Inactive' },
  { id: 4, name: 'InnovaStore', location: 'Chicago', sales: '$15,400', status: 'Active' },
];

export default function StorePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F5F7FB] relative overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Store Management</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {storeStats.map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4">
                <div className="text-indigo-500 text-3xl">{stat.icon}</div>
                <div>
                  <h4 className="text-sm text-gray-500">{stat.title}</h4>
                  <div className="text-2xl font-semibold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-green-500">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Store Table */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Stores Overview</h3>
            <table className="w-full text-left">
              <thead className="text-sm text-gray-500 border-b">
                <tr>
                  <th className="py-2">Store Name</th>
                  <th>Location</th>
                  <th>Sales</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {stores.map((store) => (
                  <tr key={store.id} className="border-b last:border-none">
                    <td className="py-2">{store.name}</td>
                    <td>{store.location}</td>
                    <td>{store.sales}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          store.status === 'Active'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {store.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
