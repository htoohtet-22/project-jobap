import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';

import { type JobApplication } from '../lib/types';
import {
  getApplication,
  updateApplication,
  deleteApplication,
} from '../api/applications';
import { useSnackbarAlert } from '../context/SnackbarAlertContext';
import StatusChip from '../components/StatusChip';
import Section from '../components/ApplicationDetails/Section';
import DetailItem from '../components/ApplicationDetails/DetailItem';
import ApplicationFormDialog, { type ApplicationFormValues } from '../components/ApplicationFormDialog';
import { formatDate, formatDateTime } from '../lib/utlis';

export default function ApplicationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [application, setApplication] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { showSnackbarAlert } = useSnackbarAlert();

  const loadApplication = useCallback(async () => {
    if (!id) return;

    setLoading(true);

    try {
      const data = await getApplication(id);
      setApplication(data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  const handleSubmit = async (values: ApplicationFormValues) => {
    if (!application) return;

    const payload = {
      ...values,
      dateApplied: values.dateApplied || null,
      jobLink: values.jobLink || null,
      salary: values.salary || null,
      followUpDate: values.followUpDate || null,
      notes: values.notes || null,
      contactPerson: values.contactPerson || null,
      contactEmail: values.contactEmail || null,
      contactNumber: values.contactNumber || null,
    };

    try {
      const updatedApplication = await updateApplication(
        application.id,
        payload as any,
      );
      setApplication(updatedApplication);
      setEditOpen(false);
      showSnackbarAlert('Successful updating application.', 'success');
    } catch {
      showSnackbarAlert('Failed to update application. Please try again later.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!application) return;
    setDeleting(true);

    try {
      await deleteApplication(application.id);
      setDeleting(false);
      showSnackbarAlert('Successful deleting application.', 'success');
      navigate('/');
    } catch {
      showSnackbarAlert('Failed to delete application. Please try again later.', 'error');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!application) {
    return (
      <Stack spacing={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back to Applications
        </Button>

        <Alert severity="error">
          Application not found.
        </Alert>
      </Stack>
    );
  }

  return (
    <Box>
      {/* Back navigation */}
      <Button
        color="secondary"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{
          mb: { xs: 2, sm: 3 },
          color: 'text.secondary',
        }}
      >
        Back to Applications
      </Button>

      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          mb: { xs: 4, sm: 4.5 },
        }}
      >
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={{ xs: 1.5, sm: 2 }}
          sx={{
            alignItems: {
              xs: 'stretch',
              sm: 'center',
            },
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mb: 1,
                justifyContent: { xs: 'space-between', sm: 'start' },
                alignItems: 'center',
                flexWrap: { xs: 'nowrap', sm: 'wrap'},
                rowGap: 1,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 500,
                  wordBreak: 'break-word',
                }}
              >
                {application.title}
              </Typography>

              <StatusChip status={application.status} />
            </Stack>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {application.company}
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexShrink: 0,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              onClick={() => setEditOpen(true)}
              sx={{ flex: 1 }}
            >
              Edit
            </Button>

            <IconButton
              color="error"
              aria-label="Delete application"
              onClick={() => setDeleteOpen(true)}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Main content */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'minmax(0, 1fr) 320px',
          },
          gap: 3,
          alignItems: 'start',
        }}
      >
        {/* Main column */}
        <Stack spacing={3}>
          <Section
            title="Application Details"
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                },
                gap: 3,
              }}
            >
              <DetailItem
                icon={<WorkOutlineOutlinedIcon />}
                label="Title"
              >
                {application.title}
              </DetailItem>

              <DetailItem
                icon={<BusinessOutlinedIcon />}
                label="Company"
              >
                {application.company}
              </DetailItem>

              <DetailItem
                icon={<CalendarTodayOutlinedIcon />}
                label="Date applied"
              >
                {formatDate(application.dateApplied)}
              </DetailItem>

              <DetailItem
                icon={<AttachMoneyOutlinedIcon />}
                label="Salary"
              >
                {application.salary || 'Not specified'}
              </DetailItem>

              <DetailItem
                icon={<EventOutlinedIcon />}
                label="Follow-up date"
              >
                {formatDate(application.followUpDate)}
              </DetailItem>

              {application.jobLink && (
                  <Button
                    component="a"
                    href={application.jobLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="text"
                    endIcon={<OpenInNewIcon />}
                    sx={{
                      width: { xs: '100%', sm: 'max-content'},
                    }}
                  >
                    View job listing
                  </Button>
              )}
            </Box>

          </Section>

          {application.notes && (
            <Section
              title="Notes"
            >
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'pre-wrap',
                  color: 'text.secondary',
                }}
              >
                {application.notes}
              </Typography>
            </Section>
          )}
        </Stack>

        {/* Sidebar */}
        <Stack spacing={3}>
          {(application.contactPerson ||
            application.contactEmail ||
            application.contactNumber) && (
            <Section
              title="Contact"
            >
              <Stack spacing={3}>
                {application.contactPerson && (
                  <DetailItem
                    icon={<PersonOutlinedIcon />}
                    label="Name"
                  >
                    {application.contactPerson}
                  </DetailItem>
                )}

                {application.contactEmail && (
                  <DetailItem
                    icon={<EmailOutlinedIcon />}
                    label="Email"
                  >
                    <Link
                      href={`mailto:${application.contactEmail}`}
                      underline="hover"
                      sx={{
                        wordBreak: 'break-all',
                      }}
                    >
                      {application.contactEmail}
                    </Link>
                  </DetailItem>
                )}

                {application.contactNumber && (
                  <DetailItem
                    icon={<PhoneOutlinedIcon />}
                    label="Phone"
                  >
                    <Link
                      href={`tel:${application.contactNumber}`}
                      underline="hover"
                    >
                      {application.contactNumber}
                    </Link>
                  </DetailItem>
                )}
              </Stack>
            </Section>
          )}

          {/* Timeline / metadata */}
          <Section
            title="Activity"
          >
            <Stack spacing={3}>
              <DetailItem
                icon={<TodayOutlinedIcon />}
                label="Created At"
              >
                {formatDateTime(application.createdAt)}
              </DetailItem>

              <DetailItem
                icon={<EditCalendarOutlinedIcon />}
                label="Updated At"
              >
                {formatDateTime(application.updatedAt)}
              </DetailItem>            </Stack>
          </Section>
        </Stack>
      </Box>

      {/* Edit */}
      <ApplicationFormDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleSubmit}
        initial={application}
      />

      {/* Delete confirmation */}
      <Dialog
        open={deleteOpen}
        onClose={() => !deleting && setDeleteOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Delete application?
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">
            This will permanently delete your application
            for{' '}
            <strong>{application.title}</strong> at{' '}
            <strong>{application.company}</strong>.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setDeleteOpen(false)}
            disabled={deleting}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}