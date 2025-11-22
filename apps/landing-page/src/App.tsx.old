import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import Hero from './sections/Hero';
import Features from './sections/Features';
import ComponentDemo from './sections/ComponentDemo';
import PerformanceMetrics from './sections/PerformanceMetrics';
import FrameworkComparison from './sections/FrameworkComparison';
import CodeExamples from './sections/CodeExamples';
import TemplateShowcase from './sections/TemplateShowcase';
import GettingStarted from './sections/GettingStarted';
import Footer from './sections/Footer';

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
    <div className="min-h-screen overflow-x-hidden">
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero />
        <Features />
        <ComponentDemo />
        <PerformanceMetrics />
        <FrameworkComparison />
        <CodeExamples />
        <TemplateShowcase />
        <GettingStarted />
      </main>
      <Footer />
      <PWAInstallPrompt />
    </div>
  );
}

export default App;
