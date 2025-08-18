import React, { useState, useEffect, useContext } from 'react';

import { Send, Menu, X, Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, ExternalLink, Leaf, TestTube2, MessageCircle, User, Globe, LogOut } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import { ProfileContext } from '../Contexts/ProfileProvider'; // <-- Add this import

import placards_bcg from '../../assets/dahboardbcg.png';

import rupee from '../../assets/rupee.png';

import weather from '../../assets/weather.png';

import cropsbcg from '../../assets/cropsbcg.png';

import insights from '../../assets/insights.png';



export default function Dashboard() {

  const [message, setMessage] = useState('');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [setCurrentSchemeIndex] = useState(0);

  const [weatherData, setWeatherData] = useState(null);

  const [hourlyData, setHourlyData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showHourlyModal, setShowHourlyModal] = useState(false);

  const [showCalculatorModal, setShowCalculatorModal] = useState(false);

  const [showWeatherModal, setShowWeatherModal] = useState(false);

  const [showMoreExamples, setShowMoreExamples] = useState(false);



  // Modal states

  const [showCropInfoModal, setShowCropInfoModal] = useState(false);

  const [showIrrigationInsightModal, setShowIrrigationInsightModal] = useState(false);

  const [showFertilizerInsightModal, setShowFertilizerInsightModal] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);



  // Insurance calculator state

  const [insuranceInfo, setInsuranceInfo] = useState({

    cropName: '',

    area: '',

    location: ''

  });

  const [calculatedPremium, setCalculatedPremium] = useState(null);



  // Expanded crop info state to include soil test data

  const [cropInfo, setCropInfo] = useState({

    cropType: '',

    cropStage: '',

    soilType: '',

    farmSize: '',

    soilTest: {

      N: '',

      P: '',

      K: '',

      pH: '',

      OC: ''

    }

  });



  const navigate = useNavigate();

  const { logout } = useContext(ProfileContext);



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

  }, [agriculturalSchemes.length, setCurrentSchemeIndex]);



  // Fetch weather data

  useEffect(() => {

    const fetchWeatherData = async () => {

      try {

        setLoading(true);

        const Weather_Api_Key = '86Ils1zBsLLsuPH8BdJ1gUa9CEwno31F';

        const user_location = "Kharagpur";



        const forecastResponse = await fetch(

          `https://api.tomorrow.io/v4/weather/forecast?location=${user_location}&apikey=${Weather_Api_Key}`

        );

        if (!forecastResponse.ok) throw new Error('Failed to fetch forecast data');

        const forecastData = await forecastResponse.json();



        const timelineResponse = await fetch(

          `https://api.tomorrow.io/v4/timelines?apikey=${Weather_Api_Key}`,

          {

            method: 'POST',

            headers: { 'accept': 'application/json', 'content-type': 'application/json' },

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

      navigate('/chat', { state: { initialMessage: message.trim() } });

      setMessage('');

    }

  };



  const handleQuestionClick = (question) => {

    navigate('/chat', { state: { initialMessage: question } });

  };



  // Insurance calculator functions

  const handleCalculateInsurance = () => {

    // Simple premium calculation logic (you can enhance this)

    const baseRate = {

      'wheat': 2.5,

      'rice': 3.0,

      'cotton': 3.5,

      'sugarcane': 2.0,

      'maize': 2.8,

      'default': 2.5

    };



    const locationMultiplier = {

      'punjab': 1.0,

      'haryana': 1.1,

      'uttar pradesh': 1.2,

      'maharashtra': 1.3,

      'karnataka': 1.1,

      'default': 1.2

    };



    const crop = insuranceInfo.cropName.toLowerCase();

    const location = insuranceInfo.location.toLowerCase();

    const area = parseFloat(insuranceInfo.area);



    const rate = baseRate[crop] || baseRate.default;

    const multiplier = locationMultiplier[location] || locationMultiplier.default;



    // Assuming average sum insured of ₹50,000 per acre

    const sumInsuredPerAcre = 50000;

    const totalSumInsured = sumInsuredPerAcre * area;

    const premium = Math.round((totalSumInsured * rate * multiplier) / 100);



    setCalculatedPremium({

      premium: premium,

      sumInsured: totalSumInsured,

      rate: (rate * multiplier).toFixed(2)

    });

  };



  // Handlers for insights

  const handleIrrigationInsight = () => {

    setShowCropInfoModal(false);

    setShowIrrigationInsightModal(true);

  };



  const handleFertilizerInsight = () => {

    setShowCropInfoModal(false);

    setShowFertilizerInsightModal(true);

  };



  const handleGetIrrigationAdvice = () => {

    const message = `I am growing ${cropInfo.cropType} at ${cropInfo.cropStage} stage in ${cropInfo.soilType} soil on a ${cropInfo.farmSize} farm. Please provide comprehensive irrigation advice.`;

    setShowIrrigationInsightModal(false);

    navigate('/chat', { state: { initialMessage: message } });

  };



  const handleGetFertilizerAdvice = () => {

    let soilTestInfo = '';

    const { N, P, K, pH, OC } = cropInfo.soilTest;

    if (N || P || K || pH || OC) {

      soilTestInfo = ` My soil test report shows: Nitrogen (N) at ${N || 'N/A'} kg/ha, Phosphorus (P) at ${P || 'N/A'} kg/ha, Potassium (K) at ${K || 'N/A'} kg/ha, pH at ${pH || 'N/A'}, and Organic Carbon (OC) at ${OC || 'N/A'}%.`;

    }

    const message = `I am growing ${cropInfo.cropType} at ${cropInfo.cropStage} stage in ${cropInfo.soilType} soil on a ${cropInfo.farmSize} farm.${soilTestInfo} Please provide a detailed fertilizer recommendation, including dosage and application schedule.`;

    setShowFertilizerInsightModal(false);

    navigate('/chat', { state: { initialMessage: message } });

  };



  // Handler for soil test input changes

  const handleSoilTestChange = (e) => {

    const { name, value } = e.target;

    setCropInfo(prev => ({

      ...prev,

      soilTest: {

        ...prev.soilTest,

        [name]: value

      }

    }));

  };



  // Navigation handlers for sidebar

  const handleLanguageClick = () => {

    navigate('/');

    setIsMenuOpen(false);

  };



  const handleChatClick = () => {

    navigate('/chat');

    setIsMenuOpen(false);

  };



  const handleProfileClick = () => {

    navigate('/profile');

    setIsMenuOpen(false);

  };



  const handleLogout = () => {

    setShowLogoutModal(true);

    setIsMenuOpen(false);

  };



  const handleConfirmLogout = () => {

    logout();

    setShowLogoutModal(false);

    navigate('/login');

  };

  const handleCancelLogout = () => setShowLogoutModal(false);



  const isFormComplete = cropInfo.cropType && cropInfo.cropStage && cropInfo.soilType && cropInfo.farmSize;

  const isInsuranceFormComplete = insuranceInfo.cropName && insuranceInfo.area && insuranceInfo.location;



  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleHourlyModal = () => setShowHourlyModal(!showHourlyModal);

  const handleSchemeClick = (link) => window.open(link, '_blank', 'noopener,noreferrer');

  const handleKrishiRakshakClick = () => window.open('https://pmfby.gov.in/krph/', '_blank', 'noopener,noreferrer');



  const getWeatherIcon = (code) => {

    if (code <= 1100) return <Sun className="text-yellow-500" size={24} />;

    if (code <= 2100) return <Cloud className="text-gray-500" size={24} />;

    return <CloudRain className="text-blue-500" size={24} />;

  };



  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const formatTime = (dateString) => new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });



  const styles = {

    container: {

      minHeight: '100vh',

      background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',

      position: 'relative',

      display: 'flex',

      flexDirection: 'column',

      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

    },

    bannerSection: {

      position: 'relative',

      top: 0,

      left: 0,

      right: 0,

      height: '60px',

      background: 'linear-gradient(to right, #a7d4e9 0%, #c3d0d9 100%)',

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

      color: 'black',

      fontSize: '20px',

      fontWeight: '600',

      padding: '0 40px',

      display: 'flex',

      alignItems: 'center',

      gap: '12px',

      cursor: 'pointer',

      transition: 'all 0.3s',

      minWidth: 'max-content'

    },

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

      width: '300px',

      background: 'linear-gradient(180deg, #87CEEB 0%, #4682B4 100%)',

      boxShadow: '0 25px 50px rgba(0,0,0,0.25)',

      zIndex: 50,

      transform: 'translateX(0)',

      transition: 'transform 0.3s',

      display: 'flex',

      flexDirection: 'column'

    },

    menuHeader: {

      padding: '24px',

      borderBottom: '2px solid rgba(255,255,255,0.2)',

      display: 'flex',

      justifyContent: 'space-between',

      alignItems: 'center'

    },

    menuTitle: {

      fontSize: '24px',

      fontWeight: '700',

      color: 'white',

      textShadow: '0 2px 4px rgba(0,0,0,0.3)'

    },

    closeButton: {

      padding: '8px',

      borderRadius: '50%',

      border: 'none',

      backgroundColor: 'rgba(255,255,255,0.2)',

      cursor: 'pointer',

      color: 'white',

      transition: 'all 0.2s'

    },

    menuContent: {

      flex: 1,

      padding: '24px 0',

      display: 'flex',

      flexDirection: 'column'

    },

    menuSection: {

      marginBottom: '8px'

    },

    sectionTitle: {

      color: 'rgba(255,255,255,0.8)',

      fontSize: '14px',

      fontWeight: '600',

      padding: '0 24px',

      marginBottom: '12px',

      textTransform: 'uppercase',

      letterSpacing: '1px'

    },

    menuButton: {

      width: '100%',

      backgroundColor: 'transparent',

      color: 'white',

      padding: '16px 24px',

      border: 'none',

      cursor: 'pointer',

      fontSize: '16px',

      fontWeight: '500',

      display: 'flex',

      alignItems: 'center',

      gap: '12px',

      transition: 'all 0.2s',

      textAlign: 'left',

      borderBottom: '1px solid rgba(255,255,255,0.1)'

    },

    menuButtonHover: {

      backgroundColor: 'rgba(255,255,255,0.15)',

      color: 'white',

      paddingLeft: '32px'

    },

    logoutSection: {

      marginTop: 'auto',

      padding: '0 24px 24px 24px'

    },

    logoutButton: {

      width: '100%',

      backgroundColor: 'transparent',

      color: 'red',

      padding: '16px 24px',

      border: '2px solid red',

      borderRadius: '12px',

      cursor: 'pointer',

      fontSize: '16px',

      fontWeight: '600',

      display: 'flex',

      alignItems: 'center',

      justifyContent: 'center',

      gap: '12px',

      transition: 'all 0.2s',

      textAlign: 'center'

    },

    logoutButtonHover: {

      backgroundColor: 'red',

      color: 'white'

    },

    mainContent: {

      flex: 1,

      padding: '32px',

      borderTop: '2px solid black',

      paddingBottom: '120px',

      backgroundImage: `url(${placards_bcg})`,

      backgroundRepeat: 'no-repeat',

      backgroundPosition: 'center',

      backgroundSize: 'cover',

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

    sectionTitleMain: {

      fontWeight: '600',

      color: 'white',

      marginBottom: '24px',

      textAlign: 'center'

    },

    cardsSection: {

      display: 'flex',

      gap: '15px',

      justifyContent: 'center',

      maxWidth: '1500px',

      margin: '0 auto',

      marginBottom: '48px',

      flexWrap: window.innerWidth < 1200 ? 'wrap' : 'nowrap',

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

      backgroundColor: '#d4d4ae',

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

      color: 'white',

      fontSize: '22px',

      fontWeight: '600',

      marginBottom: '20px',

      textAlign: 'center'

    },

    categoryGrid: {

      display: 'grid',

      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',

      gap: '16px'

    },

    inputContainer: {

      position: 'fixed',

      bottom: '0vw',

      left: 0,

      right: 0,

      padding: '24px',

      zIndex: 40,

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

      color: 'black',

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

    insightButtonsContainer: {

      display: 'flex',

      justifyContent: 'center',

      gap: '20px',

      marginTop: '32px'

    },

    fertilizerInsightButton: {

      backgroundColor: '#16a34a',

      color: 'white',

      padding: '16px 32px',

      borderRadius: '12px',

      border: 'none',

      fontSize: '18px',

      fontWeight: '600',

      cursor: 'pointer',

      transition: 'all 0.2s',

      display: 'flex',

      alignItems: 'center',

      gap: '12px',

      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'

    },

    fertilizerInsightButtonDisabled: {

      backgroundColor: '#d1d5db',

      cursor: 'not-allowed',

      boxShadow: 'none',

      color: 'black'

    },

    soilTestGrid: {

      display: 'grid',

      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',

      gap: '16px'

    },

    soilTestInputGroup: {

      display: 'flex',

      flexDirection: 'column'

    },

    soilTestLabel: {

      fontSize: '14px',

      color: '#4b5563',

      marginBottom: '6px'

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

    modalCloseButton: {

      padding: '8px',

      borderRadius: '50%',

      border: 'none',

      backgroundColor: '#f3f4f6',

      cursor: 'pointer',

      transition: 'all 0.2s'

    },

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

    calculateButtonDisabled: {

      backgroundColor: '#d1d5db',

      cursor: 'not-allowed',

      color: 'black'

    },

    resultBox: {

      backgroundColor: '#f3f4f6',

      padding: '20px',

      borderRadius: '8px',

      textAlign: 'center',

      border: '1px solid #e5e7eb'

    },

    premiumResultBox: {

      backgroundColor: '#ecfdf5',

      padding: '24px',

      borderRadius: '12px',

      textAlign: 'center',

      border: '2px solid #10b981',

      marginTop: '20px'

    },

    premiumAmount: {

      fontSize: '32px',

      fontWeight: 'bold',

      color: '#059669',

      marginBottom: '8px'

    },

    premiumDetails: {

      fontSize: '14px',

      color: '#6b7280',

      marginBottom: '4px'

    },

    cropInfoContent: {

      padding: '20px 0'

    },

    cropInfoSection: {

      marginBottom: '24px',

      padding: '20px',

      backgroundColor: '#f8fafc',

      borderRadius: '12px',

      border: '1px solid #e2e8f0'

    },

    cropInfoTitle: {

      fontSize: '18px',

      fontWeight: '600',

      color: '#1f2937',

      marginBottom: '16px',

      display: 'flex',

      alignItems: 'center',

      gap: '8px'

    },

    cropInfoInput: {

      width: '100%',

      padding: '12px 16px',

      fontSize: '16px',

      border: '2px solid #e2e8f0',

      borderRadius: '8px',

      outline: 'none',

      backgroundColor: 'white',

      transition: 'border-color 0.2s',

      marginBottom: '0px'

    },

    cropInfoSelect: {

      width: '100%',

      padding: '12px 16px',

      fontSize: '16px',

      border: '2px solid #e2e8f0',

      borderRadius: '8px',

      outline: 'none',

      backgroundColor: 'white',

      transition: 'border-color 0.2s',

      marginBottom: '0px',

      cursor: 'pointer'

    },

    irrigationInsightButton: {

      backgroundColor: '#3b82f6',

      color: 'white',

      padding: '16px 32px',

      borderRadius: '12px',

      border: 'none',

      fontSize: '18px',

      fontWeight: '600',

      cursor: 'pointer',

      transition: 'all 0.2s',

      display: 'flex',

      alignItems: 'center',

      gap: '12px',

      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'

    },

    irrigationInsightButtonDisabled: {

      backgroundColor: '#d1d5db',

      cursor: 'not-allowed',

      boxShadow: 'none',

      color: 'black'

    },

    requiredText: {

      fontSize: '14px',

      color: '#ef4444',

      fontStyle: 'italic',

      textAlign: 'center',

      marginTop: '16px'

    },

    insightContent: {

      padding: '24px 0'

    },

    insightSection: {

      backgroundColor: '#f0f9ff',

      padding: '24px',

      borderRadius: '12px',

      border: '2px solid #bfdbfe',

      marginBottom: '24px'

    },

    insightTitle: {

      fontSize: '20px',

      fontWeight: '700',

      color: '#1e40af',

      marginBottom: '16px',

      display: 'flex',

      alignItems: 'center',

      gap: '8px'

    },

    insightText: {

      fontSize: '16px',

      color: '#1f2937',

      lineHeight: '1.6',

      marginBottom: '12px'

    },

    insightList: {

      paddingLeft: '20px',

      marginBottom: '16px'

    },

    insightListItem: {

      fontSize: '15px',

      color: '#374151',

      lineHeight: '1.5',

      marginBottom: '8px'

    },

    getAdviceButton: {

      backgroundColor: '#16a34a',

      color: 'white',

      padding: '16px 32px',

      borderRadius: '12px',

      border: 'none',

      fontSize: '18px',

      fontWeight: '600',

      cursor: 'pointer',

      transition: 'all 0.2s',

      display: 'flex',

      alignItems: 'center',

      gap: '12px',

      margin: '24px auto',

      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'

    },

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



      <button

        onClick={toggleMenu}

        style={styles.hamburgerButton}

        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}

        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}

      >

        <Menu size={24} color="#374151" />

      </button>



      {isMenuOpen && (

        <>

          <div style={styles.menuOverlay} onClick={toggleMenu} />

          <div style={styles.sideMenu}>

            <div style={styles.menuHeader}>

              <h2 style={styles.menuTitle}>AgriBot Menu</h2>

              <button

                onClick={toggleMenu}

                style={styles.closeButton}

                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}

                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}

              >

                <X size={20} />

              </button>

            </div>



            <div style={styles.menuContent}>

              <div style={styles.menuSection}>

                <div style={styles.sectionTitle}>Recent Chats</div>

                <button

                  style={styles.menuButton}

                  onMouseEnter={(e) => Object.assign(e.target.style, styles.menuButtonHover)}

                  onMouseLeave={(e) => {

                    e.target.style.backgroundColor = 'transparent';

                    e.target.style.color = 'white';

                    e.target.style.paddingLeft = '24px';

                  }}

                >

                  <MessageCircle size={18} />

                  <div>

                    <div style={{ fontWeight: '600', fontSize: '15px' }}>Weather Discussion</div>

                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Thanks for the weather info!</div>

                  </div>

                </button>



                <button

                  style={styles.menuButton}

                  onMouseEnter={(e) => Object.assign(e.target.style, styles.menuButtonHover)}

                  onMouseLeave={(e) => {

                    e.target.style.backgroundColor = 'transparent';

                    e.target.style.color = 'white';

                    e.target.style.paddingLeft = '24px';

                  }}

                >

                  <MessageCircle size={18} />

                  <div>

                    <div style={{ fontWeight: '600', fontSize: '15px' }}>Crop Advice</div>

                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Perfect! I'll try that method.</div>

                  </div>

                </button>



                <button

                  style={styles.menuButton}

                  onMouseEnter={(e) => Object.assign(e.target.style, styles.menuButtonHover)}

                  onMouseLeave={(e) => {

                    e.target.style.backgroundColor = 'transparent';

                    e.target.style.color = 'white';

                    e.target.style.paddingLeft = '24px';

                  }}

                >

                  <MessageCircle size={18} />

                  <div>

                    <div style={{ fontWeight: '600', fontSize: '15px' }}>Fertilizer Planning</div>

                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Great recommendations!</div>

                  </div>

                </button>

              </div>



              <div style={styles.menuSection}>

                <div style={styles.sectionTitle}>Navigation</div>

                <button

                  style={styles.menuButton}

                  onClick={handleChatClick}

                  onMouseEnter={(e) => Object.assign(e.target.style, styles.menuButtonHover)}

                  onMouseLeave={(e) => {

                    e.target.style.backgroundColor = 'transparent';

                    e.target.style.color = 'white';

                    e.target.style.paddingLeft = '24px';

                  }}

                >

                  <MessageCircle size={20} />

                  Start New Chat

                </button>



                <button

                  style={styles.menuButton}

                  onClick={handleProfileClick}

                  onMouseEnter={(e) => Object.assign(e.target.style, styles.menuButtonHover)}

                  onMouseLeave={(e) => {

                    e.target.style.backgroundColor = 'transparent';

                    e.target.style.color = 'white';

                    e.target.style.paddingLeft = '24px';

                  }}

                >

                  <User size={20} />

                  Profile Settings

                </button>



                <button

                  style={styles.menuButton}

                  onClick={handleLanguageClick}

                  onMouseEnter={(e) => Object.assign(e.target.style, styles.menuButtonHover)}

                  onMouseLeave={(e) => {

                    e.target.style.backgroundColor = 'transparent';

                    e.target.style.color = 'white';

                    e.target.style.paddingLeft = '24px';

                  }}

                >

                  <Globe size={20} />

                  Language Settings

                </button>

              </div>



              <div style={styles.logoutSection}>

                <button

                  style={styles.logoutButton}

                  onClick={handleLogout}

                  onMouseEnter={(e) => Object.assign(e.target.style, styles.logoutButtonHover)}

                  onMouseLeave={(e) => {

                    e.target.style.backgroundColor = 'transparent';

                    e.target.style.color = '#ff6b6b';

                  }}

                >

                  <LogOut size={20} />

                  Logout

                </button>

              </div>

            </div>

          </div>

        </>

      )}



      <div style={styles.mainContent}>

        <div style={styles.contentWrapper}>

          <h1 style={{ ...styles.title, marginBottom: '5vh' }}>Welcome to AgriBot</h1>



          <div style={styles.cardsSection}>

            <div

              style={{ ...styles.card, background: `url(${rupee})`, backgroundPosition: "center left", backgroundSize: "cover", color: "black" }}

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

                <p style={styles.cardDescription}>Calculate your crop price</p>

                <button style={{ ...styles.cardButton, color: "black" }}>Calculate</button>

              </div>

            </div>
            <div

              style={{ ...styles.card, background: `url(${weather})`, backgroundPosition: "center top", backgroundSize: "cover", color: "black" }}

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

                <button style={{ ...styles.cardButton, color: "black" }}>Visit Portal</button>

              </div>

            </div>



            <div

              style={{ ...styles.card, background: `url(${cropsbcg})`, backgroundPosition: "top left", backgroundSize: "cover", color: "black" }}

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

                <button style={{ ...styles.cardButton, color: "black" }}>View Weather</button>

              </div>

            </div>



            <div

              style={{ ...styles.card, background: `url(${insights})`, backgroundPosition: "top right", color: "black", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}

              onClick={() => setShowCropInfoModal(true)}

              onMouseEnter={(e) => e.target.style.transform = 'translateY(-8px) scale(1.02)'}

              onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}

            >

              <div style={styles.cardIcon}>

                <div style={styles.iconBackground}>

                  🌱

                </div>

              </div>

              <div style={styles.cardContent}>

                <h3 style={styles.cardTitle}>Crop Insights</h3>

                <p style={styles.cardDescription}>Get personalized crop advice</p>

                <button style={{ ...styles.cardButton, color: 'black' }}>Get Advice</button>

              </div>

            </div>

          </div>



          <div style={styles.sampleQuestionsSection}>

            <h1 style={{ ...styles.sectionTitleMain, color: 'black', marginBottom: '2vh' }}>Few examples to ask!</h1>



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



            <div style={{ textAlign: 'center', margin: '12px 0' }}>

              <button

                onClick={() => setShowMoreExamples(!showMoreExamples)}

                style={{ ...styles.moreExamplesButton, color: 'black' }}

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



            {showMoreExamples && (

              <div style={styles.categoriesContainer}>

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



      {/* Updated Crop Price Predictor Modal */}

      {showCalculatorModal && (

        <div style={styles.modalOverlay} onClick={() => setShowCalculatorModal(false)}>

          <div style={{ ...styles.modal, backgroundColor: '#d4d4ae' }} onClick={(e) => e.stopPropagation()}>

            <div style={styles.modalHeader}>

              <h2 style={styles.modalTitle}>Crop Price Predictor</h2>

              <button

                onClick={() => setShowCalculatorModal(false)}

                style={styles.modalCloseButton}

                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}

                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}

              >

                <X size={20} color="#6b7280" />

              </button>

            </div>

            <div style={styles.cropInfoContent}>

              <div style={styles.cropInfoSection}>

                <div style={styles.cropInfoTitle}>Crop Information *</div>

                <input

                  type="text"

                  placeholder="Crop Name (e.g., wheat, rice, cotton)"

                  style={{ ...styles.cropInfoInput, marginBottom: '16px' }}

                  value={insuranceInfo.cropName}

                  onChange={(e) => setInsuranceInfo({ ...insuranceInfo, cropName: e.target.value })}

                />

                <input

                  type="number"

                  placeholder="Area in acres (e.g., 5)"

                  style={{ ...styles.cropInfoInput, marginBottom: '16px' }}

                  value={insuranceInfo.area}

                  onChange={(e) => setInsuranceInfo({ ...insuranceInfo, area: e.target.value })}

                />

                <input

                  type="text"

                  placeholder="District (e.g., Amritsar, Pune)"

                  style={styles.cropInfoInput}

                  value={insuranceInfo.location}

                  onChange={(e) => setInsuranceInfo({ ...insuranceInfo, location: e.target.value })}

                />

              </div>



              <div style={{ textAlign: 'center' }}>

                <button

                  style={{

                    ...styles.calculateButton,

                    ...(isInsuranceFormComplete ? {} : styles.calculateButtonDisabled)

                  }}

                  onClick={handleCalculateInsurance}

                  disabled={!isInsuranceFormComplete}

                  onMouseEnter={(e) => {

                    if (isInsuranceFormComplete) {

                      e.target.style.backgroundColor = '#2563eb';

                      e.target.style.transform = 'translateY(-2px)';

                    }

                  }}

                  onMouseLeave={(e) => {

                    if (isInsuranceFormComplete) {

                      e.target.style.backgroundColor = '#3b82f6';

                      e.target.style.transform = 'translateY(0)';

                    }

                  }}

                >

                  Calculate Price

                </button>

              </div>



              {calculatedPremium ? (

                <div style={styles.premiumResultBox}>

                  <div style={styles.premiumAmount}>

                    ₹{calculatedPremium.premium.toLocaleString()}

                  </div>

                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#059669', marginBottom: '12px' }}>

                    Annual Premium Amount

                  </div>

                  <div style={styles.premiumDetails}>

                    Sum Insured: ₹{calculatedPremium.sumInsured.toLocaleString()}

                  </div>

                  <div style={styles.premiumDetails}>

                    Premium Rate: {calculatedPremium.rate}%

                  </div>

                  <div style={styles.premiumDetails}>

                    Crop: {insuranceInfo.cropName} | Area: {insuranceInfo.area} acres | Location: {insuranceInfo.location}

                  </div>

                  <div style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic', marginTop: '8px' }}>

                    *This is an estimated calculation. Actual premium may vary based on additional factors.

                  </div>

                </div>

              ) : (

                <div style={styles.resultBox}>

                  <p style={{ margin: 0, color: '#6b7280' }}>Fill all details above to calculate your crop price</p>

                </div>

              )}



              {!isInsuranceFormComplete && (

                <div style={styles.requiredText}>

                  * Please fill all required fields to calculate price

                </div>

              )}

            </div>

          </div>

        </div>

      )}



      {showCropInfoModal && (

        <div style={{ ...styles.modalOverlay }} onClick={() => setShowCropInfoModal(false)}>

          <div style={{ ...styles.modal, backgroundColor: '#d4d4ae' }} onClick={(e) => e.stopPropagation()}>

            <div style={styles.modalHeader}>

              <h2 style={styles.modalTitle}>Crop Information Form</h2>

              <button onClick={() => setShowCropInfoModal(false)} style={styles.modalCloseButton}><X size={20} /></button>

            </div>

            <div style={styles.cropInfoContent}>

              <div style={styles.cropInfoSection}>

                <div style={styles.cropInfoTitle}>1. Basic Information *</div>

                <input type="text" placeholder="Crop (e.g., wheat)" style={{ ...styles.cropInfoInput, marginBottom: '16px' }} value={cropInfo.cropType} onChange={(e) => setCropInfo({ ...cropInfo, cropType: e.target.value })} />

                <select style={{ ...styles.cropInfoSelect, marginBottom: '16px' }} value={cropInfo.cropStage} onChange={(e) => setCropInfo({ ...cropInfo, cropStage: e.target.value })}>

                  <option value="">Select crop stage *</option>

                  <option value="sowing">Sowing</option>

                  <option value="vegetative">Vegetative</option>

                  <option value="flowering">Flowering</option>

                  <option value="fruiting">Fruiting</option>

                  <option value="harvest">Harvest</option>

                </select>

                <select style={{ ...styles.cropInfoSelect, marginBottom: '16px' }} value={cropInfo.soilType} onChange={(e) => setCropInfo({ ...cropInfo, soilType: e.target.value })}>

                  <option value="">Select soil type *</option>

                  <option value="clay">Clay</option>

                  <option value="sandy">Sandy</option>

                  <option value="loamy">Loamy</option>

                  <option value="alluvial">Alluvial</option>

                </select>

                <input type="text" placeholder="Farm size (e.g., 2 acres)" style={styles.cropInfoInput} value={cropInfo.farmSize} onChange={(e) => setCropInfo({ ...cropInfo, farmSize: e.target.value })} />

              </div>



              <div style={styles.cropInfoSection}>

                <div style={styles.cropInfoTitle}>2. Soil Test Report (Optional, but recommended)</div>

                <div style={styles.soilTestGrid}>

                  <div style={styles.soilTestInputGroup}>

                    <label style={styles.soilTestLabel}>Nitrogen (N) kg/ha</label>
                    <input type="number" name="N" placeholder="e.g., 280" style={styles.cropInfoInput} value={cropInfo.soilTest.N} onChange={handleSoilTestChange} />
                  </div>
                  <div style={styles.soilTestInputGroup}>
                    <label style={styles.soilTestLabel}>Phosphorus (P) kg/ha</label>
                    <input type="number" name="P" placeholder="e.g., 25" style={styles.cropInfoInput} value={cropInfo.soilTest.P} onChange={handleSoilTestChange} />
                  </div>
                  <div style={styles.soilTestInputGroup}>
                    <label style={styles.soilTestLabel}>Potassium (K) kg/ha</label>
                    <input type="number" name="K" placeholder="e.g., 150" style={styles.cropInfoInput} value={cropInfo.soilTest.K} onChange={handleSoilTestChange} />
                  </div>
                  <div style={styles.soilTestInputGroup}>
                    <label style={styles.soilTestLabel}>Soil pH</label>
                    <input type="number" step="0.1" name="pH" placeholder="e.g., 6.8" style={styles.cropInfoInput} value={cropInfo.soilTest.pH} onChange={handleSoilTestChange} />
                  </div>
                  <div style={styles.soilTestInputGroup}>
                    <label style={styles.soilTestLabel}>Organic Carbon (OC) %</label>
                    <input type="number" step="0.1" name="OC" placeholder="e.g., 0.7" style={styles.cropInfoInput} value={cropInfo.soilTest.OC} onChange={handleSoilTestChange} />
                  </div>
                </div>
              </div>

              <div style={styles.insightButtonsContainer}>
                <button style={{ ...styles.irrigationInsightButton, ...(isFormComplete ? {} : styles.irrigationInsightButtonDisabled) }} onClick={handleIrrigationInsight} disabled={!isFormComplete}>
                  <Droplets size={20} /> Get Irrigation Insights
                </button>
                <button style={{ ...styles.fertilizerInsightButton, ...(isFormComplete ? {} : styles.fertilizerInsightButtonDisabled) }} onClick={handleFertilizerInsight} disabled={!isFormComplete}>
                  <TestTube2 size={20} /> Get Fertilizer Insights
                </button>
              </div>

              {!isFormComplete && <div style={styles.requiredText}>* Please fill all fields in Section 1 to get insights</div>}
            </div>
          </div>
        </div>
      )}

      {showIrrigationInsightModal && (
        <div style={styles.modalOverlay} onClick={() => setShowIrrigationInsightModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>🌾 Irrigation Insights</h2>
              <button onClick={() => setShowIrrigationInsightModal(false)} style={styles.modalCloseButton}><X size={20} /></button>
            </div>
            <div style={styles.insightContent}>
              <div style={styles.insightSection}>
                <div style={styles.insightTitle}>
                  🌱 Your Farm Profile
                </div>
                <div style={styles.insightText}>
                  <strong>Crop:</strong> {cropInfo.cropType} ({cropInfo.cropStage} stage)
                </div>
                <div style={styles.insightText}>
                  <strong>Soil Type:</strong> {cropInfo.soilType}
                </div>
                <div style={styles.insightText}>
                  <strong>Farm Size:</strong> {cropInfo.farmSize}
                </div>
              </div>

              <div style={styles.insightSection}>
                <div style={styles.insightTitle}>
                  💧 Recommended Irrigation Strategy
                </div>
                <div style={styles.insightText}>
                  Based on your {cropInfo.cropType} crop at {cropInfo.cropStage} stage in {cropInfo.soilType} soil:
                </div>
                <ul style={styles.insightList}>
                  <li style={styles.insightListItem}>
                    Water frequency: {cropInfo.cropStage === 'flowering' || cropInfo.cropStage === 'fruiting' ? 'Daily light irrigation' : 'Every 2-3 days'}
                  </li>
                  <li style={styles.insightListItem}>
                    Best timing: Early morning (6-8 AM) or evening (6-8 PM)
                  </li>
                  <li style={styles.insightListItem}>
                    Soil moisture: Maintain at {cropInfo.soilType === 'sandy' ? '60-70%' : '70-80%'} field capacity
                  </li>
                  <li style={styles.insightListItem}>
                    Method: {cropInfo.soilType === 'clay' ? 'Drip irrigation recommended' : 'Sprinkler or drip irrigation'}
                  </li>
                </ul>
              </div>

              <div style={styles.insightSection}>
                <div style={styles.insightTitle}>
                  🎯 Key Recommendations
                </div>
                <ul style={styles.insightList}>
                  <li style={styles.insightListItem}>
                    Monitor soil moisture using finger test or moisture meters
                  </li>
                  <li style={styles.insightListItem}>
                    Apply mulching to reduce water evaporation
                  </li>
                  <li style={styles.insightListItem}>
                    {cropInfo.cropStage === 'flowering' ? 'Critical stage - ensure consistent moisture' : 'Adjust watering based on weather conditions'}
                  </li>
                  <li style={styles.insightListItem}>
                    Consider rainwater harvesting for sustainable irrigation
                  </li>
                </ul>
              </div>

              <button
                style={styles.getAdviceButton}
                onClick={handleGetIrrigationAdvice}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#15803d';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#16a34a';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <Send size={20} />
                Get Detailed Expert Advice
              </button>
            </div>
          </div>
        </div>
      )}

      {showFertilizerInsightModal && (
        <div style={styles.modalOverlay} onClick={() => setShowFertilizerInsightModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>🧪 Fertilizer Insights</h2>
              <button onClick={() => setShowFertilizerInsightModal(false)} style={styles.modalCloseButton}><X size={20} /></button>
            </div>
            <div style={styles.insightContent}>
              <div style={styles.insightSection}>
                <div style={styles.insightTitle}>🌱 Your Farm Profile</div>
                <p style={styles.insightText}><strong>Crop:</strong> {cropInfo.cropType} ({cropInfo.cropStage} stage)</p>
                <p style={styles.insightText}><strong>Soil Type:</strong> {cropInfo.soilType}</p>
                <p style={styles.insightText}><strong>Soil Test:</strong> {cropInfo.soilTest.N ? `N: ${cropInfo.soilTest.N}, P: ${cropInfo.soilTest.P}, K: ${cropInfo.soilTest.K}` : 'Not provided'}</p>
              </div>
              <div style={styles.insightSection}>
                <div style={styles.insightTitle}>🌿 Recommended Nutrient Strategy</div>
                <p style={styles.insightText}>For {cropInfo.cropType} at the {cropInfo.cropStage} stage:</p>
                <ul style={styles.insightList}>
                  <li style={styles.insightListItem}>{cropInfo.cropStage === 'vegetative' ? 'Focus on Nitrogen (N) for healthy leaf growth.' : 'Ensure adequate Phosphorus (P) for root development and Potassium (K) for flowering/fruiting.'}</li>
                  <li style={styles.insightListItem}>{cropInfo.soilTest.OC && parseFloat(cropInfo.soilTest.OC) < 0.5 ? 'Your soil has low Organic Carbon. Consider applying farmyard manure or compost.' : 'Maintain soil health with balanced fertilizer application.'}</li>
                  <li style={styles.insightListItem}>{cropInfo.soilTest.pH && parseFloat(cropInfo.soilTest.pH) < 6.0 ? 'Your soil is acidic. Consider applying lime as per local recommendations.' : ''}</li>
                </ul>
              </div>
              <button style={styles.getAdviceButton} onClick={handleGetFertilizerAdvice}>
                <Send size={20} /> Get Detailed Fertilizer Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {showWeatherModal && (
        <div style={styles.modalOverlay} onClick={() => setShowWeatherModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>3-Day Weather Forecast</h2>
              <button
                onClick={() => setShowWeatherModal(false)}
                style={styles.modalCloseButton}
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

      {showHourlyModal && (
        <div style={styles.modalOverlay} onClick={toggleHourlyModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>24-Hour Weather Forecast</h2>
              <button
                onClick={toggleHourlyModal}
                style={styles.modalCloseButton}
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
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideLeftToRight {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        * { box-sizing: border-box; }
        .text-yellow-500 { color: #eab308; }
        .text-gray-500 { color: #6b7280; }
        .text-blue-500 { color: #3b82f6; }
      `}</style>
    </div>
  );
}