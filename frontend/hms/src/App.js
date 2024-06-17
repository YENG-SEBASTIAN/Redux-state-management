import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Counter from './components/Counter';
import Login from './components/authentications/Login';
import Signup from './components/authentications/SignUp';
import ActivateAccount from './components/authentications/ActivateAccount';
import ProtectedRoute from './components/authentications/ProtectedRoute';
import Dashboard from './components/main/Dashboard';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
        <Route
          path="/counter"
          element={
            <ProtectedRoute>
              <Counter />
            </ProtectedRoute>
          }
        />
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
