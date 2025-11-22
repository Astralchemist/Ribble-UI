import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Terminal, Zap, Layers, Shield, Check } from 'lucide-react';
import Footer from '../../sections/Footer';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { icon: Terminal, title: 'Developer First', desc: 'Built for real-world workflows' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Optimized performance out of the box' },
    { icon: Layers, title: 'Universal', desc: 'React, Vue, Svelte, Angular, Vanilla' },
    { icon: Shield, title: 'Production Ready', desc: 'Battle-tested components' }
  ];

  const demos = [
    {
      title: 'Admin Panel',
      desc: 'Full-featured CRUD dashboard',
      href: '/admin',
      gradient: 'from-teal-500 to-cyan-600',
      icon: '⚙️'
    },
    {
      title: 'Analytics',
      desc: 'Real-time data visualization',
      href: '/analytics',
      gradient: 'from-orange-500 to-amber-600',
      icon: '📈'
    },
    {
      title: 'SaaS Platform',
      desc: 'Multi-tenant ready interface',
      href: '/saas',
      gradient: 'from-violet-500 to-purple-600',
      icon: '🚀'
    }
  ];

  return (
    <>
      {/* Hero Section - Compact */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148, 163, 184) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}/>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-block mb-4">
                <span className="px-4 py-1.5 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm font-medium">
                  Web Components × Design Systems
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Ship Faster with</span>
                <br />
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  KansoUI
                </span>
              </h1>

              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Production-grade components that work everywhere.
                No vendor lock-in. Just clean, accessible UI.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/playground"
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-teal-500/25 transition-all duration-300"
                >
                  Try Live Demo →
                </Link>
                <a
                  href="https://github.com/your-org/kanso-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
                >
                  GitHub
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { value: '100+', label: 'Components' },
                  { value: '5', label: 'Frameworks' },
                  { value: '<10KB', label: 'Core' },
                  { value: 'A11Y', label: 'Compliant' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Terminal Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-slate-500 text-sm ml-2">~/install</span>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="flex items-center text-slate-400 mb-3">
                    <span className="text-teal-400 mr-2">$</span>
                    npm install @kanso-ui/react
                  </div>
                  <div className="text-slate-600 mb-4">
                    ✓ Installing KansoUI components...
                  </div>
                  <div className="flex items-center text-slate-400">
                    <span className="text-teal-400 mr-2">$</span>
                    <span className="animate-pulse">|</span>
                  </div>
                </div>
              </div>

              {/* Floating Feature Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {features.slice(0, 2).map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg backdrop-blur"
                    >
                      <Icon className="w-6 h-6 text-teal-400 mb-2" />
                      <div className="text-sm font-semibold text-white mb-1">{feature.title}</div>
                      <div className="text-xs text-slate-500">{feature.desc}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools + Demos Combined Section - Carousel */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              See It In Action
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Explore our interactive tools and production-ready templates
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-12">
            <Link
              to="/theme-builder"
              className="group relative p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl hover:border-teal-500/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all"></div>
              <div className="relative">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                  Theme Builder
                </h3>
                <p className="text-slate-400 text-sm">
                  Customize design tokens visually
                </p>
              </div>
            </Link>

            <Link
              to="/playground"
              className="group relative p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
              <div className="relative">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  Playground
                </h3>
                <p className="text-slate-400 text-sm">
                  100+ interactive components
                </p>
              </div>
            </Link>

            {demos.map((demo, i) => (
              <Link
                key={i}
                to={demo.href}
                className="group relative p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${demo.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-all`}></div>
                <div className="relative">
                  <div className="text-4xl mb-4">{demo.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{demo.title}</h3>
                  <p className="text-slate-400 text-sm">{demo.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              <SwiperSlide>
                <Link to="/theme-builder" className="block p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold text-white mb-2">Theme Builder</h3>
                  <p className="text-slate-400">Customize design tokens visually</p>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/playground" className="block p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-white mb-2">Playground</h3>
                  <p className="text-slate-400">100+ interactive components</p>
                </Link>
              </SwiperSlide>
              {demos.map((demo, i) => (
                <SwiperSlide key={i}>
                  <Link to={demo.href} className="block p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl">
                    <div className="text-4xl mb-4">{demo.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{demo.title}</h3>
                    <p className="text-slate-400">{demo.desc}</p>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Compact */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Why teams choose KansoUI
                </h2>
                <div className="space-y-4">
                  {[
                    'Framework agnostic - use anywhere',
                    'Accessibility built-in, not bolted on',
                    'Themeable with CSS variables',
                    'Tree-shakeable for optimal bundles',
                    'TypeScript native with full type safety'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-teal-400" />
                      </div>
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setActiveFeature(i)}
                      className={`p-5 rounded-xl border cursor-pointer transition-all ${
                        activeFeature === i
                          ? 'bg-slate-800 border-teal-500/50'
                          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          activeFeature === i ? 'bg-teal-500/20' : 'bg-slate-800'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            activeFeature === i ? 'text-teal-400' : 'text-slate-400'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                          <p className="text-sm text-slate-400">{feature.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Start building today
            </h2>
            <p className="text-slate-400 mb-8">
              Join teams shipping better UIs, faster
            </p>

            <div className="inline-block bg-slate-900 border border-slate-800 rounded-lg p-4 mb-8">
              <code className="text-teal-400 font-mono">npm install @kanso-ui/react</code>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/your-org/kanso-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-teal-500/25 transition-all"
              >
                View Documentation
              </a>
              <Link
                to="/playground"
                className="px-8 py-3 bg-slate-800 text-white font-semibold rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
              >
                Explore Components
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
