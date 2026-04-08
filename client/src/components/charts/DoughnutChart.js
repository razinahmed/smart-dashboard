/**
 * Smart Dashboard - Doughnut Chart Component
 * Displays traffic source breakdown using Chart.js
 */

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * DoughnutChart Component
 * Renders a doughnut chart for traffic source distribution
 *
 * @param {Object} props - Component props
 * @param {Object} props.data - Chart data object with labels and datasets
 * @param {string} props.title - Chart title
 */
function DoughnutChart({ data, title = 'Traffic Sources' }) {
  // Chart options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: 500,
          },
          color: '#CBD5E1',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#E2E8F0',
        bodyColor: '#CBD5E1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        titleFont: {
          size: 13,
          weight: 600,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return label + ': ' + value + ' (' + percentage + '%)';
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <span className="chart-badge">Source Distribution</span>
      </div>
      <div className="chart-body chart-centered">
        {data && data.labels ? (
          <Doughnut data={data} options={options} />
        ) : (
          <p className="chart-loading">Loading chart data...</p>
        )}
      </div>
    </div>
  );
}

export default DoughnutChart;
