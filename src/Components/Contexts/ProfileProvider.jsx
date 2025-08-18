import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Create the context
export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Add language state

  // On initial load, check local storage for user data, token, and language
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        const savedLanguage = localStorage.getItem('selectedLanguage');

        if (token && userData) {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
          setIsLoggedIn(true);
        }

        // Load saved language or default to English
        if (savedLanguage) {
          setSelectedLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('selectedLanguage');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);
  
  //  * Logs the user in by sending credentials to the backend.
  //  * On success, it stores user data (including state and district) and the auth token.
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
        // Create a complete user data object from the API response
        const userData = {
          email: credentials.email,
          state: data.state,       // Get state from response
          district: data.district  // Get district from response
        };

        // Update state and local storage
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(userData));

        return { code: 0, message: 'Login successful' };
      } else {
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

  // Logs the user out by clearing state and local storage.
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    // Keep language selection even after logout
    toast.success('Logged out successfully');
  };

  /**
   * Updates the user's profile information in state and local storage.
   */
  const updateProfile = (updatedData) => {
    // Note: This is a local update. For persistence, you'd also need a backend endpoint.
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
    // Assuming the update is always successful locally
    return { success: true };
  };

  /**
   * Updates the selected language in state and local storage.
   */
  const updateLanguage = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language);
    
    toast.success(`Language changed to ${language}`, {
      duration: 3000,
      position: 'top-center',
      style: {
        background: '#10b981',
        color: '#fff',
        fontWeight: '600',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
      },
      icon: '🌐',
    });
  };
  
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
        return { code: 0, message: 'Account created successfully' };
      } else {
        return { code: 1, message: data.message || 'Signup failed.' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { code: 1, message: 'Network error. Please try again.' };
    }
  };

  const value = {
    user,
    isLoggedIn,
    loading,
    selectedLanguage,    // Add to context value
    login,
    signup,
    logout,
    updateProfile,
    updateLanguage       // Add to context value
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;