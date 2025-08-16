// Context/ProfileProvider.js
import { createContext, useState, useEffect, memo } from "react";

const ProfileContext = createContext();

const ProfileProvider = memo(({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    district: '',
    state: '',
    fullName: '',
  });
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUserData = localStorage.getItem("userData");
        const authToken = localStorage.getItem("authToken");
        
        if (storedUserData && authToken) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
          setIsLoggedIn(true);
        } else {
          // Clear any incomplete data
          localStorage.removeItem("userData");
          localStorage.removeItem("authToken");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        // Clear corrupted data
        localStorage.removeItem("userData");
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Sign up function - DOES NOT auto-login the user
  const signup = (userInfo) => {
    try {
      // Validate passwords match
      if (userInfo.password !== userInfo.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Here you would typically send data to your backend
      // For now, we'll simulate successful signup without logging in
      console.log("User registered successfully:", userInfo.email);
      
      // DO NOT set isLoggedIn to true or store auth data
      // User needs to login separately after signup
      
      return { success: true };
    } catch (error) {
      console.error("Error during signup:", error);
      return { success: false, error: error.message };
    }
  };

  // Login function
  const login = (loginData) => {
    try {
      // Here you would typically validate credentials with your backend
      // For demo purposes, we'll accept any valid email/password
      
      // Create user profile (in real app, this would come from backend)
      const userToLogin = {
        email: loginData.email,
        fullName: loginData.email.split('@')[0], // Use email prefix as name
        district: 'Demo District',
        state: 'Demo State'
      };

      setUserData(userToLogin);
      setIsLoggedIn(true);
      
      localStorage.setItem("userData", JSON.stringify(userToLogin));
      localStorage.setItem("authToken", 'login-auth-token-' + Date.now());
      
      return { success: true };
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setUserData({
      email: '',
      district: '',
      state: '',
      fullName: ''
    });
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
  };

  // Update profile function
  const updateProfile = (updatedData) => {
    try {
      const newUserData = { ...userData, ...updatedData };
      setUserData(newUserData);
      localStorage.setItem("userData", JSON.stringify(newUserData));
      return { success: true };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, error: error.message };
    }
  };

  const contextValue = {
    userData,
    setUserData,
    isLoggedIn,
    setIsLoggedIn,
    loading,
    signup,
    login,
    logout,
    updateProfile
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
});

ProfileProvider.displayName = 'ProfileProvider';

export default ProfileProvider;
export { ProfileContext };