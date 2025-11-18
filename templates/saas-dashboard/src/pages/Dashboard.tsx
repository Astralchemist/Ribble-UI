import MetricCard from '../components/MetricCard';

export default function Dashboard() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: 12.5,
      icon: '💰',
      color: 'green' as const,
    },
    {
      title: 'Active Users',
      value: '2,345',
      change: 8.2,
      icon: '👥',
      color: 'blue' as const,
    },
    {
      title: 'Total Sessions',
      value: '12,543',
      change: -3.1,
      icon: '📊',
      color: 'purple' as const,
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: 5.7,
      icon: '🎯',
      color: 'orange' as const,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'upgraded to Pro plan',
      time: '5 minutes ago',
      avatar: 'SJ',
    },
    {
      id: 2,
      user: 'Mike Chen',
      action: 'created new project',
      time: '12 minutes ago',
      avatar: 'MC',
    },
    {
      id: 3,
      user: 'Emma Wilson',
      action: 'invited 3 team members',
      time: '1 hour ago',
      avatar: 'EW',
    },
    {
      id: 4,
      user: 'James Brown',
      action: 'completed onboarding',
      time: '2 hours ago',
      avatar: 'JB',
    },
    {
      id: 5,
      user: 'Lisa Anderson',
      action: 'submitted feedback',
      time: '3 hours ago',
      avatar: 'LA',
    },
  ];

  const chartData = [
    { month: 'Jan', revenue: 4000, users: 240 },
    { month: 'Feb', revenue: 3000, users: 198 },
    { month: 'Mar', revenue: 5000, users: 320 },
    { month: 'Apr', revenue: 4500, users: 280 },
    { month: 'May', revenue: 6000, users: 390 },
    { month: 'Jun', revenue: 5500, users: 350 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts and Activity Section */}
      <div className="dashboard-grid">
        {/* Revenue Chart */}
        <div className="dashboard-card chart-card">
          <div className="card-header">
            <h2>Revenue Overview</h2>
            <select className="chart-select">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>This year</option>
            </select>
          </div>
          <div className="chart-container">
            <div className="simple-chart">
              {chartData.map((data, index) => (
                <div key={index} className="chart-bar-group">
                  <div className="chart-label">{data.month}</div>
                  <div className="chart-bars">
                    <div
                      className="chart-bar revenue"
                      style={{ height: `${(data.revenue / 60) * 100}%` }}
                      title={`Revenue: $${data.revenue}`}
                    />
                    <div
                      className="chart-bar users"
                      style={{ height: `${(data.users / 4) * 100}%` }}
                      title={`Users: ${data.users}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color revenue"></span>
                <span>Revenue</span>
              </div>
              <div className="legend-item">
                <span className="legend-color users"></span>
                <span>Users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="dashboard-card activity-card">
          <div className="card-header">
            <h2>Recent Activity</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-avatar">{activity.avatar}</div>
                <div className="activity-details">
                  <p>
                    <strong>{activity.user}</strong> {activity.action}
                  </p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="dashboard-card stats-card">
        <div className="card-header">
          <h2>Quick Statistics</h2>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">Avg. Session Duration</div>
            <div className="stat-value">4m 32s</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Bounce Rate</div>
            <div className="stat-value">42.3%</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Pages per Session</div>
            <div className="stat-value">5.2</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">New vs Returning</div>
            <div className="stat-value">60% / 40%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
