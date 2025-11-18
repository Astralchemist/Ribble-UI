import React, { useState } from 'react';
import DateRangePicker from '../components/common/DateRangePicker';
import ExportButton from '../components/common/ExportButton';
import FilterPanel, { Filter } from '../components/common/FilterPanel';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import { DateRange, TrafficSource } from '../types';
import { mockTrafficSources, generateTimeSeriesData, mockBrowserBreakdown } from '../utils/mockData';
import { formatNumber, formatPercentage, formatDuration } from '../utils/helpers';
import './pages.css';

const Traffic: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  const filters: Filter[] = [
    {
      id: 'source',
      label: 'Traffic Source',
      options: [
        { value: 'organic', label: 'Organic Search' },
        { value: 'direct', label: 'Direct' },
        { value: 'social', label: 'Social Media' },
        { value: 'referral', label: 'Referral' },
        { value: 'email', label: 'Email' },
      ],
    },
    {
      id: 'device',
      label: 'Device Type',
      options: [
        { value: 'desktop', label: 'Desktop' },
        { value: 'mobile', label: 'Mobile' },
        { value: 'tablet', label: 'Tablet' },
      ],
    },
  ];

  const handleFilterChange = (filterId: string, value: string) => {
    // In a real app, filter data based on selection
    console.log(`Filter ${filterId} changed to ${value}`);
  };

  const trafficSourceData = mockTrafficSources.map(source => ({
    label: source.source,
    value: source.percentage,
  }));

  const topSourcesData = mockTrafficSources.slice(0, 5).map(source => ({
    label: source.source,
    value: source.users,
  }));

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Traffic Analytics</h1>
          <p className="page-subtitle">
            Analyze your traffic sources and user acquisition channels
          </p>
        </div>
        <div className="page-actions">
          <DateRangePicker onChange={setDateRange} />
          <ExportButton
            data={mockTrafficSources}
            filename="traffic-sources"
            formats={['csv', 'json']}
          />
        </div>
      </div>

      <div className="content-with-sidebar">
        <div className="sidebar">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <div className="main-content">
          {/* Traffic Sources Overview */}
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-card-header">
                <h2 className="chart-title">Traffic Sources Distribution</h2>
              </div>
              <PieChart
                data={trafficSourceData}
                size={240}
                showLegend={true}
              />
            </div>

            <div className="chart-card">
              <div className="chart-card-header">
                <h2 className="chart-title">Top Traffic Sources</h2>
              </div>
              <BarChart
                data={topSourcesData}
                height={280}
                color="#3b82f6"
                horizontal={true}
              />
            </div>
          </div>

          {/* Traffic Trend */}
          <div className="chart-card full-width">
            <div className="chart-card-header">
              <h2 className="chart-title">Traffic Trend by Source</h2>
            </div>
            <LineChart
              data={generateTimeSeriesData(30)}
              height={300}
              color="#10b981"
            />
          </div>

          {/* Browser Breakdown */}
          <div className="chart-card full-width">
            <div className="chart-card-header">
              <h2 className="chart-title">Browser Distribution</h2>
            </div>
            <BarChart
              data={mockBrowserBreakdown}
              height={250}
              color="#f59e0b"
            />
          </div>

          {/* Traffic Sources Table */}
          <div className="table-card">
            <div className="table-header">
              <h2 className="table-title">Traffic Sources Detail</h2>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Users</th>
                    <th>Sessions</th>
                    <th>Bounce Rate</th>
                    <th>Avg. Duration</th>
                    <th>Share</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTrafficSources.map((source, index) => (
                    <tr key={index}>
                      <td className="source-cell">
                        <strong>{source.source}</strong>
                      </td>
                      <td>{formatNumber(source.users)}</td>
                      <td>{formatNumber(source.sessions)}</td>
                      <td>{formatPercentage(source.bounceRate)}</td>
                      <td>{formatDuration(source.avgSessionDuration * 60)}</td>
                      <td>
                        <div className="percentage-bar">
                          <div
                            className="percentage-fill"
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                          <span className="percentage-text">
                            {formatPercentage(source.percentage)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traffic;
