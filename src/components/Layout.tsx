import { useState, type MouseEvent } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { useAuth } from '../context/AuthContext';
import { useSnackbarAlert } from '../context/SnackbarAlertContext';
import ThemeToggle from './ThemeToggle';
import ApplicationsViewToggleProvider from '../context/ApplicationsViewToggleContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const { showSnackbarAlert } = useSnackbarAlert();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
    showSnackbarAlert('Successful logging out.', 'success')
  };

  const initial = (user?.username || user?.email || '?').charAt(0).toUpperCase();

  return (
    <ApplicationsViewToggleProvider>
      <Box 
        sx={{ 
          height: '100dvh', 
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <AppBar position="static" color="inherit" sx={{ bgcolor: 'background.paper', flexShrink: 0 }}>
          <Toolbar>
            <WorkOutlineOutlinedIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: 'text.primary', fontWeight: 500 }}
            >
              Jobap
            </Typography>
            <ThemeToggle />
            <IconButton onClick={handleOpen} size="small" sx={{ p: 0, ml: { xs: 2, s: 4} }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {initial}
              </Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
              <MenuItem disabled>{user?.email}</MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Log out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            flex: 1,
            height: '100%',
            width: '100%',
            minHeight: 0,
            maxWidth: 1200,
            mx: 'auto',
            overflow: 'auto',
            p: { xs: 2, sm: 4 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ApplicationsViewToggleProvider>
  );
}
