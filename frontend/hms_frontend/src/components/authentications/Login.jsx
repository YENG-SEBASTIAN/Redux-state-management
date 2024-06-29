import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AlertMessage from '../basicUIs/AlertMessage';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import withAuthRedirect from './withAuthRedirect';
import AuthFooter from './AuthFooter';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setAlertType('danger');
      setAlertMessage('Please fill in all fields.');
      setShowAlert(true);
      return;
    }

    if (!validatePassword(password)) {
      setAlertType('danger');
      setAlertMessage('Password must be at least 8 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.');
      setShowAlert(true);
      return;
    }

    setLoading(true);

    try {
      const response = await dispatch(login(email, password));

      if (response.access) {
        setAlertType('success');
        setAlertMessage('Login successful!');
        setShowAlert(true);
        navigate('/dashboard');
      } else {
        throw new Error('Login failed. No token received.');
      }
    } catch (error) {
      setAlertType('danger');
      setAlertMessage(error.message || 'An error occurred during login.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
                    <h5 className="text-primary">Welcome Back!</h5>
                    <p className="text-muted">Sign in to continue to eHealth Portal.</p>
                  </div>
                  <div className="p-2 mt-4">
                    <form onSubmit={handleLogin}>
                      <div className="mb-3 text-start">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mb-3 text-start">
                        <div className="float-end">
                          <a href="/reset-password" className="text-muted">Forgot password?</a>
                        </div>
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
                      </div>

                      <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit" disabled={loading}>
                          {loading ? (
                            <button className="btn btn-success w-100" type="button" disabled>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Signing In...
                          </button>
                          ) : (
                            'Sign In'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="mb-0">Don't have an account? <a href="/signup" className="fw-semibold text-primary text-decoration-underline">Signup</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <AuthFooter />

      <AlertMessage
        type={alertType}
        message={alertMessage}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
};

export default withAuthRedirect(Login);
