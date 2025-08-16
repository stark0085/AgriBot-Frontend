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
          <Toaster />
          <Routes>
            {/* Public Route - Language Selection (always accessible) */}
            <Route path="/" element={<LanguageGridSelector />} />
            <Route path="/languages" element={<LanguageGridSelector />} />
            
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