import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../basicUIs/AlertMessage';

const withAuthRedirect = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
      if (token) {
        setAlertType('info');
        setAlertMessage('You are already logged in');
        setShowAlert(true);

        const timer = setTimeout(() => {
          navigate(-1);
        }, 3000);

        return () => clearTimeout(timer); // Clear timeout if component unmounts
      }
    }, [token, navigate]);

    return (
      <>
        {showAlert && (
          <AlertMessage
            type={alertType}
            message={alertMessage}
            show={showAlert}
            onClose={() => setShowAlert(false)} // Proper state setter method
          />
        )}
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withAuthRedirect;
