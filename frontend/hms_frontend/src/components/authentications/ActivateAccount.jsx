
import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLocation } from 'react-router-dom';

const ActivateAccount = () => {
  const location = useLocation();
  const [uid, setUid] = useState('');
  const [token, setToken] = useState('');
  const [activationMessage, setActivationMessage] = useState('');

  useEffect(() => {
    // Extract uid and token from URL parameters on component mount
    const searchParams = new URLSearchParams(location.search);
    const uidParam = searchParams.get('uid');
    const tokenParam = searchParams.get('token');
    
    // Set uid and token in component state
    if (uidParam && tokenParam) {
      setUid(uidParam);
      setToken(tokenParam);
    }
  }, [location.search]);

  const handleActivation = () => {
    // Simulate activation logic here (replace with actual activation API call)
    // For demonstration, just show a success message
    setActivationMessage('Account activated successfully!');
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
                <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4 text-center">
                  <div className="avatar-lg mx-auto mt-2">
                    <div className="avatar-title bg-light text-success display-3 rounded-circle">
                      <i className="ri-checkbox-circle-fill"></i>
                    </div>
                  </div>
                  <div className="mt-4 pt-2">
                    <h4>Activate Your Account</h4>
                    <p className="text-muted mx-4">
                      Please click the button below to activate your account.
                    </p>
                    {uid && token ? (
                      <div className="mt-4">
                        <button className="btn btn-success w-100" onClick={handleActivation}>
                          Activate Account
                        </button>
                      </div>
                    ) : (
                      <p className="text-danger mt-3">Invalid activation link.</p>
                    )}
                    {activationMessage && (
                      <div className="mt-4">
                        <p className="text-success">{activationMessage}</p>
                        <a href="/auth-signin-basic.html" className="btn btn-success w-100">
                          Back to Dashboard
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end auth page content */}

      {/* footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <p className="mb-0 text-muted">
                  &copy; <script>document.write(new Date().getFullYear())</script> Velzon. Crafted with{' '}
                  <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* end Footer */}
    </div>
  );
};

export default ActivateAccount;
