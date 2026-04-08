/**
 * Smart Dashboard - Bar Chart Component
 * Displays monthly visitor statistics using Chart.js
 */

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * BarChart Component
 * Renders a bar chart for monthly visitor metrics
 *
 * @param {Object} props - Component props
 * @param {Object} props.data - Chart data object with labels and datasets
 * @param {string} props.title - Chart title
 */
function BarChart({ data, title = 'Monthly Visitors' }) {
  // Chart options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'x',
    plugins: {
      legend: {
        display: true,
        position: 'top',
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
            return context.dataset.label + ': ' + context.parsed.y.toLocaleString();
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(51, 65, 85, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#94A3B8',
          font: {
            size: 11,
          },
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94A3B8',
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <span className="chart-badge">Year Overview</span>
      </div>
      <div className="chart-body">
        {data && data.labels ? (
          <Bar data={data} options={options} />
        ) : (
          <p className="chart-loading">Loading chart data...</p>
        )}
      </div>
    </div>
  );
}

export default BarChart;
