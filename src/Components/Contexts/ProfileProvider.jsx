// Components/Contexts/ProfileProvider.js
import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear corrupted data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  // Updated login function in ProfileProvider.js
  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.code === 0) {
        // Success - store user data and token
        const userData = {
          email: credentials.email,
          // Add other user data from response if available
          ...(data.user || data.data || {}) // Handle both data.user and data.data
        };

        setUser(userData);
        setIsLoggedIn(true);

        // Store in localStorage for persistence
        localStorage.setItem('authToken', data.token || 'logged_in');
        localStorage.setItem('userData', JSON.stringify(userData));

        return { code: 0, message: 'Login successful' };
      } else {
        // Error case
        return {
          code: 1,
          message: data.message || 'Login failed. Please check your credentials.'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        code: 1,
        message: 'Network error. Please check your connection and try again.'
      };
    }
  };
  // Signup function
  const signup = async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.code === 0) {
        // Success
        return { code: 0, message: 'Account created successfully' };
      } else {
        // Error case
        return {
          code: 1,
          message: data.message || 'Signup failed. Please try again.'
        };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return {
        code: 1,
        message: 'Network error. Please check your connection and try again.'
      };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);

    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');

    toast.success('Logged out successfully');
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
  };

  const value = {
    user,
    isLoggedIn,
    loading,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;