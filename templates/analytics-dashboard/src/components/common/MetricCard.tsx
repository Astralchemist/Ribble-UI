import React from 'react';
import { MetricData } from '../../types';
import { formatNumber, formatPercentage } from '../../utils/helpers';
import './common.css';

interface MetricCardProps {
  metric: MetricData;
  showTrend?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, showTrend = true }) => {
  const isPositive = metric.changeType === 'increase';
  const changeColor = isPositive ? '#10b981' : '#ef4444';

  return (
    <div className="metric-card">
      <div className="metric-header">
        <h3 className="metric-label">{metric.label}</h3>
      </div>

      <div className="metric-value">
        {metric.label.includes('Rate') || metric.label.includes('Duration')
          ? metric.value.toFixed(2)
          : formatNumber(metric.value)}
        {metric.label.includes('Duration') && 'm'}
        {metric.label.includes('Rate') && '%'}
      </div>

      <div className="metric-footer">
        <div className="metric-change" style={{ color: changeColor }}>
          <span className="metric-change-icon">
            {isPositive ? '↑' : '↓'}
          </span>
          <span className="metric-change-value">
            {formatPercentage(Math.abs(metric.change))}
          </span>
          <span className="metric-change-label">vs last period</span>
        </div>

        {showTrend && metric.trend && (
          <div className="metric-trend">
            <svg
              viewBox="0 0 100 20"
              className="metric-trend-chart"
              preserveAspectRatio="none"
            >
              <polyline
                points={metric.trend
                  .map((value, index) => {
                    const x = (index / (metric.trend!.length - 1)) * 100;
                    const max = Math.max(...metric.trend!);
                    const min = Math.min(...metric.trend!);
                    const range = max - min || 1;
                    const y = 20 - ((value - min) / range) * 20;
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke={changeColor}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
