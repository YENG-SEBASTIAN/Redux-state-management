import React, { useState, useEffect } from 'react';
import AlertMessage from '../basicUIs/AlertMessage';
import { useDispatch, useSelector } from 'react-redux';
import { activateAccount } from '../../actions/authActions';
import { useNavigate, useParams } from 'react-router-dom';

const ActivateAccount = () => {
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const { error, activated } = useSelector((state) => state.auth.activation);

  const handleActivate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(activateAccount(uid, token));
      setAlertType('success');
      setAlertMessage('Account activated successfully!');
      setShowAlert(true);
    } catch (err) {
      setAlertType('danger');
      setAlertMessage(err.response?.data?.detail || err.response?.data?.uid || err.response?.data?.token || 'Failed to activate account. Please try again.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (alertType === 'success') {
      const redirectTimer = setTimeout(() => {
        navigate('/'); // Redirect to login page after 2 seconds
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [alertType, navigate]);

  return (
    <div className="auth-page-wrapper pt-5">
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div className="bg-overlay"></div>
      </div>

      <div className="auth-page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <a href="index.html" className="d-inline-block auth-logo">
                    <img src="assets/images/logo-light.png" alt="" height="20" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome!</h5>
                    <p className="text-muted">Kindly activate your eHealth Portal.</p>
                  </div>
                  <div className="p-2 mt-4">
                    <form onSubmit={handleActivate}>
                      <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit" disabled={loading}>
                          {loading ? (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          ) : (
                            'Activate'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="mb-0">Do you want to go back? <a href="/" className="fw-semibold text-primary text-decoration-underline">Sign In</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertMessage
        type={alertType}
        message={alertMessage}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
};

export default ActivateAccount;
