# Admin Panel Template - Ribble UI

A production-ready, feature-rich Admin Panel template built with React, TypeScript, and Vite. Perfect for managing products, users, and content with a modern, responsive interface.

## Features

### CRUD Operations
- **Products Management**: Complete product lifecycle with add, edit, delete, and bulk operations
- **User Management**: Manage user accounts, roles, and permissions
- **Categories Management**: Organize products into categories
- **Advanced Data Tables**: Sortable, searchable, filterable tables with pagination
- **Bulk Actions**: Select multiple items and perform batch operations

### UI Components
- **Modal Forms**: Create and edit items with modal dialogs
- **Form Builder**: Dynamic form generation with validation
- **File Upload**: Drag-and-drop file upload with preview
- **Confirmation Dialogs**: User-friendly confirmation prompts
- **Data Tables**: Advanced tables with search, sort, filter, and pagination
- **Status Badges**: Visual status indicators
- **Metrics Cards**: Dashboard statistics cards

### Pages
- **Analytics Overview**: Business metrics and performance tracking
- **Products/Content List**: Comprehensive product management
- **Add/Edit Product Form**: Full-featured product form with validation
- **User Management**: User accounts and role management
- **Categories Management**: Product categorization
- **System Settings**: Application configuration and preferences

### Additional Features
- **Authentication**: Login/logout flow with route protection
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-friendly layout
- **Search & Filters**: Advanced filtering capabilities
- **Form Validation**: Client-side validation with error messages
- **Breadcrumbs**: Navigation context
- **Notifications**: In-app notification system

## Tech Stack

- **React 18**: Latest React features
- **TypeScript**: Type-safe code
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Ribble UI**: Component library

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

The development server runs on `http://localhost:3001`

### Login

Use any email/password combination to log in (authentication is mocked for demo purposes).

## Project Structure

```
admin-panel/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── Navbar.tsx       # Top navigation bar
│   │   ├── DataTable.tsx    # Advanced data table
│   │   ├── Modal.tsx        # Modal dialog
│   │   ├── ConfirmDialog.tsx # Confirmation dialog
│   │   ├── FileUpload.tsx   # File upload component
│   │   └── FormBuilder.tsx  # Dynamic form generator
│   ├── pages/               # Page components
│   │   ├── Analytics.tsx    # Analytics dashboard
│   │   ├── Products.tsx     # Products management
│   │   ├── Users.tsx        # User management
│   │   ├── Categories.tsx   # Categories management
│   │   ├── Settings.tsx     # System settings
│   │   └── Login.tsx        # Login page
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Type definitions
│   ├── utils/               # Utility functions
│   │   └── validation.ts    # Form validation
│   ├── styles/              # CSS styles
│   │   └── admin.css        # Main stylesheet
│   ├── App.tsx              # App component with routing
│   └── main.tsx             # Entry point
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── vite.config.ts           # Vite config
```

## Usage Examples

### Creating a New Page

```typescript
import { useState } from 'react';
import DataTable, { Column } from '../components/DataTable';

export default function MyPage() {
  const [data, setData] = useState([]);

  const columns: Column<MyType>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Page</h1>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
```

### Using the Form Builder

```typescript
import FormBuilder from '../components/FormBuilder';
import { FormField } from '../types';

const formFields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validation: { required: true }
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' }
    ]
  }
];

<FormBuilder
  fields={formFields}
  onSubmit={handleSubmit}
  submitLabel="Save"
/>
```

### Using Modals

```typescript
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';

<Modal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  title="Edit Item"
>
  {/* Modal content */}
</Modal>

<ConfirmDialog
  isOpen={dialogOpen}
  onClose={() => setDialogOpen(false)}
  onConfirm={handleDelete}
  title="Delete Item"
  message="Are you sure?"
  type="danger"
/>
```

## Customization

### Styling

All styles are in `src/styles/admin.css`. The template uses CSS variables for easy theming:

```css
:root {
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-danger: #ef4444;
  /* ... more variables */
}
```

### Dark Mode

Dark mode is fully supported with automatic theme switching. The dark mode colors are defined in the `.dark` CSS class.

## Production Ready

This template is production-ready and includes:

- TypeScript for type safety
- ESLint for code quality
- Vite for optimized builds
- Responsive design
- Accessible components
- Error handling
- Form validation
- Authentication flow

## License

MIT

## Support

For issues and questions, please open an issue on the Ribble UI repository.
