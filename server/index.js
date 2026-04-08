/**
 * Smart Dashboard - Express Backend Server
 * Serves REST API endpoints with mock analytics data and real-time updates
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { generateMockData, generateStreamingUpdate } = require('./data/mockData');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Store for connected clients (for potential real-time updates)
const connectedClients = [];

/**
 * API Routes
 */

/**
 * GET /api/analytics
 * Returns all analytics data for the dashboard
 */
app.get('/api/analytics', (req, res) => {
  try {
    const data = generateMockData();
    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error generating analytics data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics data',
    });
  }
});

/**
 * GET /api/analytics/revenue
 * Returns revenue data for the revenue chart
 */
app.get('/api/analytics/revenue', (req, res) => {
  try {
    const data = generateMockData();
    res.json({
      success: true,
      data: data.revenueData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch revenue data',
    });
  }
});

/**
 * GET /api/analytics/visitors
 * Returns visitor statistics by month
 */
app.get('/api/analytics/visitors', (req, res) => {
  try {
    const data = generateMockData();
    res.json({
      success: true,
      data: data.visitorsData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching visitors data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch visitors data',
    });
  }
});

/**
 * GET /api/analytics/traffic-sources
 * Returns traffic source breakdown
 */
app.get('/api/analytics/traffic-sources', (req, res) => {
  try {
    const data = generateMockData();
    res.json({
      success: true,
      data: data.trafficSourcesData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch traffic sources',
    });
  }
});

/**
 * GET /api/analytics/conversions
 * Returns conversion rate data
 */
app.get('/api/analytics/conversions', (req, res) => {
  try {
    const data = generateMockData();
    res.json({
      success: true,
      data: data.conversionData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching conversion data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch conversion data',
    });
  }
});

/**
 * GET /api/analytics/stats
 * Returns key performance indicators (KPIs)
 */
app.get('/api/analytics/stats', (req, res) => {
  try {
    const data = generateMockData();
    res.json({
      success: true,
      data: data.stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stats',
    });
  }
});

/**
 * GET /api/analytics/activity
 * Returns recent user activity
 */
app.get('/api/analytics/activity', (req, res) => {
  try {
    const data = generateMockData();
    res.json({
      success: true,
      data: data.recentActivity,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch activity',
    });
  }
});

/**
 * GET /api/analytics/devices
 * Returns device type breakdown
 */
app.get('/api/analytics/devices', (req, res) => {
  try {
    const data = generateMockData();
    res.json({
      success: true,
      data: data.deviceBreakdown,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching device data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch device data',
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint for monitoring
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Catch-all for React app (for client-side routing)
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), (err) => {
    if (err) {
      // If build doesn't exist, send a message about development mode
      res.send(`
        <html>
          <head>
            <title>Smart Dashboard</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: #1F2937;
                color: white;
              }
              .container {
                text-align: center;
              }
              h1 { margin-top: 0; }
              p { color: #9CA3AF; }
              code {
                background: #374151;
                padding: 2px 6px;
                border-radius: 4px;
                display: inline-block;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Smart Dashboard</h1>
              <p>React frontend is not built yet.</p>
              <p>Run <code>npm run client</code> to start the development server.</p>
              <p style="margin-top: 20px; font-size: 14px;">
                API endpoints are available at:
                <br><code>/api/analytics</code>
                <br><code>/api/health</code>
              </p>
            </div>
          </body>
        </html>
      `);
    }
  });
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

/**
 * Start server
 */
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     Smart Dashboard Server Running     ║
╚════════════════════════════════════════╝

🚀 Server: http://localhost:${PORT}
📊 API: http://localhost:${PORT}/api/analytics
🏥 Health: http://localhost:${PORT}/api/health

Environment: ${process.env.NODE_ENV || 'development'}
Timestamp: ${new Date().toISOString()}
  `);
});

/**
 * Graceful shutdown
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

module.exports = app;
