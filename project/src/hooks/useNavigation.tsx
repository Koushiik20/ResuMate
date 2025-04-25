import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface NavigationContextType {
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    // If we had a real router, we would synchronize with it here
    // For now, we're just handling navigation state internally
  }, [currentPath]);

  return (
    <NavigationContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};