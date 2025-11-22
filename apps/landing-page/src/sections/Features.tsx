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
    <section id="features" className="py-24 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
            Everything You Need,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Nothing You Don't</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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
              className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 group hover:scale-105 hover:border-gray-600/50 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">
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
