import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';

const FrameworkComparison = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const frameworks = [
    {
      name: 'React',
      logo: '⚛️',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      name: 'Vue',
      logo: '🟢',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Svelte',
      logo: '🔥',
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'Angular',
      logo: '🅰️',
      color: 'from-red-500 to-pink-500',
    },
    {
      name: 'HTML',
      logo: '📄',
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  const features = [
    'TypeScript Support',
    'Tree Shaking',
    'SSR Support',
    'Code Splitting',
    'Auto-complete',
    'Dark Mode',
    'Accessibility',
    'Custom Themes',
    'i18n Support',
  ];

  return (
    <section className="py-24 gradient-bg relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            One Library,
            <br />
            <span className="gradient-text">All Frameworks</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Use Ribble UI with your favorite framework. Same API, same components, consistent experience.
          </p>
        </motion.div>

        {/* Framework Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center items-center gap-4 mb-16 flex-wrap"
        >
          {frameworks.map((framework, index) => (
            <motion.div
              key={framework.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="card p-6 text-center cursor-pointer"
            >
              <div className={`text-5xl mb-3 bg-gradient-to-br ${framework.color} bg-clip-text`}>
                {framework.logo}
              </div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {framework.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  {frameworks.map((framework) => (
                    <th key={framework.name} className="px-6 py-4 text-center font-semibold">
                      <div className="text-2xl mb-1">{framework.logo}</div>
                      <div className="text-sm">{framework.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, featureIndex) => (
                  <motion.tr
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + featureIndex * 0.05 }}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{feature}</td>
                    {frameworks.map((_, frameworkIndex) => (
                      <td key={frameworkIndex} className="px-6 py-4 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={inView ? { scale: 1 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: 0.7 + featureIndex * 0.05 + frameworkIndex * 0.02,
                          }}
                          className="flex justify-center"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </motion.div>
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Start CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Get started with your preferred framework in seconds
          </p>
          <a href="#docs" className="btn-primary inline-flex items-center space-x-2">
            <span>View Documentation</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FrameworkComparison;
