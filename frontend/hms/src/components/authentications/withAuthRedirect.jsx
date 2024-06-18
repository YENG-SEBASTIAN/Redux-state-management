import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AlertComponent from '../main/AlertComponent';


const withAuthRedirect = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const [alert, setAlert] = React.useState(null);

    useEffect(() => {
      if (token) {
        setAlert('You are already logged in');
        setTimeout(() => {
          setAlert(null);
          navigate(-1);
        }, 3000);
      }
    }, [token, navigate]);

    return (
      <>
        <AlertComponent
          message={alert}
          severity="info"
          open={!!alert} // Convert alert to a boolean to determine open state
          handleClose={() => setAlert(null)}
        />
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withAuthRedirect;
