import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'feather-icons';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../actions/authActions';
import AlertMessage from '../basicUIs/AlertMessage';
import AuthFooter from './AuthFooter';


const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(email.trim() === ''){
      setAlertType('danger');
      setAlertMessage('Enter your email address');
      setShowAlert(true);
      setLoading(false);
      return
    }
    try {
      await dispatch(resetPassword(email));
      setAlertType('success');
      setAlertMessage('We have emailed you kindly check your inbox');
      setShowAlert(true);
      setLoading(false);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      let errorMsg = 'An error occurred. Please try again later.';
      if (error?.response && error?.response?.data) {
        errorMsg = error.response.data.email || error.response.data.detail;
      }
      setAlertType('danger');
      setAlertMessage(errorMsg);
      setShowAlert(true);
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper pt-5">
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div className="bg-overlay"></div>
        <div className="shape">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
          </svg>
        </div>
      </div>

      <div className="auth-page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <a href="/" className="d-inline-block auth-logo">
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
                    <h5 className="text-primary">Forgot Password?</h5>
                    <p className="text-muted">Reset password with Velzon</p>
                    <lord-icon
                      src="https://cdn.lordicon.com/rhvddzym.json"
                      trigger="loop"
                      colors="primary:#0ab39c"
                      className="avatar-xl"
                    ></lord-icon>
                  </div>

                  <div className="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                    Enter your email and instructions will be sent to you!
                  </div>
                  <div className="p-2">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter Email"
                          value={email}
                          onChange={handleEmailChange}
                          disabled={loading}
                        />
                      </div>

                      <div className="text-center mt-4">
                        <button className="btn btn-success w-100" type="submit" disabled={loading}>
                          {loading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          ) : (
                            'Send Reset Link'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Wait, I remember my password...{' '}
                  <a href="/" className="fw-semibold text-primary text-decoration-underline">
                    Click here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <AuthFooter />

      {/* Show alert message */}
      <AlertMessage
        type={alertType}
        message={alertMessage}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
};

export default PasswordReset;
