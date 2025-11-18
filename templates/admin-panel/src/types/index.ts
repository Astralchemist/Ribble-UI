// Product/Content Types
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'out-of-stock';
  image?: string;
  description?: string;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount: number;
  parent?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// Form Validation Types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: any) => string | null;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'file' | 'checkbox' | 'radio';
  placeholder?: string;
  defaultValue?: any;
  validation?: ValidationRule;
  options?: { label: string; value: string | number }[];
  multiple?: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

// Analytics Types
export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  revenueChange: number;
  ordersChange: number;
  productsChange: number;
  usersChange: number;
}

// Settings Types
export interface SystemSettings {
  siteName: string;
  siteUrl: string;
  adminEmail: string;
  timezone: string;
  language: string;
  currency: string;
  maintenanceMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}
