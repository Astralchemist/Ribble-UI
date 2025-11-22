export default function Analytics() {
  const chartData = [
    { label: 'Jan', revenue: 45000, orders: 120 },
    { label: 'Feb', revenue: 52000, orders: 145 },
    { label: 'Mar', revenue: 48000, orders: 130 },
    { label: 'Apr', revenue: 61000, orders: 165 },
    { label: 'May', revenue: 55000, orders: 150 },
    { label: 'Jun', revenue: 67000, orders: 180 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.revenue));

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', amount: 299.99, status: 'completed', date: '2024-01-20' },
    { id: '#1235', customer: 'Jane Smith', amount: 149.99, status: 'pending', date: '2024-01-20' },
    { id: '#1236', customer: 'Bob Johnson', amount: 499.99, status: 'completed', date: '2024-01-19' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1>Analytics Overview</h1>
          <p className="page-subtitle">Track your business performance</p>
        </div>
        <div className="page-actions">
          <select className="table-filter">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="btn btn-primary">Download Report</button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon blue">💰</div>
            <div className="metric-title">Total Revenue</div>
          </div>
          <div className="metric-value">$328,000</div>
          <div className="metric-change positive">
            <span>↑ 12.5%</span>
            <span className="change-label">from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon green">📦</div>
            <div className="metric-title">Total Orders</div>
          </div>
          <div className="metric-value">890</div>
          <div className="metric-change positive">
            <span>↑ 8.2%</span>
            <span className="change-label">from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon orange">📊</div>
            <div className="metric-title">Products Sold</div>
          </div>
          <div className="metric-value">1,245</div>
          <div className="metric-change positive">
            <span>↑ 15.3%</span>
            <span className="change-label">from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon purple">👥</div>
            <div className="metric-title">New Customers</div>
          </div>
          <div className="metric-value">156</div>
          <div className="metric-change negative">
            <span>↓ 2.1%</span>
            <span className="change-label">from last month</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div className="card">
          <div className="card-header">
            <h2>Revenue Overview</h2>
            <select className="table-filter">
              <option value="revenue">Revenue</option>
              <option value="orders">Orders</option>
            </select>
          </div>
          <div className="card-body">
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              height: '250px',
              gap: '16px',
              padding: '20px 0',
            }}>
              {chartData.map((data, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                    <div
                      style={{
                        flex: 1,
                        height: `${(data.revenue / maxValue) * 100}%`,
                        background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
                        borderRadius: '4px 4px 0 0',
                        minHeight: '20px',
                        transition: 'all 0.3s ease',
                      }}
                      title={`Revenue: $${data.revenue.toLocaleString()}`}
                    />
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                  }}>
                    {data.label}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
                }}></div>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Revenue</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Top Categories</h2>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'Electronics', value: 45, color: '#3b82f6' },
                { name: 'Clothing', value: 30, color: '#10b981' },
                { name: 'Home & Kitchen', value: 15, color: '#f59e0b' },
                { name: 'Books', value: 10, color: '#6366f1' },
              ].map((category, index) => (
                <div key={index}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    fontSize: '14px',
                  }}>
                    <span>{category.name}</span>
                    <span style={{ fontWeight: 600 }}>{category.value}%</span>
                  </div>
                  <div style={{
                    height: '8px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${category.value}%`,
                      height: '100%',
                      background: category.color,
                      borderRadius: '4px',
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Recent Orders</h2>
          <button className="btn btn-text">View All</button>
        </div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <a href="#" className="table-cell-link">{order.id}</a>
                  </td>
                  <td>{order.customer}</td>
                  <td style={{ fontWeight: 600 }}>${order.amount}</td>
                  <td>
                    <span className={`status-badge status-${order.status === 'completed' ? 'active' : 'pending'}`}>
                      <span className="status-dot"></span>
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
