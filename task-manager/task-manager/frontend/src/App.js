import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';

function App() {

  // Check if user is logged in by looking for token in localStorage
  function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* Home route - redirect to tasks if logged in, else login */}
        <Route
          path="/"
          element={isLoggedIn() ? <Navigate to="/tasks" /> : <Navigate to="/login" />}
        />

        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Register page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Tasks page - only for logged-in users */}
        <Route
          path="/tasks"
          element={isLoggedIn() ? <TasksPage /> : <Navigate to="/login" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
