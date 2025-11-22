import { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      if (!formData.name) {
        alert('Please enter your name!');
        return;
      }
    }

    if (!formData.email || !formData.password) {
      alert('Please fill in all required fields!');
      return;
    }

    // In a real app, this would make an API call
    console.log('Form submitted:', { isSignup, formData });
    onLogin();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-logo">Ribble SaaS</h1>
            <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
            <p className="login-subtitle">
              {isSignup
                ? 'Sign up to get started with your dashboard'
                : 'Sign in to access your dashboard'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {isSignup && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="form-input"
                  placeholder="John Doe"
                  required={isSignup}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="form-input"
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>

            {isSignup && (
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="form-input"
                  placeholder="••••••••"
                  required={isSignup}
                />
              </div>
            )}

            {!isSignup && (
              <div className="form-extras">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>
            )}

            <button type="submit" className="btn-primary btn-full">
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="login-divider">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <button className="social-btn">
              <span>🔍</span> Google
            </button>
            <button className="social-btn">
              <span>📘</span> Facebook
            </button>
            <button className="social-btn">
              <span>🐙</span> GitHub
            </button>
          </div>

          <div className="login-footer">
            {isSignup ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignup(false)}
                  className="toggle-form"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignup(true)}
                  className="toggle-form"
                >
                  Sign up
                </button>
              </p>
            )}
          </div>
        </div>

        <div className="login-sidebar">
          <div className="sidebar-content">
            <h2>Build Better Products</h2>
            <p>
              Join thousands of teams using Ribble SaaS to manage their products,
              track analytics, and grow their business.
            </p>
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Real-time analytics</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Advanced reporting</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Team collaboration</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
