import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import happyfarmer from '../../Assets/farmer_family.png';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    state: '',
    district: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Left side - Form */}
      <div style={{ 
        width: '50%', 
        padding: '60px 80px', 
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '60px',
            margin: '0 0 60px 0'
          }}>
            Sign Up
          </h1>
          
          <div>
            {/* Full Name */}
            <div style={{ marginBottom: '32px' }}>
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
                  width: '90%',
                  height: '56px',
                  padding: '0 16px',
                  border: '2px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: '#fff'
                }}
              />
            </div>

            {/* Email Address */}
            <div style={{ marginBottom: '32px' }}>
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
                  width: '90%',
                  height: '56px',
                  padding: '0 16px',
                  border: '2px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: '#fff'
                }}
              />
            </div>

            {/* State */}
            <div style={{ marginBottom: '32px' }}>
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
                  width: '90%',
                  height: '56px',
                  padding: '0 16px',
                  border: '2px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: '#fff'
                }}
              />
            </div>

            {/* District */}
            <div style={{ marginBottom: '32px' }}>
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
                  width: '90%',
                  height: '56px',
                  padding: '0 16px',
                  border: '2px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: '#fff'
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '12px' 
              }}>
                Password <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  style={{
                    width: '80%',
                    height: '56px',
                    padding: '0 56px 0 16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: '#fff'
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
                    padding: '4px'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  style={{
                    width: '80%',
                    height: '56px',
                    padding: '0 56px 0 16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: '#fff'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: '#9daf9cff',
                    padding: '4px'
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                height: '56px',
                backgroundColor: '#25eb5aff',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div style={{ 
        width: '50%', 
        backgroundColor: '#4ade80',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
       <img
  src={happyfarmer}
  alt="Happy Farmer"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover', // or 'contain' if you want the whole image visible
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
  }}
/>
      </div>
    </div>
  );
};

export default SignUpForm;