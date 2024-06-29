import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AlertMessage from '../basicUIs/AlertMessage';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../actions/authActions';
import AuthFooter from './AuthFooter';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setAlertType('danger');
      setAlertMessage('Please enter a valid email address.');
      setShowAlert(true);
      return;
    }

    if (username.trim() === '') {
      setAlertType('danger');
      setAlertMessage('Please enter a username.');
      setShowAlert(true);
      return;
    }

    if (!validatePassword(password)) {
      setAlertType('danger');
      setAlertMessage('Password must be at least 8 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.');
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertType('danger');
      setAlertMessage('Passwords do not match.');
      setShowAlert(true);
      return;
    }

    // Start loading
    setLoading(true);

    try {
      await dispatch(signup(email, username, password, confirmPassword));
      setAlertType('success');
      setAlertMessage('Signup successful! Please check your email to activate your account.');
      setShowAlert(true);
      setTimeout(() => navigate('/'), 2000); // Navigate to login page after 2 seconds
    } catch (error) {
      setAlertType('danger');
      setAlertMessage(error.message || 'An error occurred during signup.');
      setShowAlert(true);
    } finally {
      // Stop loading
      setLoading(false);
    }

    // Clear form fields after signup attempt
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
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
                    <h5 className="text-primary">Create New Account</h5>
                  </div>
                  <div className="p-2 mt-4">
                    <form className="needs-validation" noValidate onSubmit={handleSignup}>
                      <div className="mb-3">
                        <label htmlFor="useremail" className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="useremail"
                          placeholder="Enter email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">Please enter a valid email address.</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Enter username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">Please enter a username.</div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="password-input">
                          Password <span className="text-danger">*</span>
                        </label>
                        <div className="position-relative auth-pass-inputgroup">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control pe-5 password-input"
                            placeholder="Enter password"
                            id="password-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                            onClick={togglePasswordVisibility}
                          >
                            <i className={showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}></i>
                          </button>
                          <div className="invalid-feedback">
                            Password must be at least 8 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="confirm-password-input">
                          Confirm Password <span className="text-danger">*</span>
                        </label>
                        <div className="position-relative auth-pass-inputgroup">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control pe-5 password-input"
                            placeholder="Confirm password"
                            id="confirm-password-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                            onClick={togglePasswordVisibility}
                          >
                            <i className={showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}></i>
                          </button>
                          <div className="invalid-feedback">Passwords do not match.</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        {loading ? (
                          <button className="btn btn-success w-100" type="button" disabled>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Signing Up...
                          </button>
                        ) : (
                          <button className="btn btn-success w-100" type="submit">
                            Sign Up
                          </button>
                        )}
                      </div>

                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Already have an account ?{' '}
                  <a href="/" className="fw-semibold text-primary text-decoration-underline">
                    Signin
                  </a>{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Footer Component */}
      <AuthFooter />

      {/* Display all alert messages */}
      <AlertMessage type={alertType} message={alertMessage} show={showAlert} onClose={() => setShowAlert(false)} />
    </div>
  );
};

export default SignUp;
