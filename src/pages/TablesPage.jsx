import React, { useState } from "react";
import HeaderGreen from "../components/HeaderGreen";
import { Copy } from "lucide-react";

export default function TablesPage() {
  const [showCode, setShowCode] = useState(null);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
  };

  const examples = [
    {
      id: "basic",
      title: "Basic Table",
      desc: "Display structured data with standard styling.",
      code: `<table className="w-full text-left border-collapse border border-[#393E46]">
  <thead>
    <tr className="bg-[#2E3440]">
      <th className="p-3 border-b border-[#393E46]">Name</th>
      <th className="p-3 border-b border-[#393E46]">Role</th>
      <th className="p-3 border-b border-[#393E46]">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr className="hover:bg-[#2B313A]">
      <td className="p-3">Alice</td>
      <td className="p-3">Designer</td>
      <td className="p-3 text-green-400">Active</td>
    </tr>
    <tr className="hover:bg-[#2B313A]">
      <td className="p-3">Bob</td>
      <td className="p-3">Developer</td>
      <td className="p-3 text-yellow-400">Pending</td>
    </tr>
  </tbody>
</table>`,
      jsx: (
        <table className="w-full text-left border-collapse border border-[#393E46]">
          <thead>
            <tr className="bg-[#2E3440]">
              <th className="p-3 border-b border-[#393E46]">Name</th>
              <th className="p-3 border-b border-[#393E46]">Role</th>
              <th className="p-3 border-b border-[#393E46]">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-[#2B313A]">
              <td className="p-3">Alice</td>
              <td className="p-3">Designer</td>
              <td className="p-3 text-green-400">Active</td>
            </tr>
            <tr className="hover:bg-[#2B313A]">
              <td className="p-3">Bob</td>
              <td className="p-3">Developer</td>
              <td className="p-3 text-yellow-400">Pending</td>
            </tr>
          </tbody>
        </table>
      ),
    },
    {
      id: "card-table",
      title: "Card Table",
      desc: "Each row styled as a card layout with spacing.",
      code: `<div className="space-y-4">
  {[
    { name: "Clara", role: "PM", status: "Active" },
    { name: "Dan", role: "Tester", status: "Inactive" },
  ].map((user, i) => (
    <div key={i} className="p-4 bg-[#2E3440] rounded-xl shadow flex justify-between items-center">
      <div>
        <h4 className="text-[#FFD369] font-semibold">{user.name}</h4>
        <p className="text-sm text-[#AAAAAA]">{user.role}</p>
      </div>
      <span className="text-sm text-green-400">{user.status}</span>
    </div>
  ))}
</div>`,
      jsx: (
        <div className="space-y-4">
          {[
            { name: "Clara", role: "PM", status: "Active" },
            { name: "Dan", role: "Tester", status: "Inactive" },
          ].map((user, i) => (
            <div key={i} className="p-4 bg-[#2E3440] rounded-xl shadow flex justify-between items-center">
              <div>
                <h4 className="text-[#FFD369] font-semibold">{user.name}</h4>
                <p className="text-sm text-[#AAAAAA]">{user.role}</p>
              </div>
              <span className="text-sm text-green-400">{user.status}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "striped",
      title: "Striped Table",
      desc: "Table with alternating row colors for readability.",
      code: `<table className="w-full border border-[#393E46]">
  <thead className="bg-[#2E3440]">
    <tr>
      <th className="p-3 border-b border-[#393E46]">Project</th>
      <th className="p-3 border-b border-[#393E46]">Owner</th>
      <th className="p-3 border-b border-[#393E46]">Status</th>
    </tr>
  </thead>
  <tbody>
    {[
      ["Website Redesign", "Emily", "Done"],
      ["API Integration", "John", "In Progress"],
    ].map((row, idx) => (
      <tr key={idx} className={idx % 2 ? "bg-[#2B313A]" : ""}>
        {row.map((cell, i) => (
          <td key={i} className="p-3">{cell}</td>
        ))}
      </tr>
    ))}
  </tbody>
</table>`,
      jsx: (
        <table className="w-full border border-[#393E46]">
          <thead className="bg-[#2E3440]">
            <tr>
              <th className="p-3 border-b border-[#393E46]">Project</th>
              <th className="p-3 border-b border-[#393E46]">Owner</th>
              <th className="p-3 border-b border-[#393E46]">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Website Redesign", "Emily", "Done"],
              ["API Integration", "John", "In Progress"],
            ].map((row, idx) => (
              <tr key={idx} className={idx % 2 ? "bg-[#2B313A]" : ""}>
                {row.map((cell, i) => (
                  <td key={i} className="p-3">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
  id: "responsive-mobile",
  title: "Responsive Mobile Table",
  desc: "Flex-based layout for mobile-friendly rows with stacking behavior.",
  code: `<div className="space-y-4 sm:hidden">
  {[["Lucas", "Writer", "Active"], ["Mira", "Editor", "Pending"]].map((user, i) => (
    <div key={i} className="p-4 rounded-lg bg-[#2E3440] shadow">
      <div className="font-semibold text-[#FFD369]">{user[0]}</div>
      <div className="text-sm text-[#AAAAAA]">{user[1]}</div>
      <div className="text-sm text-green-400">{user[2]}</div>
    </div>
  ))}
</div>`,
  jsx: (
    <div className="space-y-4 sm:hidden">
      {[["Lucas", "Writer", "Active"], ["Mira", "Editor", "Pending"]].map((user, i) => (
        <div key={i} className="p-4 rounded-lg bg-[#2E3440] shadow">
          <div className="font-semibold text-[#FFD369]">{user[0]}</div>
          <div className="text-sm text-[#AAAAAA]">{user[1]}</div>
          <div className="text-sm text-green-400">{user[2]}</div>
        </div>
      ))}
    </div>
  ),
},
{
  id: "grouped-table",
  title: "Grouped Table",
  desc: "Visually separates sections with heading rows.",
  code: `<table className="w-full text-left border-collapse border border-[#393E46]">
  <thead>
    <tr className="bg-[#2E3440]">
      <th className="p-3">Name</th>
      <th className="p-3">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr className="bg-[#222831]">
      <td colSpan="2" className="p-3 text-[#FFD369] font-semibold">Team A</td>
    </tr>
    <tr><td className="p-3">Liam</td><td className="p-3">Lead</td></tr>
    <tr><td className="p-3">Sara</td><td className="p-3">Support</td></tr>
    <tr className="bg-[#222831]">
      <td colSpan="2" className="p-3 text-[#FFD369] font-semibold">Team B</td>
    </tr>
    <tr><td className="p-3">Nico</td><td className="p-3">Analyst</td></tr>
  </tbody>
</table>`,
  jsx: (
    <table className="w-full text-left border-collapse border border-[#393E46]">
      <thead>
        <tr className="bg-[#2E3440]">
          <th className="p-3">Name</th>
          <th className="p-3">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-[#222831]">
          <td colSpan="2" className="p-3 text-[#FFD369] font-semibold">Team A</td>
        </tr>
        <tr><td className="p-3">Liam</td><td className="p-3">Lead</td></tr>
        <tr><td className="p-3">Sara</td><td className="p-3">Support</td></tr>
        <tr className="bg-[#222831]">
          <td colSpan="2" className="p-3 text-[#FFD369] font-semibold">Team B</td>
        </tr>
        <tr><td className="p-3">Nico</td><td className="p-3">Analyst</td></tr>
      </tbody>
    </table>
  ),
},
{
  id: "avatar-table",
  title: "Avatar Table",
  desc: "Combine image + text for a more visual row layout.",
  code: `<table className="w-full border border-[#393E46]">
  <thead className="bg-[#2E3440]">
    <tr>
      <th className="p-3">User</th>
      <th className="p-3">Status</th>
    </tr>
  </thead>
  <tbody>
    {[
      { name: "Emily", avatar: "/avatar1.jpg", status: "Online" },
      { name: "Jake", avatar: "/avatar2.jpg", status: "Offline" },
    ].map((u, i) => (
      <tr key={i} className="hover:bg-[#2B313A]">
        <td className="p-3 flex items-center gap-3">
          <img src={u.avatar} alt="" className="w-8 h-8 rounded-full" />
          {u.name}
        </td>
        <td className="p-3 text-green-400">{u.status}</td>
      </tr>
    ))}
  </tbody>
</table>`,
  jsx: (
    <table className="w-full border border-[#393E46]">
      <thead className="bg-[#2E3440]">
        <tr>
          <th className="p-3">User</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {[
          { name: "Emily", avatar: "/avatar1.jpg", status: "Online" },
          { name: "Jake", avatar: "/avatar2.jpg", status: "Offline" },
        ].map((u, i) => (
          <tr key={i} className="hover:bg-[#2B313A]">
            <td className="p-3 flex items-center gap-3">
              <img src={u.avatar} alt="" className="w-8 h-8 rounded-full" />
              {u.name}
            </td>
            <td className="p-3 text-green-400">{u.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
},
{
  id: "sticky-header",
  title: "Sticky Header",
  desc: "Keeps table headers visible while scrolling.",
  code: `<div className="overflow-y-auto max-h-64 border border-[#393E46] rounded">
  <table className="w-full border-collapse">
    <thead className="sticky top-0 bg-[#2E3440] text-[#FFD369]">
      <tr>
        <th className="p-3">Task</th>
        <th className="p-3">Due</th>
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: 10 }).map((_, i) => (
        <tr key={i} className="hover:bg-[#2B313A]">
          <td className="p-3">Task {i + 1}</td>
          <td className="p-3">Tomorrow</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>`,
  jsx: (
    <div className="overflow-y-auto max-h-64 border border-[#393E46] rounded">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 bg-[#2E3440] text-[#FFD369]">
          <tr>
            <th className="p-3">Task</th>
            <th className="p-3">Due</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i} className="hover:bg-[#2B313A]">
              <td className="p-3">Task {i + 1}</td>
              <td className="p-3">Tomorrow</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
},
{
  id: "badge-table",
  title: "Compact Badge Table",
  desc: "Small-sized rows with pill badges for status.",
  code: `<table className="w-full text-sm border border-[#393E46]">
  <thead className="bg-[#2E3440]">
    <tr>
      <th className="p-2">Service</th>
      <th className="p-2">State</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="p-2">Authentication</td>
      <td className="p-2"><span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Running</span></td>
    </tr>
    <tr>
      <td className="p-2">Billing</td>
      <td className="p-2"><span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Error</span></td>
    </tr>
  </tbody>
</table>`,
  jsx: (
    <table className="w-full text-sm border border-[#393E46]">
      <thead className="bg-[#2E3440]">
        <tr>
          <th className="p-2">Service</th>
          <th className="p-2">State</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2">Authentication</td>
          <td className="p-2"><span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Running</span></td>
        </tr>
        <tr>
          <td className="p-2">Billing</td>
          <td className="p-2"><span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Error</span></td>
        </tr>
      </tbody>
    </table>
  ),
}

  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f25] to-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFD369] drop-shadow mb-2">
            Tables & Lists
          </h1>
          <p className="text-[#CCCCCC] text-lg">
            Modern table components crafted with TailwindCSS.
          </p>
        </div>
        <div className="space-y-12">
          {examples.map((ex) => (
            <div key={ex.id} className="bg-[#2B313A] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#FFD369] mb-1">{ex.title}</h2>
              <p className="text-sm text-[#AAAAAA] mb-4">{ex.desc}</p>
              {ex.jsx}
              <div className="mt-4 flex gap-4">
                <button
                  className="bg-[#FFD369] text-[#222831] text-sm px-4 py-1 rounded-full hover:bg-yellow-400"
                  onClick={() => setShowCode(showCode === ex.id ? null : ex.id)}
                >
                  {showCode === ex.id ? "Hide Code" : "View Code"}
                </button>
              </div>
              {showCode === ex.id && (
                <div className="relative mt-4 bg-[#1f1f1f] text-xs p-4 rounded overflow-auto">
                  <pre>{ex.code}</pre>
                  <button
                    onClick={() => copyToClipboard(ex.code)}
                    className="absolute top-2 right-2 text-white bg-[#FFD369] text-xs px-2 py-1 rounded hover:bg-yellow-300"
                  >
                    <Copy size={14} className="inline mr-1" /> Copy
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

