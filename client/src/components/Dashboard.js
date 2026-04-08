/**
 * Smart Dashboard - Main Dashboard Component
 * Orchestrates all dashboard sections with data fetching and layout
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from './cards/StatCard';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import DoughnutChart from './charts/DoughnutChart';
import AreaChart from './charts/AreaChart';

/**
 * Dashboard Component
 * Main dashboard that fetches analytics data and renders all widgets
 */
function Dashboard({ isDarkMode }) {
  // State management
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch analytics data from API
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get('/api/analytics', {
          timeout: 10000,
        });

        if (response.data.success && response.data.data) {
          setAnalyticsData(response.data.data);
          setLastUpdated(new Date(response.data.timestamp));
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchAnalytics();

    // Set up auto-refresh every 30 seconds
    const refreshInterval = setInterval(fetchAnalytics, 30000);

    return () => clearInterval(refreshInterval);
  }, []);

  // Manual refresh function
  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/analytics');
      if (response.data.success && response.data.data) {
        setAnalyticsData(response.data.data);
        setLastUpdated(new Date(response.data.timestamp));
      }
    } catch (err) {
      console.error('Error refreshing data:', err);
      setError('Failed to refresh data');
    } finally {
      setIsLoading(false);
    }
  };

  // Format timestamp for display
  const formatTime = (date) => {
    if (!date) return 'Never';
    return date.toLocaleTimeString();
  };

  if (isLoading && !analyticsData) {
    return (
      <div className="dashboard-loading">
        <div className="spinner">
          <div className="spinner-inner"></div>
        </div>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  if (error && !analyticsData) {
    return (
      <div className="dashboard-error">
        <p className="error-title">Unable to load dashboard</p>
        <p className="error-message">{error}</p>
        <button className="retry-btn" onClick={handleRefresh}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Dashboard Control Bar */}
      <div className="dashboard-controls">
        <div className="controls-left">
          <span className="last-updated">
            Last updated: <strong>{formatTime(lastUpdated)}</strong>
          </span>
        </div>
        <div className="controls-right">
          <button
            className="refresh-btn"
            onClick={handleRefresh}
            disabled={isLoading}
            title="Refresh dashboard data"
          >
            {isLoading ? (
              <>
                <span className="spinner-small"></span> Refreshing...
              </>
            ) : (
              <>
                🔄 Refresh
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPI Stats Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Key Performance Indicators</h2>
        <div className="stats-grid">
          {analyticsData?.stats?.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              isPositive={stat.isPositive}
              icon={stat.icon}
            />
          ))}
        </div>
      </section>

      {/* Charts Section - Row 1 */}
      <section className="dashboard-section">
        <h2 className="section-title">Analytics Overview</h2>
        <div className="charts-grid charts-grid-2">
          {/* Revenue Chart */}
          <div className="chart-wrapper">
            <LineChart data={analyticsData?.revenueData} title="Revenue Trend" />
          </div>

          {/* Conversions Chart */}
          <div className="chart-wrapper">
            <AreaChart data={analyticsData?.conversionData} title="Conversion Rate" />
          </div>
        </div>
      </section>

      {/* Charts Section - Row 2 */}
      <section className="dashboard-section">
        <h2 className="section-title">Traffic & Audience</h2>
        <div className="charts-grid charts-grid-3">
          {/* Monthly Visitors */}
          <div className="chart-wrapper chart-wrapper-large">
            <BarChart data={analyticsData?.visitorsData} title="Monthly Visitors" />
          </div>

          {/* Traffic Sources */}
          <div className="chart-wrapper">
            <DoughnutChart data={analyticsData?.trafficSourcesData} title="Traffic Sources" />
          </div>

          {/* Device Breakdown */}
          <div className="chart-wrapper">
            <DoughnutChart data={analyticsData?.deviceBreakdown} title="Device Breakdown" />
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-container">
          {analyticsData?.recentActivity?.length > 0 ? (
            <ul className="activity-list">
              {analyticsData.recentActivity.map((activity) => (
                <li key={activity.id} className="activity-item">
                  <div className="activity-indicator"></div>
                  <div className="activity-content">
                    <h4 className="activity-type">{activity.type}</h4>
                    <p className="activity-description">{activity.description}</p>
                  </div>
                  <div className="activity-time">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="activity-empty">No recent activity</p>
          )}
        </div>
      </section>

      {/* Dashboard Footer */}
      <footer className="dashboard-footer">
        <p>
          Smart Dashboard v1.0 • Real-time Analytics • Built with React & Chart.js
        </p>
        <p className="footer-meta">
          Last sync: {formatTime(lastUpdated)} • {analyticsData?.stats?.length || 0} metrics
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;
