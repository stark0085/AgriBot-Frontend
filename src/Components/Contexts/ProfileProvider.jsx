import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import i18n from '../../Multilingual/i18n'; // Make sure this path is correct

// Create the context
export const ProfileContext = createContext();

const languageMap = {
  en: 'English',
  hi: 'Hindi',
  ta: 'Tamil'
};

const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  // STATE MUST USE THE TWO-LETTER CODE
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        const savedLanguage = localStorage.getItem('selectedLanguage');

        if (token && userData) {
          setUser(JSON.parse(userData));
          setIsLoggedIn(true);
        }

        if (savedLanguage) {
          setSelectedLanguage(savedLanguage);
          // THIS LINE SETS THE LANGUAGE ON APP START
          i18n.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const updateLanguage = (languageCode) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    i18n.changeLanguage(languageCode);

    const languageName = languageMap[languageCode] || languageCode;
    toast.success(`Language changed to ${languageName}`, {
      duration: 3000,
      position: 'top-center',
      style: { background: '#10b981', color: '#fff', fontWeight: '600', borderRadius: '12px' },
      icon: '🌐',
    });
  };

  // Example login function (replace with your actual API logic)
  const login = async (credentials) => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (data.code === 0) {
        const userData = {
          email: credentials.email,
          state: data.state,
          district: data.district,
        };
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(userData));
        return { code: 0, message: 'Login successful' };
      } else {
        return {
          code: 1,
          message: data.message || 'Login failed. Please check your credentials.',
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        code: 1,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  };

  // Example signup function (replace with your actual API logic)
  const signup = async (userData) => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
  // (Removed duplicate updateLanguage function)
        code: 1,
        message: 'Network error. Please check your connection and try again.',
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

  // (Removed duplicate updateLanguage function)

  // Your original login, logout, etc. functions are unchanged
  // const login = async (credentials) => { /* ...your existing code... */ };
  // const logout = () => { /* ...your existing code... */ };
  // const updateProfile = (updatedData) => { /* ...your existing code... */ };
  // const signup = async (userData) => { /* ...your existing code... */ };

  const value = {
    user,
    isLoggedIn,
    loading,
    selectedLanguage,
    login,
    signup,
    logout,
    updateProfile,
    updateLanguage
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;