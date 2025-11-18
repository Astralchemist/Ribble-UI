# Ribble UI - SaaS Dashboard Template

A production-ready, fully-featured SaaS Dashboard template built with React, TypeScript, Vite, and Ribble UI components.

![Dashboard Preview](https://via.placeholder.com/1200x600/667eea/ffffff?text=SaaS+Dashboard+Preview)

## Features

### Core Functionality
- **Authentication UI** - Complete login/signup flows with form validation
- **Dashboard Overview** - Real-time metrics, charts, and activity feed
- **User Management** - Sortable/filterable data tables with user CRUD operations
- **Settings Panel** - Multi-tab settings with profile, notifications, privacy, and security
- **Dark Mode** - Full dark mode support with persistent preferences
- **Responsive Design** - Mobile-first design that works on all screen sizes

### Dashboard Components
- **KPI Metric Cards** - Revenue, users, sessions, conversion rate with trend indicators
- **Interactive Charts** - Revenue and user growth visualization
- **Activity Feed** - Real-time user activity updates
- **Data Tables** - Sortable, filterable tables with custom cell rendering
- **Notifications Panel** - In-app notification system
- **User Profile Menu** - Quick access to account settings

### Layout Features
- **Collapsible Sidebar** - Space-saving navigation with icon-only mode
- **Top Navbar** - Global search, notifications, and user menu
- **Breadcrumbs** - Easy navigation context (ready to implement)
- **Page Headers** - Consistent page titles and action buttons

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Ribble UI** - Web component-based UI library
- **CSS Variables** - Theming system with dark mode

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn or pnpm

### Installation

1. **Clone or download this template:**
   ```bash
   cd /path/to/Ribble-UI/templates/saas-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Project Structure

```
saas-dashboard/
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Root component with routing & auth
│   ├── pages/
│   │   ├── Dashboard.tsx     # Main dashboard with KPIs & charts
│   │   ├── Users.tsx         # User management page
│   │   ├── Settings.tsx      # User settings (profile, notifications, etc.)
│   │   └── Login.tsx         # Authentication page
│   ├── components/
│   │   ├── Layout.tsx        # Main layout wrapper
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   ├── Navbar.tsx        # Top navigation bar
│   │   ├── MetricCard.tsx    # Reusable KPI card component
│   │   └── DataTable.tsx     # Reusable sortable/filterable table
│   └── styles/
│       └── app.css           # Global styles & theme variables
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Usage Guide

### Authentication

The template includes a demo authentication system using localStorage. To customize:

1. Update `src/App.tsx` to integrate with your auth provider
2. Replace localStorage calls with API calls
3. Add token management and refresh logic

**Default Login:**
- Any email/password combination will work for demo purposes
- Authentication state persists in localStorage

### Adding New Pages

1. Create a new component in `src/pages/`:
   ```tsx
   export default function MyPage() {
     return (
       <div className="page-container">
         <div className="page-header">
           <h1>My Page</h1>
           <p className="page-subtitle">Page description</p>
         </div>
         {/* Your content */}
       </div>
     );
   }
   ```

2. Add route in `src/App.tsx`:
   ```tsx
   <Route path="/my-page" element={<MyPage />} />
   ```

3. Add navigation item in `src/components/Sidebar.tsx`:
   ```tsx
   {
     path: '/my-page',
     label: 'My Page',
     icon: '🎯',
   }
   ```

### Customizing the Theme

Edit CSS variables in `src/styles/app.css`:

```css
:root {
  --color-primary: #3b82f6;      /* Primary brand color */
  --color-secondary: #6366f1;    /* Secondary brand color */
  --color-success: #10b981;      /* Success states */
  --color-warning: #f59e0b;      /* Warning states */
  --color-danger: #ef4444;       /* Error states */
  /* ... more variables */
}
```

For dark mode overrides:

```css
.dark {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #f9fafb;
  /* ... more overrides */
}
```

### Using Ribble UI Components

This template is designed to work with Ribble UI web components. Example usage:

```tsx
import { Button, Card, Input } from '@ribble-ui/react';

function MyComponent() {
  return (
    <Card>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### Metric Cards

```tsx
import MetricCard from '../components/MetricCard';

<MetricCard
  title="Total Revenue"
  value="$45,231"
  change={12.5}
  icon="💰"
  color="green"
/>
```

### Data Tables

```tsx
import DataTable, { Column } from '../components/DataTable';

const columns: Column<User>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  {
    key: 'status',
    label: 'Status',
    render: (value) => <StatusBadge status={value} />
  },
];

<DataTable
  data={users}
  columns={columns}
  onRowClick={(user) => console.log(user)}
/>
```

## Features in Detail

### Dashboard Page
- **4 KPI Metrics** - Revenue, users, sessions, conversion with trend indicators
- **Revenue Chart** - 6-month revenue and user growth visualization
- **Activity Feed** - Recent user actions and events
- **Quick Stats** - Session duration, bounce rate, pages per session, user retention

### Users Page
- **User Statistics** - Total, active, pending, and inactive user counts
- **Sortable Table** - Click column headers to sort
- **Search/Filter** - Real-time search across all user fields
- **Status Badges** - Visual indicators for user status
- **Role Badges** - Color-coded role indicators (Admin, Editor, User)

### Settings Page
- **Profile Tab** - Update name, email, company, role, and bio
- **Notifications Tab** - Toggle email, push, and weekly summary notifications
- **Privacy Tab** - Control profile visibility and data sharing
- **Security Tab** - Password change and 2FA management
- **Danger Zone** - Account deletion (with confirmation)

### Dark Mode
- **System Toggle** - Switch between light and dark themes
- **Persistent** - Theme preference saved to localStorage
- **Comprehensive** - All components support both themes

## Customization Examples

### Changing the Logo

Edit `src/components/Sidebar.tsx`:
```tsx
<h1 className="sidebar-logo">
  {isOpen ? 'Your Brand' : 'YB'}
</h1>
```

### Adding More Metrics

Edit `src/pages/Dashboard.tsx`:
```tsx
const metrics = [
  // ... existing metrics
  {
    title: 'Avg Order Value',
    value: '$234',
    change: 15.3,
    icon: '💵',
    color: 'blue' as const,
  },
];
```

### Customizing Sidebar Navigation

Edit `src/components/Sidebar.tsx`:
```tsx
const menuItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/analytics', label: 'Analytics', icon: '📈' },
  { path: '/users', label: 'Users', icon: '👥' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];
```

## API Integration

This template uses mock data. To integrate with a real API:

1. **Install Axios or your preferred HTTP client:**
   ```bash
   npm install axios
   ```

2. **Create an API service:**
   ```tsx
   // src/services/api.ts
   import axios from 'axios';

   const api = axios.create({
     baseURL: 'https://api.yourapp.com',
   });

   export const getUsers = () => api.get('/users');
   export const getDashboardStats = () => api.get('/stats');
   ```

3. **Use in components:**
   ```tsx
   import { useEffect, useState } from 'react';
   import { getUsers } from '../services/api';

   function Users() {
     const [users, setUsers] = useState([]);

     useEffect(() => {
       getUsers().then(response => setUsers(response.data));
     }, []);

     // ... rest of component
   }
   ```

## Performance Optimization

- **Code Splitting** - Use React.lazy() for route-based splitting
- **Memoization** - Use React.memo() and useMemo() for expensive components
- **Virtual Scrolling** - For large tables, implement react-window
- **Image Optimization** - Use WebP format and lazy loading
- **Bundle Analysis** - Run `npm run build` and analyze the output

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels (ready for implementation)
- Focus management
- Color contrast compliance (WCAG AA)

## Roadmap

- [ ] Add more chart types (line, pie, area)
- [ ] Implement real-time updates with WebSockets
- [ ] Add export functionality (CSV, PDF)
- [ ] Advanced filtering and search
- [ ] Role-based access control (RBAC)
- [ ] Multi-language support (i18n)
- [ ] Email templates
- [ ] Mobile app views

## Contributing

This is a template project. Feel free to:
- Fork and customize for your needs
- Report issues or suggest improvements
- Submit pull requests with enhancements

## License

MIT License - feel free to use this template in your projects.

## Support

- **Documentation:** [Ribble UI Docs](https://ribble-ui.dev)
- **Issues:** [GitHub Issues](https://github.com/your-repo/issues)
- **Discord:** [Join our community](https://discord.gg/ribble-ui)

## Credits

Built with:
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Ribble UI](https://ribble-ui.dev)
- [React Router](https://reactrouter.com)

---

**Ready to build your SaaS?** Start customizing this template and ship faster! 🚀
