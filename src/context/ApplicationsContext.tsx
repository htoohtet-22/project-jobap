import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import type { JobApplication, JobApplicationInput } from '../lib/types';

import {
  fetchApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from '../api/applications';

interface ApplicationsContextValue {
  applications: JobApplication[];
  loading: boolean;
  refreshing: boolean;

  loadApplications: () => Promise<void>;
  addApplication: (input: Partial<JobApplicationInput>) => Promise<JobApplication>;
  editApplication: (id: string,input: Partial<JobApplicationInput>) => Promise<JobApplication>;
  removeApplication: (id: string) => Promise<void>;
}

const ApplicationsContext = createContext<ApplicationsContextValue | undefined>(undefined);

export default function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadApplications = useCallback(async () => {
    setRefreshing(true);

    try {
      const data = await fetchApplications();
      setApplications(data);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const addApplication = async (input: Partial<JobApplicationInput>) => {
    const application = await createApplication(input);
    setApplications((prev) => [application, ...prev]);
    return application;
  };

  const editApplication = async (id: string, input: Partial<JobApplicationInput>) => {
    const application = await updateApplication(id, input);
    setApplications((prev) => prev.map((app) => app.id === application.id ? application : app));
    return application;
  };

  const removeApplication = async (id: string) => {
    await deleteApplication(id);
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        loading,
        refreshing,
        loadApplications,
        addApplication,
        editApplication,
        removeApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const ctx = useContext(ApplicationsContext);
  if (!ctx) throw new Error('useApplications must be used with ApplicationsProvider');
  return ctx;
}