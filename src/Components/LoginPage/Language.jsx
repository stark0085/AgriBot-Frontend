import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../Contexts/ProfileProvider';
import { Toaster } from 'react-hot-toast';

const LanguageGridSelector = () => {
  const { selectedLanguage, updateLanguage } = useContext(ProfileContext);
  // STATE MUST USE THE TWO-LETTER CODE
  const [tempSelectedLanguage, setTempSelectedLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedLanguage) {
      setTempSelectedLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

  const languages = [
    { code: 'en', name: 'English', label: 'English' },
    { code: 'hi', name: 'Hindi', label: 'हिंदी' },
    { code: 'ta', name: 'Tamil', label: 'தமிழ்' },
    // You can add your other languages back here
  ];
  
  // Find the full name of the selected language for display purposes
  const selectedLangName = languages.find(lang => lang.code === tempSelectedLanguage)?.name || 'English';

  const handleSelect = (lang) => {
    // This now correctly stores the code ('en', 'hi', etc.)
    setTempSelectedLanguage(lang.code);
  };

  const handleContinue = () => {
    // This now correctly passes the code to the provider
    updateLanguage(tempSelectedLanguage);
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor:'#F9F9EF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <Toaster />
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            Select your language
          </h1>
          <div style={{ borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '16px' }}>
            <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => handleSelect(lang)}
                    // THIS NOW CORRECTLY COMPARES CODES FOR HIGHLIGHTING
                    style={{ padding: '16px', borderRadius: '8px', border: tempSelectedLanguage === lang.code ? '2px solid #16a34a' : '1px solid #e5e7eb', backgroundColor: tempSelectedLanguage === lang.code ? '#f0fdf4' : 'white', color: tempSelectedLanguage === lang.code ? '#16a34a' : '#374151', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', width: 'calc(50% - 6px)', boxSizing: 'border-box' }}
                  >
                    <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '4px' }}>{lang.label}</div>
                    <div style={{ fontSize: '14px', color: tempSelectedLanguage === lang.code ? '#16a34a' : '#6b7280' }}>{lang.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <p style={{ color: '#16a34a', margin: 0 }}>
              <span style={{ fontWeight: '500' }}>Selected: </span>
              <span style={{ color: '#15803d', fontWeight: '600' }}>{selectedLangName}</span>
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleContinue} style={{ backgroundColor: '#16a34a', color: 'white', fontWeight: '500', padding: '12px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontSize: '16px' }}>
            Continue with {selectedLangName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageGridSelector;