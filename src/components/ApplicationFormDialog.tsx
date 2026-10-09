import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { APPLICATION_STATUSES, type JobApplication, STATUS_LABELS } from '../lib/types';
import InputAdornment from '@mui/material/InputAdornment';

export interface ApplicationFormValues {
  company: string;
  title: string;
  status: string;
  dateApplied: string;
  jobLink: string;
  salary: string;
  followUpDate: string;
  notes: string;
  contactPerson: string;
  contactEmail: string;
  contactNumber: string;
}

const emptyValues: ApplicationFormValues = {
  company: '',
  title: '',
  status: 'APPLIED',
  dateApplied: '',
  jobLink: '',
  salary: '',
  followUpDate: '',
  notes: '',
  contactPerson: '',
  contactEmail: '',
  contactNumber: '',
};

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ApplicationFormValues) => Promise<void>;
  initial?: JobApplication | null;
}

export default function ApplicationFormDialog({ open, onClose, onSubmit, initial, }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ApplicationFormValues>({ defaultValues: emptyValues });

  useEffect(() => {
    if (open) {
      reset(
        initial
          ? {
              company: initial.company,
              title: initial.title,
              status: initial.status,
              dateApplied: initial.dateApplied?.slice(0, 10) || '',
              jobLink: initial.jobLink || '',
              salary: initial.salary || '',
              followUpDate: initial.followUpDate?.slice(0, 10) || '',
              notes: initial.notes || '',
              contactPerson: initial.contactPerson || '',
              contactEmail: initial.contactEmail || '',
              contactNumber: initial.contactNumber || '',
            }
          : emptyValues,
      );
    }
  }, [open, initial, reset]);

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
      <DialogTitle>{initial ? 'Edit Application' : 'Add Application'}</DialogTitle>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <DialogContent dividers sx={{ overflowY: 'auto', py: 3 }}>
          <Divider textAlign="center" sx={{ mb: 2, color: "text.secondary" }}>Job Details</Divider>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
              <Controller
                name="company"
                control={control}
                rules={{ required: 'Company is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Company"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
              <Controller
                name="salary"
                control={control}
                render={({ field }) => <TextField 
                  {...field} 
                  label="Salary" 
                  fullWidth
                  slotProps={{
                    input: { 
                      endAdornment: <InputAdornment position="end">per month</InputAdornment>
                    }
                  }}
                />}
              />
            </Grid>
            <Grid size={12}>
              <Controller
                name="jobLink"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Job Link" fullWidth placeholder="https://" />
                )}
              />
            </Grid>
          </Grid>

          <Divider textAlign="center" sx={{ mt: 4, mb: 2, color: "text.secondary" }}>Application Details</Divider>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>

                    <Select
                      {...field}
                      labelId="status-label"
                      label="Status"
                    >
                      {APPLICATION_STATUSES.map((status) => (
                        <MenuItem key={status} value={status}>
                          {STATUS_LABELS[status]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="dateApplied"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date Applied"
                    type="date"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="followUpDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Follow-up Date"
                    type="date"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Notes" fullWidth multiline minRows={3} />
                )}
              />
            </Grid>
          </Grid>
          
          <Divider textAlign="center" sx={{ mt: 4, mb: 2, color: "text.secondary" }}>Contact Details</Divider>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="contactPerson"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Contact Name" fullWidth />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="contactNumber"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Contact Number" fullWidth />
                )}
              />
            </Grid>
            <Grid size={12}>
              <Controller
                name="contactEmail"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Contact Email" fullWidth />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size="24px" color="primary" /> : initial ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
