import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Send, User, MessageCircle, Clock, Settings, HelpCircle, X, Loader } from 'lucide-react';

export default function Chats() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true, timestamp: new Date() }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * FIX: Added a ref to prevent the initial message from being processed twice
   * in React.StrictMode (development mode).
   */
  const initialMessageProcessed = useRef(false);

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
  
  // --- The rest of your component's JSX and styles remain the same ---

  const sidebarStyle = {
    width: isSidebarOpen ? '280px' : '0px',
    backgroundColor: '#1e293b',
    color: 'white',
    height: '100vh',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    flexShrink: 0
  };

  const mainChatStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#334155'
  };

  const headerStyle = {
    backgroundColor: '#1e293b',
    color: 'white',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const messagesContainerStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: '#475569'
  };

  const inputContainerStyle = {
    backgroundColor: '#1e293b',
    padding: '20px'
  };
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        {isSidebarOpen && (
          <div style={{ padding: '20px', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Dashboard</h2>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                backgroundColor: '#64748b', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <User size={16} />
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '24px', 
              backgroundColor: '#334155', 
              padding: '12px', 
              borderRadius: '8px' 
            }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                backgroundColor: '#3b82f6', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <User size={16} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>AI Assistant</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button style={{ 
                width: '100%',
                display: 'flex', 
                alignItems: 'center', 
                padding: '10px 12px', 
                backgroundColor: '#3b82f6', 
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                <MessageCircle size={16} style={{ marginRight: '12px' }} />
                Chat
              </button>
              
              <button style={{ 
                width: '100%',
                display: 'flex', 
                alignItems: 'center', 
                padding: '10px 12px', 
                backgroundColor: 'transparent', 
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#334155'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                <Clock size={16} style={{ marginRight: '12px' }} />
                History
              </button>
              
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button style={{ 
                  width: '100%',
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '10px 12px', 
                  backgroundColor: 'transparent', 
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#334155'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                  <Settings size={16} style={{ marginRight: '12px' }} />
                  Settings
                </button>
                
                <button style={{ 
                  width: '100%',
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '10px 12px', 
                  backgroundColor: 'transparent', 
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#334155'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                  <HelpCircle size={16} style={{ marginRight: '12px' }} />
                  Help
                </button>
              </div>
            </div>

            {/* Connection Status */}
            <div style={{ 
              position: 'absolute', 
              bottom: '20px', 
              left: '20px', 
              right: '20px',
              padding: '8px 12px',
              backgroundColor: isLoading ? '#f59e0b' : '#10b981',
              borderRadius: '6px',
              fontSize: '12px',
              textAlign: 'center'
            }}>
              {isLoading ? 'AI is thinking...' : 'Connected'}
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
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                marginRight: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#334155'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>AI Chat Assistant</h1>
              <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>
                {messages.length > 1 ? `${messages.length - 1} messages` : 'Start a conversation'}
              </p>
            </div>
          </div>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            backgroundColor: '#64748b', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <User size={16} />
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
                  gap: '12px',
                  marginBottom: '20px',
                  justifyContent: message.isBot ? 'flex-start' : 'flex-end'
                }}
              >
                {message.isBot && (
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: message.isError ? '#ef4444' : '#3b82f6', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    AI
                  </div>
                )}
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: message.isBot ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    backgroundColor: message.isBot ? (message.isError ? '#fef2f2' : '#e2e8f0') : '#3b82f6',
                    color: message.isBot ? (message.isError ? '#dc2626' : '#1f2937') : 'white',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    maxWidth: '400px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    borderTopLeftRadius: message.isBot ? '4px' : '16px',
                    borderTopRightRadius: message.isBot ? '16px' : '4px',
                    wordWrap: 'break-word'
                  }}>
                    {message.text}
                  </div>
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#64748b', 
                    marginTop: '4px',
                    marginLeft: message.isBot ? '0' : 'auto',
                    marginRight: message.isBot ? 'auto' : '0'
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
                gap: '12px',
                marginBottom: '20px',
                justifyContent: 'flex-start'
              }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  backgroundColor: '#3b82f6', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                </div>
                <div style={{
                  backgroundColor: '#e2e8f0',
                  color: '#1f2937',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  borderTopLeftRadius: '4px',
                  fontSize: '14px',
                  fontStyle: 'italic'
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
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '12px 16px',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '20px',
                fontSize: '14px',
                outline: 'none',
                resize: 'none',
                minHeight: '48px',
                maxHeight: '120px',
                overflowY: 'auto',
                fontFamily: 'inherit',
                opacity: isLoading ? 0.6 : 1
              }}
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: (!inputMessage.trim() || isLoading) ? '#9ca3af' : '#3b82f6',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: (!inputMessage.trim() || isLoading) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                if (!isLoading && inputMessage.trim()) {
                  e.target.style.backgroundColor = '#2563eb'
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading && inputMessage.trim()) {
                  e.target.style.backgroundColor = '#3b82f6'
                }
              }}
            >
              {isLoading ? <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={18} />}
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}