import React, { useState } from 'react';
import DateRangePicker from '../components/common/DateRangePicker';
import ExportButton from '../components/common/ExportButton';
import BarChart from '../components/charts/BarChart';
import AreaChart from '../components/charts/AreaChart';
import { DateRange } from '../types';
import { mockUserBehavior, generateTimeSeriesData } from '../utils/mockData';
import { formatNumber, formatPercentage, formatDuration } from '../utils/helpers';
import './pages.css';

const UserBehavior: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  const [sortBy, setSortBy] = useState<keyof typeof mockUserBehavior[0]>('pageViews');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedData = [...mockUserBehavior].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (column: keyof typeof mockUserBehavior[0]) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const topPagesData = mockUserBehavior
    .slice(0, 5)
    .map(page => ({
      label: page.page,
      value: page.pageViews,
    }));

  const engagementData = mockUserBehavior
    .slice(0, 6)
    .map(page => ({
      label: page.page,
      value: page.avgTimeOnPage,
    }));

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">User Behavior Analytics</h1>
          <p className="page-subtitle">
            Understand how users interact with your content
          </p>
        </div>
        <div className="page-actions">
          <DateRangePicker onChange={setDateRange} />
          <ExportButton
            data={mockUserBehavior}
            filename="user-behavior"
            formats={['csv', 'json']}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-card-header">
            <h2 className="chart-title">Top Pages by Views</h2>
          </div>
          <BarChart
            data={topPagesData}
            height={280}
            color="#3b82f6"
            horizontal={true}
          />
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <h2 className="chart-title">Average Time on Page</h2>
          </div>
          <BarChart
            data={engagementData}
            height={280}
            color="#10b981"
            horizontal={true}
          />
        </div>
      </div>

      {/* Engagement Trend */}
      <div className="chart-card full-width">
        <div className="chart-card-header">
          <h2 className="chart-title">User Engagement Over Time</h2>
        </div>
        <AreaChart
          data={generateTimeSeriesData(30)}
          height={300}
          color="#8b5cf6"
        />
      </div>

      {/* Behavior Metrics */}
      <div className="metrics-row">
        <div className="metric-box">
          <div className="metric-box-label">Avg. Pages per Session</div>
          <div className="metric-box-value">4.2</div>
          <div className="metric-box-change positive">↑ 8.5%</div>
        </div>
        <div className="metric-box">
          <div className="metric-box-label">Avg. Session Duration</div>
          <div className="metric-box-value">5m 23s</div>
          <div className="metric-box-change positive">↑ 12.3%</div>
        </div>
        <div className="metric-box">
          <div className="metric-box-label">Exit Rate</div>
          <div className="metric-box-value">34.7%</div>
          <div className="metric-box-change negative">↓ 4.2%</div>
        </div>
        <div className="metric-box">
          <div className="metric-box-label">Event Tracking</div>
          <div className="metric-box-value">23,456</div>
          <div className="metric-box-change positive">↑ 18.9%</div>
        </div>
      </div>

      {/* Page Performance Table */}
      <div className="table-card">
        <div className="table-header">
          <h2 className="table-title">Page Performance Details</h2>
        </div>
        <div className="table-container">
          <table className="data-table sortable">
            <thead>
              <tr>
                <th onClick={() => handleSort('page')}>
                  Page {sortBy === 'page' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('pageViews')}>
                  Page Views {sortBy === 'pageViews' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('uniqueViews')}>
                  Unique Views {sortBy === 'uniqueViews' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('avgTimeOnPage')}>
                  Avg. Time {sortBy === 'avgTimeOnPage' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('bounceRate')}>
                  Bounce Rate {sortBy === 'bounceRate' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('exitRate')}>
                  Exit Rate {sortBy === 'exitRate' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((page, index) => (
                <tr key={index}>
                  <td className="page-cell">
                    <strong>{page.page}</strong>
                  </td>
                  <td>{formatNumber(page.pageViews)}</td>
                  <td>{formatNumber(page.uniqueViews)}</td>
                  <td>{formatDuration(page.avgTimeOnPage * 60)}</td>
                  <td>
                    <span className={`rate-badge ${page.bounceRate > 50 ? 'high' : page.bounceRate > 35 ? 'medium' : 'low'}`}>
                      {formatPercentage(page.bounceRate)}
                    </span>
                  </td>
                  <td>
                    <span className={`rate-badge ${page.exitRate > 50 ? 'high' : page.exitRate > 35 ? 'medium' : 'low'}`}>
                      {formatPercentage(page.exitRate)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserBehavior;
