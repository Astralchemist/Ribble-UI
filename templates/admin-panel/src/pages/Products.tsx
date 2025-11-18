import { useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import FormBuilder from '../components/FormBuilder';
import FileUpload from '../components/FileUpload';
import { Product, FormField } from '../types';

// Mock data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    stock: 45,
    status: 'active',
    sku: 'WH-001',
    description: 'High-quality wireless headphones with noise cancellation',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 249.99,
    stock: 23,
    status: 'active',
    sku: 'SW-002',
    description: 'Advanced smartwatch with health tracking',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
  },
  {
    id: '3',
    name: 'Coffee Maker',
    category: 'Home & Kitchen',
    price: 79.99,
    stock: 0,
    status: 'out-of-stock',
    sku: 'CM-003',
    description: 'Programmable coffee maker with thermal carafe',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-20',
  },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const formFields: FormField[] = [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      placeholder: 'Enter product name',
      validation: { required: true, minLength: 3 },
    },
    {
      name: 'sku',
      label: 'SKU',
      type: 'text',
      placeholder: 'Enter SKU',
      validation: { required: true },
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Home & Kitchen', value: 'Home & Kitchen' },
        { label: 'Clothing', value: 'Clothing' },
        { label: 'Books', value: 'Books' },
      ],
      validation: { required: true },
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      placeholder: '0.00',
      validation: { required: true, min: 0 },
    },
    {
      name: 'stock',
      label: 'Stock Quantity',
      type: 'number',
      placeholder: '0',
      validation: { required: true, min: 0 },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Out of Stock', value: 'out-of-stock' },
      ],
      validation: { required: true },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter product description',
    },
  ];

  const columns: Column<Product>[] = [
    {
      key: 'name',
      label: 'Product',
      sortable: true,
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
            }}
          >
            📦
          </div>
          <div>
            <div style={{ fontWeight: 500 }}>{value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              SKU: {row.sku}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`status-badge status-${value}`}>
          <span className="status-dot"></span>
          {value.replace('-', ' ')}
        </span>
      ),
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
    setEditingProduct(null);
    setUploadedFiles([]);
    setModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setUploadedFiles([]);
    setModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    const selectedIds = new Set(selectedProducts.map((p) => p.id));
    setProducts(products.filter((p) => !selectedIds.has(p.id)));
    setSelectedProducts([]);
  };

  const handleSubmit = (data: Record<string, any>) => {
    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...data,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : p
        )
      );
    } else {
      // Add new product
      const newProduct: Product = {
        ...data,
        id: String(Date.now()),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      } as Product;
      setProducts([...products, newProduct]);
    }
    setModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1>Products</h1>
          <p className="page-subtitle">Manage your product inventory</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">Export</button>
          <button className="btn btn-primary" onClick={handleAdd}>
            + Add Product
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon blue">📦</div>
            <div className="metric-title">Total Products</div>
          </div>
          <div className="metric-value">{products.length}</div>
          <div className="metric-change positive">
            <span>↑ 12%</span>
            <span className="change-label">from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon green">✓</div>
            <div className="metric-title">Active Products</div>
          </div>
          <div className="metric-value">
            {products.filter((p) => p.status === 'active').length}
          </div>
          <div className="metric-change positive">
            <span>↑ 8%</span>
            <span className="change-label">from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon orange">⚠️</div>
            <div className="metric-title">Out of Stock</div>
          </div>
          <div className="metric-value">
            {products.filter((p) => p.status === 'out-of-stock').length}
          </div>
          <div className="metric-change negative">
            <span>↓ 3%</span>
            <span className="change-label">from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon purple">💰</div>
            <div className="metric-title">Total Value</div>
          </div>
          <div className="metric-value">
            ${products.reduce((sum, p) => sum + p.price * p.stock, 0).toFixed(0)}
          </div>
          <div className="metric-change positive">
            <span>↑ 15%</span>
            <span className="change-label">from last month</span>
          </div>
        </div>
      </div>

      <DataTable
        data={products}
        columns={columns}
        selectable
        onSelectionChange={setSelectedProducts}
        searchable
        filterable
        filters={
          <>
            <select className="table-filter">
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home & Kitchen</option>
              <option value="clothing">Clothing</option>
            </select>
            <select className="table-filter">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </>
        }
        actions={
          selectedProducts.length > 0 ? (
            <button className="btn btn-danger btn-sm" onClick={handleBulkDelete}>
              Delete Selected ({selectedProducts.length})
            </button>
          ) : null
        }
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        size="lg"
      >
        <FormBuilder
          fields={formFields}
          initialData={editingProduct || {}}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          submitLabel={editingProduct ? 'Update Product' : 'Add Product'}
        />

        <div className="form-group" style={{ marginTop: '24px' }}>
          <label className="form-label">Product Images</label>
          <FileUpload
            onFilesChange={setUploadedFiles}
            accept="image/*"
            multiple
            maxSize={5}
          />
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}
