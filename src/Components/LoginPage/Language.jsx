import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LanguageGridSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const navigate = useNavigate();

  const languages = [
    { code: 'mai', name: 'Maithili', label: 'मैथिली' },
    { code: 'ml', name: 'Malayalam', label: 'മലയാളം' },
    { code: 'mni', name: 'Manipuri', label: 'মৈতৈলোন্' },
    { code: 'mr', name: 'Marathi', label: 'मराठी' },
    { code: 'ne', name: 'Nepali', label: 'नेपाली' },
    { code: 'or', name: 'Odia', label: 'ଓଡ଼ିଆ' },
    { code: 'pa', name: 'Punjabi', label: 'ਪੰਜਾਬੀ' },
    { code: 'sa', name: 'Sanskrit', label: 'संस्कृत' },
    { code: 'sat', name: 'Santali', label: 'ᱥᱟᱱᱛᱟᱞᱤ' },
    { code: 'sd', name: 'Sindhi', label: 'سنڌي' },
    { code: 'hi', name: 'Hindi', label: 'हिंदी' },
    { code: 'gu', name: 'Gujarati', label: 'ગુજરાતી' },
    { code: 'ta', name: 'Tamil', label: 'தமிழ்' },
    { code: 'te', name: 'Telugu', label: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', label: 'বাংলা' },
    { code: 'kn', name: 'Kannada', label: 'ಕನ್ನಡ' },
    { code: 'as', name: 'Assamese', label: 'অসমীয়া' },
    { code: 'bo', name: 'Bodo', label: 'बड़ो' },
    { code: 'doi', name: 'Dogri', label: 'डोगरी' },
    { code: 'ks', name: 'Kashmiri', label: 'کٲشُر' },
    { code: 'gom', name: 'Konkani', label: 'कोंकणी' },
    { code: 'ur', name: 'Urdu', label: 'اردو' },
    { code: 'en', name: 'English', label: 'English' }
  ];

  const handleSelect = (lang) => {
    setSelectedLanguage(lang.name);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor:'#F9F9EF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '30px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '32px'
          }}>
            Select your language
          </h1>
          
          <div style={{
            
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            padding: '16px'
          }}>
            <div style={{
              maxHeight: '320px',
              overflowY: 'auto'
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => handleSelect(lang)}
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      border: 'none',
                      outline: 'none',
                      backgroundColor: selectedLanguage === lang.name ? '#eff6ff' : 'white',
                      color: selectedLanguage === lang.name ? '#1d4ed8' : '#374151',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      width: 'calc(50% - 6px)',
                      boxSizing: 'border-box',
                      userSelect: 'none',
                      textRendering: 'optimizeLegibility',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      fontFeatureSettings: 'normal',
                      fontVariantLigatures: 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedLanguage !== lang.name) {
                        e.target.style.backgroundColor = '#f9fafb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedLanguage !== lang.name) {
                        e.target.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      marginBottom: '4px',
                      background: 'transparent',
                      backgroundColor: 'transparent',
                      textRendering: 'optimizeLegibility',
                      WebkitFontSmoothing: 'antialiased'
                    }}>
                      {lang.label}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      background: 'transparent',
                      backgroundColor: 'transparent',
                      textRendering: 'optimizeLegibility',
                      WebkitFontSmoothing: 'antialiased'
                    }}>
                      {lang.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#eff6ff',
            borderRadius: '8px',
            border: '1px solid #bfdbfe'
          }}>
            <p style={{ color: '#1e40af' }}>
              <span style={{ fontWeight: '500' }}>Selected: </span>
              <span style={{ color: '#2563eb' }}>{selectedLanguage}</span>
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              fontWeight: '500',
              padding: '12px 32px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={e => e.target.style.backgroundColor = '#15803d'}
            onMouseLeave={e => e.target.style.backgroundColor = '#16a34a'}
            onClick={() => navigate('/login')} // Redirect to login page
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageGridSelector;