import { Link, useLocation } from 'react-router-dom';
import KansoUILogo from './KansoUILogo';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: '📊',
    },
    {
      path: '/users',
      label: 'Users',
      icon: '👥',
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: '⚙️',
    },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <KansoUILogo
            showText={isOpen}
            iconOnly={!isOpen}
            size="sm"
            className="text-white"
          />
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${
              location.pathname === item.path ? 'active' : ''
            }`}
          >
            <span className="nav-icon">{item.icon}</span>
            {isOpen && <span className="nav-label">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">JD</div>
          {isOpen && (
            <div className="user-info">
              <div className="user-name">John Doe</div>
              <div className="user-email">john@example.com</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
