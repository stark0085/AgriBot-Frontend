import React, { useState } from 'react';
import treeWithRoots from '../../assets/Tree-with-roots.png';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Registration successful!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfccb 50%, #fefce8 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 0'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          display: 'flex',
          minHeight: '700px',
          border: '1px solid rgba(34, 197, 94, 0.1)'
        }}>
          {/* Left Side - Form */}
          <div style={{
            width: '50%',
            padding: '60px 80px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
          }}>
            <div style={{
              maxWidth: '420px',
              margin: '0 auto'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '48px'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#22c55e',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    boxShadow: '0 8px 16px -4px rgba(34, 197, 94, 0.3)'
                  }}>
                    <span style={{ fontSize: '24px', color: 'white' }}>🌱</span>
                  </div>
                  <h1 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#22c55e',
                    margin: '0'
                  }}>
                    AgriBot
                  </h1>
                </div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  Join the Future of Farming
                </h2>
                <p style={{
                  color: '#64748b',
                  fontSize: '18px',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  Create your account and start your smart farming journey
                </p>
              </div>

              <div onSubmit={handleSubmit}>
                {/* Full Name */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Full Name <span style={{color: '#dc2626'}}>*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: errors.fullName ? '2px solid #dc2626' : '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: '#ffffff',
                      color: '#1f2937',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '2px solid #22c55e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = errors.fullName ? '2px solid #dc2626' : '2px solid #e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  {errors.fullName && (
                    <p style={{
                      color: '#dc2626', 
                      fontSize: '14px', 
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ marginRight: '4px' }}>⚠️</span>
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Email Address <span style={{color: '#dc2626'}}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: errors.email ? '2px solid #dc2626' : '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: '#ffffff',
                      color: '#1f2937',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '2px solid #22c55e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = errors.email ? '2px solid #dc2626' : '2px solid #e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  {errors.email && (
                    <p style={{
                      color: '#dc2626', 
                      fontSize: '14px', 
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ marginRight: '4px' }}>⚠️</span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Password <span style={{color: '#dc2626'}}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password (min 6 characters)"
                      style={{
                        width: '100%',
                        padding: '16px 60px 16px 20px',
                        border: errors.password ? '2px solid #dc2626' : '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '16px',
                        backgroundColor: '#ffffff',
                        color: '#1f2937',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.2s ease',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '2px solid #22c55e';
                        e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = errors.password ? '2px solid #dc2626' : '2px solid #e2e8f0';
                        e.target.style.boxShadow = 'none';
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
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: '#64748b',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.color = '#22c55e'}
                      onMouseOut={(e) => e.target.style.color = '#64748b'}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {errors.password && (
                    <p style={{
                      color: '#dc2626', 
                      fontSize: '14px', 
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ marginRight: '4px' }}>⚠️</span>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Confirm Password <span style={{color: '#dc2626'}}>*</span>
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
                        padding: '16px 60px 16px 20px',
                        border: errors.confirmPassword ? '2px solid #dc2626' : '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '16px',
                        backgroundColor: '#ffffff',
                        color: '#1f2937',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.2s ease',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '2px solid #22c55e';
                        e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = errors.confirmPassword ? '2px solid #dc2626' : '2px solid #e2e8f0';
                        e.target.style.boxShadow = 'none';
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
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: '#64748b',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.color = '#22c55e'}
                      onMouseOut={(e) => e.target.style.color = '#64748b'}
                    >
                      {showConfirmPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p style={{
                      color: '#dc2626', 
                      fontSize: '14px', 
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ marginRight: '4px' }}>⚠️</span>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    color: '#ffffff',
                    padding: '18px 24px',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '17px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.3)',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    letterSpacing: '0.025em'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 35px -5px rgba(34, 197, 94, 0.4)';
                    e.target.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 25px -5px rgba(34, 197, 94, 0.3)';
                    e.target.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                  }}
                >
                  Create Your Account
                </button>

                {/* Login Link */}
                <div style={{
                  textAlign: 'center',
                  paddingTop: '24px'
                }}>
                  <span style={{ color: '#64748b', fontSize: '16px' }}>Already have an account? </span>
                  <a href="#" style={{
                    color: '#22c55e',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#16a34a'}
                  onMouseOut={(e) => e.target.style.color = '#22c55e'}
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div style={{
            width: '50%',
            background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 50%, #d9f99d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 80px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background decorative elements */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              opacity: '0.1'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #eab308, #ca8a04)',
              opacity: '0.1'
            }}></div>

            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              {/* Tree with Roots Image */}
              <div style={{
                marginBottom: '40px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <img 
                  src={treeWithRoots}
                  alt="Tree with roots symbolizing growth and stability"
                  style={{
                    width: '280px',
                    height: '320px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))'
                  }}
                />
              </div>

              <h3 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '20px',
                lineHeight: '1.2'
              }}>
                Rooted in Innovation
              </h3>
              
              <p style={{
                color: '#475569',
                fontSize: '18px',
                lineHeight: '1.7',
                maxWidth: '350px',
                margin: '0 auto 40px',
                fontWeight: '400'
              }}>
                Join thousands of farmers who are growing stronger roots in sustainable agriculture through AI-powered insights and smart farming solutions.
              </p>
              
              {/* Feature highlights */}
              <div style={{ textAlign: 'left', maxWidth: '320px', margin: '0 auto' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <span style={{ 
                    fontSize: '24px', 
                    marginRight: '16px',
                    width: '32px',
                    textAlign: 'center'
                  }}>🌱</span>
                  <span style={{ 
                    color: '#1e293b', 
                    fontWeight: '600',
                    fontSize: '16px'
                  }}>Smart Crop Management</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <span style={{ 
                    fontSize: '24px', 
                    marginRight: '16px',
                    width: '32px',
                    textAlign: 'center'
                  }}>🤖</span>
                  <span style={{ 
                    color: '#1e293b', 
                    fontWeight: '600',
                    fontSize: '16px'
                  }}>AI-Powered Assistance</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <span style={{ 
                    fontSize: '24px', 
                    marginRight: '16px',
                    width: '32px',
                    textAlign: 'center'
                  }}>📊</span>
                  <span style={{ 
                    color: '#1e293b', 
                    fontWeight: '600',
                    fontSize: '16px'
                  }}>Market Insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;