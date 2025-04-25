import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Build Your Professional Resume
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:order-1">
              <ResumeEditor />
            </div>
            
            <div className="lg:order-2">
              <ResumePreview />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ResumeProvider>
  );
}

export default App;