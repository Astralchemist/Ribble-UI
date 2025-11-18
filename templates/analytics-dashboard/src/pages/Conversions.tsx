import React, { useState } from 'react';
import DateRangePicker from '../components/common/DateRangePicker';
import ExportButton from '../components/common/ExportButton';
import LineChart from '../components/charts/LineChart';
import { DateRange, ConversionFunnelStep } from '../types';
import { mockConversionFunnel, generateTimeSeriesData } from '../utils/mockData';
import { formatNumber, formatPercentage } from '../utils/helpers';
import './pages.css';

const Conversions: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  const conversionRate = (mockConversionFunnel[mockConversionFunnel.length - 1].users / mockConversionFunnel[0].users) * 100;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Conversion Analytics</h1>
          <p className="page-subtitle">
            Track your conversion funnel and optimize user journey
          </p>
        </div>
        <div className="page-actions">
          <DateRangePicker onChange={setDateRange} />
          <ExportButton
            data={mockConversionFunnel}
            filename="conversion-funnel"
            formats={['csv', 'json']}
          />
        </div>
      </div>

      {/* Conversion Metrics */}
      <div className="metrics-row">
        <div className="metric-box highlight">
          <div className="metric-box-label">Overall Conversion Rate</div>
          <div className="metric-box-value">{formatPercentage(conversionRate)}</div>
          <div className="metric-box-change positive">↑ 3.2%</div>
        </div>
        <div className="metric-box">
          <div className="metric-box-label">Total Conversions</div>
          <div className="metric-box-value">{formatNumber(mockConversionFunnel[mockConversionFunnel.length - 1].users)}</div>
          <div className="metric-box-change positive">↑ 15.8%</div>
        </div>
        <div className="metric-box">
          <div className="metric-box-label">Revenue</div>
          <div className="metric-box-value">$45,230</div>
          <div className="metric-box-change positive">↑ 22.4%</div>
        </div>
        <div className="metric-box">
          <div className="metric-box-label">Avg. Order Value</div>
          <div className="metric-box-value">$35.90</div>
          <div className="metric-box-change positive">↑ 5.6%</div>
        </div>
      </div>

      {/* Conversion Funnel Visualization */}
      <div className="funnel-card">
        <div className="funnel-header">
          <h2 className="funnel-title">Conversion Funnel</h2>
          <p className="funnel-subtitle">User journey from visit to purchase</p>
        </div>

        <div className="funnel-container">
          {mockConversionFunnel.map((step, index) => {
            const width = step.percentage;
            const isLast = index === mockConversionFunnel.length - 1;

            return (
              <div key={index} className="funnel-step">
                <div className="funnel-step-bar-container">
                  <div
                    className="funnel-step-bar"
                    style={{ width: `${width}%` }}
                  >
                    <div className="funnel-step-content">
                      <div className="funnel-step-name">{step.step}</div>
                      <div className="funnel-step-stats">
                        <span className="funnel-users">{formatNumber(step.users)} users</span>
                        <span className="funnel-percentage">{formatPercentage(step.percentage)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {!isLast && step.dropOff && (
                  <div className="funnel-drop-off">
                    <span className="drop-off-arrow">↓</span>
                    <span className="drop-off-text">
                      {formatPercentage(step.dropOff)} drop-off
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Funnel Summary */}
        <div className="funnel-summary">
          <div className="funnel-summary-item">
            <span className="summary-label">Total Visitors</span>
            <span className="summary-value">{formatNumber(mockConversionFunnel[0].users)}</span>
          </div>
          <div className="funnel-summary-item">
            <span className="summary-label">Completed Conversions</span>
            <span className="summary-value">{formatNumber(mockConversionFunnel[mockConversionFunnel.length - 1].users)}</span>
          </div>
          <div className="funnel-summary-item highlight">
            <span className="summary-label">Conversion Rate</span>
            <span className="summary-value">{formatPercentage(conversionRate)}</span>
          </div>
        </div>
      </div>

      {/* Conversion Trend */}
      <div className="chart-card full-width">
        <div className="chart-card-header">
          <h2 className="chart-title">Conversion Trend Over Time</h2>
        </div>
        <LineChart
          data={generateTimeSeriesData(30)}
          height={300}
          color="#10b981"
          showComparison={true}
        />
      </div>

      {/* Goal Completions */}
      <div className="goals-grid">
        <div className="goal-card">
          <div className="goal-icon">🎯</div>
          <div className="goal-name">Newsletter Signup</div>
          <div className="goal-value">3,245</div>
          <div className="goal-rate">Conversion: 6.5%</div>
          <div className="goal-change positive">↑ 12.3%</div>
        </div>

        <div className="goal-card">
          <div className="goal-icon">📧</div>
          <div className="goal-name">Contact Form</div>
          <div className="goal-value">892</div>
          <div className="goal-rate">Conversion: 1.8%</div>
          <div className="goal-change positive">↑ 8.7%</div>
        </div>

        <div className="goal-card">
          <div className="goal-icon">📥</div>
          <div className="goal-name">Download</div>
          <div className="goal-value">1,567</div>
          <div className="goal-rate">Conversion: 3.1%</div>
          <div className="goal-change negative">↓ 2.4%</div>
        </div>

        <div className="goal-card">
          <div className="goal-icon">🛒</div>
          <div className="goal-name">Add to Cart</div>
          <div className="goal-value">4,234</div>
          <div className="goal-rate">Conversion: 8.5%</div>
          <div className="goal-change positive">↑ 15.2%</div>
        </div>
      </div>
    </div>
  );
};

export default Conversions;
