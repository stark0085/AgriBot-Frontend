import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios'; // Import axios
import i18n from '../../Multilingual/i18n'; // Make sure this path is correct

// Step 1: Create and export the context so other components can use it
export const ProfileContext = createContext(null);

const languageMap = {
  en: 'English',
  hi: 'Hindi',
  ta: 'Tamil'
};

const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Use two-letter language codes

  // On initial load, check local storage for user data, token, and language
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
          i18n.changeLanguage(savedLanguage); // Set language on app start
        }
      } catch (error) {
        console.error('Error parsing data from localStorage:', error);
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

  //  Logs the user in using axios
  const login = async (credentials) => {
    try {
      const response = await axios.post('https://agri-bot-backend-ba3f.vercel.app/auth/signin', credentials);
      const data = response.data; // axios wraps the response in a `data` object

      if (data.code === 0) {
        const userData = {
          email: credentials.email,
          state: data.state,
          district: data.district
        };

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
        message: error.response?.data?.message || 'Network error. Please try again.'
      };
    }
  };

  // Signs the user up using axios
  const signup = async (userData) => {
    try {
      const response = await axios.post('https://agri-bot-backend-ba3f.vercel.app/auth/signup', userData);
      const data = response.data;

      if (data.code === 0) {
        return { code: 0, message: 'Account created successfully' };
      } else {
        return { code: 1, message: data.message || 'Signup failed.' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return {
        code: 1,
        message: error.response?.data?.message || 'Network error. Please try again.'
      };
    }
  };

  // Logs the user out
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    // We keep the language selection even after logout
    toast.success('Logged out successfully');
  };

  // Updates user profile information locally
  const updateProfile = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
    return { success: true };
  };

  // Updates the application language
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

  // The value object provided to all consumer components
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