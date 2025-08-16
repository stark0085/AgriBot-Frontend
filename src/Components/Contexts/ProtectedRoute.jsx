import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ProfileContext } from './ProfileProvider';

// Loading component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfccb 50%, #fefce8 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      textAlign: 'center'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        backgroundColor: '#22c55e',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        animation: 'spin 1s linear infinite'
      }}>
        <span style={{ fontSize: '24px', color: 'white' }}>🌱</span>
      </div>
      <p style={{ fontSize: '18px', color: '#64748b', margin: 0 }}>Loading AgriBot...</p>
    </div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Protected Route for authenticated users only
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(ProfileContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Public Route for unauthenticated users only (login, signup)
const PublicRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(ProfileContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
};

export { ProtectedRoute, PublicRoute };