import { useState } from 'react';
import FormBuilder from '../components/FormBuilder';
import { FormField } from '../types';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security'>(
    'general'
  );

  const generalFields: FormField[] = [
    {
      name: 'siteName',
      label: 'Site Name',
      type: 'text',
      defaultValue: 'My Admin Panel',
      validation: { required: true },
    },
    {
      name: 'siteUrl',
      label: 'Site URL',
      type: 'text',
      defaultValue: 'https://example.com',
      validation: { required: true, pattern: /^https?:\/\/.+/ },
    },
    {
      name: 'adminEmail',
      label: 'Admin Email',
      type: 'email',
      defaultValue: 'admin@example.com',
      validation: { required: true },
    },
    {
      name: 'timezone',
      label: 'Timezone',
      type: 'select',
      options: [
        { label: 'UTC', value: 'UTC' },
        { label: 'America/New_York', value: 'America/New_York' },
        { label: 'America/Los_Angeles', value: 'America/Los_Angeles' },
        { label: 'Europe/London', value: 'Europe/London' },
        { label: 'Asia/Tokyo', value: 'Asia/Tokyo' },
      ],
      defaultValue: 'UTC',
      validation: { required: true },
    },
    {
      name: 'language',
      label: 'Language',
      type: 'select',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
      ],
      defaultValue: 'en',
      validation: { required: true },
    },
    {
      name: 'currency',
      label: 'Currency',
      type: 'select',
      options: [
        { label: 'USD ($)', value: 'USD' },
        { label: 'EUR (€)', value: 'EUR' },
        { label: 'GBP (£)', value: 'GBP' },
        { label: 'JPY (¥)', value: 'JPY' },
      ],
      defaultValue: 'USD',
      validation: { required: true },
    },
  ];

  const securityFields: FormField[] = [
    {
      name: 'currentPassword',
      label: 'Current Password',
      type: 'password',
      validation: { required: true },
    },
    {
      name: 'newPassword',
      label: 'New Password',
      type: 'password',
      validation: { required: true, minLength: 8 },
    },
    {
      name: 'confirmPassword',
      label: 'Confirm New Password',
      type: 'password',
      validation: { required: true, minLength: 8 },
    },
  ];

  const handleGeneralSubmit = (data: Record<string, any>) => {
    console.log('General settings:', data);
    alert('Settings saved successfully!');
  };

  const handleSecuritySubmit = (data: Record<string, any>) => {
    console.log('Security settings:', data);
    if (data.newPassword !== data.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1>Settings</h1>
          <p className="page-subtitle">Manage your system settings and preferences</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '32px' }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: activeTab === 'general' ? 'var(--color-primary)' : 'none',
                border: 'none',
                borderRadius: 'var(--border-radius)',
                textAlign: 'left',
                color: activeTab === 'general' ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === 'general' ? 500 : 400,
                transition: 'var(--transition)',
              }}
            >
              ⚙️ General
            </button>
            <button
              className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: activeTab === 'notifications' ? 'var(--color-primary)' : 'none',
                border: 'none',
                borderRadius: 'var(--border-radius)',
                textAlign: 'left',
                color: activeTab === 'notifications' ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === 'notifications' ? 500 : 400,
                transition: 'var(--transition)',
              }}
            >
              🔔 Notifications
            </button>
            <button
              className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: activeTab === 'security' ? 'var(--color-primary)' : 'none',
                border: 'none',
                borderRadius: 'var(--border-radius)',
                textAlign: 'left',
                color: activeTab === 'security' ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === 'security' ? 500 : 400,
                transition: 'var(--transition)',
              }}
            >
              🔒 Security
            </button>
          </div>
        </div>

        <div className="card">
          {activeTab === 'general' && (
            <div>
              <div className="card-header">
                <h2>General Settings</h2>
              </div>
              <div className="card-body">
                <FormBuilder
                  fields={generalFields}
                  onSubmit={handleGeneralSubmit}
                  submitLabel="Save Settings"
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <div className="card-header">
                <h2>Notification Preferences</h2>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'Email Notifications', description: 'Receive email notifications for important updates' },
                    { label: 'Push Notifications', description: 'Receive push notifications in your browser' },
                    { label: 'Order Updates', description: 'Get notified when orders are placed or updated' },
                    { label: 'Low Stock Alerts', description: 'Get alerts when products are running low' },
                    { label: 'New User Registrations', description: 'Get notified when new users register' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--border-radius)',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                          {item.description}
                        </div>
                      </div>
                      <label style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '48px',
                        height: '24px',
                        cursor: 'pointer',
                      }}>
                        <input type="checkbox" defaultChecked={index < 3} style={{ display: 'none' }} />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '24px' }}>
                  <button className="btn btn-primary">Save Preferences</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <div className="card-header">
                <h2>Security Settings</h2>
              </div>
              <div className="card-body">
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
                  Change Password
                </h3>
                <FormBuilder
                  fields={securityFields}
                  onSubmit={handleSecuritySubmit}
                  submitLabel="Update Password"
                />

                <div style={{
                  marginTop: '48px',
                  padding: '24px',
                  border: '2px solid var(--color-danger)',
                  borderRadius: 'var(--border-radius-lg)',
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--color-danger)',
                    marginBottom: '16px',
                  }}>
                    Danger Zone
                  </h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                        Delete Account
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <button className="btn btn-danger">Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
