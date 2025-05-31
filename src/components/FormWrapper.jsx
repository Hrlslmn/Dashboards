// components/forms/FormWrapper.jsx
import { Copy } from "lucide-react";

export default function FormWrapper({ title, desc, jsx, code, showCode, onToggle, onCopy, id }) {
  return (
    <div className="bg-[#2B313A] rounded-xl p-6">
      <h2 className="text-xl font-semibold text-[#FFD369] mb-1">{title}</h2>
      <p className="text-sm text-[#AAAAAA] mb-4">{desc}</p>
      {jsx}
      <div className="mt-4">
        <button
          className="bg-[#FFD369] text-[#222831] text-sm px-4 py-1 rounded-full hover:bg-yellow-400"
          onClick={() => onToggle(id)}
        >
          {showCode === id ? "Hide Code" : "View Code"}
        </button>
      </div>
      {showCode === id && (
        <div className="relative mt-4 bg-[#1f1f1f] text-xs p-4 rounded overflow-auto">
          <pre>{code}</pre>
          <button
            onClick={() => onCopy(code)}
            className="absolute top-2 right-2 text-white bg-[#FFD369] text-xs px-2 py-1 rounded hover:bg-yellow-300"
          >
            <Copy size={14} className="inline mr-1" /> Copy
          </button>
        </div>
      )}
    </div>
  );
}
