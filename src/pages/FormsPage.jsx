import React, { useState } from "react";
import HeaderGreen from "../components/HeaderGreen";
import { Copy } from "lucide-react";

export default function FormsPage() {
  const [showCode, setShowCode] = useState(null);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
  };

  const examples = [
    {
      id: "basic",
      title: "Basic Login Form",
      desc: "Simple and clean layout for user login.",
      code: `<form className="bg-[#2E3440] p-6 rounded-xl space-y-4 max-w-sm mx-auto shadow">
  <h2 className="text-[#FFD369] font-bold text-xl mb-2">Login</h2>
  <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded bg-[#1f1f1f] border border-[#393E46] text-white" />
  <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded bg-[#1f1f1f] border border-[#393E46] text-white" />
  <button type="submit" className="w-full bg-[#FFD369] text-[#222831] font-semibold py-2 rounded hover:bg-yellow-400 transition">Sign In</button>
</form>`,
      jsx: (
        <form className="bg-[#2E3440] p-6 rounded-xl space-y-4 max-w-sm mx-auto shadow">
          <h2 className="text-[#FFD369] font-bold text-xl mb-2">Login</h2>
          <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded bg-[#1f1f1f] border border-[#393E46] text-white" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded bg-[#1f1f1f] border border-[#393E46] text-white" />
          <button type="submit" className="w-full bg-[#FFD369] text-[#222831] font-semibold py-2 rounded hover:bg-yellow-400 transition">Sign In</button>
        </form>
      ),
    },
    {
      id: "with-icon",
      title: "Input With Icon",
      desc: "Icon embedded input field for context.",
      code: `<div className="relative max-w-md">
  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
  <input type="text" placeholder="Username" className="pl-8 pr-4 py-2 w-full rounded-md bg-[#2E3440] text-[#EEEEEE] border border-[#393E46]" />
</div>`,
      jsx: (
        <div className="relative max-w-md">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
          <input type="text" placeholder="Username" className="pl-8 pr-4 py-2 w-full rounded-md bg-[#2E3440] text-[#EEEEEE] border border-[#393E46]" />
        </div>
      ),
    },
    {
      id: "floating",
      title: "Floating Labels",
      desc: "Input label floats when focused.",
      code: `<div className="relative z-0 w-full group max-w-md">
  <input type="text" name="floating_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b border-gray-600 focus:outline-none focus:ring-0 focus:border-yellow-500 peer" placeholder=" " />
  <label className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
</div>`,
      jsx: (
        <div className="relative z-0 w-full group max-w-md">
          <input type="text" name="floating_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b border-gray-600 focus:outline-none focus:ring-0 focus:border-yellow-500 peer" placeholder=" " />
          <label className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
        </div>
      ),
    },
    {
      id: "select",
      title: "Dropdown Select",
      desc: "Form select styled like modern UI.",
      code: `<select className="w-full max-w-md px-4 py-2 rounded-md bg-[#2E3440] text-[#EEEEEE] border border-[#393E46]">
  <option>Choose one</option>
  <option>Designer</option>
  <option>Developer</option>
  <option>Manager</option>
</select>`,
      jsx: (
        <select className="w-full max-w-md px-4 py-2 rounded-md bg-[#2E3440] text-[#EEEEEE] border border-[#393E46]">
          <option>Choose one</option>
          <option>Designer</option>
          <option>Developer</option>
          <option>Manager</option>
        </select>
      ),
    },
    {
      id: "textarea",
      title: "Textarea Field",
      desc: "Multiline message input.",
      code: `<textarea rows="4" placeholder="Write something..." className="w-full max-w-md px-4 py-2 rounded-md bg-[#2E3440] text-[#EEEEEE] border border-[#393E46]"></textarea>`,
      jsx: (
        <textarea rows="4" placeholder="Write something..." className="w-full max-w-md px-4 py-2 rounded-md bg-[#2E3440] text-[#EEEEEE] border border-[#393E46]"></textarea>
      ),
    },
    {
      id: "pill-form",
      title: "Rounded Pill Form",
      desc: "Fully rounded fields for modern UI.",
      code: `<form className="space-y-4 max-w-md">
  <input type="email" placeholder="Email" className="w-full px-5 py-2 rounded-full bg-[#2E3440] text-white border border-[#393E46]" />
  <input type="password" placeholder="Password" className="w-full px-5 py-2 rounded-full bg-[#2E3440] text-white border border-[#393E46]" />
  <button type="submit" className="w-full bg-[#FFD369] text-[#222831] font-semibold py-2 rounded-full hover:bg-yellow-400">Login</button>
</form>`,
      jsx: (
        <form className="space-y-4 max-w-md">
          <input type="email" placeholder="Email" className="w-full px-5 py-2 rounded-full bg-[#2E3440] text-white border border-[#393E46]" />
          <input type="password" placeholder="Password" className="w-full px-5 py-2 rounded-full bg-[#2E3440] text-white border border-[#393E46]" />
          <button type="submit" className="w-full bg-[#FFD369] text-[#222831] font-semibold py-2 rounded-full hover:bg-yellow-400">Login</button>
        </form>
      ),
    },
    {
      id: "split-form",
      title: "Split Form Block",
      desc: "Login form with two side layout.",
      code: `<div className="bg-[#2E3440] rounded-xl shadow-md overflow-hidden max-w-3xl flex">
  <div className="w-1/2 bg-[#FFD369] p-8 text-[#222831]">
    <h3 className="text-xl font-bold mb-4">Welcome Back</h3>
    <p className="text-sm">Please login to continue.</p>
  </div>
  <form className="w-1/2 p-8 space-y-4">
    <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded bg-[#1f1f1f] border border-[#393E46] text-white" />
    <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded bg-[#1f1f1f] border border-[#393E46] text-white" />
    <button type="submit" className="w-full bg-[#FFD369] text-[#222831] font-semibold py-2 rounded hover:bg-yellow-400">Sign In</button>
  </form>
</div>`,
      jsx: (
        <div className="bg-[#2E3440] rounded-xl shadow-md overflow-hidden max-w-3xl flex flex-col sm:flex-row">
          <div className="sm:w-1/2 bg-[#FFD369] p-8 text-[#222831]">
            <h3 className="text-xl font-bold mb-4">Welcome Back</h3>
            <p className="text-sm">Please login to continue.</p>
          </div>
          <form className="sm:w-1/2 p-8 space-y-4">
            <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded bg-[#1f1f1f] border border-[#393E46] text-white" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded bg-[#1f1f1f] border border-[#393E46] text-white" />
            <button type="submit" className="w-full bg-[#FFD369] text-[#222831] font-semibold py-2 rounded hover:bg-yellow-400">Sign In</button>
          </form>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f25] to-[#222831] text-[#EEEEEE] font-['Inter',sans-serif]">
      <HeaderGreen />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFD369] mb-2">Input Fields & Forms</h1>
          <p className="text-[#CCCCCC] text-lg">7 Tailwind-styled login and input form variations.</p>
        </div>

        <div className="space-y-12">
          {examples.map((ex) => (
            <div key={ex.id} className="bg-[#2B313A] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#FFD369] mb-1">{ex.title}</h2>
              <p className="text-sm text-[#AAAAAA] mb-4">{ex.desc}</p>
              {ex.jsx}
              <div className="mt-4">
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
