import DataTable, { Column } from '../components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
}

export default function Users() {
  const users: User[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'Admin',
      status: 'Active',
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.c@example.com',
      role: 'User',
      status: 'Active',
      joinDate: '2024-02-20',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      role: 'Editor',
      status: 'Active',
      joinDate: '2024-03-10',
    },
    {
      id: 4,
      name: 'James Brown',
      email: 'james.b@example.com',
      role: 'User',
      status: 'Pending',
      joinDate: '2024-04-05',
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.a@example.com',
      role: 'User',
      status: 'Active',
      joinDate: '2024-04-18',
    },
    {
      id: 6,
      name: 'Tom Martinez',
      email: 'tom.m@example.com',
      role: 'Editor',
      status: 'Inactive',
      joinDate: '2024-03-22',
    },
    {
      id: 7,
      name: 'Rachel Green',
      email: 'rachel.g@example.com',
      role: 'User',
      status: 'Active',
      joinDate: '2024-05-01',
    },
    {
      id: 8,
      name: 'David Kim',
      email: 'david.k@example.com',
      role: 'Admin',
      status: 'Active',
      joinDate: '2024-01-08',
    },
  ];

  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, row) => (
        <div className="user-cell">
          <div className="user-avatar-table">
            {row.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value) => <span className={`role-badge role-${value.toLowerCase()}`}>{value}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`status-badge status-${value.toLowerCase()}`}>
          <span className="status-dot"></span>
          {value}
        </span>
      ),
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  const handleRowClick = (user: User) => {
    console.log('User clicked:', user);
    // In a real app, this would navigate to user details or open a modal
  };

  const stats = [
    { label: 'Total Users', value: users.length, color: 'blue' },
    {
      label: 'Active Users',
      value: users.filter((u) => u.status === 'Active').length,
      color: 'green',
    },
    {
      label: 'Pending Users',
      value: users.filter((u) => u.status === 'Pending').length,
      color: 'orange',
    },
    {
      label: 'Inactive Users',
      value: users.filter((u) => u.status === 'Inactive').length,
      color: 'red',
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p className="page-subtitle">Manage your application users</p>
        </div>
        <button className="btn-primary">+ Add User</button>
      </div>

      {/* User Stats */}
      <div className="user-stats">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card stat-${stat.color}`}>
            <div className="stat-card-label">{stat.label}</div>
            <div className="stat-card-value">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2>All Users</h2>
          <div className="header-actions">
            <button className="btn-secondary">Export</button>
            <button className="btn-secondary">Filter</button>
          </div>
        </div>
        <DataTable data={users} columns={columns} onRowClick={handleRowClick} />
      </div>
    </div>
  );
}
