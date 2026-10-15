
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import type { AlertColor } from '@mui/material/Alert';

interface SnackbarAlertContextValue {
  showSnackbarAlert: (
    message: string,
    severity?: AlertColor,
  ) => void;
}

const SnackbarAlertContext = createContext<
  SnackbarAlertContextValue | undefined
>(undefined);

export function SnackbarAlertProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  const showSnackbarAlert = useCallback(
    (newMessage: string, newSeverity: AlertColor = 'success') => {
      setMessage(newMessage);
      setSeverity(newSeverity);
      setOpen(true);
    },
    [],
  );

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <SnackbarAlertContext.Provider value={{ showSnackbarAlert }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          mx: { xs: 1, sm: 0 },
          mb: { xs: 2, sm: 0 }
        }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarAlertContext.Provider>
  );
}

export function useSnackbarAlert() {
  const context = useContext(SnackbarAlertContext);
  if (!context) throw new Error('useSnackbar must be used within a SnackbarAlertProvider');
  return context;
}