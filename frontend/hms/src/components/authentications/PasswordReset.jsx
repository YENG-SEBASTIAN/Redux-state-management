import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // For redirection
import { resetPassword } from "../../actions/authActions";
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
import CircularProgress from "@mui/material/CircularProgress";
import AlertComponent from "../main/AlertComponent"; 
import Design from "../../assets/Design.jpg";

const theme = createTheme();

const carouselTexts = [
  "Welcome to our Health Platform!",
  "Your health, our priority.",
  "Stay fit, stay healthy.",
  "Join us for a healthier life.",
];

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [currentText, setCurrentText] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ type: "", message: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth.passwordReset);

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
    if (success) {
      handleAlert("success", "We have sent you an email. Kindly check and proceed.");
    }
  }, [success]);

  const handleAlert = (type, message) => {
    setAlertInfo({ type, message });
    setShowAlert(true);

    if (type === "success") {
      setTimeout(() => {
        setShowAlert(false);
        navigate("/");
      }, 5000);
    } else {
      setTimeout(() => {
        setShowAlert(false);
        setAlertInfo({ type: "", message: "" });
      }, 5000);
    }
  };

  const getErrorMessage = (err) => {
    if (err.response && err.response.data) {
      const { detail } = err.response.data;
      return detail || "Failed to reset password. Please try again.";
    } else if (err.message === "Network Error") {
      return "Network error occurred. Please try again.";
    } else {
      return "Failed to reset password. Please try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      handleAlert("error", "Email field is required");
      return;
    }

    try {
      await dispatch(resetPassword(email));
    } catch (err) {
      handleAlert("error", getErrorMessage(err));
    }
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
              Reset Password
            </Typography>
            <AlertComponent
              message={alertInfo.message}
              severity={alertInfo.type === "error" ? "error" : "success"}
              open={showAlert}
              handleClose={() => setShowAlert(false)}
            />
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Reset Password"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Back to login
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

export default PasswordReset;
