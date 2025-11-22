import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Github, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import KansoUILogo from './KansoUILogo';

interface NavigationProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Navigation = ({ darkMode, setDarkMode }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulated GitHub stars - in production, fetch from GitHub API
  useEffect(() => {
    setStars(247);
  }, []);

  const [showDemos, setShowDemos] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const demos = [
    { name: 'Admin Panel', href: '/admin', icon: '🔐' },
    { name: 'Analytics Dashboard', href: '/analytics', icon: '📊' },
    { name: 'SaaS Dashboard', href: '/saas', icon: '🚀' },
  ];

  const tools = [
    { name: 'Theme Builder', href: '/theme-builder', icon: '🎨' },
    { name: 'Component Playground', href: '/playground', icon: '⚡' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-gray-800' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <KansoUILogo showText={false} iconOnly className="w-10 h-10 sm:hidden" />
              <KansoUILogo showText className="hidden sm:block h-10" width={180} />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-gray-300 hover:text-white transition-colors duration-200 font-medium ${
                location.pathname === '/' ? 'text-white' : ''
              }`}
            >
              Home
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowTools(true)}
              onMouseLeave={() => setShowTools(false)}
            >
              <button className="text-gray-300 hover:text-white transition-colors duration-200 font-medium flex items-center space-x-1">
                <span>Tools</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {showTools && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
                  >
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        to={tool.href}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-2xl">{tool.icon}</span>
                        <span className="text-gray-300 hover:text-white">{tool.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Demos Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowDemos(true)}
              onMouseLeave={() => setShowDemos(false)}
            >
              <button className="text-gray-300 hover:text-white transition-colors duration-200 font-medium flex items-center space-x-1">
                <span>Demos</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {showDemos && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
                  >
                    {demos.map((demo) => (
                      <Link
                        key={demo.href}
                        to={demo.href}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-2xl">{demo.icon}</span>
                        <span className="text-gray-300 hover:text-white">{demo.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="https://github.com/your-org/kanso-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Docs
            </a>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* GitHub Stars */}
            {stars !== null && (
              <motion.a
                href="https://github.com/your-org/kanso-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors duration-200 bg-gray-900/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4 text-gray-300" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-300">{stars}</span>
              </motion.a>
            )}

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-300" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium ${
                  location.pathname === '/' ? 'text-white' : ''
                }`}
              >
                Home
              </Link>

              <div className="border-t border-gray-700 pt-3">
                <div className="text-xs text-gray-500 uppercase mb-2">Tools</div>
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <span>{tool.icon}</span>
                    <span>{tool.name}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-3">
                <div className="text-xs text-gray-500 uppercase mb-2">Demos</div>
                {demos.map((demo) => (
                  <Link
                    key={demo.href}
                    to={demo.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <span>{demo.icon}</span>
                    <span>{demo.name}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-3">
                <a
                  href="https://github.com/your-org/kanso-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 py-2 text-gray-300 hover:text-white transition-colors font-medium"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                  {stars !== null && (
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{stars}</span>
                    </span>
                  )}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
