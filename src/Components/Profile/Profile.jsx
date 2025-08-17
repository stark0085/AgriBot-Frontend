import React, { useState, useContext, useEffect } from 'react';
import { Menu, User, MessageCircle, X, LayoutDashboard, UserCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../Contexts/ProfileProvider';
import districtsAndCitiesByState from './Data';

// Mock functions for demonstration
const toast = {
  success: (message) => console.log(`Success: ${message}`),
  error: (message) => console.log(`Error: ${message}`),
};

const ProfilePage = () => {
  const { user, updateProfile, loading, logout } = useContext(ProfileContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({
    district: '',
    state: ''
  });
  const [errors, setErrors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Demo chat history data
  const demoChats = [
    { id: 1, name: "Weather Discussion", lastMessage: "Thanks for the weather info!" },
    { id: 2, name: "Recipe Help", lastMessage: "Perfect! I'll try that recipe." },
    { id: 3, name: "Travel Planning", lastMessage: "Those destinations sound amazing." }
  ];

  // Initialize tempData when user data is available
  useEffect(() => {
    if (user) {
      setTempData({
        district: user.district || '',
        state: user.state || ''
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    if (!tempData.state.trim()) newErrors.state = 'State is required';
    if (!tempData.district.trim()) newErrors.district = 'District is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newTempData = { ...tempData, [name]: value };

    if (name === 'state') {
      newTempData.district = '';
    }
    
    setTempData(newTempData);

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setTempData({
      district: user?.district || '',
      state: user?.state || ''
    });
    setErrors({});
  };

  const handleSave = () => {
    if (validateForm()) {
      const result = updateProfile(tempData);
      if (result.success) {
        toast.success('Profile updated successfully!');
        setEditMode(false);
      } else {
        toast.error('Error updating profile: ' + result.error);
      }
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setTempData({
      district: user?.district || '',
      state: user?.state || ''
    });
    setErrors({});
  };

  const handleLanguageChange = () => {
    navigate('/');
  };

  // Handle navigation
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleChatClick = () => {
    navigate('/chat');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Handle chat history click
  const handleChatHistoryClick = (chat) => {
    console.log(`Opening chat: ${chat.name}`);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfccb 50%, #fefce8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #22c55e',
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#166534', fontSize: '18px' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  const availableDistricts = tempData.state && districtsAndCitiesByState[tempData.state]
    ? districtsAndCitiesByState[tempData.state].districts
    : [];

  const indianStatesAndUTs = Object.keys(districtsAndCitiesByState);

  // Shared styles
  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#F9F9EF',
    color: '#111827',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '600',
    color: '#385137ff',
    marginBottom: '8px',
    fontSize: '14px'
  };
  
  const buttonBaseStyle = {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    minWidth: '120px'
  };

  // Sidebar styles with dark green theme
  const sidebarStyle = {
    width: isSidebarOpen ? '320px' : '0px',
    background: 'linear-gradient(135deg, #1f4e3d 0%, #2d5530 50%, #166534 100%)',
    color: 'white',
    height: '100vh',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    flexShrink: 0,
    boxShadow: '2px 0 20px rgba(0, 0, 0, 0.2)'
  };

  const mainContentStyle = {
    flex: 1,
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfccb 50%, #fefce8 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '40px 20px',
    boxSizing: 'border-box',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfccb 50%, #fefce8 100%)',
    color: '#166534',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0fdf4', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        {isSidebarOpen && (
          <div style={{ padding: '25px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>Navigation</h2>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <User size={18} />
              </div>
            </div>
            
            {/* Current Page Indicator */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '30px', 
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.2) 100%)', 
              padding: '15px', 
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}>
                <UserCircle size={18} />
              </div>
              <span style={{ fontSize: '16px', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>My Profile</span>
            </div>
            
            {/* Chat History Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 15px 0', opacity: '0.9', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>Recent Chats</h3>
              
              {demoChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleChatHistoryClick(chat)}
                  style={{ 
                    width: '100%',
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '15px', 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '6px', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>{chat.name}</div>
                  <div style={{ fontSize: '12px', opacity: '0.8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                    {chat.lastMessage}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Separator Line */}
            <div style={{ 
              height: '1px', 
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)', 
              margin: '25px 0'
            }}></div>
            
            {/* Navigation Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button
                onClick={handleDashboardClick}
                style={{ 
                  width: '100%',
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '15px', 
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
              >
                <LayoutDashboard size={18} style={{ marginRight: '12px' }} />
                Dashboard
              </button>
              
              <button
                onClick={handleChatClick}
                style={{ 
                  width: '100%',
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '15px', 
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
              >
                <MessageCircle size={18} style={{ marginRight: '12px' }} />
                Chat
              </button>

              <button
                onClick={handleLogoutClick}
                style={{ 
                  width: '100%',
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '15px', 
                  background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)', 
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '10px',
                  color: '#ff6b6b',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 2px 8px rgba(220, 38, 38, 0.1)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.25)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)';
                  e.target.style.color = '#ff6b6b';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(220, 38, 38, 0.1)';
                }}
              >
                <LogOut size={18} style={{ marginRight: '12px' }} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Header with toggle */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                padding: '10px',
                background: 'linear-gradient(135deg, rgba(22, 101, 52, 0.1) 0%, rgba(22, 101, 52, 0.05) 100%)',
                border: '1px solid rgba(22, 101, 52, 0.2)',
                color: '#166534',
                borderRadius: '8px',
                marginRight: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 8px rgba(22, 101, 52, 0.1)'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(22, 101, 52, 0.2) 0%, rgba(22, 101, 52, 0.1) 100%)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(22, 101, 52, 0.1) 0%, rgba(22, 101, 52, 0.05) 100%)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            padding: '40px',
            border: '1px solid rgba(34, 197, 94, 0.1)'
          }}>
            {/* Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '40px',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '20px'
            }}>
              <h1 style={{ color: '#166534', fontSize: '36px', fontWeight: '800', margin: '0 0 8px 0' }}>My Profile</h1>
              <p style={{ color: '#4b5563', fontSize: '16px', margin: '0' }}>View and manage your personal details.</p>
            </div>
            
            {/* Form Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Email field - non-editable */}
              <div>
                <label style={labelStyle}>Email Address</label>
                <div style={{...inputStyle, backgroundColor: '#e5e7eb', color: '#4b5563', cursor: 'not-allowed'}}>
                  {user?.email || 'Loading...'}
                </div>
              </div>

              {/* Editable fields based on mode */}
              {!editMode ? (
                <>
                  <div>
                    <label style={labelStyle}>State</label>
                    <div style={inputStyle}>{user?.state || 'Not set'}</div>
                  </div>
                  <div>
                    <label style={labelStyle}>District</label>
                    <div style={inputStyle}>{user?.district || 'Not set'}</div>
                  </div>
                </>
              ) : (
                <>
                  {/* State Dropdown */}
                  <div>
                    <label htmlFor="state" style={labelStyle}>State</label>
                    <select
                      id="state"
                      name="state"
                      value={tempData.state}
                      onChange={handleInputChange}
                      style={inputStyle}
                    >
                      <option value="" disabled>Select your state</option>
                      {indianStatesAndUTs.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.state && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.state}</p>}
                  </div>

                  {/* District Dropdown */}
                  <div>
                    <label htmlFor="district" style={labelStyle}>District</label>
                    <select
                      id="district"
                      name="district"
                      value={tempData.district}
                      onChange={handleInputChange}
                      disabled={!tempData.state}
                      style={{...inputStyle, cursor: !tempData.state ? 'not-allowed' : 'pointer'}}
                    >
                      <option value="" disabled>Select your district</option>
                      {availableDistricts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                    {errors.district && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.district}</p>}
                  </div>
                </>
              )}
            </div>
            
            {/* Action Buttons */}
            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
              {editMode ? (
                <>
                  <button
                    onClick={handleCancel}
                    style={{
                      ...buttonBaseStyle,
                      backgroundColor: '#e5e7eb',
                      color: '#4b5563'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    style={{
                      ...buttonBaseStyle,
                      backgroundColor: '#22c55e',
                      color: 'white'
                    }}
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button 
                      onClick={handleLanguageChange}
                      style={{ 
                          ...buttonBaseStyle, 
                          marginRight: 'auto',
                          backgroundColor: 'transparent',
                          color: '#166534',
                          border: '1px solid #166534'
                      }}
                  >
                      Change Language
                  </button>
                  <button
                    onClick={handleEdit}
                    style={{
                      ...buttonBaseStyle,
                      backgroundColor: '#166534',
                      color: 'white'
                    }}
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '420px',
            width: '90%',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 15px 0',
              textAlign: 'center'
            }}>
              Confirm Logout
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              margin: '0 0 25px 0',
              lineHeight: '1.6',
              textAlign: 'center'
            }}>
              Are you sure you want to log out? You'll need to sign in again to access your account.
            </p>
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center'
            }}>
              <button
                onClick={handleCancelLogout}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  color: '#374151',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(220, 38, 38, 0.3)';
                }}
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Custom scrollbar styles */
        *::-webkit-scrollbar {
          width: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        *::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%);
          border-radius: 4px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.3) 100%);
        }
      `}</style>
    </div>
  );  
};

// Export the real ProfilePage
export default ProfilePage;