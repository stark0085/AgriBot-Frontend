import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import farmer from '../../Assets/HappyFarmer.png';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);

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
            Login
          </h1>
          
          <div>
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

            {/* Password */}
            <div style={{ marginBottom: '48px' }}>
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
                  placeholder="Enter your password"
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
                transition: 'background-color 0.2s',
                marginBottom: '24px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#25eb5aff'}
            >
              Login
            </button>

            {/* Don't have an account */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                fontSize: '16px', 
                color: '#6b7280',
                margin: '0'
              }}>
                Don't have an account?{' '}
                <a 
                  href="/signup" 
                  style={{ 
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                >
                  Sign Up
                </a>
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
        justifyContent: 'center'
      }}>
       <img
  src={farmer}
  alt="Happy Farmer"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
  }}
/>
      </div>
    </div>
  );
};

export default LoginForm;