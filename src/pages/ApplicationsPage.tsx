import { useState, useCallback, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { type JobApplication, type JobApplicationInput, INACTIVE_APPLICATION_STATUSES } from '../lib/types';
import { fetchApplications, createApplication } from '../api/applications';
import { useSnackbarAlert } from '../context/SnackbarAlertContext';
import { useApplicationsViewToggle } from '../context/ApplicationsViewToggleContext';
import ActiveApplicationsSwitch from '../components/ActiveApplicationsSwitch';
import ApplicationCardsStack from '../components/ApplicationCardsStack';
import ApplicationsTable from '../components/ApplicationsTable';
import ApplicationFormDialog, { type ApplicationFormValues } from '../components/ApplicationFormDialog';
import ApplicationsToggleButtonGroup from '../components/ApplicationsViewToggleButtonGroup';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const isMobileView = useMediaQuery(useTheme().breakpoints.down('sm'));
  const { showSnackbarAlert } = useSnackbarAlert();
  const { currentView } = useApplicationsViewToggle();

  const loadApplications = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchApplications();
      setApplications(data);
    } catch {
      showSnackbarAlert('Failed to load applications. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const addApplication = async (input: Partial<JobApplicationInput>) => {
    const application = await createApplication(input);
    setApplications((prev) => [application, ...prev]);
    return application;
  };

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);
  
  const handleSubmit = async (values: ApplicationFormValues) => {
    const payload = {
      ...values,
      dateApplied: values.dateApplied || undefined,
      jobLink: values.jobLink || undefined,
      salary: values.salary || undefined,
      followUpDate: values.followUpDate || undefined,
      notes: values.notes || undefined,
      contactPerson: values.contactPerson || undefined,
      contactEmail: values.contactEmail || undefined,
      contactNumber: values.contactNumber || undefined,
    };

    try{
      await addApplication(payload as any);
      setFormOpen(false);
      showSnackbarAlert('Successful adding application.', 'success');
    } catch {
      showSnackbarAlert('Failed to add application. Please try again later.', 'error');
    }
  };
  
  const filteredApplications = useMemo(() => {
    const updatedApplications = showActiveOnly
      ? applications.filter(
          (application) =>
            !INACTIVE_APPLICATION_STATUSES.includes(application.status),
        )
      : applications;

    return [...updatedApplications].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [applications, showActiveOnly]);

  if (loading) {
    return (
      <Box sx={{ height: '100%', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return(
    <Box sx={{ 
      height: '100%',
      minHeight: 0,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    }}>
      <Stack
        direction='row'
        spacing={{ xs: 2, sm: 3 }}
        sx={{ 
          mb: { xs: 2, sm: 3 },
          flexShrink: 0,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4">
          Applications {`(${filteredApplications.length})`}
        </Typography>
        <Stack 
          direction='row' 
          spacing={isMobileView ? 1 : 2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <ActiveApplicationsSwitch 
            checked={showActiveOnly}
            onChange={setShowActiveOnly}
          /> */}
          <ApplicationsToggleButtonGroup />
          {!isMobileView && (
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => setFormOpen(true)}
            >
              Add Application
            </Button>
          )}
        </Stack>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          minHeight: 0,
          overflowY: 'hidden',
        }}
      >
        {applications.length === 0 ? (
          <Paper variant="outlined" sx={{ height: 'max-content', width: '100%' }}>
            <Box sx={{ p: 6, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No applications yet. Add your first one to get started.
              </Typography>
            </Box>
          </Paper>
        ) : currentView === 'table' ? (
          <ApplicationsTable rows={filteredApplications} />
        ) : currentView === 'cards' ? (
          <ApplicationCardsStack applications={filteredApplications} />
        ) : (
          <Alert severity="error">
            Something went wrong. Please try again later.
          </Alert>
        )}
      </Box>

      {isMobileView && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <Button
            onClick={() => setFormOpen(true)} 
            size="small" 
            color="primary" 
            variant="contained" 
            startIcon={<AddIcon />}
            sx={{ width: '100%', height: '48px', p: 0 }}>
            Add Application
          </Button>
        </Box>
    )}

      <ApplicationFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}