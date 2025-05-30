import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import InvoiceChart from '../components/InvoiceChart';
import SalesChart from '../components/SalesChart';
import StatCard from '../components/StatCard';
import RecentInvoices from '../components/RecentInvoices';

import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  FileText,
} from 'lucide-react';

export default function Dashboard() {

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-indigo-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
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
        <main className="p-6 space-y-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Dashboard's Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Collections" value="18" change="+120%" icon={<ShoppingCart />} />
            <StatCard title="Sales" value="$12,480" change="+80%" icon={<DollarSign />} />
            <StatCard title="Number of sales" value="$7,250" change="+60%" icon={<TrendingUp />} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InvoiceChart />
            <SalesChart />
          </div>
          <RecentInvoices />
        </main>
      </div>
    </div>
  );
}


