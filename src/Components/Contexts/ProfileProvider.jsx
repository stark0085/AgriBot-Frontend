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
    // THIS LINE IS CRITICAL - IT TELLS THE LIBRARY TO TRANSLATE
    i18n.changeLanguage(languageCode);
    
    const languageName = languageMap[languageCode] || languageCode;
    toast.success(`Language changed to ${languageName}`, {
      duration: 3000,
      position: 'top-center',
      style: { background: '#10b981', color: '#fff', fontWeight: '600', borderRadius: '12px' },
      icon: '🌐',
    });
  };

  // Your original login, logout, etc. functions are unchanged
  const login = async (credentials) => { /* ...your existing code... */ };
  const logout = () => { /* ...your existing code... */ };
  const updateProfile = (updatedData) => { /* ...your existing code... */ };
  const signup = async (userData) => { /* ...your existing code... */ };

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