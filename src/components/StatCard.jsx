import React from 'react';

export default function StatCard({ title, value, change, icon }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4">
      <div className="text-indigo-500 text-3xl">{icon}</div>
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <div className="text-2xl font-semibold text-gray-800">{value}</div>
        <div className={`text-sm ${change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
          {change} Since Start Week
        </div>
      </div>
    </div>
  );
}