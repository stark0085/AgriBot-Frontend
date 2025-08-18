// Components/LoginPage/login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { ProfileContext } from '../Contexts/ProfileProvider';
import toast from 'react-hot-toast';
import yourImage from '../../assets/farmer_hand.png'; // Adjust the path to your image
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation(); // <-- ADD THIS LINE
  const { login } = useContext(ProfileContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      // Use the context login function instead of direct fetch
      const result = await login({
        email: formData.email,
        password: formData.password
      });

      if (result.code === 0) {
        // Success - context already handled localStorage and state
        toast.success('Login successful! Welcome back.');

        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        // Error
        const errorMessage = result.message || 'Login failed. Please try again.';
        toast.error(errorMessage);
        setErrors({ submit: errorMessage });
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'An unexpected error occurred. Please try again.';
      toast.error(errorMessage);
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Left side - Form */}
      <div style={{
        width: '30%',
        padding: '80px 200px',
        background: 'linear-gradient(to top right, #ffffff 0%, #ffffff 25%, #f6fbff 50%, #e3f5ff 75%, #c9eaff 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

      }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#000',

          }}>
            {t('welcomeBack')}
          </h1>
          <h1 style={{
            fontSize: '18px',
            fontWeight: 'normal',
            color: '#000000ff',
            marginBottom: '60px',

          }}>
            {t('enterDetails')}
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
            {/* Email Address */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                {t('emailLabel')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  border: errors.email ? '2px solid #dc2626' : '2px solid #e5e7eb',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: '#f9fafb',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.email ? '#dc2626' : '#e5e7eb';
                  e.target.style.backgroundColor = '#f9fafb';
                }}
                placeholder={t('emailPlaceholder')}
              />
              {errors.email && (
                <p style={{
                  color: '#dc2626',
                  fontSize: '14px',
                  marginTop: '6px'
                }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                {t('passwordLabel')}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  style={{
                    width: '100%',
                    padding: '16px',
                    paddingRight: '50px',
                    fontSize: '16px',
                    border: errors.password ? '2px solid #dc2626' : '2px solid #e5e7eb',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: '#f9fafb',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.backgroundColor = 'white';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.password ? '#dc2626' : '#e5e7eb';
                    e.target.style.backgroundColor = '#f9fafb';
                  }}
                  placeholder={t('passwordPlaceholder')}
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
                    color: '#6b7280',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p style={{
                  color: '#dc2626',
                  fontSize: '14px',
                  marginTop: '6px'
                }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '18px',
                fontWeight: '600',
                color: 'white',
                backgroundColor: isSubmitting ? '#9ca3af' : '#22c55e',
                border: 'none',
                borderRadius: '12px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
                marginBottom: '32px'
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) e.target.style.backgroundColor = '#16a34a';
              }}
              onMouseOut={(e) => {
                if (!isSubmitting) e.target.style.backgroundColor = '#22c55e';
              }}
            >
              {isSubmitting ? t('signingInButton') : t('signInButton')}
            </button>

            {/* Sign Up Link */}
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#6b7280', fontSize: '16px' }}>
               {t('noAccount')}{' '}
                <button
                  onClick={() => navigate('/signup')}
                  style={{
                    color: '#3b82f6',
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
                  {t('signUpLink')}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image placeholder */}
      <div style={{
        width: '50%',
        backgroundColor: '#f0fdf4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        backgroundImage: `url(${yourImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // margin: '0 auto 30px auto',
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          {/* Farmer illustration placeholder */}
          {/* <div style={{
            width: '300px',
            height: '300px',
            backgroundColor: '#dcfce7',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px auto',
            fontSize: '48px',
            width: '300px',
            height: '300px'
          }}>
          </div> */}
          {/* <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#16a34a',
            marginBottom: '16px'
          }}>
            Welcome Back!
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#4b5563',
            lineHeight: '1.6'
          }}>
            Sign in to access your farming dashboard and manage your agricultural operations with ease.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;