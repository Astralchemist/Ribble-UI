import { useState } from 'react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
  onMenuClick: () => void;
}

export default function Navbar({
  darkMode,
  toggleDarkMode,
  onLogout,
  onMenuClick,
}: NavbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'New user registered', time: '5 min ago', unread: true },
    { id: 2, text: 'Server deployment completed', time: '1 hour ago', unread: true },
    { id: 3, text: 'Monthly report available', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          ☰
        </button>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Dark Mode Toggle */}
        <button className="icon-button" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* Notifications */}
        <div className="dropdown">
          <button
            className="icon-button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            🔔
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          {notificationsOpen && (
            <div className="dropdown-menu notifications-menu">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <button className="mark-read-btn">Mark all as read</button>
              </div>
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${
                      notification.unread ? 'unread' : ''
                    }`}
                  >
                    <p>{notification.text}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="dropdown">
          <button
            className="user-button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="user-avatar-small">JD</div>
            <span className="user-name-nav">John Doe</span>
            <span className="dropdown-arrow">▼</span>
          </button>
          {userMenuOpen && (
            <div className="dropdown-menu user-menu">
              <div className="user-menu-header">
                <div className="user-avatar-large">JD</div>
                <div>
                  <div className="user-menu-name">John Doe</div>
                  <div className="user-menu-email">john@example.com</div>
                </div>
              </div>
              <div className="user-menu-divider" />
              <button className="user-menu-item">👤 Profile</button>
              <button className="user-menu-item">⚙️ Settings</button>
              <button className="user-menu-item">❓ Help</button>
              <div className="user-menu-divider" />
              <button className="user-menu-item logout" onClick={onLogout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
