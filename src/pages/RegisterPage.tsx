import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(email, password, username);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Could not create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100svh',
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
        {error && 
          Array.isArray(error) ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.map((err) => (
                <Typography>{err.charAt(0).toUpperCase() + err.slice(1) + '.'}</Typography>
              ))}
            </Alert>
          ) : (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )
        }
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
            type="password"
            fullWidth
            required
            margin="normal"
            helperText="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
    </Box>
  );
}
