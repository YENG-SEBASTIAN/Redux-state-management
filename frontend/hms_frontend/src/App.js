import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './components/authentications/Login';
import SignUp from './components/authentications/SignUp';
import ProtectedRoute from './components/authentications/ProtectedRoute';
import ActivateAccount from './components/authentications/ActivateAccount';
import PasswordReset from './components/authentications/PasswordReset';
import Dashboard from './components/dashboard/Dashboard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
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
