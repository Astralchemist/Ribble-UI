import React from 'react';
import { TimeSeriesData } from '../../types';
import './charts.css';

interface AreaChartProps {
  data: TimeSeriesData[];
  height?: number;
  color?: string;
  fillOpacity?: number;
}

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  height = 300,
  color = '#3b82f6',
  fillOpacity = 0.2,
}) => {
  if (data.length === 0) {
    return <div className="chart-empty">No data available</div>;
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const getY = (value: number) => {
    return height - ((value - minValue) / range) * (height - 40);
  };

  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = getY(point.value);
    return { x, y };
  });

  const linePath = points
    .map((point, index) => {
      return index === 0
        ? `M ${point.x} ${point.y}`
        : `L ${point.x} ${point.y}`;
    })
    .join(' ');

  const areaPath =
    linePath +
    ` L 100 ${height} L 0 ${height} Z`;

  const gridLines = 5;

  return (
    <div className="area-chart-container">
      <svg
        viewBox={`0 0 100 ${height}`}
        className="area-chart"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={fillOpacity} />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

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

        {/* Area fill */}
        <path
          d={areaPath}
          fill="url(#areaGradient)"
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />

        {/* Data points */}
        {points.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r="0.8"
            fill={color}
            className="chart-point"
          />
        ))}
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

export default AreaChart;
