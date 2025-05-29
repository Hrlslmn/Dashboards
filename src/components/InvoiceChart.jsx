import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

export default function InvoiceChart() {
  const total = 5061;

  const data = {
    labels: ['Sales'],
    datasets: [
      {
        label: 'Total orders',
        data: [total, 15000 - total], // total vs remaining
        backgroundColor: ['#3B82F6', '#E5E7EB'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const options = {
    cutout: '80%',
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition pt-[15%]">
      <div className="relative w-40 h-40 mx-auto">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500">Total sales</span>
          <span className="text-xl font-semibold text-gray-800">{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

