import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Palette, Zap, Globe } from 'lucide-react';
import Footer from '../../sections/Footer';

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Subtle Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-blue-400 font-medium">Framework-Agnostic UI Library</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Build Beautiful UIs
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Across Any Framework
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                A modern, accessible component library built with Web Components.
                Works seamlessly with React, Vue, Svelte, Angular, and vanilla JavaScript.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/playground"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 group"
                >
                  Try Playground
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://github.com/your-org/ribble-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200 border border-gray-700"
                >
                  View on GitHub
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-800">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">100+</div>
                  <div className="text-sm text-gray-400">Components</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">5</div>
                  <div className="text-sm text-gray-400">Frameworks</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">&lt;10KB</div>
                  <div className="text-sm text-gray-400">Bundle Size</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                  <div className="text-sm text-gray-400">Accessible</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Built with modern web standards, designed for developer experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Code2 className="w-8 h-8" />,
                  title: 'Web Components',
                  description: 'Built on standard Web Components for universal compatibility'
                },
                {
                  icon: <Palette className="w-8 h-8" />,
                  title: 'Themeable',
                  description: 'Fully customizable design tokens and theme system'
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: 'Fast & Light',
                  description: 'Optimized bundle size without compromising features'
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: 'Accessible',
                  description: 'WCAG compliant with keyboard and screen reader support'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Demos Section */}
      <section className="relative py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Explore & Build
              </h2>
              <p className="text-xl text-gray-400">
                Try our tools and see real-world examples
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Theme Builder */}
              <Link
                to="/theme-builder"
                className="group relative p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    Theme Builder
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Create and customize your own design system with our interactive theme builder
                  </p>
                  <span className="inline-flex items-center text-purple-400 group-hover:translate-x-2 transition-transform">
                    Open Tool <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </Link>

              {/* Playground */}
              <Link
                to="/playground"
                className="group relative p-8 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    Component Playground
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Interact with 100+ components and see them in action across all frameworks
                  </p>
                  <span className="inline-flex items-center text-blue-400 group-hover:translate-x-2 transition-transform">
                    Explore Components <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </Link>

              {/* Admin Demo */}
              <Link
                to="/admin"
                className="group relative p-8 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-2xl hover:border-green-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">🔐</div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    Admin Panel Demo
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Fully functional admin dashboard with CRUD operations and data management
                  </p>
                  <span className="inline-flex items-center text-green-400 group-hover:translate-x-2 transition-transform">
                    View Demo <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </Link>

              {/* Analytics Demo */}
              <Link
                to="/analytics"
                className="group relative p-8 bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/20 rounded-2xl hover:border-orange-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    Analytics Dashboard
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Real-time analytics dashboard with charts, metrics, and data visualizations
                  </p>
                  <span className="inline-flex items-center text-orange-400 group-hover:translate-x-2 transition-transform">
                    View Demo <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Install Ribble UI in your project and start building beautiful UIs
              </p>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                <code className="text-blue-400 text-lg">
                  npm install @ribble-ui/react
                </code>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/your-org/ribble-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  Get Started
                </a>
                <Link
                  to="/playground"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200 border border-gray-700"
                >
                  View Examples
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
