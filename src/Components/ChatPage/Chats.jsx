import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Send, User, MessageCircle, Clock, Settings, HelpCircle, X, Loader, LayoutDashboard, UserCircle, LogOut } from 'lucide-react';
import { ProfileContext } from '../Contexts/ProfileProvider';

export default function Chats() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true, timestamp: new Date() }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(ProfileContext);

  /**
   * FIX: Added a ref to prevent the initial message from being processed twice
   * in React.StrictMode (development mode).
   */
  const initialMessageProcessed = useRef(false);

  // Demo chat history data
  const demoChats = [
    { id: 1, name: "Weather Discussion", lastMessage: "Thanks for the weather info!" },
    { id: 2, name: "Recipe Help", lastMessage: "Perfect! I'll try that recipe." },
    { id: 3, name: "Travel Planning", lastMessage: "Those destinations sound amazing." }
  ];

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * MODIFIED: This effect now checks the ref flag before processing the message.
   */
  useEffect(() => {
    const initialMessage = location.state?.initialMessage;
    // Check if there's a message AND it has not been processed yet.
    if (initialMessage && !initialMessageProcessed.current) {
      // Set the flag to true immediately to prevent re-processing.
      initialMessageProcessed.current = true;
      
      // Process the message.
      processUserMessage(initialMessage);
      
      // Clear the location state.
      navigate('.', { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only on mount

  // API call to send message to bot
  const sendMessageToAPI = async (userMessage) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      if (!response.ok) throw new Error('API response was not ok');
      const data = await response.json();
      return data.response || "Sorry, I couldn't process that.";
    } catch (error) {
      console.error('API Error:', error);
      return generateFallbackResponse(userMessage); // Use fallback on error
    }
  };

  // Fallback response generator
  const generateFallbackResponse = (userMessage) => {
      const responses = [
      "That's interesting! Could you tell me more about that?",
      "I understand. How can I help you with this?",
      "Thanks for sharing that. What would you like to know?",
      "I see. Is there anything specific you'd like assistance with?",
      "That sounds important. How can I support you?",
      "Interesting perspective! What are your thoughts on this?",
      "I appreciate you bringing this up. What's your next step?",
      "That's a great question. Let me help you with that.",
      "I understand your concern. Here's what I think...",
      "Thanks for the details. Based on what you've said..."
    ];
    
    // Simple keyword-based responses for demo
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('help')) {
      return "I'm here to help! What specific assistance do you need?";
    } else if (lowerMessage.includes('weather')) {
      return "I can help with weather information! What location are you interested in?";
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Goodbye! Feel free to return anytime if you need assistance.";
    } else {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const processUserMessage = async (userMessage) => {
    setIsLoading(true);
    // Add user message to the UI
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);

    // Get and add bot response
    try {
      const botResponse = await sendMessageToAPI(userMessage);
      const newBotMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting. Please try again later.",
        isBot: true,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendMessage = () => {
    const messageToSend = inputMessage.trim();
    if (messageToSend && !isLoading) {
      processUserMessage(messageToSend);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Handle chat history click
  const handleChatHistoryClick = (chat) => {
    console.log(`Opening chat: ${chat.name}`);
    // For now, just log. You can implement actual chat loading logic here
  };

  // Handle navigation
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleProfileClick = () => {
    navigate('/profile');
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
  
  // Updated styles to match the second image
  const sidebarStyle = {
    width: isSidebarOpen ? '320px' : '0px',
    background: 'linear-gradient(135deg, #87CEEB 0%, #6BB6FF 50%, #4A90E2 100%)',
    color: 'white',
    height: '100vh',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    flexShrink: 0,
    boxShadow: '2px 0 20px rgba(0, 0, 0, 0.1)'
  };

  const mainChatStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C4 100%)'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C4 100%)',
    color: '#2C3E50',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
  };

  const messagesContainerStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '30px',
    background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C4 100%)'
  };

  const inputContainerStyle = {
    background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C4 100%)',
    padding: '25px',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)'
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F5E6D3', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        {isSidebarOpen && (
          <div style={{ padding: '25px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Chat History</h2>
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
            
            {/* Current Chat Indicator */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '30px', 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)', 
              padding: '15px', 
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                background: 'linear-gradient(135deg, #FF6B9D 0%, #C850C8 100%)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}>
                <MessageCircle size={18} />
              </div>
              <span style={{ fontSize: '16px', fontWeight: '600', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>New Chat</span>
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
                onClick={handleProfileClick}
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
                <UserCircle size={18} style={{ marginRight: '12px' }} />
                Profile
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
      
      {/* Main Chat Area */}
      <div style={mainChatStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                padding: '10px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#2C3E50',
                borderRadius: '8px',
                marginRight: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#2C3E50', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>AI Chat Assistant</h1>
              <p style={{ fontSize: '13px', opacity: 0.7, margin: 0, color: '#5A6C7D' }}>
                {messages.length > 1 ? `${messages.length - 1} messages` : 'Start a conversation'}
              </p>
            </div>
          </div>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#2C3E50',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <User size={18} />
          </div>
        </div>
        
        {/* Messages Container */}
        <div style={messagesContainerStyle}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {messages.map((message) => (
              <div 
                key={message.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '15px',
                  marginBottom: '25px',
                  justifyContent: message.isBot ? 'flex-start' : 'flex-end'
                }}
              >
                {message.isBot && (
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: message.isError ? 
                      'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)' : 
                      'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    AI
                  </div>
                )}
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: message.isBot ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    background: message.isBot ? 
                      (message.isError ? 
                        'linear-gradient(135deg, #ffe8e8 0%, #ffdddd 100%)' : 
                        'linear-gradient(135deg, #a8d8ff 0%, #87CEEB 100%)'
                      ) : 
                      'linear-gradient(135deg, #FFD4A3 0%, #FDB777 100%)',
                    color: message.isBot ? 
                      (message.isError ? '#dc2626' : '#2C3E50') : '#8B4513',
                    padding: '15px 20px',
                    borderRadius: '20px',
                    maxWidth: '450px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    borderTopLeftRadius: message.isBot ? '8px' : '20px',
                    borderTopRightRadius: message.isBot ? '20px' : '8px',
                    wordWrap: 'break-word',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    fontWeight: '500'
                  }}>
                    {message.text}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#8B7355', 
                    marginTop: '6px',
                    marginLeft: message.isBot ? '0' : 'auto',
                    marginRight: message.isBot ? 'auto' : '0',
                    fontWeight: '500'
                  }}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '15px',
                marginBottom: '25px',
                justifyContent: 'flex-start'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  flexShrink: 0,
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #a8d8ff 0%, #87CEEB 100%)',
                  color: '#2C3E50',
                  padding: '15px 20px',
                  borderRadius: '20px',
                  borderTopLeftRadius: '8px',
                  fontSize: '15px',
                  fontStyle: 'italic',
                  fontWeight: '500',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  AI is typing...
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Message Input */}
        <div style={inputContainerStyle}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '15px 20px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '25px',
                fontSize: '15px',
                outline: 'none',
                resize: 'none',
                minHeight: '52px',
                maxHeight: '120px',
                overflowY: 'auto',
                fontFamily: 'inherit',
                opacity: isLoading ? 0.6 : 1,
                color: '#2C3E50',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                fontWeight: '500'
              }}
              rows={1}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(116, 185, 255, 0.5)';
                e.target.style.boxShadow = '0 4px 20px rgba(116, 185, 255, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              style={{
                width: '52px',
                height: '52px',
                background: (!inputMessage.trim() || isLoading) ? 
                  'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)' : 
                  'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: (!inputMessage.trim() || isLoading) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: (!inputMessage.trim() || isLoading) ? 
                  '0 2px 8px rgba(0, 0, 0, 0.1)' : 
                  '0 4px 15px rgba(116, 185, 255, 0.4)',
                transform: 'scale(1)'
              }}
              onMouseOver={(e) => {
                if (!isLoading && inputMessage.trim()) {
                  e.target.style.background = 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)';
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 20px rgba(116, 185, 255, 0.5)';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading && inputMessage.trim()) {
                  e.target.style.background = 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(116, 185, 255, 0.4)';
                }
              }}
            >
              {isLoading ? <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={20} />}
            </button>
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
}