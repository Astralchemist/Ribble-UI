import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Zap, Package, Clock, TrendingUp } from 'lucide-react';

const PerformanceMetrics = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [animatedValues, setAnimatedValues] = useState({
    bundleSize: 0,
    loadTime: 0,
    performance: 0,
    accessibility: 0,
  });

  useEffect(() => {
    if (inView) {
      const targets = {
        bundleSize: 9.2,
        loadTime: 1.2,
        performance: 100,
        accessibility: 100,
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedValues({
          bundleSize: Number((targets.bundleSize * progress).toFixed(1)),
          loadTime: Number((targets.loadTime * progress).toFixed(1)),
          performance: Math.round(targets.performance * progress),
          accessibility: Math.round(targets.accessibility * progress),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedValues(targets);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [inView]);

  const metrics = [
    {
      icon: Package,
      label: 'Bundle Size',
      value: animatedValues.bundleSize,
      unit: 'KB',
      description: 'Gzipped',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Clock,
      label: 'Load Time',
      value: animatedValues.loadTime,
      unit: 's',
      description: 'Average',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      label: 'Performance',
      value: animatedValues.performance,
      unit: '/100',
      description: 'Lighthouse',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: TrendingUp,
      label: 'Accessibility',
      value: animatedValues.accessibility,
      unit: '/100',
      description: 'WCAG AAA',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const comparisonData = [
    {
      library: 'Ribble UI',
      bundleSize: 9.2,
      performance: 100,
      accessibility: 100,
      highlight: true,
    },
    {
      library: 'Material UI',
      bundleSize: 87.3,
      performance: 85,
      accessibility: 92,
      highlight: false,
    },
    {
      library: 'Ant Design',
      bundleSize: 124.5,
      performance: 78,
      accessibility: 88,
      highlight: false,
    },
    {
      library: 'Chakra UI',
      bundleSize: 45.2,
      performance: 92,
      accessibility: 95,
      highlight: false,
    },
  ];

  return (
    <section id="performance" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Built for
            <br />
            <span className="gradient-text">Peak Performance</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Optimized for speed, size, and user experience. Our metrics speak for themselves.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-8 text-center"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mx-auto mb-4`}>
                <metric.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">
                {metric.value}{metric.unit}
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {metric.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-8">
            Library Comparison
          </h3>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="px-6 py-4 text-left font-semibold">Library</th>
                    <th className="px-6 py-4 text-center font-semibold">Bundle Size (KB)</th>
                    <th className="px-6 py-4 text-center font-semibold">Performance</th>
                    <th className="px-6 py-4 text-center font-semibold">Accessibility</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <motion.tr
                      key={item.library}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className={`border-b border-gray-200 dark:border-gray-800 ${
                        item.highlight ? 'bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20' : ''
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold">
                        {item.library}
                        {item.highlight && (
                          <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gradient-to-r from-primary-600 to-accent-600 text-white">
                            You are here
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={item.highlight ? 'font-bold text-green-600 dark:text-green-400' : ''}>
                          {item.bundleSize}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${item.performance}%` } : {}}
                              transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                              className={`h-full ${
                                item.highlight
                                  ? 'bg-gradient-to-r from-primary-600 to-accent-600'
                                  : 'bg-gray-400 dark:bg-gray-600'
                              }`}
                            />
                          </div>
                          <span className={`ml-2 ${item.highlight ? 'font-bold' : ''}`}>
                            {item.performance}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${item.accessibility}%` } : {}}
                              transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                              className={`h-full ${
                                item.highlight
                                  ? 'bg-gradient-to-r from-primary-600 to-accent-600'
                                  : 'bg-gray-400 dark:bg-gray-600'
                              }`}
                            />
                          </div>
                          <span className={`ml-2 ${item.highlight ? 'font-bold' : ''}`}>
                            {item.accessibility}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;
