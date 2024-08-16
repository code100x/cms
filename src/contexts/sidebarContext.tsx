import { createContext, useState, useContext, ReactNode } from 'react';

interface SidebarContextType {
  expanded: boolean;
  toggleExpanded: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ expanded, toggleExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};
