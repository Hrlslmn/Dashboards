import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import React from 'react';
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function SalesChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [0, 10500, 8500, 11134, 5061],
        fill: false,
        borderColor: '#6366F1',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Fulfillment Analytics</h3>
      <Line data={data} />
    </div>
  );
}