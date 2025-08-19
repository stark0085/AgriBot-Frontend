import React, { useState, useRef, useEffect, useContext } from 'react';
import { Menu, Send, User, MessageCircle, X, Loader, LayoutDashboard, UserCircle, LogOut } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Add this import
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

// Import the real context from your provider file
import { ProfileContext } from '../Contexts/ProfileProvider';

function Chats() {
  // State for messages in the current chat session
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true, timestamp: new Date() }
  ]);

  // State for user input and UI controls
  const { t } = useTranslation();
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Refs and hooks for navigation and context
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // This now correctly uses the user data from your real ProfileProvider
  const { logout, user } = useContext(ProfileContext);
  const initialMessageProcessed = useRef(false);

  // Function to automatically scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect to scroll down when messages change
  useEffect(scrollToBottom, [messages]);

  // Effect to handle an initial message passed via navigation state
  useEffect(() => {
    const initialMessage = location.state?.initialMessage;
    if (initialMessage && !initialMessageProcessed.current) {
      initialMessageProcessed.current = true;
      processUserMessage(initialMessage);
    }
  }, [location.state]);

  /**
   * Sends the user's message to the backend API using axios.
   * @param {string} userMessage - The message typed by the user.
   * @returns {Promise<{reply: string}>} - A promise that resolves to the bot's reply.
   */
  const sendMessageToAPI = async (userMessage) => {
    // Check if the user object exists before trying to access its email property
    if (!user || !user.email) {
      console.error('User email not found. Cannot send message.');
      return { reply: 'Authentication error. Please log in again.' };
    }

    try {
      console.log('Sending message to API:', userMessage);

      // Using axios to make the API call with timeout and better configuration
      const response = await axios.post('https://agri-bot-backend-ba3f.vercel.app/messages/sendmessage',
        {
          email: user.email,
          query: userMessage,
        },
        {
          timeout: 30000000, // 30 second timeout
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log('API response data:', response.data);

      const data = response.data;

      // Better response validation
      if (!data) {
        console.error('Empty response data');
        return { reply: 'Received empty response from server.' };
      }

      if (!data.reply) {
        console.error('No reply field in response:', data);
        return { reply: 'Server response missing reply field.' };
      }

      return {
        reply: data.reply,
      };
    } catch (error) {
      console.error('API Error:', error);

      // More detailed error handling
      if (error.code === 'ECONNABORTED') {
        console.error('Request timeout');
        return { reply: 'Request timed out. Please try again.' };
      } else if (error.response) {
        // Server responded with error status
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Server error';
        return { reply: `API Error (${error.response.status}): ${errorMessage}` };
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
        return { reply: 'No response from server. Please check if the server is running and try again.' };
      } else {
        // Something else happened
        console.error('Request setup error:', error.message);
        return { reply: `Request error: ${error.message}` };
      }
    }
  };

  /**
   * Processes the user's message, sends it to the API, and displays the response.
   * @param {string} userMessage - The message to process.
   */
  const processUserMessage = async (userMessage) => {
    if (!userMessage || !userMessage.trim()) {
      console.warn('Empty message received, skipping processing');
      return;
    }
    setIsLoading(true);

    // Add user message to chat
    const newUserMessage = {
      id: Date.now(),
      text: userMessage.trim(),
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Send to API and get response
      const apiResponse = await sendMessageToAPI(userMessage.trim());
      const botResponseText = apiResponse.reply;
      // Add bot response to chat
      const newBotMessage = {
        id: Date.now() + 1,
        text: botResponseText,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error processing your message. Please try again.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handles sending the message when the send button is clicked
  const handleSendMessage = () => {
    const messageToSend = inputMessage.trim();
    if (messageToSend && !isLoading) {
      processUserMessage(messageToSend);
      setInputMessage('');
    }
  };

  // Handles sending the message on 'Enter' key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Formats the timestamp for display
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Clears the current chat to start a new one
  const handleNewChatClick = () => {
    setMessages([{ id: 1, text: "Hello! How can I help you today?", isBot: true, timestamp: new Date() }]);
    // Reset the initial message processed flag
    initialMessageProcessed.current = false;
  };

  // Navigation and logout handlers
  const handleDashboardClick = () => navigate('/dashboard');
  const handleProfileClick = () => navigate('/profile');
  const handleLogoutClick = () => setShowLogoutModal(true);
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

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5E6D3', fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <div style={{
        width: isSidebarOpen ? '280px' : '0px',
        background: 'linear-gradient(180deg, #87CEEB 0%, #4A90E2 100%)',
        color: 'white',
        height: '100vh',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {isSidebarOpen && (
          <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '600' }}>{t('title')}</h2>
            </div>

            <button onClick={handleNewChatClick} style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '500',
              color: 'white',
              transition: 'background-color 0.2s, transform 0.2s', fontSize: '18px', borderTop: 'none', borderBottom: '2px solid', borderRight: '2px solid white'
            }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF6B9D 0%, #C850C8 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginRight: '12px'
              }}>
                <MessageCircle size={14} />
              </div>
              {t('newChat')}
            </button>

            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <button
                onClick={handleDashboardClick}
                style={{ ...sidebarNavButtonStyle, paddingTop: '1vh', borderTop: 'none', borderBottom: '2px solid', borderRight: '2px solid white' }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
              ><LayoutDashboard size={16} style={{ marginRight: '10px' }} />{t('dashboard')}</button>

              <button
                onClick={handleProfileClick}
                style={{ ...sidebarNavButtonStyle, borderTop: 'none', borderBottom: '2px solid', borderRight: '2px solid white' }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
              ><UserCircle size={16} style={{ marginRight: '10px' }} />{t('myProfile')}</button>

              <button
                onClick={handleLogoutClick}
                style={{ ...sidebarNavButtonStyle, background: 'rgba(239, 68, 68, 0.2)', color: '#0c0606ff', borderRight: '2px solid red', borderBottom: '2px solid red' }}
                onMouseOver={(e) => { e.currentTarget.style.background = '#B91C1C'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.color = '#F87171'; e.currentTarget.style.transform = 'scale(1)'; }}
              ><LogOut size={16} style={{ marginRight: '10px' }} />{t('logout')}</button>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F5E6D3' }}>
        <div style={{
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F5E6D3',
          borderBottom: '2px solid white',
          margin: '0 5vw'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'transparent', border: '1px solid black', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginRight: '16px', color: '#4B5563', height: '30px' }}>
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#111827' }}>{t('title')}</h1>
              <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>{t('subtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/profile')}
            style={{ background: '#0b507e00', cursor: 'pointer', marginRight: '16px', color: '#4B5563', borderRadius: '50%', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s', border: '1px solid #4B5563' }}
          >
            <User size={20} style={{ color: '#6B7280' }} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {messages.map((message) => (
              <div key={message.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px', justifyContent: message.isBot ? 'flex-start' : 'flex-end' }}>
                {message.isBot && <div style={{ width: '32px', height: '32px', background: '#1651afff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, fontSize: '13px', fontWeight: 'bold' }}>AI</div>}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: message.isBot ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    background: message.isBot ? '#FFFFFF' : '#DBEAFE',
                    color: '#1F2937',
                    padding: '12px 16px',
                    borderRadius: '18px',
                    maxWidth: '450px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    border: message.isBot ? '1px solid #E5E7EB' : 'none',
                    borderTopLeftRadius: message.isBot ? '4px' : '18px',
                    borderTopRightRadius: message.isBot ? '18px' : '4px',
                  }}>{message.text}</div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '6px' }}>{formatTime(message.timestamp)}</div>
                </div>
                {!message.isBot && <div style={{ width: '32px', height: '32px', background: '#055339ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, fontSize: '13px', fontWeight: 'bold' }}>You</div>}
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px', justifyContent: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', background: '#3B82F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /></div>
                <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', color: '#1F2937', padding: '12px 16px', borderRadius: '18px', borderTopLeftRadius: '4px', fontStyle: 'italic', fontSize: '14px' }}>AI is typing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div style={{ padding: '16px 24px', backgroundColor: '#F5E6D3', borderTop: '2px solid white', marginLeft: '8vw', marginRight: '8vw' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px', background: '#FFFFFF', borderRadius: '12px', padding: '8px', border: '1px solid #E5E7EB' }}>
            <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={handleKeyPress} placeholder={t('placeholder')} disabled={isLoading} style={{ flex: 1, padding: '10px', border: 'none', background: 'transparent', resize: 'none', outline: 'none', fontSize: '14px', color: '#1F2937' }} rows={1} />
            <button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} style={{
              width: '36px', height: '36px', borderRadius: '8px', border: 'none',
              background: (!inputMessage.trim() || isLoading) ? '#D1D5DB' : '#3B82F6',
              color: 'white',
              cursor: (!inputMessage.trim() || isLoading) ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s'
            }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', maxWidth: '400px', width: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '600' }}>Confirm Logout</h3>
            <p style={{ margin: '0 0 20px 0', color: '#6B7280' }}>Are you sure you want to log out?</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={handleCancelLogout} style={{ padding: '8px 16px', border: '1px solid #D1D5DB', borderRadius: '8px', cursor: 'pointer', background: 'white' }}>Cancel</button>
              <button onClick={handleConfirmLogout} style={{ padding: '8px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#EF4444', color: 'white' }}>Yes, Log Out</button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const sidebarNavButtonStyle = {
  width: '100%',
  padding: '10px',
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '8px',
  marginBottom: '8px',
  cursor: 'pointer',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: '500',
  color: 'white',
  transition: 'background-color 0.2s, transform 0.2s'
};

export default Chats;