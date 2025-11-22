import { useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import FormBuilder from '../components/FormBuilder';
import { Category, FormField } from '../types';

// Mock data
const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and accessories',
    productCount: 25,
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Home and kitchen appliances',
    productCount: 18,
    status: 'active',
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel',
    productCount: 42,
    status: 'active',
    createdAt: '2024-01-03',
  },
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const formFields: FormField[] = [
    {
      name: 'name',
      label: 'Category Name',
      type: 'text',
      placeholder: 'Enter category name',
      validation: { required: true, minLength: 3 },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      placeholder: 'category-slug',
      validation: { required: true, pattern: /^[a-z0-9-]+$/ },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter category description',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      validation: { required: true },
    },
  ];

  const columns: Column<Category>[] = [
    {
      key: 'name',
      label: 'Category',
      sortable: true,
      render: (value, row) => (
        <div>
          <div style={{ fontWeight: 500 }}>{value}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            /{row.slug}
          </div>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value) => value || '—',
    },
    {
      key: 'productCount',
      label: 'Products',
      sortable: true,
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
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
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
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
      setCategoryToDelete(null);
    }
  };

  const handleSubmit = (data: Record<string, any>) => {
    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id ? { ...c, ...data } : c
        )
      );
    } else {
      const newCategory: Category = {
        ...data,
        id: String(Date.now()),
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      } as Category;
      setCategories([...categories, newCategory]);
    }
    setModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1>Categories</h1>
          <p className="page-subtitle">Organize your products into categories</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleAdd}>
            + Add Category
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon blue">🏷️</div>
            <div className="metric-title">Total Categories</div>
          </div>
          <div className="metric-value">{categories.length}</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon green">✓</div>
            <div className="metric-title">Active Categories</div>
          </div>
          <div className="metric-value">
            {categories.filter((c) => c.status === 'active').length}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon purple">📦</div>
            <div className="metric-title">Total Products</div>
          </div>
          <div className="metric-value">
            {categories.reduce((sum, c) => sum + c.productCount, 0)}
          </div>
        </div>
      </div>

      <DataTable
        data={categories}
        columns={columns}
        searchable
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
      >
        <FormBuilder
          fields={formFields}
          initialData={editingCategory || {}}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          submitLabel={editingCategory ? 'Update Category' : 'Add Category'}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}
