import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Terminal,
  Download,
  Code2,
  Rocket,
  BookOpen,
  Github,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

const GettingStarted = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      number: '01',
      title: 'Install Package',
      description: 'Choose your framework and install the package via npm, yarn, or pnpm.',
      icon: Download,
      color: 'from-blue-500 to-cyan-500',
      code: 'npm install @kanso-ui/react',
    },
    {
      number: '02',
      title: 'Import Components',
      description: 'Import the components you need into your application.',
      icon: Code2,
      color: 'from-purple-500 to-pink-500',
      code: "import { Button } from '@kanso-ui/react';",
    },
    {
      number: '03',
      title: 'Customize Theme',
      description: 'Configure design tokens and themes to match your brand.',
      icon: Terminal,
      color: 'from-green-500 to-emerald-500',
      code: 'theme: { primary: "#0ea5e9" }',
    },
    {
      number: '04',
      title: 'Build & Deploy',
      description: 'Build your application and deploy to production with confidence.',
      icon: Rocket,
      color: 'from-orange-500 to-red-500',
      code: 'npm run build',
    },
  ];

  const resources = [
    {
      title: 'Documentation',
      description: 'Comprehensive guides, API references, and examples.',
      icon: BookOpen,
      link: '#',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'GitHub Repository',
      description: 'Source code, issues, and contribution guidelines.',
      icon: Github,
      link: 'https://github.com/your-org/kanso-ui',
      color: 'from-gray-500 to-gray-700',
    },
    {
      title: 'Community',
      description: 'Join our Discord community for support and discussions.',
      icon: MessageSquare,
      link: '#',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section id="docs" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Get Started in
            <br />
            <span className="gradient-text">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From installation to production in minutes. Follow our quick start guide.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700 -z-10" />
                )}

                <div className="card p-6 h-full hover:scale-105 transition-transform duration-300">
                  {/* Step Number */}
                  <div className={`text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {step.description}
                  </p>

                  {/* Code Example */}
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-xs text-gray-800 dark:text-gray-200 overflow-x-auto">
                    {step.code}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Resources & Support
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.a
                key={resource.title}
                href={resource.link}
                target={resource.link.startsWith('http') ? '_blank' : '_self'}
                rel={resource.link.startsWith('http') ? 'noopener noreferrer' : ''}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="card p-8 group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <resource.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {resource.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/your-org/kanso-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center space-x-2"
            >
              <Github className="w-5 h-5" />
              <span>Star on GitHub</span>
            </a>
            <a href="#demo" className="btn-secondary flex items-center space-x-2">
              <Code2 className="w-5 h-5" />
              <span>Try Live Demo</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GettingStarted;
