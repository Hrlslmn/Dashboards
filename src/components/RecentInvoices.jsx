import React from 'react';

export default function RecentInvoices() {
  const invoices = [
    { id: '#065499', name: 'Marcus', item: 'SaaS microservice kit', date: '2025-05-16', status: 'Paid', price: '$1100' },
    { id: '#065497', name: 'Emery', item: 'AI Brand Launch Kit', date: '2025-05-14', status: 'Paid', price: '$850' },
    { id: '#065495', name: 'Yok Mei', item: 'Smart Portfolio ', date: '2025-05-11', status: 'Paid', price: '$750' },
    { id: '#065493', name: 'Steven', item: 'CRM Management', date: '2025-05-09', status: 'Paid', price: '$800' },
  ];


  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Invoices</h3>
      <table className="w-full text-left">
        <thead className="text-sm text-gray-500 border-b">
          <tr>
            <th className="py-2">ID</th>
            <th>Name</th>
            <th>Item</th>
            <th>Date</th>
            <th>Status</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b last:border-none">
              <td className="py-2">{invoice.id}</td>
              <td>{invoice.name}</td>
              <td>{invoice.item}</td>
              <td>{invoice.date}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    {
                      Paid: 'bg-green-100 text-green-600',
                      Overdue: 'bg-red-100 text-red-600',
                      Refunded: 'bg-yellow-100 text-yellow-600',
                    }[invoice.status] || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
              <td>{invoice.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
