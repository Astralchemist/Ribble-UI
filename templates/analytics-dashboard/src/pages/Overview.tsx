import React, { useState } from 'react';
import MetricCard from '../components/common/MetricCard';
import DateRangePicker from '../components/common/DateRangePicker';
import ExportButton from '../components/common/ExportButton';
import LineChart from '../components/charts/LineChart';
import AreaChart from '../components/charts/AreaChart';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import { DateRange } from '../types';
import {
  mockMetrics,
  generateTimeSeriesData,
  mockDeviceBreakdown,
  mockGeographicData,
} from '../utils/mockData';
import './pages.css';

const Overview: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  const timeSeriesData = generateTimeSeriesData(30);

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    // In a real app, fetch new data based on date range
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Overview Dashboard</h1>
          <p className="page-subtitle">
            Monitor your key metrics and performance indicators
          </p>
        </div>
        <div className="page-actions">
          <DateRangePicker onChange={handleDateRangeChange} />
          <ExportButton
            data={timeSeriesData}
            filename="overview-data"
            formats={['csv', 'json']}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        {mockMetrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} showTrend={true} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Visitors Over Time */}
        <div className="chart-card full-width">
          <div className="chart-card-header">
            <h2 className="chart-title">Visitors Over Time</h2>
            <div className="chart-legend-inline">
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#3b82f6' }}></span>
                Current Period
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#94a3b8' }}></span>
                Previous Period
              </span>
            </div>
          </div>
          <LineChart
            data={timeSeriesData}
            height={300}
            showComparison={true}
          />
        </div>

        {/* Sessions Trend */}
        <div className="chart-card full-width">
          <div className="chart-card-header">
            <h2 className="chart-title">Sessions Trend</h2>
          </div>
          <AreaChart
            data={timeSeriesData}
            height={250}
            color="#10b981"
          />
        </div>

        {/* Device Breakdown */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h2 className="chart-title">Device Breakdown</h2>
          </div>
          <PieChart
            data={mockDeviceBreakdown}
            size={220}
            showLegend={true}
            donut={true}
          />
        </div>

        {/* Top Locations */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h2 className="chart-title">Top Locations</h2>
          </div>
          <BarChart
            data={mockGeographicData.slice(0, 5)}
            height={280}
            color="#8b5cf6"
            horizontal={true}
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-item">
          <div className="stat-label">Page Views</div>
          <div className="stat-value">156,234</div>
          <div className="stat-change positive">+8.2%</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">New Users</div>
          <div className="stat-value">12,456</div>
          <div className="stat-change positive">+15.3%</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Returning Users</div>
          <div className="stat-value">32,775</div>
          <div className="stat-change positive">+5.7%</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Pages / Session</div>
          <div className="stat-value">3.45</div>
          <div className="stat-change negative">-2.1%</div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
