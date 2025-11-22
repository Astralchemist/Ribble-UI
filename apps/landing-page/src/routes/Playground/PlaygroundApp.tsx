import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

// Import KansoUI components
import '@kanso-ui/core';

function App() {
  const [activeTab, setActiveTab] = useState('theme');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  KansoUI Playground
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interactive component showcase - 100+ components
                </p>
              </div>
            </div>

            {/* Theme Toggler */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Switch Variant:</span>
              <theme-toggler variant="switch" size="md" animated="true"></theme-toggler>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 mb-8">
          {['theme', 'forms', 'data', 'feedback', 'navigation'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Theme Tab */}
        {activeTab === 'theme' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Theme Toggler Variants
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Choose your preferred theme with our beautiful theme toggler component
              </p>
            </div>

            {/* Switch Variant */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Switch Variant
              </h3>
              <div className="flex items-center space-x-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Small</p>
                  <theme-toggler variant="switch" size="sm" show-label="true"></theme-toggler>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
                  <theme-toggler variant="switch" size="md" show-label="true"></theme-toggler>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Large</p>
                  <theme-toggler variant="switch" size="lg" show-label="true"></theme-toggler>
                </div>
              </div>
            </div>

            {/* Button Variant */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Button Variant
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Without Labels</p>
                  <theme-toggler variant="button" show-label="false"></theme-toggler>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">With Labels</p>
                  <theme-toggler variant="button" show-label="true"></theme-toggler>
                </div>
              </div>
            </div>

            {/* Dropdown Variant */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Dropdown Variant
              </h3>
              <theme-toggler variant="dropdown"></theme-toggler>
            </div>
          </div>
        )}

        {/* Forms Tab */}
        {activeTab === 'forms' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Form Components
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Input Field
                  </label>
                  <ribble-input placeholder="Enter text..." type="text"></ribble-input>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Checkbox
                  </label>
                  <ribble-checkbox label="I agree to the terms and conditions"></ribble-checkbox>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Switch
                  </label>
                  <ribble-switch label="Enable notifications"></ribble-switch>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Components</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-blue-100">Frameworks</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">&lt;10KB</div>
              <div className="text-blue-100">Bundle Size</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Accessible</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">Built with ❤️ using KansoUI</p>
            <p className="text-sm">
              100+ framework-agnostic Web Components for modern web development
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
