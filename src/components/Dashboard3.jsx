import {
  Home,
  CreditCard,
  Users,
  PieChart,
  Wallet,
  BarChart3,
  Bell,
  Settings,
  ChevronDown,
  Search,
  Plus,
  MoreHorizontal,
  User as UserIcon,
} from "lucide-react";

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';


const sidebarMenu = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Invoices" },
  { icon: PieChart, label: "Payments" },
  { icon: Wallet, label: "My Wallets" },
  { icon: Users, label: "Analytics" },
  { icon: UserIcon, label: "Activity" },
  { icon: CreditCard, label: "Transaction" },
];

// Example real data
const chartData = [
  { month: 'Jan', value: 25000 },
  { month: 'Feb', value: 35000 },
  { month: 'Mar', value: 48000 },
  { month: 'Apr', value: 65000 },
  { month: 'May', value: 70685 },
  { month: 'Jun', value: 90000 },
  { month: 'Jul', value: 70000 },
  { month: 'Aug', value: 72000 },
  { month: 'Sep', value: 65000 },
  { month: 'Oct', value: 68000 },
  { month: 'Nov', value: 58000 },
  { month: 'Dec', value: 40000 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-[#f5f7fb] font-inter">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-[#f8fafd] border-r border-[#e6e8f0] px-4 pt-8 pb-4 min-h-screen">
        <div className="flex items-center gap-2 mb-7">
          <div className="bg-[#e7eeff] rounded-full w-8 h-8 flex items-center justify-center text-[#4265d6] font-bold text-xl">
            P
          </div>
          <span className="font-bold text-xl text-[#263057] tracking-tight">
            Payout
          </span>
        </div>
        <div className="relative mb-6">
          <input
            className="w-full rounded-lg bg-[#f1f3f7] px-3 py-2 text-sm outline-none placeholder:text-gray-400"
            placeholder="Search"
          />
          <Search className="absolute right-3 top-3 text-gray-400" size={15} />
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {sidebarMenu.map((item, i) => (
            <SidebarItem key={i} {...item} />
          ))}
        </nav>
        <div className="mt-8 flex items-center gap-3 p-2 bg-[#e7eeff] rounded-lg">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="admin"
            className="w-9 h-9 rounded-full border"
          />
          <div>
            <div className="font-semibold text-[#22314f] text-sm">
              Raya Neal
            </div>
            <div className="text-xs text-[#99a1b7]">Admin</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-2 sm:px-5 pt-6 pb-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-xl font-bold text-[#22314f]">Dashboard</h2>
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-white border p-2 shadow-sm hover:shadow transition">
              <Bell size={19} className="text-[#9ca9be]" />
            </button>
            <button className="rounded-full bg-white border p-2 shadow-sm hover:shadow transition">
              <Settings size={19} className="text-[#9ca9be]" />
            </button>
          </div>
        </div>

        {/* Metrics & Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-6">
          <MetricCard
            title="Earnings"
            value="$984.42"
            rate="+12.8%"
            sub="+$120.8 than last month"
          />
          <MetricCard
            title="Spending's"
            value="$576.76"
            rate="-2.7%"
            sub="-$6.8 than last month"
            negative
          />
          <MetricCard
            title="Saving"
            value="$421.29"
            rate="+12.0%"
            sub="+$46.1 than last month"
          />
          <CreditCardWidget />
        </div>

        {/* Chart + Quick Transaction */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
          <div className="xl:col-span-2 bg-white rounded-xl shadow p-5 flex flex-col min-h-[220px]">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-[#22314f]">Balance Summary</span>
              <button className="flex items-center gap-1 text-[#99a1b7] text-xs border px-2 py-1 rounded-md hover:bg-[#f1f3f7] transition">
                March <ChevronDown size={12} />
              </button>
            </div>
            <ChartSection />
          </div>
          <div className="flex flex-col gap-5">
            <QuickTransactionWidget />
          </div>
        </div>

        {/* Lower Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <AdmitSnap />
          <CustomerGrowth />
          <ExpensesSummary />
          <TransactionHistory />
        </div>
      </main>
    </div>
  );
}

// Sidebar item with active highlighting
function SidebarItem({ icon: Icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition text-base select-none
      ${
        active
          ? "bg-[#22314f] text-white font-semibold shadow"
          : "text-[#22314f] hover:bg-[#f1f3f7]"
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </div>
  );
}

// Earnings/Spending/Saving cards
function MetricCard({ title, value, rate, sub, negative }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-1 min-w-[160px]">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-[#99a1b7]">{title}</span>
        <span
          className={`text-xs font-bold ${
            negative ? "text-red-500" : "text-green-500"
          }`}
        >
          {rate}
        </span>
      </div>
      <div className="text-xl font-bold text-[#22314f]">{value}</div>
      <div className="text-xs text-[#99a1b7]">{sub}</div>
    </div>
  );
}

// Card widget (dark style)
function CreditCardWidget() {
  return (
    <div className="bg-[#22314f] rounded-xl shadow p-5 flex flex-col gap-3 text-white min-w-[210px] relative overflow-hidden">
      <div className="text-xs">Card</div>
      <div className="text-2xl font-bold mb-1">$34 000.00</div>
      <div className="flex justify-between items-center text-xs mb-1">
        <span>Card Holder</span>
        <span>**** 7223</span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <span>Michael Smith</span>
        <span>03/26</span>
      </div>
      <div className="flex gap-2 mt-3">
        <button className="bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-xs">Send</button>
        <button className="bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-xs">Request</button>
        <button className="bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-xs">Add</button>
      </div>
    </div>
  );
}

// SVG Chart
function ChartSection() {
  return (
    <div className="w-full h-44">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#f2f5fa" />
          <XAxis dataKey="month" stroke="#99a1b7" fontSize={12} />
          <YAxis
            stroke="#99a1b7"
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${Math.round(v/1000)}k`}
          />
          <Tooltip
            contentStyle={{
              background: "#22314f",
              color: "#fff",
              borderRadius: 8,
              border: "none",
              fontSize: 13,
              fontWeight: 500,
            }}
            labelStyle={{ color: "#fff", fontWeight: 600 }}
            formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4265d6"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#fff", strokeWidth: 2, fill: "#4265d6" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
// Quick Transaction widget
function QuickTransactionWidget() {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3">
      <div className="font-semibold text-[#22314f] mb-2">Quick Transaction</div>
      <div className="flex flex-wrap gap-2">
        <button className="w-10 h-10 bg-[#e7eeff] rounded-full flex items-center justify-center hover:bg-blue-100 transition"><Plus size={18} /></button>
        {["Add","Devi","John","Will","Kris"].map(name => (
          <button key={name} className="w-10 h-10 bg-[#e7eeff] rounded-full flex items-center justify-center hover:bg-blue-100 transition text-xs font-semibold">{name[0]}</button>
        ))}
      </div>
    </div>
  );
}

// Lower left: Admit Snap
function AdmitSnap() {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-1 min-w-[160px]">
      <div className="flex justify-between items-center text-xs text-[#99a1b7] mb-1">
        <span>Admit Snap</span>
        <span className="text-green-500">+30.00%</span>
      </div>
      <div className="text-2xl font-bold text-[#22314f]">$40,585</div>
      <div className="text-xs text-[#99a1b7]">Total Amount</div>
    </div>
  );
}

// Customer Growth widget
function CustomerGrowth() {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3 min-w-[160px]">
      <div className="flex justify-between items-center text-xs text-[#99a1b7] mb-1">
        <span>Customer Growth</span>
        <span className="text-[#99a1b7]">United Stage</span>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#f1f3f7] flex items-center justify-center text-[#22314f] font-bold">12</div>
          <span className="text-xs text-[#99a1b7] mt-1">234</span>
        </div>
        <div className="flex-1">
          <div className="flex gap-1 text-xs text-[#99a1b7]">
            <span>Germany</span>
            <span>Australia</span>
            <span>France</span>
          </div>
          <div className="text-[#22314f] font-bold text-xl">2,467</div>
        </div>
      </div>
    </div>
  );
}

// Expenses Summary widget
function ExpensesSummary() {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 min-w-[180px]">
      <div className="flex justify-between items-center text-xs text-[#99a1b7] mb-1">
        <span>Expenses Summary</span>
        <span className="text-[#99a1b7]">March</span>
      </div>
      <div className="flex gap-3 items-center">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="text-[#e9ecf5]"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#4265d6]"
              strokeDasharray="72, 100"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fill="#22314f"
              fontSize="9"
              fontWeight="bold"
              dy=".3em"
            >
              72%
            </text>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-[#22314f] font-bold text-lg mb-2">$9670</div>
          <div className="text-xs text-[#99a1b7]">Total Expense</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-xs text-[#22314f] mt-2">
        <div className="flex justify-between">
          <span>Information technology</span>
          <span>$2,657.89</span>
        </div>
        <div className="flex justify-between">
          <span>Various shopping</span>
          <span>$2,657.89</span>
        </div>
        <div className="flex justify-between">
          <span>Employee salary</span>
          <span>$2,657.89</span>
        </div>
      </div>
    </div>
  );
}

// Transaction History widget
function TransactionHistory() {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 min-w-[170px]">
      <div className="flex justify-between items-center text-xs text-[#99a1b7] mb-2">
        <span>Transaction History</span>
        <MoreHorizontal size={14} className="text-[#99a1b7]" />
      </div>
      <div className="text-[#22314f] font-semibold text-sm flex items-center justify-between mb-1">
        <span>Paypal</span>
        <span className="text-xs text-[#99a1b7]">22/06/2023 · 15:11</span>
        <span className="text-[#22314f] font-bold">$1,000</span>
      </div>
    </div>
  );
}

