import {
  createContext,
  useState,
  useContext,
  type MouseEvent,
  type ReactNode,
} from 'react';

interface ApplicationsViewToggleContextValue {
  currentView: string;
  handleViewChange: (
    event: MouseEvent,
    value: any,
  ) => void;
}

const ApplicationsViewToggleContext = createContext<
  ApplicationsViewToggleContextValue | undefined
>(undefined);

export default function ApplicationsViewToggleProvider({
  children,
}: { 
  children: ReactNode
}) {
  const [currentView, setCurrentView] = useState('table');
  const handleViewChange = (event: MouseEvent, value: any) => {
    if (value !== null) {
      setCurrentView(value);
    }
  };

  return (
    <ApplicationsViewToggleContext.Provider value={{ currentView, handleViewChange }}>
      {children}
    </ApplicationsViewToggleContext.Provider>
  );
}

export function useApplicationsViewToggle() {
  const context = useContext(ApplicationsViewToggleContext);
  if (!context) throw new Error('useApplicationsViewToggle must be used within a ApplicationsViewToggleProvider');
  return context;
}