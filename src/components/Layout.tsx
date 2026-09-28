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
import ApplicationsProvider from '../context/ApplicationsContext';
import ThemeToggle from './ThemeToggle';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const initial = (user?.username || user?.email || '?').charAt(0).toUpperCase();

  return (
    <ApplicationsProvider>
      <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
        <AppBar position="sticky" color="inherit" sx={{ bgcolor: 'background.paper' }}>
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
        <Box component="main" sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4 }, py: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </ApplicationsProvider>
  );
}
