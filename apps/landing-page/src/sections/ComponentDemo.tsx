import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Check,
  X,
  ChevronDown,
  Bell,
  Heart,
  Star,
  Settings,
} from 'lucide-react';

const ComponentDemo = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState('buttons');
  const [checked, setChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);

  const tabs = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Inputs' },
    { id: 'cards', label: 'Cards' },
  ];

  return (
    <section id="demo" className="py-24 gradient-bg relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Interactive Demo</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Experience our components in action. All interactive, accessible, and ready to use.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 space-x-2 glass-effect rounded-xl p-2 max-w-md mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Demo Content */}
          <div className="card p-8 md:p-12">
            {activeTab === 'buttons' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-6">Button Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Primary
                    </button>
                    <button className="px-6 py-3 rounded-lg border-2 border-primary-600 text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-50 dark:hover:bg-primary-950 transition-all duration-300">
                      Secondary
                    </button>
                    <button className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300">
                      Tertiary
                    </button>
                    <button className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-300">
                      Danger
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6">Icon Buttons</h3>
                  <div className="flex flex-wrap gap-4">
                    <button className="p-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-110">
                      <Bell className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-300 transform hover:scale-110">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 transform hover:scale-110">
                      <Star className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'inputs' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-6">Form Controls</h3>
                  <div className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Text Input</label>
                      <input
                        type="text"
                        placeholder="Enter your name..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary-500 focus:outline-none transition-colors duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Select</label>
                      <div className="relative">
                        <select
                          value={selectedValue}
                          onChange={(e) => setSelectedValue(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary-500 focus:outline-none appearance-none transition-colors duration-200"
                        >
                          <option value="">Choose an option...</option>
                          <option value="react">React</option>
                          <option value="vue">Vue</option>
                          <option value="svelte">Svelte</option>
                          <option value="angular">Angular</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Checkbox
                      </label>
                      <button
                        onClick={() => setChecked(!checked)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          checked
                            ? 'bg-primary-600 border-primary-600'
                            : 'border-gray-300 dark:border-gray-700'
                        }`}
                      >
                        {checked && <Check className="w-4 h-4 text-white" />}
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Slider ({sliderValue})
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'cards' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Premium Card</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Beautiful gradient cards with icons and content
                  </p>
                  <button className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-semibold hover:shadow-lg transition-shadow duration-300">
                    Learn More
                  </button>
                </div>

                <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Simple Card</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Clean and minimal card design for any content
                  </p>
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold hover:shadow-lg transition-shadow duration-300">
                    Get Started
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComponentDemo;
