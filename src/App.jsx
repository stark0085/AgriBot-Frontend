// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProfileProvider from './Components/Contexts/ProfileProvider';
import { ProtectedRoute, PublicRoute } from './Components/Contexts/ProtectedRoute';
import './App.css';
import './index.css';
// Import your components
import Chats from './Components/ChatPage/Chats';
import Dashboard from './Components/Dashboard/Dashboard';
import SignUp from './Components/LoginPage/signup';
import ProfilePage from './Components/Profile/Profile';
import LoginForm from './Components/LoginPage/login';
import LanguageGridSelector from './Components/LoginPage/Language';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="App">
          {/* React Hot Toast Container */}
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 2000,
              style: {
                background: '#fff',
                color: '#333',
                fontSize: '14px',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                padding: '16px 20px',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
                style: {
                  borderLeft: '4px solid #22c55e',
                }
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
                style: {
                  borderLeft: '4px solid #ef4444',
                }
              },
            }}
          />

          <Routes>
            {/* Public Route - Language Selection (always accessible) */}
            <Route path="/" element={<LanguageGridSelector />} />
            
            {/* Public Routes - Only for non-authenticated users */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />

            {/* Protected Routes - Only for authenticated users */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Catch all route - redirect to home (language selection) */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ProfileProvider>
  );
}

export default App;