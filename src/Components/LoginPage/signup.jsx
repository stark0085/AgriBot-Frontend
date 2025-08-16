// Components/LoginPage/signup.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { ProfileContext } from '../Contexts/ProfileProvider';

// List of Indian states for the dropdown
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const SignUpForm = () => {
  const { signup } = useContext(ProfileContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    state: '',
    district: '',
    password: '', 
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  // Removed unused showConfirmPassword state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.district.trim()) {
      newErrors.district = 'District is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await signup(formData);
      
      if (result.success) {
        // Redirect to login page after successful signup
        alert('Account created successfully! Please login to continue.');
        navigate('/login');
      } else {
        setErrors({ submit: result.error || 'Signup failed. Please try again.' });
      }
    } catch {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Left side - Form */}
      <div style={{ 
        width: '50%', 
        padding: '30px 80px', 
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '20px',
            margin: '0 0 60px 0'
          }}>
            Sign Up
          </h1>
          
          {errors.submit && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              {errors.submit}
            </div>
          )}
          
          <div>
            {/* Full Name */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '12px' 
              }}>
                Full Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  height: '56px',
                  padding: '0 16px',
                  border: `2px solid ${errors.fullName ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: '#fff',
                  boxSizing: 'border-box'
                }}
              />
              {errors.fullName && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '12px' 
              }}>
                Email Address <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  height: '56px',
                  padding: '0 16px',
                  border: `2px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: '#fff',
                  boxSizing: 'border-box'
                }}
              />
              {errors.email && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* State */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '12px' 
              }}>
                State <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter your state"
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  height: '56px',
                  padding: '0 16px',
                  border: `2px solid ${errors.state ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: '#fff',
                  boxSizing: 'border-box'
                }}
              />
              {errors.state && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>
                  {errors.state}
                </p>
              )}
            </div>

            {/* District */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '12px' 
              }}>
                District <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="Enter your district"
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  height: '56px',
                  padding: '0 16px',
                  border: `2px solid ${errors.district ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: '#fff',
                  boxSizing: 'border-box'
                }}
              />
              {errors.district && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>
                  {errors.district}
                </p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '12px' 
              }}>
                Password <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative', maxWidth: '360px' }}>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    height: '56px',
                    padding: '0 56px 0 16px',
                    border: `2px solid ${errors.password ? '#ef4444' : '#d1d5db'}`,
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: '#fff',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '48px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '12px' 
              }}>
                Confirm Password <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative', maxWidth: '360px' }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  style={{
                    width: '100%',
                    height: '56px',
                    padding: '0 56px 0 16px',
                    border: `2px solid ${errors.confirmPassword ? '#ef4444' : '#d1d5db'}`,
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: '#fff',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.email && (
                  <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', margin: '4px 0 0 0' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* State */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  State <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && (
                  <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', margin: '4px 0 0 0' }}>
                    {errors.state}
                  </p>
                )}
              </div>
              {errors.confirmPassword && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '4px 0 0 0' }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                width: '100%',
                maxWidth: '360px',
                height: '56px',
                backgroundColor: isSubmitting ? '#9ca3af' : '#25eb5a',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '12px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
                marginBottom: '24px'
              }}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* Already have an account */}
            <div style={{ textAlign: 'center', maxWidth: '360px' }}>
              <p style={{ 
                fontSize: '16px', 
                color: '#6b7280',
                margin: '0'
              }}>
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  style={{ 
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontWeight: '600',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '16px'
                  }}
                  onMouseOver={e => e.target.style.textDecoration = 'underline'}
                  onMouseOut={e => e.target.style.textDecoration = 'none'}
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div style={{ 
        width: '50%', 
        backgroundColor: '#4ade80',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          width: '80%',
          height: '80%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }}>
          🌾 Happy Farmer Image
          <br />
          <span style={{ fontSize: '16px', fontWeight: 'normal' }}>
            (Replace with your image)
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;