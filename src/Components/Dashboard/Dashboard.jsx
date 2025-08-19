import React, { useState, useEffect, useContext } from 'react';
import { Send, Menu, X, Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, ExternalLink, Leaf, TestTube2, MessageCircle, User, Globe, LogOut, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../Contexts/ProfileProvider';
import placards_bcg from '../../assets/dahboardbcg.png';
import rupee from '../../assets/rupee.png';
import weather from '../../assets/weather.png';
import cropsbcg from '../../assets/cropsbcg.png';
import insights from '../../assets/insights.png';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const { t } = useTranslation();
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
  const [showCropTimelineModal, setShowCropTimelineModal] = useState(false);

  // Insurance calculator state
  const [insuranceInfo, setInsuranceInfo] = useState({
    cropName: '',
    area: '',
  });
  const [calculatedPremium, setCalculatedPremium] = useState(null);

  // Crop Timeline state
  const [cropTimelineInfo, setCropTimelineInfo] = useState({
    cropName: '',
    soilType: ''
  });
  const [cropTimelineResult, setCropTimelineResult] = useState(null);


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
  const { logout, user } = useContext(ProfileContext);

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
        const user_location = user?.district || "Kharagpur";

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
    if (user?.district) {
      fetchWeatherData();
    }
  }, [user]);

  const handleSendMessage = () => {
    if (message.trim()) {
      navigate('/chat', { state: { initialMessage: message.trim() } });
      setMessage('');
    }
  };

  const handleQuestionClick = (question) => {
    navigate('/chat', { state: { initialMessage: question } });
  };

  // Crop Price Calculator function
  const handleCalculateInsurance = async () => {
    try {
      setCalculatedPremium({ loading: true });
      const userEmail = user?.email;
      const userDistrict = user?.district;

      if (!userEmail) {
        toast.error('User not logged in. Please log in to calculate crop price.');
        return;
      }

      const query = `Calculate the current market price for ${insuranceInfo.cropName} crop for ${insuranceInfo.area} acres in ${userDistrict} district. In your response only give what you think is the approximate selling prices and nothing else. Provide the price per quintal and total estimated value for the given area.`;

      const payload = {
        email: userEmail,
        query: query
      };

      const response = await fetch('https://agri-bot-backend-ba3f.vercel.app/messages/sendmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const priceMessage = data.reply || data.response || data.message || 'Price analysis completed successfully.';

      setCalculatedPremium({
        loading: false,
        response: priceMessage,
        cropName: insuranceInfo.cropName,
        area: insuranceInfo.area,
        district: userDistrict,
        timestamp: new Date().toLocaleString(),
        success: true
      });

      toast.success('Crop price calculated!', {
        duration: 4000,
        position: 'top-center',
        style: { background: '#10b981', color: '#fff', fontWeight: '600', borderRadius: '12px' },
        icon: '💰',
      });

    } catch (error) {
      console.error('Error calculating crop price:', error);
      setCalculatedPremium({
        loading: false,
        error: 'Failed to get crop price. Please try again later.',
        timestamp: new Date().toLocaleString(),
        success: false
      });
      toast.error('Failed to calculate crop price. Please check your connection and try again.', {
        duration: 4000,
        position: 'top-center',
        style: { background: '#ef4444', color: '#fff', fontWeight: '600', borderRadius: '12px' },
      });
    }
  };

  // Crop Timeline generator function
  const handleGenerateCropTimeline = async () => {
    try {
      setCropTimelineResult({ loading: true });
      const userEmail = user?.email;
      const userDistrict = user?.district;

      if (!userEmail) {
        toast.error('User not logged in. Please log in to generate crop timeline.');
        return;
      }

      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });

      const query = `Generate a comprehensive crop timeline and growing guide for ${cropTimelineInfo.cropName} in ${cropTimelineInfo.soilType} soil in ${userDistrict} district. Current date is ${currentDate}. Provide detailed month-wise activities, planting schedule, care instructions, harvest timing, and best practices for this crop in the given soil and location conditions.`;

      const payload = { email: userEmail, query: query };

      const response = await fetch('https://agri-bot-backend-ba3f.vercel.app/messages/sendmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const timelineMessage = data.reply || data.response || data.message || 'Crop timeline generated successfully.';

      setCropTimelineResult({
        loading: false,
        response: timelineMessage,
        cropName: cropTimelineInfo.cropName,
        soilType: cropTimelineInfo.soilType,
        district: userDistrict,
        currentDate: currentDate,
        timestamp: new Date().toLocaleString(),
        success: true
      });

      toast.success('Crop timeline generated!', {
        duration: 4000,
        position: 'top-center',
        style: { background: '#10b981', color: '#fff', fontWeight: '600', borderRadius: '12px' },
        icon: '📅',
      });

    } catch (error) {
      console.error('Error generating crop timeline:', error);
      setCropTimelineResult({
        loading: false,
        error: 'Failed to generate crop timeline. Please try again later.',
        timestamp: new Date().toLocaleString(),
        success: false
      });
      toast.error('Failed to generate crop timeline. Please check your connection and try again.', {
        duration: 4000,
        position: 'top-center',
        style: { background: '#ef4444', color: '#fff', fontWeight: '600', borderRadius: '12px' },
      });
    }
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

  // Navigation handlers
  const handleLanguageClick = () => { navigate('/'); setIsMenuOpen(false); };
  const handleChatClick = () => { navigate('/chat'); setIsMenuOpen(false); };
  const handleProfileClick = () => { navigate('/profile'); setIsMenuOpen(false); };
  const handleLogout = () => { setShowLogoutModal(true); setIsMenuOpen(false); };
  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    toast.success('Logged out successfully!', {
      duration: 2000,
      position: 'top-center',
      style: { background: '#10b981', color: '#fff', fontWeight: '600', borderRadius: '12px' },
    });
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };
  const handleCancelLogout = () => setShowLogoutModal(false);

  const isFormComplete = cropInfo.cropType && cropInfo.cropStage && cropInfo.soilType && cropInfo.farmSize;
  const isInsuranceFormComplete = insuranceInfo.cropName && insuranceInfo.area;
  const isCropTimelineFormComplete = cropTimelineInfo.cropName && cropTimelineInfo.soilType;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleHourlyModal = () => setShowHourlyModal(!showHourlyModal);
  const handleSchemeClick = (link) => window.open(link, '_blank', 'noopener,noreferrer');

  const styles = {
    container: { minHeight: '100vh', background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)', position: 'relative', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }, bannerSection: { position: 'relative', top: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to right, #a7d4e9 0%, #c3d0d9 100%)', zIndex: 40, overflow: 'hidden', boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)', display: 'flex', alignItems: 'center' }, bannerContent: { position: 'absolute', whiteSpace: 'nowrap', height: '100%', display: 'flex', alignItems: 'center', animation: 'slideLeftToRight 45s linear infinite', paddingLeft: '0' }, bannerText: { color: 'black', fontSize: '20px', fontWeight: '600', padding: '0 40px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.3s', minWidth: 'max-content' }, hamburgerButton: { position: 'fixed', top: '16px', left: '16px', zIndex: 50, padding: '12px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s' }, menuOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }, sideMenu: { position: 'fixed', left: 0, top: 0, height: '100%', width: '300px', background: 'linear-gradient(180deg, #87CEEB 0%, #4682B4 100%)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', zIndex: 50, transform: 'translateX(0)', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column' }, menuHeader: { padding: '24px', borderBottom: '2px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, menuTitle: { fontSize: '24px', fontWeight: '700', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }, closeButton: { padding: '8px', borderRadius: '50%', border: 'none', backgroundColor: 'rgba(255,255,255,0.2)', cursor: 'pointer', color: 'white', transition: 'all 0.2s' }, menuContent: { flex: 1, padding: '24px 0', display: 'flex', flexDirection: 'column' }, menuSection: { marginBottom: '8px' }, sectionTitle: { color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: '600', padding: '0 24px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }, menuButton: { width: '100%', backgroundColor: 'transparent', color: 'white', padding: '16px 24px', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }, menuButtonHover: { backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', paddingLeft: '32px' }, logoutSection: { marginTop: 'auto', padding: '0 24px 24px 24px' }, logoutButton: { width: '100%', backgroundColor: 'transparent', color: 'red', padding: '16px 24px', border: '2px solid red', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', transition: 'all 0.2s', textAlign: 'center' }, logoutButtonHover: { backgroundColor: 'red', color: 'white' }, mainContent: { flex: 1, padding: '32px', borderTop: '2px solid black', paddingBottom: '120px', backgroundImage: `url(${placards_bcg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', }, contentWrapper: { maxWidth: '1200px', margin: '0 auto' }, title: { fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px', textAlign: 'center' }, sectionTitleMain: { fontWeight: '600', color: 'white', marginBottom: '24px', textAlign: 'center' }, cardsSection: { display: 'flex', gap: '15px', justifyContent: 'center', maxWidth: '1500px', margin: '0 auto', marginBottom: '48px', flexWrap: window.innerWidth < 1200 ? 'wrap' : 'nowrap', }, card: { width: '285px', height: '280px', borderRadius: '20px', paddingTop: '24px', color: 'white', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }, cardIcon: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, iconBackground: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }, cardContent: { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingBottom: '20px' }, cardTitle: { fontSize: '20px', fontWeight: '600', marginBottom: '12px', lineHeight: '1.4' }, cardDescription: { fontSize: '17px', opacity: '0.9', marginBottom: '20px', lineHeight: '1.4' }, cardButton: { backgroundColor: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }, sampleQuestionsSection: { marginBottom: '48px' }, basicQuestionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }, questionCard: { backgroundColor: '#d4d4ae', padding: '20px', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.3s', fontSize: '16px', color: '#374151', textAlign: 'center', fontWeight: '500', lineHeight: '1.4', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80px' }, moreExamplesButton: { backgroundColor: '#22c55e', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '600', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '0 auto' }, categoriesContainer: { marginTop: '32px' }, categorySection: { marginBottom: '40px' }, categoryTitle: { color: 'white', fontSize: '22px', fontWeight: '600', marginBottom: '20px', textAlign: 'center' }, categoryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }, inputContainer: { position: 'fixed', bottom: '0vw', left: 0, right: 0, padding: '24px', zIndex: 40, }, inputWrapper: { maxWidth: '1024px', margin: '0 auto', display: 'flex', gap: '12px', alignItems: 'flex-end' }, inputField: { flex: 1, padding: '16px 24px', fontSize: '18px', border: '2px solid #bfdbfe', borderRadius: '16px', outline: 'none', backgroundColor: '#f0f9ff', transition: 'all 0.2s', height: '56px', boxSizing: 'border-box' }, sendButton: { padding: '16px 24px', backgroundColor: '#3b82f6', color: 'black', borderRadius: '16px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)', height: '56px', minWidth: '56px' }, sendButtonDisabled: { backgroundColor: '#d1d5db', cursor: 'not-allowed', boxShadow: 'none' }, modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }, modal: { backgroundColor: 'white', borderRadius: '20px', padding: '32px', maxWidth: '900px', maxHeight: '80vh', width: '90%', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }, insightButtonsContainer: { display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '32px' }, fertilizerInsightButton: { backgroundColor: '#16a34a', color: 'white', padding: '16px 32px', borderRadius: '12px', border: 'none', fontSize: '18px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)' }, fertilizerInsightButtonDisabled: { backgroundColor: '#d1d5db', cursor: 'not-allowed', boxShadow: 'none', color: 'black' }, soilTestGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }, soilTestInputGroup: { display: 'flex', flexDirection: 'column' }, soilTestLabel: { fontSize: '14px', color: '#4b5563', marginBottom: '6px' }, modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }, modalTitle: { fontSize: '24px', fontWeight: '600', color: '#1f2937' }, modalCloseButton: { padding: '8px', borderRadius: '50%', border: 'none', backgroundColor: '#f3f4f6', cursor: 'pointer', transition: 'all 0.2s' }, calculatorContent: { padding: '20px 0' }, inputGroup: { marginBottom: '20px' }, inputLabel: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }, calculateButton: { width: '100%', backgroundColor: '#3b82f6', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: '500', cursor: 'pointer', marginBottom: '20px', transition: 'all 0.2s' }, calculateButtonDisabled: { backgroundColor: '#d1d5db', cursor: 'not-allowed', color: 'black' }, resultBox: { backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #e5e7eb' }, premiumResultBox: { backgroundColor: '#ecfdf5', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '2px solid #10b981', marginTop: '20px' }, premiumAmount: { fontSize: '32px', fontWeight: 'bold', color: '#059669', marginBottom: '8px' }, premiumDetails: { fontSize: '14px', color: '#6b7280', marginBottom: '4px' }, cropInfoContent: { padding: '12px 0' }, cropInfoSection: { marginBottom: '24px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }, cropInfoTitle: { fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }, cropInfoInput: { width: '100%', padding: '12px 16px', fontSize: '16px', border: '2px solid #e2e8f0', borderRadius: '8px', outline: 'none', backgroundColor: 'white', transition: 'border-color 0.2s', marginBottom: '0px' }, cropInfoSelect: { width: '100%', padding: '12px 16px', fontSize: '16px', border: '2px solid #e2e8f0', borderRadius: '8px', outline: 'none', backgroundColor: 'white', transition: 'border-color 0.2s', marginBottom: '0px', cursor: 'pointer' }, irrigationInsightButton: { backgroundColor: '#3b82f6', color: 'white', padding: '16px 32px', borderRadius: '12px', border: 'none', fontSize: '18px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }, irrigationInsightButtonDisabled: { backgroundColor: '#d1d5db', cursor: 'not-allowed', boxShadow: 'none', color: 'black' }, requiredText: { fontSize: '14px', color: '#ef4444', fontStyle: 'italic', textAlign: 'center', marginTop: '16px' }, insightContent: { padding: '24px 0' }, insightSection: { backgroundColor: '#f0f9ff', padding: '24px', borderRadius: '12px', border: '2px solid #bfdbfe', marginBottom: '24px' }, insightTitle: { fontSize: '20px', fontWeight: '700', color: '#1e40af', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }, insightText: { fontSize: '16px', color: '#1f2937', lineHeight: '1.6', marginBottom: '12px' }, insightList: { paddingLeft: '20px', marginBottom: '16px' }, insightListItem: { fontSize: '15px', color: '#374151', lineHeight: '1.5', marginBottom: '8px' }, getAdviceButton: { backgroundColor: '#16a34a', color: 'white', padding: '16px 32px', borderRadius: '12px', border: 'none', fontSize: '18px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px', margin: '24px auto', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)' }, weatherGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }, weatherCard: { backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #dbeafe', transition: 'all 0.3s' }, hourlyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px', maxHeight: '400px', overflowY: 'auto' }, hourlyCard: { backgroundColor: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', border: '1px solid #e5e7eb' }, viewForecastButton: { backgroundColor: '#3b82f6', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '500', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', display: 'block', margin: '0 auto' }
  };


  return (
    <div style={styles.container}>
      {/* Banner, Hamburger Button, and Side Menu */}
      <div style={styles.bannerSection}>
        <div style={{ ...styles.bannerContent }}>
          {[...agriculturalSchemes, ...agriculturalSchemes, ...agriculturalSchemes].map((scheme, index) => (
            <div
              key={index}
              style={{
                ...styles.bannerText,
                marginRight: '100px'
              }}
              onClick={() => handleSchemeClick(scheme.link)}
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
              <h2 style={styles.menuTitle}>{t('menuTitle')}</h2>
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
                  {t('startNewChat')}
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
                  {t('profileSettings')}
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
                  {t('languageSettings')}
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
                  {t('logout')}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.contentWrapper}>

          <h1 style={{ ...styles.title, marginBottom: '5vh' }}>{t('welcomeMessage')}</h1>

          {/* Feature Cards */}
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
                <h3 style={styles.cardTitle}>{t('calculatorTitle')}</h3>
                <p style={styles.cardDescription}>{t('calculatorDescription')}</p>
                <button style={{ ...styles.cardButton, color: "black" }}>Calculate</button>
              </div>
            </div>

            <div
              style={{ ...styles.card, background: `url(${weather})`, backgroundPosition: "center top", backgroundSize: "cover", color: "black" }}
              onClick={() => setShowCropTimelineModal(true)}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-8px) scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
            >
              <div style={styles.cardIcon}>
                <div style={styles.iconBackground}>
                  📅
                </div>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>Crop Timeline</h3>
                <p style={{ ...styles.cardDescription, textAlign: 'center' }}>Get a detailed growing schedule for your crop</p>
                <button style={{ ...styles.cardButton, color: "black" }}>Generate Timeline</button>
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
                <h3 style={styles.cardTitle}>{t('weatherForecastTitle')}</h3>
                <p style={styles.cardDescription}>{t('weatherForecastDescription')}</p>
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
                <h3 style={styles.cardTitle}>{t('cropInsightsTitle')}</h3>
                <p style={styles.cardDescription}>{t('cropInsightsDescription')}</p>
                <button style={{ ...styles.cardButton, color: 'black' }}>Get Advice</button>
              </div>
            </div>
          </div>

          {/* Sample Questions */}
          <div style={styles.sampleQuestionsSection}>
            <h1 style={{ ...styles.sectionTitleMain, color: 'black', marginBottom: '2vh' }}>{t('askExamplesTitle')}</h1>
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
                {t('questionImproveSoil')}
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
                {t('questionPestCabbage')}
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
                {t('questionPlantOkra')}
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
                {t('questionPestMango')}
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
                {showMoreExamples ? t('lessExamples') : t('moreExamples')}
              </button>
            </div>
            {showMoreExamples && (
              <div style={styles.categoriesContainer}>
                <div style={styles.categorySection}>

                  <h3 style={styles.categoryTitle}>{t('categoryYield')}</h3>

                  <div style={styles.categoryGrid}>
                    {[

                      t('questionYieldCashew'), // <-- Call the function directly
                      t('questionWaterChili'),  // <-- Apply to all questions
                      t('questionPestPaddy')

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

                  <h3 style={styles.categoryTitle}>{t('welcomeMessage')}</h3>

                  <div style={styles.categoryGrid}>
                    {[

                      t('questionSubsidyAnimal'),
                      t('questionPMKissan'),
                      t('questionGoaBenefits')
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

                  <h3 style={styles.categoryTitle}>{t('categoryServices')}</h3>

                  <div style={styles.categoryGrid}>

                    {[

                      t('questionImproveFertility'),
                      t('questionHarvestCotton'),
                      t('questionImproveTurmeric')

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

                  <h3 style={styles.categoryTitle}>{t('categoryFinance')}</h3>

                  <div style={styles.categoryGrid}>
                    {[

                      t('questionSubsidyAnimal'),
                      t('questionTractorLoan')

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

      {/* --- ALL MODALS --- */}

      {/* Crop Timeline Modal */}
      {showCropTimelineModal && (
        <div style={styles.modalOverlay} onClick={() => setShowCropTimelineModal(false)}>
          <div
            style={{ ...styles.modal, backgroundColor: '#d4d4ae', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h2 style={{ ...styles.modalTitle, marginBottom: '0px' }}>Crop Timeline Generator</h2>
              <button onClick={() => setShowCropTimelineModal(false)} style={styles.modalCloseButton} onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'} onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}>
                <X size={20} color="#6b7280" />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px', margin: '0 -8px' }}>
              <div style={styles.cropInfoContent}>
                {!cropTimelineResult || cropTimelineResult.error ? (
                  <>
                    <div style={styles.cropInfoSection}>
                      <div style={styles.cropInfoTitle}>
                        <Calendar size={20} />
                        Crop Information *
                      </div>
                      <input
                        type="text"
                        placeholder="Crop Name (e.g., wheat, rice, tomato)"
                        style={{ ...styles.cropInfoInput, marginBottom: '12px' }}
                        value={cropTimelineInfo.cropName}
                        onChange={(e) => setCropTimelineInfo({ ...cropTimelineInfo, cropName: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Area of the farm in acres (e.g., 5)"
                        style={{ ...styles.cropInfoInput, marginBottom: '12px' }}
                      />
                      <input
                        type="text"
                        placeholder="Farming Practices (e.g., organic, conventional)"
                        style={{ ...styles.cropInfoInput, marginBottom: '12px' }}
                      />
                      <select
                        style={{ ...styles.cropInfoSelect, marginBottom: '12px' }}
                        value={cropTimelineInfo.soilType}
                        onChange={(e) => setCropTimelineInfo({ ...cropTimelineInfo, soilType: e.target.value })}
                      >
                        <option value="">Select soil type *</option>
                        <option value="clay">Clay Soil</option>
                        <option value="sandy">Sandy Soil</option>
                        <option value="loamy">Loamy Soil</option>
                        <option value="alluvial">Alluvial Soil</option>
                        <option value="red">Red Soil</option>
                        <option value="black">Black Soil</option>
                      </select>

                      <div style={{ backgroundColor: '#f0f9ff', padding: '16px', borderRadius: '8px', border: '1px solid #bfdbfe', marginBottom: '12px' }}>
                        <div style={{ fontSize: '14px', color: '#1e40af', fontWeight: '600', marginBottom: '8px' }}>
                          📍 Location: {user?.district || 'Not specified'}
                        </div>
                        <div style={{ fontSize: '14px', color: '#1e40af', fontWeight: '600' }}>
                          📅 Current Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <button
                        style={{ ...styles.calculateButton, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#16a34a', ...(isCropTimelineFormComplete ? {} : styles.calculateButtonDisabled) }}
                        onClick={handleGenerateCropTimeline}
                        disabled={!isCropTimelineFormComplete}
                        onMouseEnter={(e) => { if (isCropTimelineFormComplete) { e.target.style.backgroundColor = '#15803d'; e.target.style.transform = 'translateY(-2px)'; } }}
                        onMouseLeave={(e) => { if (isCropTimelineFormComplete) { e.target.style.backgroundColor = '#16a34a'; e.target.style.transform = 'translateY(0)'; } }}
                      >
                        <Calendar size={20} style={{ marginRight: '8px' }} />
                        Generate Timeline
                      </button>
                    </div>
                  </>
                ) : null}

                {cropTimelineResult ? (
                  <div style={styles.premiumResultBox}>
                    {cropTimelineResult.loading ? (
                      <div style={{ textAlign: 'center', fontSize: '16px', color: '#059669' }}>Generating your timeline...</div>
                    ) : cropTimelineResult.error ? (
                      <div style={{ textAlign: 'center', color: '#dc2626' }}>
                        <p><strong>Error:</strong> {cropTimelineResult.error}</p>
                        <button onClick={() => setCropTimelineResult(null)} style={{ ...styles.calculateButton, width: 'auto', padding: '10px 20px' }}>Try Again</button>
                      </div>
                    ) : (
                      <div>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669' }}>Your Timeline for {cropTimelineResult.cropName}</h3>
                        <div style={{
                          backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb',
                          maxHeight: '40vh', overflowY: 'auto', textAlign: 'left', whiteSpace: 'pre-wrap', margin: '16px 0'
                        }}>
                          {cropTimelineResult.response}
                        </div>
                        <button onClick={() => setCropTimelineResult(null)} style={{ ...styles.calculateButton, width: 'auto', padding: '10px 20px', backgroundColor: '#16a34a' }}>Generate New Timeline</button>
                      </div>
                    )}
                  </div>
                ) : !isCropTimelineFormComplete ? (
                  <div style={styles.requiredText}>* Please fill crop name and soil type to generate a timeline</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Crop Price Predictor Modal */}
      {showCalculatorModal && (
        <div style={styles.modalOverlay} onClick={() => setShowCalculatorModal(false)}>
          <div
            style={{
              ...styles.modal,
              backgroundColor: '#d4d4ae',
              maxHeight: '85vh', // Limit height to ensure it fits on screen
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h2 style={{ ...styles.modalTitle, marginBottom: '0px' }}>Crop Price Predictor</h2>
              <button
                onClick={() => setShowCalculatorModal(false)}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                <X size={20} color="#6b7280" />
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '0 8px', // Small padding to prevent scrollbar from touching edges
                margin: '0 -8px'  // Negative margin to compensate for padding
              }}
            >
              <div style={styles.cropInfoContent}>
                <div style={styles.cropInfoSection}>
                  <div style={styles.cropInfoTitle}>Crop Information *</div>
                  <input
                    type="text"
                    placeholder="Crop Name (e.g., potato, wheat, rice)"
                    style={{ ...styles.cropInfoInput, marginBottom: '12px' }}
                    value={insuranceInfo.cropName}
                    onChange={(e) => setInsuranceInfo({ ...insuranceInfo, cropName: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Area of the farm in acres (e.g., 5)"
                    style={{ ...styles.cropInfoInput, marginBottom: '12px' }}
                    value={insuranceInfo.area}
                    onChange={(e) => setInsuranceInfo({ ...insuranceInfo, area: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Market Name (Mandi) in the city (eg - Koley Market or Posta Bazar in Kolkata)"
                    style={{ ...styles.cropInfoInput, marginBottom: '12px' }}
                  />
                  <input
                    type="text"
                    placeholder="Crop Variety: (e.g., Basmati, Hybrid for rice)"
                    style={{ ...styles.cropInfoInput, marginBottom: '12px' }}
                  />
                </div>

                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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
                    {calculatedPremium.loading ? (
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '16px', color: '#059669', marginBottom: '12px' }}>
                          Calculating crop price...
                        </div>
                      </div>
                    ) : calculatedPremium.error ? (
                      <div style={{ textAlign: 'center', color: '#dc2626' }}>
                        Error: {calculatedPremium.error}
                      </div>
                    ) : calculatedPremium.success ? (
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669', marginBottom: '16px' }}>
                          💰 Price Calculation Complete
                        </div>
                        <div style={{ ...styles.premiumDetails, whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                          {calculatedPremium.response}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div style={styles.resultBox}>
                    <p style={{ margin: 0, color: '#6b7280' }}>Fill crop name and area to get current market price</p>
                  </div>
                )}

                {!isInsuranceFormComplete && (
                  <div style={styles.requiredText}>
                    * Please fill crop name and area to calculate price
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Crop Info Modal */}
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
                <input
                  type="text"
                  placeholder="Farming Practices (e.g., organic, conventional)"
                  style={{ ...styles.cropInfoInput, marginBottom: '12px' }}
                />
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

      {/* Irrigation Insight Modal */}
      {showIrrigationInsightModal && (
        <div style={styles.modalOverlay} onClick={() => setShowIrrigationInsightModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>🌾 Irrigation Insights</h2>
              <button onClick={() => setShowIrrigationInsightModal(false)} style={styles.modalCloseButton}><X size={20} /></button>
            </div>
            <div style={styles.insightContent}>
              <button
                style={styles.getAdviceButton}
                onClick={handleGetIrrigationAdvice}
              >
                <Send size={20} />
                Get Detailed Expert Advice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fertilizer Insight Modal */}
      {showFertilizerInsightModal && (
        <div style={styles.modalOverlay} onClick={() => setShowFertilizerInsightModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>🧪 Fertilizer Insights</h2>
              <button onClick={() => setShowFertilizerInsightModal(false)} style={styles.modalCloseButton}><X size={20} /></button>
            </div>
            <div style={styles.insightContent}>
              <button style={styles.getAdviceButton} onClick={handleGetFertilizerAdvice}>
                <Send size={20} /> Get Detailed Fertilizer Plan
              </button>
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
                style={styles.modalCloseButton}
              >
                <X size={20} color="#6b7280" />
              </button>
            </div>
            <div style={styles.weatherGrid}>
              {loading ? (
                <div>Loading...</div>
              ) : weatherData?.timelines?.daily?.slice(0, 3).map((day, index) => (
                <div key={index} style={styles.weatherCard}>
                  {/* Weather card content */}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={() => {
                  setShowWeatherModal(false);
                  setShowHourlyModal(true);
                }}
                style={styles.viewForecastButton}
              >
                View 24-Hour Detailed Forecast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hourly Weather Modal */}
      {showHourlyModal && (
        <div style={styles.modalOverlay} onClick={toggleHourlyModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>24-Hour Weather Forecast</h2>
              <button onClick={toggleHourlyModal} style={styles.modalCloseButton}>
                <X size={20} color="#6b7280" />
              </button>
            </div>
            <div style={styles.hourlyGrid}>
              {loading ? <div>Loading...</div> : hourlyData?.data?.timelines?.[0]?.intervals?.slice(0, 24).map((hour, index) => (
                <div key={index} style={styles.hourlyCard}>
                  {/* Hourly weather card content */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={styles.modalOverlay} onClick={handleCancelLogout}>
          <div style={{ ...styles.modal, maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ textAlign: 'center', fontSize: '20px', fontWeight: '700' }}>Confirm Logout</h3>
            <p style={{ textAlign: 'center', margin: '15px 0 25px 0' }}>Are you sure you want to log out?</p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button onClick={handleCancelLogout} style={{ padding: '12px 24px', borderRadius: '10px', border: '1px solid #ccc' }}>Cancel</button>
              <button onClick={handleConfirmLogout} style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', backgroundColor: '#dc2626', color: 'white' }}>Yes, Log Out</button>
            </div>
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div style={styles.inputContainer}>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t('messagePlaceholder')}
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
          >
            <Send size={24} />
          </button>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        @keyframes slideLeftToRight {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; }
        .text-yellow-500 { color: #eab308; }
        .text-gray-500 { color: #6b7280; }
        .text-blue-500 { color: #3b82f6; }
      `}</style>
    </div>
  );
}