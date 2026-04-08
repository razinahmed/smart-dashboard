/**
 * Smart Dashboard - Stat Card Component
 * Displays KPI metrics with change indicators
 */

import React from 'react';

/**
 * StatCard Component
 * Renders individual KPI card with icon and trend information
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Card title/label
 * @param {string} props.value - Main metric value
 * @param {string} props.change - Percentage change
 * @param {boolean} props.isPositive - Whether change is positive
 * @param {string} props.icon - Icon emoji or identifier
 */
function StatCard({ title, value, change, isPositive, icon }) {
  // Icon mapping for different stat types
  const iconMap = {
    users: '👥',
    dollar: '💰',
    trending: '📈',
    bounce: '📊',
  };

  const displayIcon = iconMap[icon] || icon;

  return (
    <div className="stat-card">
      {/* Card Header with Icon */}
      <div className="stat-header">
        <div className="stat-icon">{displayIcon}</div>
        <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '↑' : '↓'} {change}
        </div>
      </div>

      {/* Card Content */}
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-value">{value}</p>
      </div>

      {/* Card Footer with Trend Line */}
      <div className="stat-footer">
        <div className={`trend-indicator ${isPositive ? 'up' : 'down'}`}>
          {isPositive ? 'Growing' : 'Declining'}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
