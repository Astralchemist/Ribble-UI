import React from 'react';
import { ChartDataPoint } from '../../types';
import { generateColorPalette, formatPercentage } from '../../utils/helpers';
import './charts.css';

interface PieChartProps {
  data: ChartDataPoint[];
  size?: number;
  showLegend?: boolean;
  donut?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 200,
  showLegend = true,
  donut = false,
}) => {
  if (data.length === 0) {
    return <div className="chart-empty">No data available</div>;
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = generateColorPalette(data.length);

  let cumulativePercentage = 0;

  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const startAngle = (cumulativePercentage / 100) * 360;
    const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
    cumulativePercentage += percentage;

    const startRadians = (startAngle - 90) * (Math.PI / 180);
    const endRadians = (endAngle - 90) * (Math.PI / 180);

    const x1 = 50 + 50 * Math.cos(startRadians);
    const y1 = 50 + 50 * Math.sin(startRadians);
    const x2 = 50 + 50 * Math.cos(endRadians);
    const y2 = 50 + 50 * Math.sin(endRadians);

    const largeArcFlag = percentage > 50 ? 1 : 0;

    const pathData = [
      `M 50 50`,
      `L ${x1} ${y1}`,
      `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');

    return {
      pathData,
      color: colors[index],
      percentage,
      label: item.label,
      value: item.value,
    };
  });

  return (
    <div className="pie-chart-container">
      <svg
        viewBox="0 0 100 100"
        className="pie-chart"
        style={{ width: size, height: size }}
      >
        {slices.map((slice, index) => (
          <path
            key={index}
            d={slice.pathData}
            fill={slice.color}
            className="pie-slice"
          />
        ))}
        {donut && (
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="white"
            className="pie-donut-hole"
          />
        )}
      </svg>

      {showLegend && (
        <div className="pie-legend">
          {slices.map((slice, index) => (
            <div key={index} className="pie-legend-item">
              <div
                className="pie-legend-color"
                style={{ backgroundColor: slice.color }}
              />
              <div className="pie-legend-label">
                <span className="pie-legend-name">{slice.label}</span>
                <span className="pie-legend-value">
                  {formatPercentage(slice.percentage)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PieChart;
