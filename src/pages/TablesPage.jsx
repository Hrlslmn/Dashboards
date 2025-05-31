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

