import { useState, type SubmitEventHandler } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useSnackbarAlert } from '../context/SnackbarAlertContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showSnackbarAlert } = useSnackbarAlert();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(email, password, username);
      navigate('/');
      showSnackbarAlert('Successful creating account.', 'success');
    } catch (err: any) {
      const rawError = err?.response?.data?.message
        ?? 'Failed to create account. Please Try again Later. ';

      const errorMessage = Array.isArray(rawError)
      ? rawError
          .map((message: string) =>
            message.charAt(0).toUpperCase() +
            message.slice(1).replace(/[.!?]+$/, '') +
            '.',
          )
          .join('\n')
      : rawError.charAt(0).toUpperCase() +
        rawError.slice(1).replace(/[.!?]+$/, '') +
        '.';

      showSnackbarAlert(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, width: '100%', maxWidth: { xs: 320, sm: 400 } }} elevation={0}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <WorkOutlineOutlinedIcon sx={{ fontSize: 36, color: 'primary.main', mb: 1 }} />
          <Typography variant="h5">Create your account</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Start tracking your job search today
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            required
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            margin="normal"
            helperText="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginRight: "4px" }}>
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ height: 40, mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size="24px" /> : 'Create account'}
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login">
            Sign in
          </Link>
        </Typography>
      </Paper>
      <Box
        sx={{ 
          position: 'fixed', 
          top: 24, 
          right: 24,
        }}
      >
        <ThemeToggle />
      </Box>
    </Box>
  );
}
