import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './components/authentications/Login';
import SignUp from './components/authentications/SignUp';
import ProtectedRoute from './components/authentications/ProtectedRoute';
import home from './components/dashboard/home';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <home />
            </ProtectedRoute>
          }
        />
    </Routes>
  );
}

export default App;
