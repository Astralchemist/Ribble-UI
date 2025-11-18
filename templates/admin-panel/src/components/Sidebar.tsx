import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">Admin Panel</div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">Main</div>
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">📊</span>
            <span className="nav-label">Analytics</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Management</div>
          <NavLink
            to="/products"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-label">Products</span>
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">🏷️</span>
            <span className="nav-label">Categories</span>
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">👥</span>
            <span className="nav-label">Users</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">System</div>
          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">Settings</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
