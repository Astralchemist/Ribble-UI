interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

export default function MetricCard({
  title,
  value,
  change,
  icon,
  color = 'blue',
}: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className={`metric-card metric-card-${color}`}>
      <div className="metric-header">
        <span className="metric-icon">{icon}</span>
        <h3 className="metric-title">{title}</h3>
      </div>
      <div className="metric-value">{value}</div>
      {change !== undefined && (
        <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
          <span className="change-indicator">{isPositive ? '↑' : '↓'}</span>
          <span className="change-value">{Math.abs(change)}%</span>
          <span className="change-label">vs last month</span>
        </div>
      )}
    </div>
  );
}
