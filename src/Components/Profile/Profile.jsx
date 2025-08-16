import React, { useState } from 'react';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    email: 'john.doe@example.com', // This would typically come from user session/auth
    district: 'East Midnapore',
    state: 'West Bengal'
  });

  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({ ...profileData });
  const [errors, setErrors] = useState({});

  // Indian states for dropdown
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  // Sample districts for West Bengal (you can expand this for other states)
  const districtsByState = {
    'West Bengal': [
      'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur',
      'Darjeeling', 'East Bardhaman', 'East Midnapore', 'Hooghly', 'Howrah',
      'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad',
      'Nadia', 'North 24 Parganas', 'North Dinajpur', 'Paschim Bardhaman',
      'Paschim Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'
    ],
    'Maharashtra': [
      'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara',
      'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli',
      'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban',
      'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar',
      'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
      'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
    ],
    // Add more states and their districts as needed
  };

  const validateForm = () => {
    const newErrors = {};

    if (!tempData.district.trim()) {
      newErrors.district = 'District is required';
    }

    if (!tempData.state.trim()) {
      newErrors.state = 'State is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));

    // Reset district if state changes
    if (name === 'state') {
      setTempData(prev => ({
        ...prev,
        district: ''
      }));
    }
    
    // Clear error when user makes changes
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setTempData({ ...profileData });
    setErrors({});
  };

  const handleSave = () => {
    if (validateForm()) {
      setProfileData({ ...tempData });
      setEditMode(false);
      alert('Profile updated successfully!');
    }
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setEditMode(false);
    setErrors({});
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfccb 50%, #fefce8 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '10px',
      overflow: 'hidden',
      position: 'fixed',
      width: '100%',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 0'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          border: '1px solid rgba(34, 197, 94, 0.1)'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 50%, #d9f99d 100%)',
            padding: '40px 60px',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '30px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              opacity: '0.1'
            }}></div>
            
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '8px',
              lineHeight: '1.2'
            }}>
              My Profile
            </h2>
            <p style={{
              color: '#64748b',
              fontSize: '18px',
              lineHeight: '1.6',
              margin: '0'
            }}>
              Manage your account information and farming location
            </p>
          </div>

          {/* Profile Content */}
          <div style={{
            padding: '30px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
          }}>
            <div style={{
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              {/* Profile Picture Section */}
              <div style={{
                textAlign: 'center',
                marginBottom: '40px'
              }}>
              </div>

              {/* Email Field (Read-only) */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    backgroundColor: '#f8fafc',
                    color: '#64748b',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    cursor: 'not-allowed'
                  }}
                />
                <p style={{
                  color: '#64748b',
                  fontSize: '14px',
                  marginTop: '6px',
                  fontStyle: 'italic'
                }}>
                  Email cannot be changed
                </p>
              </div>

              {/* State Field */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  State <span style={{color: '#dc2626'}}>*</span>
                </label>
                {editMode ? (
                  <select
                    name="state"
                    value={tempData.state}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: errors.state ? '2px solid #dc2626' : '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: '#ffffff',
                      color: '#1f2937',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '2px solid #22c55e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = errors.state ? '2px solid #dc2626' : '2px solid #e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Select State</option>
                    {indianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={profileData.state}
                    disabled
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: '#f8fafc',
                      color: '#1f2937',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit'
                    }}
                  />
                )}
                {errors.state && (
                  <p style={{
                    color: '#dc2626', 
                    fontSize: '14px', 
                    marginTop: '6px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{ marginRight: '4px' }}>⚠️</span>
                    {errors.state}
                  </p>
                )}
              </div>

              {/* District Field */}
              <div style={{ marginBottom: '32px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  District <span style={{color: '#dc2626'}}>*</span>
                </label>
                {editMode ? (
                  <select
                    name="district"
                    value={tempData.district}
                    onChange={handleInputChange}
                    disabled={!tempData.state}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: errors.district ? '2px solid #dc2626' : '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: tempData.state ? '#ffffff' : '#f8fafc',
                      color: tempData.state ? '#1f2937' : '#64748b',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit',
                      cursor: tempData.state ? 'pointer' : 'not-allowed'
                    }}
                    onFocus={(e) => {
                      if (tempData.state) {
                        e.target.style.border = '2px solid #22c55e';
                        e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.border = errors.district ? '2px solid #dc2626' : '2px solid #e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Select District</option>
                    {tempData.state && districtsByState[tempData.state] && 
                      districtsByState[tempData.state].map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    {tempData.state && !districtsByState[tempData.state] && (
                      <option disabled>Districts not available for this state</option>
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={profileData.district}
                    disabled
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: '#f8fafc',
                      color: '#1f2937',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit'
                    }}
                  />
                )}
                {!tempData.state && editMode && (
                  <p style={{
                    color: '#64748b',
                    fontSize: '14px',
                    marginTop: '6px',
                    fontStyle: 'italic'
                  }}>
                    Please select a state first
                  </p>
                )}
                {errors.district && (
                  <p style={{
                    color: '#dc2626', 
                    fontSize: '14px', 
                    marginTop: '6px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{ marginRight: '4px' }}>⚠️</span>
                    {errors.district}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: editMode ? 'space-between' : 'center'
              }}>
                {editMode ? (
                  <>
                    <button
                      onClick={handleCancel}
                      style={{
                        flex: '1',
                        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                        color: '#64748b',
                        padding: '16px 24px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)';
                        e.target.style.borderColor = '#cbd5e1';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
                        e.target.style.borderColor = '#e2e8f0';
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      style={{
                        flex: '1',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        color: '#ffffff',
                        padding: '16px 24px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 8px 20px -5px rgba(34, 197, 94, 0.3)',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 12px 25px -5px rgba(34, 197, 94, 0.4)';
                        e.target.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 20px -5px rgba(34, 197, 94, 0.3)';
                        e.target.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                      }}
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    style={{
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      color: '#ffffff',
                      padding: '16px 32px',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 8px 20px -5px rgba(34, 197, 94, 0.3)',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 12px 25px -5px rgba(34, 197, 94, 0.4)';
                      e.target.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 20px -5px rgba(34, 197, 94, 0.3)';
                      e.target.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                    }}
                  >
                    <span>✏️</span>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;