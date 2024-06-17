import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activateAccount } from "../../actions/authActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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
import Link from "@mui/material/Link";
import Design from "../../assets/Design.jpg";

const theme = createTheme();

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, activated } = useSelector((state) => state.activation);

  const [alertInfo, setAlertInfo] = useState({ type: "", message: "" });


  useEffect(() => {
    if (error) {
      setAlertInfo({ type: "error", message: error });
      setTimeout(() => {
        setAlertInfo({ type: "", message: "" });
      }, 3000);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await dispatch(activateAccount(uid, token))
      if (activated) {
        setAlertInfo({ type: "success", message: "Account activated successfully!" });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    }catch(err){
      if (err.response && err.response.data){
        const { detail, message } = err.response.data;
        if (detail) {
          setAlertInfo({ type: 'error', message: detail[0] });
        } 
      }
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
              <Typography variant="h5" color="white">
                Activate Your Account
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
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Activate Account
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "blue", fontFamily: "Arial, sans-serif", mb: 2 }}
            >
              Please activate your account before logging in.
            </Typography>
            {alertInfo.message && (
              <Alert
                variant="filled"
                severity={alertInfo.type}
                onClose={() => setAlertInfo({ type: "", message: "" })}
                sx={{ width: "100%", mb: 2 }}
              >
                <AlertTitle>{alertInfo.type === "error" ? "Error" : "Success"}</AlertTitle>
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
              <input type="hidden" name="uid" value={uid} />
              <input type="hidden" name="token" value={token} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Activate"}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Back to Login
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

export default ActivateAccount;
