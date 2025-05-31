// components/forms/BasicLogin.jsx
import React from 'react';
export default BasicLogin = {
  id: "basic",
  title: "Basic Login Form",
  desc: "Simple and clean layout for user login.",
  code: `<form className="...">...</form>`,
  jsx: (
    <form className="bg-[#2E3440] p-6 rounded-xl space-y-4 max-w-sm mx-auto shadow">
      <h2 className="text-[#FFD369] font-bold text-xl mb-2">Login</h2>
      <input type="email" placeholder="Email" className="..." />
      <input type="password" placeholder="Password" className="..." />
      <button type="submit" className="...">Sign In</button>
    </form>
  ),
};
