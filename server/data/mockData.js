/**
 * Mock Data Generator for Analytics Dashboard
 * Generates realistic time-series data for dashboard metrics
 */

// Helper function to generate dates
const generateDateArray = (days = 30) => {
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

// Helper function to generate random values with trend
const generateTrendedData = (days = 30, baseValue = 100, volatility = 0.15, trend = 0.02) => {
  const data = [];
  let currentValue = baseValue;

  for (let i = 0; i < days; i++) {
    const randomChange = (Math.random() - 0.5) * volatility;
    const trendChange = trend;
    currentValue = Math.max(10, currentValue * (1 + randomChange + trendChange));
    data.push(Math.round(currentValue));
  }

  return data;
};

/**
 * Generates mock analytics data
 * @returns {Object} Mock data object with various metrics
 */
const generateMockData = () => {
  const dates = generateDateArray(30);

  return {
    // Time-series data for charts
    revenueData: {
      labels: dates,
      datasets: [
        {
          label: 'Revenue',
          data: generateTrendedData(30, 5000, 0.2, 0.03),
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
        },
      ],
    },

    // Monthly visitors bar chart
    visitorsData: {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Visitors',
          data: [
            12000, 15000, 18500, 16000, 22000, 25000, 23000, 28000, 26000, 29000, 31000, 35000,
          ],
          backgroundColor: [
            '#3B82F6',
            '#3B82F6',
            '#3B82F6',
            '#3B82F6',
            '#3B82F6',
            '#3B82F6',
            '#3B82F6',
            '#3B82F6',
            '#3B82F6',
            '#3B82F6',
            '#3B82F6',
            '#3B82F6',
          ],
          borderColor: '#1E40AF',
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    },

    // Traffic sources breakdown
    trafficSourcesData: {
      labels: ['Organic Search', 'Direct', 'Social Media', 'Referral', 'Paid Ads'],
      datasets: [
        {
          data: [35, 20, 25, 12, 8],
          backgroundColor: ['#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4'],
          borderColor: '#1F2937',
          borderWidth: 2,
        },
      ],
    },

    // Conversion rate area chart
    conversionData: {
      labels: dates,
      datasets: [
        {
          label: 'Conversion Rate (%)',
          data: generateTrendedData(30, 3.5, 0.25, 0.015),
          borderColor: '#F59E0B',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
        },
      ],
    },

    // KPI Stats
    stats: [
      {
        id: 1,
        title: 'Total Visitors',
        value: 824800,
        change: '+12.5%',
        isPositive: true,
        icon: 'users',
      },
      {
        id: 2,
        title: 'Revenue',
        value: '$145,230',
        change: '+8.2%',
        isPositive: true,
        icon: 'dollar',
      },
      {
        id: 3,
        title: 'Conversions',
        value: 28540,
        change: '-2.3%',
        isPositive: false,
        icon: 'trending',
      },
      {
        id: 4,
        title: 'Bounce Rate',
        value: '42.3%',
        change: '-5.1%',
        isPositive: true,
        icon: 'bounce',
      },
    ],

    // Recent activity
    recentActivity: [
      {
        id: 1,
        type: 'New User Signup',
        description: 'john.doe@example.com joined',
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      },
      {
        id: 2,
        type: 'Purchase',
        description: 'Order #12345 for $299.99',
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      },
      {
        id: 3,
        type: 'New User Signup',
        description: 'jane.smith@example.com joined',
        timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
      },
      {
        id: 4,
        type: 'Purchase',
        description: 'Order #12346 for $149.99',
        timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      },
      {
        id: 5,
        type: 'Subscription Upgrade',
        description: 'User upgraded to Pro Plan',
        timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
      },
    ],

    // Device breakdown
    deviceBreakdown: {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [
        {
          data: [55, 35, 10],
          backgroundColor: ['#3B82F6', '#EC4899', '#8B5CF6'],
          borderColor: '#1F2937',
          borderWidth: 2,
        },
      ],
    },

    // Timestamp for real-time updates
    lastUpdated: new Date().toISOString(),
  };
};

/**
 * Generates streaming update with new data point
 * @returns {Object} Updated metric with new data point
 */
const generateStreamingUpdate = () => {
  return {
    metric: ['revenue', 'visitors', 'conversions'][Math.floor(Math.random() * 3)],
    value: Math.round(Math.random() * 10000),
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  generateMockData,
  generateStreamingUpdate,
  generateDateArray,
  generateTrendedData,
};
