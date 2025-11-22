import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Overview from './pages/Overview';
import Traffic from './pages/Traffic';
import UserBehavior from './pages/UserBehavior';
import Conversions from './pages/Conversions';
import RealTime from './pages/RealTime';
import './App.css';

const NavigationMenu = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/analytics', label: 'Overview', icon: '📊' },
    { path: '/analytics/traffic', label: 'Traffic', icon: '🚀' },
    { path: '/analytics/behavior', label: 'User Behavior', icon: '👥' },
    { path: '/analytics/conversions', label: 'Conversions', icon: '🎯' },
    { path: '/analytics/realtime', label: 'Real-Time', icon: '⚡' },
  ];

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      <nav className={`sidebar-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="nav-header">
          <h1 className="nav-logo">📈 Analytics</h1>
          <button
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="nav-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-footer">
          <div className="nav-footer-item">
            <div className="footer-label">Data Range</div>
            <div className="footer-value">Last 30 days</div>
          </div>
          <div className="nav-footer-item">
            <div className="footer-label">Last Updated</div>
            <div className="footer-value">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

function AnalyticsApp() {
  return (
    <div className="app">
      <NavigationMenu />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/traffic" element={<Traffic />} />
          <Route path="/behavior" element={<UserBehavior />} />
          <Route path="/conversions" element={<Conversions />} />
          <Route path="/realtime" element={<RealTime />} />
        </Routes>
      </main>
    </div>
  );
}

export default AnalyticsApp;
