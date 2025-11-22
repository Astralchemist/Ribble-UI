import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Analytics from './pages/Analytics';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Login from './pages/Login';

function AdminPanelApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (localStorage for demo purposes)
    const auth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(auth === 'true');

    // Check dark mode preference
    const theme = localStorage.getItem('theme');
    setDarkMode(theme === 'dark');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');

    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Routes>
      <Route
        path="login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Layout
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              onLogout={handleLogout}
            >
              <Routes>
                <Route path="/" element={<Analytics />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default AdminPanelApp;
