// Components/LoginPage/signup.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { ProfileContext } from '../Contexts/ProfileProvider';
import toast from 'react-hot-toast';
import HappyFarmerImage from '../../assets/HappyFarmer.png';
import districtsAndCitiesByState from '../Profile/Data';

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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get districts for the selected state
  const getDistrictsForState = (stateName) => {
    if (!stateName || !districtsAndCitiesByState[stateName]) {
      return [];
    }
    return districtsAndCitiesByState[stateName].districts || [];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If state is changed, reset district
    if (name === 'state') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        district: '' // Reset district when state changes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing/selecting
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
      const result = await signup({
        email: formData.email,
        password: formData.password,
        state: formData.state,
        district: formData.district
      });
      
      if (result.code === 0) {
        toast.success('Account created successfully! Please login to continue.');
        navigate('/login');
      } else {
        toast.error(result.message || 'Signup failed. Please try again.');
        setErrors({ submit: result.message || 'Signup failed. Please try again.' });
      }
    } catch {
      toast.error('An unexpected error occurred. Please try again.');
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Left side - Form */}
      <div style={{ 
        width: '50%', 
        padding: '20px 60px', 
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflowY: 'auto',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, rgba(74, 222, 128, 0.05) 100%)'
      }}>
        <div style={{ maxWidth: '380px', width: '100%' }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            margin: '0 0 40px 0',
            background: 'linear-gradient(135deg, #1f2937 0%, #4ade80 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Sign Up
          </h1>
          
          {errors.submit && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '10px 14px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              border: '1px solid #fecaca'
            }}>
              {errors.submit}
            </div>
          )}
          
          <div>
            {/* Full Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
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
                  height: '48px',
                  padding: '0 14px',
                  border: `2px solid ${errors.fullName ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  backgroundColor: '#fff',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: errors.fullName ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
                }}
                onFocus={(e) => {
                  if (!errors.fullName) {
                    e.target.style.borderColor = '#4ade80';
                    e.target.style.boxShadow = '0 0 0 3px rgba(74, 222, 128, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.fullName) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {errors.fullName && (
                <p style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0 0 0' }}>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
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
                  height: '48px',
                  padding: '0 14px',
                  border: `2px solid ${errors.email ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  backgroundColor: '#fff',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: errors.email ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
                }}
                onFocus={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#4ade80';
                    e.target.style.boxShadow = '0 0 0 3px rgba(74, 222, 128, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {errors.email && (
                <p style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0 0 0' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* State and District in a row */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              {/* State */}
              <div style={{ flex: 1 }}>
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
                    width: '100%',
                    height: '48px',
                    padding: '0 14px',
                    border: `2px solid ${errors.state ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    backgroundColor: '#fff',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxShadow: errors.state ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
                  }}
                  onFocus={(e) => {
                    if (!errors.state) {
                      e.target.style.borderColor = '#4ade80';
                      e.target.style.boxShadow = '0 0 0 3px rgba(74, 222, 128, 0.1)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.state) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && (
                  <p style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0 0 0' }}>
                    {errors.state}
                  </p>
                )}
              </div>

              {/* District */}
              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  District <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  disabled={!formData.state}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 14px',
                    border: `2px solid ${errors.district ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    backgroundColor: !formData.state ? '#f9fafb' : '#fff',
                    boxSizing: 'border-box',
                    cursor: !formData.state ? 'not-allowed' : 'pointer',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxShadow: errors.district ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none',
                    color: !formData.state ? '#9ca3af' : '#374151'
                  }}
                  onFocus={(e) => {
                    if (!errors.district && formData.state) {
                      e.target.style.borderColor = '#4ade80';
                      e.target.style.boxShadow = '0 0 0 3px rgba(74, 222, 128, 0.1)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.district && formData.state) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  <option value="">
                    {!formData.state ? 'Select State First' : 'Select District'}
                  </option>
                  {getDistrictsForState(formData.state).map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                {errors.district && (
                  <p style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0 0 0' }}>
                    {errors.district}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Password <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 50px 0 14px',
                    border: `2px solid ${errors.password ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    backgroundColor: '#fff',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxShadow: errors.password ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
                  }}
                  onFocus={(e) => {
                    if (!errors.password) {
                      e.target.style.borderColor = '#4ade80';
                      e.target.style.boxShadow = '0 0 0 3px rgba(74, 222, 128, 0.1)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.password) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
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
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0 0 0' }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Confirm Password <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 50px 0 14px',
                    border: `2px solid ${errors.confirmPassword ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    backgroundColor: '#fff',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxShadow: errors.confirmPassword ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
                  }}
                  onFocus={(e) => {
                    if (!errors.confirmPassword) {
                      e.target.style.borderColor = '#4ade80';
                      e.target.style.boxShadow = '0 0 0 3px rgba(74, 222, 128, 0.1)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.confirmPassword) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
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
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0 0 0' }}>
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
                height: '50px',
                background: isSubmitting ? 'linear-gradient(135deg, #9ca3af, #6b7280)' : 'linear-gradient(135deg, #22c55e, #4ade80)',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                marginBottom: '20px',
                boxShadow: isSubmitting ? 'none' : '0 4px 12px rgba(74, 222, 128, 0.3)'
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(74, 222, 128, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(74, 222, 128, 0.3)';
                }
              }}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* Already have an account */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                fontSize: '15px', 
                color: '#6b7280',
                margin: '0'
              }}>
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  style={{ 
                    color: '#4ade80',
                    textDecoration: 'none',
                    fontWeight: '600',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '15px',
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={e => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.color = '#22c55e';
                  }}
                  onMouseOut={e => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.color = '#4ade80';
                  }}
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Full Image with Smart Color Merging */}
      <div style={{ 
        width: '50%', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Farmer image filling entire right side */}
        <img
          src={HappyFarmerImage}
          alt="Happy Farmer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center'
          }}
        />
        
        {/* Smart gradient overlay to merge with left white background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 20%, transparent 40%)',
          zIndex: 1
        }} />
      </div>
    </div>
  );
};

export default SignUpForm;