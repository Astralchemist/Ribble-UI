import { useState } from 'react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onMenuClick: () => void;
  onLogout: () => void;
}

export default function Navbar({
  darkMode,
  toggleDarkMode,
  onMenuClick,
  onLogout,
}: NavbarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          ☰
        </button>
        <div className="breadcrumb">
          <span className="breadcrumb-current">Dashboard</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <span className="search-icon">🔍</span>
        </div>

        <button className="icon-button" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>

        <button className="icon-button">
          <span>🔔</span>
          <span className="notification-badge">3</span>
        </button>

        <div style={{ position: 'relative' }}>
          <button
            className="icon-button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            👤
          </button>
          {userMenuOpen && (
            <div className="dropdown-menu user-menu">
              <div className="user-menu-header">
                <div className="user-avatar-large">AD</div>
                <div>
                  <div className="user-menu-name">Admin User</div>
                  <div className="user-menu-email">admin@example.com</div>
                </div>
              </div>
              <div className="user-menu-divider"></div>
              <button className="user-menu-item">
                <span>👤</span>
                Profile
              </button>
              <button className="user-menu-item">
                <span>⚙️</span>
                Settings
              </button>
              <div className="user-menu-divider"></div>
              <button className="user-menu-item logout" onClick={onLogout}>
                <span>🚪</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
