import React, { useState } from 'react';
import { Menu, Send, User, MessageCircle, Clock, Settings, HelpCircle, X, Minus } from 'lucide-react';

export default function Chats() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true },
    { id: 2, text: "I need help with my project", isBot: false },
    { id: 3, text: "I'd be happy to help! Could you tell me more about your project and what specific assistance you need?", isBot: true },
    { id: 4, text: "I'm working on a React application and need to implement a chat interface", isBot: false },
    { id: 5, text: "That sounds like an interesting project! I can definitely help you with building a React chat interface. What specific features are you looking to implement?", isBot: true }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        isBot: false
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thanks for your message! I'm processing your request and will get back to you shortly.",
          isBot: true
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

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
            <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>AI Chat Assistant</h1>
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
            {messages.map((message, index) => (
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
                    AI
                  </div>
                )}
                
                <div style={{
                  backgroundColor: message.isBot ? '#e2e8f0' : '#3b82f6',
                  color: message.isBot ? '#1f2937' : 'white',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  maxWidth: '400px',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  borderTopLeftRadius: message.isBot ? '4px' : '16px',
                  borderTopRightRadius: message.isBot ? '16px' : '4px'
                }}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message Input */}
        <div style={inputContainerStyle}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              style={{
                flex: 1,
                padding: '12px 16px',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '24px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#3b82f6',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}