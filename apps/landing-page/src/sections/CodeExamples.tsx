import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

const CodeExamples = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFramework, setActiveFramework] = useState('react');
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const frameworks = [
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'vue', name: 'Vue', icon: '🟢' },
    { id: 'svelte', name: 'Svelte', icon: '🔥' },
    { id: 'angular', name: 'Angular', icon: '🅰️' },
    { id: 'html', name: 'HTML', icon: '📄' },
  ];

  const codeExamples = {
    react: {
      install: 'npm install @ribble-ui/react',
      usage: `import { Button, Card, Input } from '@ribble-ui/react';

function App() {
  return (
    <Card>
      <h2>Welcome to Ribble UI</h2>
      <Input placeholder="Enter your email" />
      <Button variant="primary">
        Get Started
      </Button>
    </Card>
  );
}`,
    },
    vue: {
      install: 'npm install @ribble-ui/vue',
      usage: `<template>
  <Card>
    <h2>Welcome to Ribble UI</h2>
    <Input placeholder="Enter your email" />
    <Button variant="primary">
      Get Started
    </Button>
  </Card>
</template>

<script setup>
import { Button, Card, Input } from '@ribble-ui/vue';
</script>`,
    },
    svelte: {
      install: 'npm install @ribble-ui/svelte',
      usage: `<script>
  import { Button, Card, Input } from '@ribble-ui/svelte';
</script>

<Card>
  <h2>Welcome to Ribble UI</h2>
  <Input placeholder="Enter your email" />
  <Button variant="primary">
    Get Started
  </Button>
</Card>`,
    },
    angular: {
      install: 'npm install @ribble-ui/angular',
      usage: `import { RibbleUIModule } from '@ribble-ui/angular';

@Component({
  selector: 'app-root',
  template: \`
    <ribble-card>
      <h2>Welcome to Ribble UI</h2>
      <ribble-input placeholder="Enter your email"></ribble-input>
      <ribble-button variant="primary">
        Get Started
      </ribble-button>
    </ribble-card>
  \`
})
export class AppComponent {}`,
    },
    html: {
      install: 'npm install @ribble-ui/core',
      usage: `<script type="module">
  import '@ribble-ui/core';
</script>

<ribble-card>
  <h2>Welcome to Ribble UI</h2>
  <ribble-input placeholder="Enter your email"></ribble-input>
  <ribble-button variant="primary">
    Get Started
  </ribble-button>
</ribble-card>`,
    },
  };

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedStates({ ...copiedStates, [key]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [key]: false });
    }, 2000);
  };

  const isDark = document.documentElement.classList.contains('dark');

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Simple & Powerful</span>
            <br />
            Code Examples
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get started in minutes with our intuitive API. Copy, paste, and customize.
          </p>
        </motion.div>

        {/* Framework Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8 space-x-2 glass-effect rounded-xl p-2 overflow-x-auto">
            {frameworks.map((framework) => (
              <button
                key={framework.id}
                onClick={() => setActiveFramework(framework.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeFramework === framework.id
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <span className="text-xl">{framework.icon}</span>
                <span>{framework.name}</span>
              </button>
            ))}
          </div>

          {/* Installation Code */}
          <motion.div
            key={`install-${activeFramework}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className="text-lg font-semibold">Installation</h3>
              <button
                onClick={() => handleCopy(codeExamples[activeFramework as keyof typeof codeExamples].install, `install-${activeFramework}`)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Copy code"
              >
                {copiedStates[`install-${activeFramework}`] ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <SyntaxHighlighter
                language="bash"
                style={isDark ? vscDarkPlus : oneLight}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  fontSize: '0.95rem',
                }}
              >
                {codeExamples[activeFramework as keyof typeof codeExamples].install}
              </SyntaxHighlighter>
            </div>
          </motion.div>

          {/* Usage Code */}
          <motion.div
            key={`usage-${activeFramework}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className="text-lg font-semibold">Usage</h3>
              <button
                onClick={() => handleCopy(codeExamples[activeFramework as keyof typeof codeExamples].usage, `usage-${activeFramework}`)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Copy code"
              >
                {copiedStates[`usage-${activeFramework}`] ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <SyntaxHighlighter
                language={activeFramework === 'html' ? 'html' : activeFramework === 'vue' ? 'vue' : 'typescript'}
                style={isDark ? vscDarkPlus : oneLight}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  fontSize: '0.95rem',
                }}
                showLineNumbers
              >
                {codeExamples[activeFramework as keyof typeof codeExamples].usage}
              </SyntaxHighlighter>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeExamples;
