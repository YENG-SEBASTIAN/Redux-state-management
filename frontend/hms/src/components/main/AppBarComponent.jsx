import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import AlertComponent from './AlertComponent'; // Import the AlertComponent

const settings = ['Profile', 'Account', 'Logout'];

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - 240px)`,
    marginLeft: `240px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBarComponent = ({ open, handleDrawerOpen }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false); // State for showing the alert
  const [alertMessage, setAlertMessage] = useState(''); // Message for the alert
  const [alertSeverity, setAlertSeverity] = useState('success'); // Severity of the alert
  const [user, setUser] = useState(''); // State for storing username
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch username from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      setUser(storedUsername);
    }
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    setAlertMessage('You are logged out');
    setAlertSeverity('success');
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 5000);
    navigate('/');
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <React.Fragment>
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 1 }}>
              {user.username}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBarStyled>
      {/* AlertComponent to show success message on logout */}
      <AlertComponent
        message={alertMessage}
        severity={alertSeverity}
        open={alertOpen}
        handleClose={handleCloseAlert}
      />
    </React.Fragment>
  );
};

export default AppBarComponent;
