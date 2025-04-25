import React from 'react';
import { FileText, Sun, Moon } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const Header: React.FC = () => {
  const { themeMode, toggleThemeMode } = useResume();

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">ResumeBuilder</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleThemeMode} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {themeMode === 'light' ? (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;