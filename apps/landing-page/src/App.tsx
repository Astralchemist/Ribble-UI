import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import PWAInstallPrompt from './components/PWAInstallPrompt';

// Lazy load route components for code splitting
const HomePage = lazy(() => import('./routes/Home/HomePage'));
const ThemeBuilder = lazy(() => import('./routes/ThemeBuilder'));
const Playground = lazy(() => import('./routes/Playground'));
const AdminPanel = lazy(() => import('./routes/AdminPanel'));
const Analytics = lazy(() => import('./routes/Analytics'));
const SaaS = lazy(() => import('./routes/SaaS'));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-gray-400">Loading...</p>
    </div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('darkMode');
      // Default to dark mode if no preference is stored
      return stored === null ? true : stored === 'true';
    }
    return true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-x-hidden">
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/theme-builder" element={<ThemeBuilder />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/admin/*" element={<AdminPanel />} />
              <Route path="/analytics/*" element={<Analytics />} />
              <Route path="/saas/*" element={<SaaS />} />
            </Routes>
          </Suspense>
        </main>
        <PWAInstallPrompt />
      </div>
    </BrowserRouter>
  );
}

export default App;
