import { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import type { JobApplication } from '../lib/types';
import {
  fetchApplications,
  createApplication,
  deleteApplication,
  updateApplication,
} from '../api/applications';
import ApplicationsTable from '../components/ApplicationsTable';
import ApplicationFormDialog, { type ApplicationFormValues } from '../components/ApplicationFormDialog';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<JobApplication | null>(null);
  const [toDelete, setToDelete] = useState<JobApplication | null>(null);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  const load = async () => {
    setLoading(true);
    try {
      const apps = await fetchApplications();
      setApplications(apps);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (app: JobApplication) => {
    setEditing(app);
    setFormOpen(true);
  };

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
    if (editing) {
      await updateApplication(editing.id, payload as any);
    } else {
      await createApplication(payload as any);
    }
    setFormOpen(false);
    await load();
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    await deleteApplication(toDelete.id);
    setToDelete(null);
    await load();
  };

  const rows = useMemo(
    () => 
      [...applications].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [applications],
  );
  
  return(
    <Box sx={{ mb: 10 }}>
      <Stack
        direction='row'
        spacing={2}
        sx={{ 
          mb: 3,
          justifyContent: "space-between",
          alignItems: { xs: 'flex-start', sm: 'center' }
        }}
      >
        <Typography variant="h4">Applications ({applications.length})</Typography>
        {!isMobileView && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Add Application
          </Button>
        )}
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
          <CircularProgress />
        </Box>
      ) : applications.length === 0 ? (
        <Paper variant="outlined" >
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No applications yet. Add your first one to get started.
            </Typography>
          </Box>
        </Paper>
      ) : (
        <ApplicationsTable rows={rows} openEdit={openEdit} setToDelete={setToDelete} />
      )}

      {isMobileView && (
        <Button 
          onClick={openCreate} 
          size="small" 
          color="primary" 
          variant="contained" 
          sx={{ position: 'fixed', bottom: 32, right: 24, p: 0 }}>
          <AddIcon sx={{ width: 48, height: 48, p: '12px' }} />
        </Button>
      )}

      <ApplicationFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initial={editing}
      />

      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        <DialogTitle>Delete application?</DialogTitle>
        <DialogContent>
          <Typography>
            This will permanently remove {toDelete?.company} — {toDelete?.title}.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setToDelete(null)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}