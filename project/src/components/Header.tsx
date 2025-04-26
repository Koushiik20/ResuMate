import React from 'react';
import { Menu, X, Briefcase as BriefcaseBusiness } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

const Header: React.FC = () => {
  const { currentPath, setCurrentPath } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Resume Builder', path: '/resume-builder' },
    { name: 'Resume Analyzer', path: '/resume-analyzer' },
    { name: 'Portfolio Generator', path: '/portfolio-generator' },
    { name: 'HR Module', path: '/hr-module' },
    { name: 'End-to-End Generator', path: '/end-to-end' },
    // { name: 'PDF Test', path: '/pdf-test' },
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <BriefcaseBusiness className="w-8 h-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Resumelytics
            </span>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                className={`px-1 py-2 text-sm font-medium ${
                  currentPath === item.path
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                onClick={() => setCurrentPath(item.path)}
              >
                {item.name}
              </button>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-gray-900"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            {navigation.map((item) => (
              <button
                key={item.name}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  currentPath === item.path
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => {
                  setCurrentPath(item.path);
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;