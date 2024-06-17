
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';

const withAuthRedirect = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token')
    const [alert, setAlert] = React.useState(null);

    useEffect(() => {
      if (token) {
        setAlert("You are already logged in");
        setTimeout(() => {
          setAlert(null);
          navigate(-1);
        }, 3000);
      }
    }, [token, navigate]);

    return (
      <>
        {alert && (
          <Alert
            severity="info"
            onClose={() => setAlert(null)}
            sx={{ position: 'fixed', top: 0, width: '100%' }}
          >
            {alert}
          </Alert>
        )}
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withAuthRedirect;
