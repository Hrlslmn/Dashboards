import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import InvoiceChart from '../components/InvoiceChart';
import SalesChart from '../components/SalesChart';
import StatCard from '../components/StatCard';
import RecentInvoices from '../components/RecentInvoices';
import {
  Users,
  DollarSign,
  TrendingUp,
  FileText,
} from 'lucide-react';

export default function Dashboard() {
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
        <main className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Customers" value="7" change="+100%" icon={<Users />} />
            <StatCard title="Current Rev" value="$5,061" change="+100%" icon={<DollarSign />} />
            <StatCard title="Work In Progress" value="2" change="Stable" icon={<TrendingUp />} />
            <StatCard title="Invoices" value="5" change="Issued" icon={<FileText />} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InvoiceChart />
            <SalesChart />
          </div>
          <RecentInvoices />
        </main>
      </div>
    </div>
  );
}

