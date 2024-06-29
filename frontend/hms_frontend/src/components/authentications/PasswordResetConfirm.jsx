import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { passwordResetConfirm } from '../../actions/authActions';
import AlertMessage from '../basicUIs/AlertMessage';
import AuthFooter from './AuthFooter';

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlertType('danger');
      setAlertMessage('Passwords do not match');
      setShowAlert(true);
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setAlertType('danger');
      setAlertMessage('Password must be at least 8 characters long and include uppercase, lowercase, numeric, and special characters.');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      await dispatch(passwordResetConfirm(uid, token, password));
      setAlertType('success');
      setAlertMessage('Password reset successful! Redirecting to login...');
      setShowAlert(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      let errorMsg = 'Password reset failed. Please try again.';
      if (error?.response?.data) {
        errorMsg = error.response.data.uid || error.response.data.token || error.response.data.detail || errorMsg;
      }
      setAlertType('danger');
      setAlertMessage(errorMsg);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper pt-5">
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div className="bg-overlay"></div>
        {/* Add your particle effect or background elements here */}
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
                <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Create new password</h5>
                    <p className="text-muted">Your new password must be different from previously used password.</p>
                  </div>

                  <div className="p-2">
                    <form onSubmit={handleSubmit}>

                      <div className="mb-3 text-start">
                        <label className="form-label" htmlFor="password-input">Password</label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control pe-5 password-input"
                            placeholder="Enter password"
                            id="password-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                            onClick={togglePasswordVisibility}
                          >
                            <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
                          </button>
                        </div>
                        <div id="passwordInput" className="form-text">Must be at least 8 characters long and include uppercase, lowercase, numeric, and special characters.</div>
                      </div>

                      <div className="mb-3 text-start">
                        <label className="form-label" htmlFor="confirm-password-input">Confirm Password</label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control pe-5 password-input border-1"
                            placeholder="Confirm password"
                            id="confirm-password-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                            onClick={togglePasswordVisibility}
                          >
                            <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit" disabled={loading}>
                          {loading ? (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          ) : (
                            'Reset Password'
                          )}
                        </button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="mb-0">Wait, I remember my password... <a href="/" className="fw-semibold text-primary text-decoration-underline"> Click here </a> </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default PasswordResetConfirm;
