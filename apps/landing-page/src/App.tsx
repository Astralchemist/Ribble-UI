import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
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
      return localStorage.getItem('darkMode') === 'true' ||
             (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
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
    </div>
  );
}

export default App;
