import React, { useState, useEffect } from 'react';
import { Send, Menu, X, Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, ExternalLink } from 'lucide-react';
import placards_bcg from '../../assets/placards_bcg.jpeg';
import rupee from '../../assets/rupee.png';
import weather from '../../assets/weather.png';
import cropsbcg from '../../assets/cropsbcg.png';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSchemeIndex, setCurrentSchemeIndex] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHourlyModal, setShowHourlyModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showMoreExamples, setShowMoreExamples] = useState(false);

  // Agricultural schemes data
  const agriculturalSchemes = [
    {
      scheme_name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      link: "https://pmkisan.gov.in/"
    },
    {
      scheme_name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      link: "https://pmfby.gov.in/"
    },
    {
      scheme_name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
      link: "https://pmksy.gov.in/"
    }
  ];

  // Handle scheme rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSchemeIndex((prev) => (prev + 1) % agriculturalSchemes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [agriculturalSchemes.length]);

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const Weather_Api_Key = '86Ils1zBsLLsuPH8BdJ1gUa9CEwno31F';
        const user_location = "Kharagpur";

        const forecastResponse = await fetch(
          `https://api.tomorrow.io/v4/weather/forecast?location=${user_location}&apikey=${Weather_Api_Key}`,
          {
            method: 'GET',
            headers: {
              'accept': 'application/json'
            }
          }
        );

        if (!forecastResponse.ok) throw new Error('Failed to fetch forecast data');
        const forecastData = await forecastResponse.json();

        const timelineResponse = await fetch(
          `https://api.tomorrow.io/v4/timelines?apikey=${Weather_Api_Key}`,
          {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              location: user_location,
              fields: ['temperature', 'humidity', 'windSpeed', 'weatherCode', 'precipitationProbability'],
              units: 'metric',
              timesteps: ['1h'],
              startTime: 'now',
              endTime: 'nowPlus24h'
            })
          }
        );

        if (!timelineResponse.ok) throw new Error('Failed to fetch timeline data');
        const timelineData = await timelineResponse.json();

        setWeatherData(forecastData);
        setHourlyData(timelineData);
      } catch (err) {
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Redirecting with message:', message);
      setMessage('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleHourlyModal = () => {
    setShowHourlyModal(!showHourlyModal);
  };

  const handleSchemeClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleKrishiRakshakClick = () => {
    window.open('https://pmfby.gov.in/krph/', '_blank', 'noopener,noreferrer');
  };

  const handleQuestionClick = (question) => {
    // For now, just set the message in the input field
    // You can modify this to redirect to /chat page with the question as a parameter
    setMessage(question);
    // Alternatively, you could redirect:
    // const encodedQuestion = encodeURIComponent(question);
    // window.location.href = `/chat?question=${encodedQuestion}`;
  };

  const getWeatherIcon = (code) => {
    if (code <= 1100) return <Sun className="text-yellow-500" size={24} />;
    if (code <= 2100) return <Cloud className="text-gray-500" size={24} />;
    return <CloudRain className="text-blue-500" size={24} />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    // Banner section
    bannerSection: {
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
      zIndex: 40,
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
      display: 'flex',
      alignItems: 'center'
    },
    bannerContent: {
      position: 'absolute',
      whiteSpace: 'nowrap',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      animation: 'slideLeftToRight 45s linear infinite',
      paddingLeft: '0'
    },
    bannerText: {
      color: 'white',
      fontSize: '16px',
      fontWeight: '600',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      minWidth: 'max-content'
    },
    // Hamburger menu
    hamburgerButton: {
      position: 'fixed',
      top: '16px',
      left: '16px',
      zIndex: 50,
      padding: '12px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    menuOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 40
    },
    sideMenu: {
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100%',
      width: '288px',
      backgroundColor: 'white',
      boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
      zIndex: 50,
      transform: 'translateX(0)',
      transition: 'transform 0.3s'
    },
    menuContent: {
      padding: '24px',
      paddingTop: '80px'
    },
    menuHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px'
    },
    menuTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937'
    },
    menuButton: {
      padding: '8px',
      borderRadius: '8px',
      cursor: 'pointer',
      border: 'none',
      background: 'transparent'
    },
    menuItem: {
      padding: '12px',
      borderRadius: '8px',
      cursor: 'pointer',
      color: '#374151',
      transition: 'background-color 0.2s',
      marginBottom: '8px'
    },
    mainContent: {
      flex: 1,
      padding: '32px',
      marginTop: '20px',
      paddingBottom: '120px',
      backgroundImage: `url(${placards_bcg})`,
      backgroundRepeat: 'no-repeat',      // Prevents repeating in both directions
      backgroundPosition: 'center',       // Centers the image
      backgroundSize: 'cover',          // Ensures the image fits inside without stretching
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '24px',
      textAlign: 'center'
    },
    sectionTitle: {
      // fontSize: '28px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '24px',
      textAlign: 'center'
    },
    // Cards Section Styles
    cardsSection: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      maxWidth: '1500px',
      margin: '0 auto',
      marginBottom: '48px',
      flexWrap: window.innerWidth < 1200 ? 'wrap' : 'nowrap', // Responsive flexWrap
    },
    card: {
      width: '285px',
      height: '280px',
      borderRadius: '20px',
      paddingTop: '24px',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    cardIcon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    iconBackground: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px'
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      paddingBottom: '20px'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '12px',
      lineHeight: '1.4'
    },
    cardDescription: {
      fontSize: '17px',
      opacity: '0.9',
      marginBottom: '20px',
      lineHeight: '1.4'
    },
    cardButton: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      border: '1px solid rgba(255,255,255,0.3)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    // Sample Questions Section Styles
    sampleQuestionsSection: {
      marginBottom: '48px'
    },
    basicQuestionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    questionCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: '16px',
      color: '#374151',
      textAlign: 'center',
      fontWeight: '500',
      lineHeight: '1.4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80px'
    },
    moreExamplesButton: {
      backgroundColor: '#22c55e',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      margin: '0 auto'
    },
    categoriesContainer: {
      marginTop: '32px'
    },
    categorySection: {
      marginBottom: '40px'
    },
    categoryTitle: {
      fontSize: '22px',
      fontWeight: '600',
      color: '#22c55e',
      marginBottom: '20px',
      textAlign: 'center'
    },
    categoryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px'
    },
    // Input container
    inputContainer: {
      position: 'fixed',
      bottom: '0vw',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      padding: '24px',
      zIndex: 40,
      marginTop: '20px',
      boxShadow: '0 -10px 25px rgba(0,0,0,0.1)'
    },
    inputWrapper: {
      maxWidth: '1024px',
      margin: '0 auto',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-end'
    },
    inputField: {
      flex: 1,
      padding: '16px 24px',
      fontSize: '18px',
      border: '2px solid #bfdbfe',
      borderRadius: '16px',
      outline: 'none',
      backgroundColor: '#f0f9ff',
      transition: 'all 0.2s',
      height: '56px',
      boxSizing: 'border-box'
    },
    sendButton: {
      padding: '16px 24px',
      backgroundColor: '#3b82f6',
      color: 'white',
      borderRadius: '16px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
      height: '56px',
      minWidth: '56px'
    },
    sendButtonDisabled: {
      backgroundColor: '#d1d5db',
      cursor: 'not-allowed',
      boxShadow: 'none'
    },
    // Modal styles
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 60
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '32px',
      maxWidth: '900px',
      maxHeight: '80vh',
      width: '90%',
      overflowY: 'auto',
      boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1f2937'
    },
    closeButton: {
      padding: '8px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: '#f3f4f6',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    // Calculator Modal Styles
    calculatorContent: {
      padding: '20px 0'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    inputLabel: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    calculateButton: {
      width: '100%',
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      marginBottom: '20px',
      transition: 'all 0.2s'
    },
    resultBox: {
      backgroundColor: '#f3f4f6',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid #e5e7eb'
    },
    // Weather modal styles
    weatherGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    weatherCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      border: '1px solid #dbeafe',
      transition: 'all 0.3s'
    },
    hourlyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '16px',
      maxHeight: '400px',
      overflowY: 'auto'
    },
    hourlyCard: {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'center',
      border: '1px solid #e5e7eb'
    },
    viewForecastButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      display: 'block',
      margin: '0 auto'
    }
  };

  return (
    <div style={styles.container}>
      {/* Banner Section with Continuous Rotating Text */}
      <div style={styles.bannerSection}>
        <div style={styles.bannerContent}>
          {[...agriculturalSchemes, ...agriculturalSchemes, ...agriculturalSchemes].map((scheme, index) => (
            <div
              key={index}
              style={{
                ...styles.bannerText,
                marginRight: '100px'
              }}
              onClick={() => handleSchemeClick(scheme.link)}
              onMouseEnter={(e) => {
                e.target.style.color = '#dcfce7';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'white';
              }}
            >
              <span>{scheme.scheme_name}</span>
              <span style={{ fontSize: '12px', opacity: '0.8' }}>- Click to visit official website</span>
              <ExternalLink size={16} />
            </div>
          ))}
        </div>
      </div>

      {/* Hamburger Menu */}
      <button
        onClick={toggleMenu}
        style={styles.hamburgerButton}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <Menu size={24} color="#374151" />
      </button>

      {/* Side Menu */}
      {isMenuOpen && (
        <>
          <div style={styles.menuOverlay} onClick={toggleMenu} />
          <div style={styles.sideMenu}>
            <div style={styles.menuContent}>
              <div style={styles.menuHeader}>
                <h2 style={styles.menuTitle}>Menu</h2>
                <button
                  onClick={toggleMenu}
                  style={styles.menuButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <X size={20} color="#6b7280" />
                </button>
              </div>
              <nav>
                {['💬 Chat History', '⚙️ Settings', '👤 Profile', '❓ Help & Support'].map((item, index) => (
                  <div
                    key={index}
                    style={styles.menuItem}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f9ff'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    {item}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.contentWrapper}>
          <h1 style={styles.title}>Welcome to AgriBot</h1>
          
          {/* Cards Section - Only 3 cards */}
          <div style={styles.cardsSection}>
            {/* Calculator Card */}
            <div
              style={{...styles.card, background: `url(${rupee})`, backgroundPosition: "center left", backgroundSize: "cover", color: "black"}}
              onClick={() => setShowCalculatorModal(true)}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-8px) scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
            >
              <div style={styles.cardIcon}>
                <div style={styles.iconBackground}>
                  📊
                </div>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>Calculator</h3>
                <p style={styles.cardDescription}>Calculate your insurance premium</p>
                <button style={{...styles.cardButton, color: "black"}}>Calculate</button>
              </div>
            </div>

            {/* Krishi Rakshak Card */}
            <div
              style={{...styles.card,  background: `url(${weather})`, backgroundPosition: "center top", backgroundSize: "cover", color: "black"}}
              onClick={handleKrishiRakshakClick}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-8px) scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
            >
              <div style={styles.cardIcon}>
                <div style={styles.iconBackground}>
                  🌾
                </div>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>Krishi Rakshak</h3>
                <p style={styles.cardDescription}>Report grievances and crop loss</p>
                <button style={{...styles.cardButton, color: "black"}}>Visit Portal</button>
              </div>
            </div>

            {/* Weather Forecast Card */}
            <div
              style={{...styles.card, background: `url(${cropsbcg})`, backgroundPosition: "top left", backgroundSize: "cover", color: "black"}}
              onClick={() => setShowWeatherModal(true)}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-8px) scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
            >
              <div style={styles.cardIcon}> 
                <div style={styles.iconBackground}>
                  ⛅
                </div>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>Weather Forecast</h3>
                <p style={styles.cardDescription}>Get weather updates for your area</p>
                <button style={{...styles.cardButton, color: "black"}}>View Weather</button>
              </div>
            </div>

            {/* Weather Forecast Card */}
            <div
              style={{...styles.card, background: `url(${cropsbcg})`, backgroundPosition: "top left", backgroundSize: "cover", color: "black"}}
              onClick={() => setShowWeatherModal(true)}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-8px) scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
            >
              <div style={styles.cardIcon}> 
                <div style={styles.iconBackground}>
                  ⛅
                </div>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>Weather Forecast</h3>
                <p style={styles.cardDescription}>Get weather updates for your area</p>
                <button style={{...styles.cardButton, color: "black"}}>View Weather</button>
              </div>
            </div>
          </div>

          {/* Sample Questions Section */}
          <div style={styles.sampleQuestionsSection}>
            <h1 style={styles.sectionTitle}>Few examples to ask!</h1>
            
            {/* Basic Questions */}
            <div style={styles.basicQuestionsGrid}>
              <div
                style={styles.questionCard}
                onClick={() => handleQuestionClick("How to improve soil condition?")}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
              >
                How to improve soil condition?
              </div>
              <div
                style={styles.questionCard}
                onClick={() => handleQuestionClick("What are the most effective methods for pest control on cabbage?")}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
              >
                What are the most effective methods for pest control on cabbage?
              </div>
              <div
                style={styles.questionCard}
                onClick={() => handleQuestionClick("What is the best time to plant okra in north india?")}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
              >
                What is the best time to plant okra in north india?
              </div>
              <div
                style={styles.questionCard}
                onClick={() => handleQuestionClick("What are the most effective methods for pest control on mango tree?")}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
              >
                What are the most effective methods for pest control on mango tree?
              </div>
            </div>

            {/* More Examples Button */}
            <div style={{ textAlign: 'center', margin: '24px 0' }}>
              <button
                onClick={() => setShowMoreExamples(!showMoreExamples)}
                style={styles.moreExamplesButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#16a34a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#22c55e';
                }}
              >
                {showMoreExamples ? '▼ Less Examples' : '▼ More Examples'}
              </button>
            </div>

            {/* Expanded Categories */}
            {showMoreExamples && (
              <div style={styles.categoriesContainer}>
                {/* Increased Crop Yield */}
                <div style={styles.categorySection}>
                  <h3 style={styles.categoryTitle}>Increased Crop Yield</h3>
                  <div style={styles.categoryGrid}>
                    {[
                      "I am a farmer in Goa and I grow Cashew. What is the best way to increase my crop yield?",
                      "How much water should I give my chili?",
                      "How can I prevent pests and diseases in my paddy?"
                    ].map((question, index) => (
                      <div
                        key={index}
                        style={styles.questionCard}
                        onClick={() => handleQuestionClick(question)}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-3px)';
                          e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                        }}
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improved Government Services */}
                <div style={styles.categorySection}>
                  <h3 style={styles.categoryTitle}>Improved Government Services</h3>
                  <div style={styles.categoryGrid}>
                    {[
                      "Which is the latest subsidy for Animal husbandry by Government?",
                      "Can you provide more detail about PM Kissan Samman Yojna?",
                      "What kind of benefits does Goa state provide to farmers?"
                    ].map((question, index) => (
                      <div
                        key={index}
                        style={styles.questionCard}
                        onClick={() => handleQuestionClick(question)}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-3px)';
                          e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                        }}
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improved Quality */}
                <div style={styles.categorySection}>
                  <h3 style={styles.categoryTitle}>Improved Quality</h3>
                  <div style={styles.categoryGrid}>
                    {[
                      "How can I improve the fertility of my soil?",
                      "How can I harvest my cotton at the right time?",
                      "How can I improve the quality of my turmeric?"
                    ].map((question, index) => (
                      <div
                        key={index}
                        style={styles.questionCard}
                        onClick={() => handleQuestionClick(question)}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-3px)';
                          e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                        }}
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Finance and Business */}
                <div style={styles.categorySection}>
                  <h3 style={styles.categoryTitle}>Finance and Business</h3>
                  <div style={styles.categoryGrid}>
                    {[
                      "Which is the latest subsidy for Animal husbandry by Government?",
                      "Is there any tractor loan scheme in Goa for farmers?"
                    ].map((question, index) => (
                      <div
                        key={index}
                        style={styles.questionCard}
                        onClick={() => handleQuestionClick(question)}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-3px)';
                          e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                        }}
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Calculator Modal */}
      {showCalculatorModal && (
        <div style={styles.modalOverlay} onClick={() => setShowCalculatorModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Insurance Premium Calculator</h2>
              <button
                onClick={() => setShowCalculatorModal(false)}
                style={styles.closeButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                <X size={20} color="#6b7280" />
              </button>
            </div>
            <div style={styles.calculatorContent}>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Crop Type</label>
                <select style={styles.inputField}>
                  <option>Select Crop</option>
                  <option>Rice</option>
                  <option>Wheat</option>
                  <option>Cotton</option>
                  <option>Sugarcane</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Area (in acres)</label>
                <input 
                  type="number" 
                  placeholder="Enter area in acres" 
                  style={styles.inputField}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Sum Insured (₹)</label>
                <input 
                  type="number" 
                  placeholder="Enter sum insured amount" 
                  style={styles.inputField}
                />
              </div>
              <button style={styles.calculateButton}>
                Calculate Premium
              </button>
              <div style={styles.resultBox}>
                <p style={{ margin: 0, color: '#6b7280' }}>Premium will be calculated based on your inputs</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weather Modal */}
      {showWeatherModal && (
        <div style={styles.modalOverlay} onClick={() => setShowWeatherModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>3-Day Weather Forecast</h2>
              <button
                onClick={() => setShowWeatherModal(false)}
                style={styles.closeButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                <X size={20} color="#6b7280" />
              </button>
            </div>
            <div style={styles.weatherGrid}>
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} style={styles.weatherCard}>
                    <div style={{ textAlign: 'center', color: '#9ca3af' }}>Loading...</div>
                  </div>
                ))
              ) : weatherData?.timelines?.daily?.slice(0, 3).map((day, index) => (
                <div
                  key={index}
                  style={styles.weatherCard}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                      {formatDate(day.time)}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      {getWeatherIcon(day.values.weatherCodeMax)}
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                      {Math.round(day.values.temperatureMax)}°C / {Math.round(day.values.temperatureMin)}°C
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '14px', color: '#6b7280' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Droplets size={16} />
                        {Math.round(day.values.precipitationProbabilityMax)}%
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Wind size={16} />
                        {Math.round(day.values.windSpeedMax)} km/h
                      </div>
                    </div>
                  </div>
                </div>
              )) || (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    style={styles.weatherCard}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                        {new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <Sun className="text-yellow-500" size={24} />
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                        {22 + index}°C / {15 + index}°C
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '14px', color: '#6b7280' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Droplets size={16} />
                          {20 + index * 10}%
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Wind size={16} />
                          {15 + index * 2} km/h
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* 24-Hour Forecast Button */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={() => {
                  setShowWeatherModal(false);
                  setShowHourlyModal(true);
                }}
                style={styles.viewForecastButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                View 24-Hour Detailed Forecast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 24-Hour Forecast Modal */}
      {showHourlyModal && (
        <div style={styles.modalOverlay} onClick={toggleHourlyModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>24-Hour Weather Forecast</h2>
              <button
                onClick={toggleHourlyModal}
                style={styles.closeButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                <X size={20} color="#6b7280" />
              </button>
            </div>
            <div style={styles.hourlyGrid}>
              {loading ? (
                Array.from({ length: 24 }).map((_, index) => (
                  <div key={index} style={styles.hourlyCard}>
                    <div style={{ color: '#9ca3af', fontSize: '12px' }}>Loading...</div>
                  </div>
                ))
              ) : hourlyData?.data?.timelines?.[0]?.intervals?.slice(0, 24).map((hour, index) => (
                <div key={index} style={styles.hourlyCard}>
                  <div style={{ fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>
                    {formatTime(hour.startTime)}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    {getWeatherIcon(hour.values.weatherCode)}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {Math.round(hour.values.temperature)}°C
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>
                    {Math.round(hour.values.precipitationProbability)}%
                  </div>
                </div>
              )) || (
                Array.from({ length: 24 }).map((_, index) => (
                  <div key={index} style={styles.hourlyCard}>
                    <div style={{ fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>
                      {new Date(Date.now() + index * 60 * 60 * 1000).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        hour12: true
                      })}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <Sun className="text-yellow-500" size={20} />
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                      {Math.round(20 + Math.sin(index / 4) * 5)}°C
                    </div>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>
                      {Math.max(0, 30 - index)}%
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}  

      {/* Fixed Input Box */}
      <div style={styles.inputContainer}>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message here..."
            style={styles.inputField}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#bfdbfe'}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            style={{
              ...styles.sendButton,
              ...(message.trim() ? {} : styles.sendButtonDisabled)
            }}
            onMouseEnter={(e) => {
              if (message.trim()) {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (message.trim()) {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            <Send size={24} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideLeftToRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100vw);
          }
        }
        
        * {
          box-sizing: border-box;
        }
        .text-yellow-500 {
          color: #eab308;
        }
        .text-gray-500 {
          color: #6b7280;
        }
        .text-blue-500 {
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
}