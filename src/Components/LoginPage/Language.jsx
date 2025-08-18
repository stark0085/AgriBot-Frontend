import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../Contexts/ProfileProvider';

const LanguageGridSelector = () => {
  const { selectedLanguage, updateLanguage } = useContext(ProfileContext);
  const [tempSelectedLanguage, setTempSelectedLanguage] = useState('English');
  const navigate = useNavigate();

  // Initialize with saved language from context
  useEffect(() => {
    if (selectedLanguage) {
      setTempSelectedLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

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
    setTempSelectedLanguage(lang.name);
  };

  const handleContinue = () => {
    updateLanguage(tempSelectedLanguage);
    setTimeout(() => {
      navigate('/login');
    }, 100);
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
            marginBottom: '8px'
          }}>
            Select your language
          </h1>
          
          {selectedLanguage && selectedLanguage !== tempSelectedLanguage && (
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '24px'
            }}>
              Currently saved: <span style={{ fontWeight: '500', color: '#16a34a' }}>{selectedLanguage}</span>
            </p>
          )}
          
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
                      border: tempSelectedLanguage === lang.name ? '2px solid #16a34a' : '1px solid #e5e7eb',
                      outline: 'none',
                      backgroundColor: tempSelectedLanguage === lang.name ? '#f0fdf4' : 'white',
                      color: tempSelectedLanguage === lang.name ? '#16a34a' : '#374151',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      width: 'calc(50% - 6px)',
                      boxSizing: 'border-box',
                      userSelect: 'none'
                    }}
                  >
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      marginBottom: '4px'
                    }}>
                      {lang.label}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: tempSelectedLanguage === lang.name ? '#16a34a' : '#6b7280'
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
            backgroundColor: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #bbf7d0'
          }}>
            <p style={{ color: '#16a34a', margin: 0 }}>
              <span style={{ fontWeight: '500' }}>Selected: </span>
              <span style={{ color: '#15803d', fontWeight: '600' }}>{tempSelectedLanguage}</span>
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleContinue}
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              fontWeight: '500',
              padding: '12px 32px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '16px',
              boxShadow: '0 2px 8px rgba(22, 163, 74, 0.3)'
            }}
          >
            Continue with {tempSelectedLanguage}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageGridSelector;