import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/authentications/Login';
import Signup from './components/authentications/SignUp';
import ActivateAccount from './components/authentications/ActivateAccount';
import PasswordReset from './components/authentications/PasswordReset';
import PasswordResetConfirm from './components/authentications/PasswordResetConfirm';
import ProtectedRoute from './components/authentications/ProtectedRoute';
import Dashboard from './components/main/Dashboard';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;
