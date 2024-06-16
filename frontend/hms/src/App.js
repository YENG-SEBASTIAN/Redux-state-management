import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Counter from './components/Counter';
import Login from './components/authentications/Login';
import ProtectedRoute from './components/authentications/ProtectedRoute';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/counter"
          element={
            <ProtectedRoute>
              <Counter />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;
