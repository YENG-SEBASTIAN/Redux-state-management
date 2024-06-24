import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AlertComponent from "../main/AlertComponent";
import Design from "../../assets/Design.jpg";
import { passwordResetConfirm } from "../../actions/authActions";

const theme = createTheme();

const carouselTexts = [
  "Welcome to our Health Platform!",
  "Your health, our priority.",
  "Stay fit, stay healthy.",
  "Join us for a healthier life.",
];

const PasswordResetConfirm = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [currentText, setCurrentText] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ type: "", message: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state) => state.auth.passwordResetConfirm
  );
  const { uid, token } = useParams(); // Extracting uid and token from URL params

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
      handleAlert(
        "success",
        "Password has been reset successfully. You can now login with your new password."
      );
    }
  }, [success]);

  const handleAlert = (type, message) => {
    setAlertInfo({ type, message });
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      setAlertInfo({ type: "", message: "" });
      if (type === "success") {
        navigate("/");
      }
    }, 5000);
  };

  const getErrorMessage = (err) => {
    if (err.response && err.response.data) {
      const { new_password, token, message } = err.response.data;
      if (new_password) {
        return new_password[0];
      } else if (token) {
        return token[0];
      } else if (message) {
        return message;
      }
    } else if (err.message === "Network Error") {
      return "Network error occurred. Please try again.";
    }
    return "Failed to reset password. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !rePassword) {
      handleAlert("error", "Password fields are required");
      return;
    }

    if (password !== rePassword) {
      handleAlert("error", "Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      handleAlert(
        "error",
        "Password must contain at least 8 characters with one uppercase, lowercase, digits, and special character"
      );
      return;
    }

    try {
      await dispatch(passwordResetConfirm(uid, token, password));
    } catch (err) {
      handleAlert("error", getErrorMessage(err));
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else if (field === "rePassword") {
      setShowRePassword((prev) => !prev);
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
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
              width: "350px", // Reduced width
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Confirm Password Reset
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
                name="password"
                label="New Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => togglePasswordVisibility("password")}
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </Button>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="rePassword"
                label="Confirm Password"
                type={showRePassword ? "text" : "password"}
                id="rePassword"
                autoComplete="new-password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => togglePasswordVisibility("rePassword")}
                      size="small"
                    >
                      {showRePassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
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
                {loading ? <CircularProgress size={24} /> : "Confirm Password"}
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

export default PasswordResetConfirm;
