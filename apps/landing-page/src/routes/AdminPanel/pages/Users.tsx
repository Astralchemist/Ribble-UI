import { useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import FormBuilder from '../components/FormBuilder';
import { User, FormField } from '../types';

// Mock data
const initialUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-20',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'editor',
    status: 'active',
    createdAt: '2024-01-10',
    lastLogin: '2024-01-19',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-08',
    lastLogin: '2024-01-10',
  },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const formFields: FormField[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter full name',
      validation: { required: true, minLength: 3 },
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'user@example.com',
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      validation: { required: true },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ],
      validation: { required: true },
    },
  ];

  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600,
            }}
          >
            {value.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 500 }}>{value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value) => (
        <span
          style={{
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 500,
            backgroundColor:
              value === 'admin'
                ? 'rgba(239, 68, 68, 0.1)'
                : value === 'editor'
                ? 'rgba(59, 130, 246, 0.1)'
                : 'rgba(107, 114, 128, 0.1)',
            color:
              value === 'admin'
                ? 'var(--color-danger)'
                : value === 'editor'
                ? 'var(--color-primary)'
                : 'var(--color-gray-600)',
          }}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`status-badge status-${value}`}>
          <span className="status-dot"></span>
          {value}
        </span>
      ),
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      sortable: true,
      render: (value) => (value ? new Date(value).toLocaleDateString() : 'Never'),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="table-actions">
          <button
            className="action-button"
            onClick={() => handleEdit(row)}
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="action-button danger"
            onClick={() => handleDeleteClick(row)}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      setUserToDelete(null);
    }
  };

  const handleSubmit = (data: Record<string, any>) => {
    if (editingUser) {
      setUsers(
        users.map((u) => (u.id === editingUser.id ? { ...u, ...data } : u))
      );
    } else {
      const newUser: User = {
        ...data,
        id: String(Date.now()),
        createdAt: new Date().toISOString().split('T')[0],
      } as User;
      setUsers([...users, newUser]);
    }
    setModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1>User Management</h1>
          <p className="page-subtitle">Manage user accounts and permissions</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">Export</button>
          <button className="btn btn-primary" onClick={handleAdd}>
            + Add User
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon blue">👥</div>
            <div className="metric-title">Total Users</div>
          </div>
          <div className="metric-value">{users.length}</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon green">✓</div>
            <div className="metric-title">Active Users</div>
          </div>
          <div className="metric-value">
            {users.filter((u) => u.status === 'active').length}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon orange">👨‍💼</div>
            <div className="metric-title">Admins</div>
          </div>
          <div className="metric-value">
            {users.filter((u) => u.role === 'admin').length}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon purple">⏳</div>
            <div className="metric-title">Pending</div>
          </div>
          <div className="metric-value">
            {users.filter((u) => u.status === 'pending').length}
          </div>
        </div>
      </div>

      <DataTable
        data={users}
        columns={columns}
        selectable
        onSelectionChange={setSelectedUsers}
        searchable
        filterable
        filters={
          <>
            <select className="table-filter">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
            <select className="table-filter">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </>
        }
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Add User'}
      >
        <FormBuilder
          fields={formFields}
          initialData={editingUser || {}}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          submitLabel={editingUser ? 'Update User' : 'Add User'}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}
