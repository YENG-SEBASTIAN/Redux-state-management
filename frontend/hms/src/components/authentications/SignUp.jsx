import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/authActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import AlertTitle from '@mui/material/AlertTitle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import Design from "../../assets/Design.jpg";

const theme = createTheme();

const carouselTexts = [
  "Welcome to our Health Platform!",
  "Your health, our priority.",
  "Stay fit, stay healthy.",
  "Join us for a healthier life."
];

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ type: '', message: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth.signup);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setAlertInfo({
        type: 'error',
        message:
          'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.',
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return;
    }
    if (password !== rePassword) {
      setAlertInfo({ type: 'error', message: "Passwords don't match" });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return;
    }
  
    try {
      await dispatch(signup(email, username, password, rePassword));
      setAlertInfo({ type: 'success', message: 'Account created successfully' });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/'); // Redirect to login screen after success message
      }, 5000); // Hide alert after 5 seconds
    } catch (err) {
      if (err.response && err.response.data) {
        const { email, username, password, re_password, message } = err.response.data;
        if (email) {
          setAlertInfo({ type: 'error', message: email[0] });
        } else if (username) {
          setAlertInfo({ type: 'error', message: username[0] });
        } else if (password) {
          setAlertInfo({ type: 'error', message: password[0] });
        } else if (re_password) {
          setAlertInfo({ type: 'error', message: re_password[0] });
        } else if (message) {
          setAlertInfo({ type: 'error', message: message });
        } else {
          setAlertInfo({ type: 'error', message: 'Failed to sign up. Please try again later.' });
        }
      } else {
        setAlertInfo({ type: 'error', message: 'Failed to sign up. Please try again later.' });
      }
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000); // Hide alert after 5 seconds
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword((prev) => !prev);
    } else if (field === 'rePassword') {
      setShowRePassword((prev) => !prev);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentText((prevText) => (prevText + 1) % carouselTexts.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: { xs: 'none', sm: 'block' },
            backgroundImage: `url(${Design})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              p: 4,
            }}
          >
            <Typography component="h1" variant="h2" color="white" gutterBottom>
              Health Platform
            </Typography>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
              <Typography variant="h5" color="white" key={currentText}>
                {carouselTexts[currentText]}
              </Typography>
            </Slide>
          </Box>
        </Grid>
        <Grid
          item 
          xs={12} 
          sm={8} 
          md={5} 
          component={Paper} 
          elevation={6} 
          square 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              maxWidth: "80%",
              width: "500px", // Reduced width
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Button onClick={() => togglePasswordVisibility('password')}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </Button>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="rePassword"
                label="Re-enter Password"
                type={showRePassword ? 'text' : 'password'}
                id="rePassword"
                autoComplete="new-password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Button onClick={() => togglePasswordVisibility('rePassword')}>
                      {showRePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </Button>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Log In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        {showAlert && (
          <Alert
            variant="filled"
            severity={alertInfo.type}
            onClose={() => setShowAlert(false)}
            sx={{ position: 'absolute', top: 20, right: 20, width: '300px', zIndex: 9999 }}
          >
            <AlertTitle>
              {alertInfo.type === "error" ? "Error" : "Success"}
            </AlertTitle>
            {alertInfo.message}
          </Alert>
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;
