import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LayoutDashboard, BarChart3, Terminal, Palette } from 'lucide-react';

const TemplateShowcase = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const templates = [
    {
      name: 'SaaS Dashboard',
      description: 'Complete SaaS application template with authentication, billing, and user management.',
      icon: LayoutDashboard,
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Auth System', 'User Dashboard', 'Billing Integration', 'Team Management'],
      image: '🎯',
      command: 'pnpm --filter kanso-ui-saas-dashboard dev',
    },
    {
      name: 'Admin Panel',
      description: 'Production-ready admin panel with user management, settings, and CRUD operations.',
      icon: LayoutDashboard,
      gradient: 'from-green-500 to-emerald-500',
      features: ['User Management', 'Dashboard Analytics', 'CRUD Operations', 'Settings Panel'],
      image: '⚙️',
      command: 'pnpm --filter kanso-ui-admin-panel dev',
    },
    {
      name: 'Analytics Dashboard',
      description: 'Data visualization dashboard with charts, graphs, and real-time analytics.',
      icon: BarChart3,
      gradient: 'from-purple-500 to-pink-500',
      features: ['Data Visualization', 'Real-time Updates', 'Custom Reports', 'Export Data'],
      image: '📊',
      command: 'pnpm --filter analytics-dashboard dev',
    },
  ];

  const apps = [
    {
      name: 'Theme Builder',
      description: 'Interactive theme customization tool. Create and export custom themes for your projects.',
      icon: Palette,
      gradient: 'from-orange-500 to-red-500',
      features: ['Color Customization', 'Live Preview', 'Export Themes', 'Dark Mode Support'],
      image: '🎨',
      command: 'pnpm --filter @kanso-ui/theme-builder dev',
    },
    {
      name: 'Component Playground',
      description: 'Interactive playground to explore and test KansoUI components in real-time.',
      icon: Terminal,
      gradient: 'from-indigo-500 to-purple-500',
      features: ['Component Explorer', 'Live Code Editor', 'Props Testing', 'Copy Code'],
      image: '🎮',
      command: 'pnpm --filter @kanso-ui/playground dev',
    },
  ];

  return (
    <section id="templates" className="py-24 gradient-bg relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Production-Ready
            <br />
            <span className="gradient-text">Templates</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Jumpstart your project with our professionally designed templates. Save weeks of development time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              {/* Template Preview */}
              <div className={`relative h-48 bg-gradient-to-br ${template.gradient} flex items-center justify-center text-8xl overflow-hidden`}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {template.image}
                </motion.div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>

              {/* Template Info */}
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
                    <template.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {template.name}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {template.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {template.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${template.gradient}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Command */}
                {template.command && (
                  <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Terminal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Run this template:</span>
                    </div>
                    <code className="text-xs text-gray-800 dark:text-gray-200 font-mono break-all">
                      {template.command}
                    </code>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Development <span className="gradient-text">Tools</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {apps.map((app, index) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.2 }}
                className="card overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                {/* App Preview */}
                <div className={`relative h-40 bg-gradient-to-br ${app.gradient} flex items-center justify-center text-7xl overflow-hidden`}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {app.image}
                  </motion.div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                </div>

                {/* App Info */}
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${app.gradient} flex items-center justify-center`}>
                      <app.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {app.name}
                    </h4>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {app.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {app.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${app.gradient}`} />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Command */}
                  {app.command && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Terminal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Run this tool:</span>
                      </div>
                      <code className="text-xs text-gray-800 dark:text-gray-200 font-mono break-all">
                        {app.command}
                      </code>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coming Soon Templates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full glass-effect">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              More templates coming soon: Blog, Portfolio, E-Commerce, and more!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
