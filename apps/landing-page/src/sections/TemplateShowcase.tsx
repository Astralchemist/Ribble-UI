import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LayoutDashboard, ShoppingCart, BarChart3, ExternalLink } from 'lucide-react';

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
    },
    {
      name: 'E-Commerce',
      description: 'Full-featured online store with product catalog, cart, checkout, and admin panel.',
      icon: ShoppingCart,
      gradient: 'from-green-500 to-emerald-500',
      features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Order Management'],
      image: '🛒',
    },
    {
      name: 'Analytics Platform',
      description: 'Data visualization dashboard with charts, graphs, and real-time analytics.',
      icon: BarChart3,
      gradient: 'from-purple-500 to-pink-500',
      features: ['Data Visualization', 'Real-time Updates', 'Custom Reports', 'Export Data'],
      image: '📊',
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

                {/* CTA */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Preview</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
                    Clone
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Templates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full glass-effect">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              More templates coming soon: Blog, Portfolio, Admin, and more!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
