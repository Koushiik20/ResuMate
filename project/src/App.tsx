import React from 'react';
import { NavigationProvider, useNavigation } from './hooks/useNavigation';
import Header from './components/Header';
import Hero from './components/Hero';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import ResumeAnalyzer from './components/ResumeAnalyzer/ResumeAnalyzer';
import PortfolioGenerator from './components/PortfolioGenerator/PortfolioGenerator';
import HRModule from './components/HRModule/HRModule';
import EndToEnd from './components/EndToEnd/EndToEnd';
import PDFTest from './components/PDFTest';

const AppContent: React.FC = () => {
  const { currentPath } = useNavigation();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-20 pb-12">
        {currentPath === '/' && <Hero />}
        {currentPath === '/resume-builder' && <ResumeBuilder />}
        {currentPath === '/resume-analyzer' && <ResumeAnalyzer />}
        {currentPath === '/portfolio-generator' && <PortfolioGenerator />}
        {currentPath === '/hr-module' && <HRModule />}
        {currentPath === '/end-to-end' && <EndToEnd />}
        {currentPath === '/pdf-test' && <PDFTest />}
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CareerAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;