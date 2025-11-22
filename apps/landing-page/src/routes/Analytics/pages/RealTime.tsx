import React, { useState, useEffect } from 'react';
import AreaChart from '../components/charts/AreaChart';
import BarChart from '../components/charts/BarChart';
import { RealTimeMetric } from '../types';
import { mockRealTimePages, generateHourlyData } from '../utils/mockData';
import { formatNumber } from '../utils/helpers';
import './pages.css';

const RealTime: React.FC = () => {
  const [metrics, setMetrics] = useState<RealTimeMetric>({
    activeUsers: 842,
    pageViews: 1234,
    events: 567,
    conversions: 23,
  });

  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        activeUsers: Math.floor(Math.random() * 200) + 750,
        pageViews: Math.floor(Math.random() * 300) + 1100,
        events: Math.floor(Math.random() * 150) + 500,
        conversions: Math.floor(Math.random() * 10) + 18,
      });
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const topPagesData = mockRealTimePages.slice(0, 8).map(page => ({
    label: page.page,
    value: page.activeUsers,
  }));

  const hourlyData = generateHourlyData();

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Real-Time Analytics</h1>
          <p className="page-subtitle">
            Monitor your site activity in real-time
          </p>
        </div>
        <div className="real-time-indicator">
          <span className="live-dot"></span>
          <span className="live-text">
            Live - Updated {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Real-Time Metrics */}
      <div className="real-time-metrics">
        <div className="real-time-metric-card primary">
          <div className="real-time-metric-label">Active Users</div>
          <div className="real-time-metric-value">{formatNumber(metrics.activeUsers)}</div>
          <div className="real-time-metric-subtitle">Right now</div>
        </div>

        <div className="real-time-metric-card">
          <div className="real-time-metric-label">Page Views</div>
          <div className="real-time-metric-value">{formatNumber(metrics.pageViews)}</div>
          <div className="real-time-metric-subtitle">Last 30 minutes</div>
        </div>

        <div className="real-time-metric-card">
          <div className="real-time-metric-label">Events</div>
          <div className="real-time-metric-value">{formatNumber(metrics.events)}</div>
          <div className="real-time-metric-subtitle">Last 30 minutes</div>
        </div>

        <div className="real-time-metric-card">
          <div className="real-time-metric-label">Conversions</div>
          <div className="real-time-metric-value">{formatNumber(metrics.conversions)}</div>
          <div className="real-time-metric-subtitle">Last 30 minutes</div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="chart-card full-width">
        <div className="chart-card-header">
          <h2 className="chart-title">Page Views - Last 24 Hours</h2>
        </div>
        <AreaChart
          data={hourlyData}
          height={300}
          color="#3b82f6"
          fillOpacity={0.3}
        />
      </div>

      {/* Active Pages and Events */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-card-header">
            <h2 className="chart-title">Top Active Pages</h2>
          </div>
          <BarChart
            data={topPagesData}
            height={320}
            color="#10b981"
            horizontal={true}
          />
        </div>

        <div className="real-time-list-card">
          <div className="chart-card-header">
            <h2 className="chart-title">Recent Events</h2>
          </div>
          <div className="event-list">
            {[
              { event: 'Page View', page: '/products/laptop', time: '2s ago' },
              { event: 'Add to Cart', page: '/products/phone', time: '5s ago' },
              { event: 'Page View', page: '/home', time: '8s ago' },
              { event: 'Checkout', page: '/checkout', time: '12s ago' },
              { event: 'Page View', page: '/blog/post-1', time: '15s ago' },
              { event: 'Newsletter Signup', page: '/home', time: '18s ago' },
              { event: 'Page View', page: '/pricing', time: '21s ago' },
              { event: 'Download', page: '/resources', time: '24s ago' },
            ].map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-info">
                  <div className="event-name">{event.event}</div>
                  <div className="event-page">{event.page}</div>
                </div>
                <div className="event-time">{event.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic and Device Real-Time */}
      <div className="real-time-grid">
        <div className="real-time-stat-card">
          <h3 className="stat-card-title">Top Locations</h3>
          <div className="stat-list">
            {[
              { location: 'United States', users: 342 },
              { location: 'United Kingdom', users: 156 },
              { location: 'Germany', users: 98 },
              { location: 'Canada', users: 76 },
              { location: 'France', users: 54 },
            ].map((item, index) => (
              <div key={index} className="stat-list-item">
                <span className="stat-list-label">{item.location}</span>
                <span className="stat-list-value">{item.users}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="real-time-stat-card">
          <h3 className="stat-card-title">Device Types</h3>
          <div className="stat-list">
            {[
              { device: 'Desktop', users: 441, percentage: 52.4 },
              { device: 'Mobile', users: 326, percentage: 38.7 },
              { device: 'Tablet', users: 75, percentage: 8.9 },
            ].map((item, index) => (
              <div key={index} className="stat-list-item">
                <span className="stat-list-label">{item.device}</span>
                <div className="stat-list-value-group">
                  <span className="stat-list-value">{item.users}</span>
                  <span className="stat-list-percentage">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="real-time-stat-card">
          <h3 className="stat-card-title">Traffic Sources</h3>
          <div className="stat-list">
            {[
              { source: 'Organic Search', users: 344 },
              { source: 'Direct', users: 268 },
              { source: 'Social Media', users: 142 },
              { source: 'Referral', users: 88 },
            ].map((item, index) => (
              <div key={index} className="stat-list-item">
                <span className="stat-list-label">{item.source}</span>
                <span className="stat-list-value">{item.users}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTime;
