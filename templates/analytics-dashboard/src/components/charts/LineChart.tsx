import React from 'react';
import { TimeSeriesData } from '../../types';
import './charts.css';

interface LineChartProps {
  data: TimeSeriesData[];
  height?: number;
  showComparison?: boolean;
  color?: string;
  compareColor?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 300,
  showComparison = false,
  color = '#3b82f6',
  compareColor = '#94a3b8',
}) => {
  if (data.length === 0) {
    return <div className="chart-empty">No data available</div>;
  }

  const maxValue = Math.max(
    ...data.map(d => Math.max(d.value, d.compare || 0))
  );
  const minValue = Math.min(
    ...data.map(d => Math.min(d.value, d.compare || 0))
  );
  const range = maxValue - minValue || 1;

  const getY = (value: number) => {
    return height - ((value - minValue) / range) * (height - 40);
  };

  const createPath = (values: number[]) => {
    return values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * 100;
        const y = getY(value);
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(' ');
  };

  const currentPath = createPath(data.map(d => d.value));
  const comparePath = showComparison
    ? createPath(data.map(d => d.compare || 0))
    : '';

  const gridLines = 5;

  return (
    <div className="line-chart-container">
      <svg
        viewBox={`0 0 100 ${height}`}
        className="line-chart"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {Array.from({ length: gridLines }).map((_, i) => {
          const y = (i / (gridLines - 1)) * height;
          return (
            <line
              key={`grid-${i}`}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="0.2"
            />
          );
        })}

        {/* Comparison line */}
        {showComparison && (
          <path
            d={comparePath}
            fill="none"
            stroke={compareColor}
            strokeWidth="0.5"
            strokeDasharray="2,2"
            vectorEffect="non-scaling-stroke"
          />
        )}

        {/* Current line */}
        <path
          d={currentPath}
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />

        {/* Data points */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = getY(point.value);
          return (
            <circle
              key={`point-${index}`}
              cx={x}
              cy={y}
              r="0.8"
              fill={color}
              className="chart-point"
            />
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="chart-x-axis">
        {data.filter((_, i) => i % Math.ceil(data.length / 6) === 0).map((point, index) => (
          <div key={`label-${index}`} className="chart-x-label">
            {point.date}
          </div>
        ))}
      </div>

      {/* Y-axis labels */}
      <div className="chart-y-axis">
        {Array.from({ length: gridLines }).map((_, i) => {
          const value = maxValue - (i / (gridLines - 1)) * range;
          return (
            <div key={`y-label-${i}`} className="chart-y-label">
              {value.toFixed(0)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LineChart;
