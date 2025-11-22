import React from 'react';
import { ChartDataPoint } from '../../types';
import { formatNumber } from '../../utils/helpers';
import './charts.css';

interface BarChartProps {
  data: ChartDataPoint[];
  height?: number;
  color?: string;
  horizontal?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 300,
  color = '#3b82f6',
  horizontal = false,
}) => {
  if (data.length === 0) {
    return <div className="chart-empty">No data available</div>;
  }

  const maxValue = Math.max(...data.map(d => d.value));

  if (horizontal) {
    return (
      <div className="bar-chart-horizontal">
        {data.map((item, index) => (
          <div key={index} className="bar-row">
            <div className="bar-label">{item.label}</div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: color,
                }}
              >
                <span className="bar-value">{formatNumber(item.value)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bar-chart-container" style={{ height }}>
      <div className="bar-chart">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          return (
            <div key={index} className="bar-column">
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{
                    height: `${barHeight}%`,
                    backgroundColor: color,
                  }}
                >
                  <span className="bar-value">{formatNumber(item.value)}</span>
                </div>
              </div>
              <div className="bar-label">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
