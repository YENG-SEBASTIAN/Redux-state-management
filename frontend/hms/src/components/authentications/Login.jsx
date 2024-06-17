import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Design from "../../assets/Design.jpg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const theme = createTheme();

const carouselTexts = [
  "Welcome to our Health Platform!",
  "Your health, our priority.",
  "Stay fit, stay healthy.",
  "Join us for a healthier life.",
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentText, setCurrentText] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ type: "", message: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const textIntervalId = setInterval(() => {
      setCurrentText((prevText) => (prevText + 1) % carouselTexts.length);
    }, 8000);

    return () => clearInterval(textIntervalId);
  }, []);

  useEffect(() => {
    if (error) {
      handleAlert("error", getErrorMessage(error));
    }
  }, [error]);

  useEffect(() => {
    if (token) {
      handleAlert("success", "Login successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    }
  }, [token, navigate]);

  const handleAlert = (type, message) => {
    setAlertInfo({ type, message });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setAlertInfo({ type: "", message: "" });
    }, 5000);
  };

  const getErrorMessage = (err) => {
    if (err.response && err.response.data) {
      const { detail } = err.response.data;
      if (detail)
       {
        return detail || "Failed to sign in. Invalid email or password";
      }
    } else if (err.message === "Network Error") {
      return "Network error occurred. Please try again.";
    } else {
      return "Failed to sign in. Invalid email or password.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      handleAlert("error", "All fields are required");
      return;
    }

    try {
      await dispatch(login(email, password));
    } catch (err) {
      handleAlert("error", getErrorMessage(err));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: { xs: "none", md: "block" },
            position: "relative",
            backgroundImage: `url(${Design})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
              maxWidth: "400px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {showAlert && (
              <Alert
                variant="filled"
                severity={alertInfo.type}
                onClose={() => setShowAlert(false)}
                sx={{ width: "100%", mb: 2 }}
              >
                <AlertTitle>
                  {alertInfo.type === "error" ? "Error" : "Success"}
                </AlertTitle>
                {alertInfo.message}
              </Alert>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              method="POST"
              sx={{ mt: 1, width: "100%" }}
            >
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
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <Button onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
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
                {loading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
