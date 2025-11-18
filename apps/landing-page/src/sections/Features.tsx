import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Boxes,
  Palette,
  Zap,
  Shield,
  Globe,
  Code2,
  Sparkles,
  Layers,
  Settings
} from 'lucide-react';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Boxes,
      title: 'Framework Agnostic',
      description: 'Works seamlessly with React, Vue, Svelte, Angular, and vanilla JavaScript. Write once, use everywhere.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Accessibility First',
      description: 'WCAG 2.1 AAA compliant with ARIA labels, keyboard navigation, and screen reader support out of the box.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Palette,
      title: 'Powerful Theming',
      description: 'Design tokens, CSS variables, dark mode, and custom themes. Style it your way with zero compromises.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized bundle size, tree-shakeable, lazy-loadable. Under 10KB gzipped with zero dependencies.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Code2,
      title: 'TypeScript Native',
      description: 'Fully typed APIs with IntelliSense support. Catch errors before they happen with complete type safety.',
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      icon: Layers,
      title: 'Composable',
      description: 'Build complex UIs from simple primitives. Flexible composition patterns for maximum reusability.',
      gradient: 'from-red-500 to-rose-500',
    },
    {
      icon: Globe,
      title: 'Internationalization',
      description: 'Built-in i18n support with RTL layouts, locale-aware formatting, and multi-language components.',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Settings,
      title: 'Developer Experience',
      description: 'CLI tools, Storybook integration, comprehensive docs, and automated testing utilities included.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Sparkles,
      title: 'Modern Design',
      description: 'Beautiful, contemporary aesthetics with smooth animations, micro-interactions, and polished details.',
      gradient: 'from-fuchsia-500 to-pink-500',
    },
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Everything You Need,
            <br />
            <span className="gradient-text">Nothing You Don't</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Built for modern web development with a focus on performance, accessibility, and developer experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-8 group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
