import Hero from '../../sections/Hero';
import Features from '../../sections/Features';
import ComponentDemo from '../../sections/ComponentDemo';
import PerformanceMetrics from '../../sections/PerformanceMetrics';
import FrameworkComparison from '../../sections/FrameworkComparison';
import CodeExamples from '../../sections/CodeExamples';
import TemplateShowcase from '../../sections/TemplateShowcase';
import GettingStarted from '../../sections/GettingStarted';
import Footer from '../../sections/Footer';

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ComponentDemo />
      <PerformanceMetrics />
      <FrameworkComparison />
      <CodeExamples />
      <TemplateShowcase />
      <GettingStarted />
      <Footer />
    </>
  );
}

export default HomePage;
