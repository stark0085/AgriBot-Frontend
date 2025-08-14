import React, { useState, useEffect } from 'react';
import { Send, Menu, X } from 'lucide-react';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Sample rotating messages
  const rotatingMessages = [
    "Welcome to your AI Assistant!",
    "Ask me anything you'd like to know",
    "I'm here to help you 24/7",
    "Let's start a conversation",
    "Your intelligent companion awaits"
  ];

  // Handle text rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingMessages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [rotatingMessages.length]);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Redirecting with message:', message);
      setMessage('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
    hamburgerButton: {
      position: 'absolute',
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
      padding: '24px'
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
    movingModal: {
      position: 'absolute',
      top: '80px',
      left: 0,
      right: 0,
      height: '64px',
      overflow: 'hidden',
      zIndex: 30
    },
    movingContent: {
      position: 'absolute',
      whiteSpace: 'nowrap',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      animation: 'slideLeftToRight 10s linear infinite'
    },
    movingBox: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '12px 32px',
      margin: '0 16px',
      borderRadius: '50px',
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
      minWidth: 'max-content'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      marginTop: '128px'
    },
    contentWrapper: {
      textAlign: 'center',
      maxWidth: '768px'
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '24px'
    },
    subtitle: {
      fontSize: '20px',
      color: '#4b5563',
      marginBottom: '48px',
      lineHeight: '1.6'
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginTop: '48px'
    },
    card: {
      backgroundColor: 'white',
      padding: '32px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      border: '1px solid #dbeafe',
      transition: 'all 0.3s'
    },
    cardIcon: {
      fontSize: '32px',
      marginBottom: '16px'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#1f2937'
    },
    cardText: {
      color: '#6b7280'
    },
    inputContainer: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTop: '1px solid #dbeafe',
      padding: '24px',
      zIndex: 40,
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
    }
  };

  return (
    <div style={styles.container}>
      {/* Hamburger Menu - TOP LEFT */}
      <button
        onClick={toggleMenu}
        style={styles.hamburgerButton}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <Menu size={24} color="#374151" />
      </button>

      {/* Side Menu Overlay */}
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

      {/* Moving Modal Container - Top */}
      <div style={styles.movingModal}>
        <div style={styles.movingContent}>
          <div style={styles.movingBox}>
            <span style={{ fontSize: '18px', fontWeight: '500' }}>
              {rotatingMessages[currentTextIndex]}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        <div style={styles.contentWrapper}>
          <h1 style={styles.title}>AI Chatbot Dashboard</h1>
          <p style={styles.subtitle}>
            Start a conversation with your AI assistant. Type your message below and press send.
          </p>
          
          {/* Feature Cards */}
          <div style={styles.cardsGrid}>
            <div 
              style={styles.card}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <div style={styles.cardIcon}>⚡</div>
              <h3 style={styles.cardTitle}>Quick Chat</h3>
              <p style={styles.cardText}>Ask questions and get instant responses from your AI assistant</p>
            </div>
            <div 
              style={styles.card}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <div style={styles.cardIcon}>🎯</div>
              <h3 style={styles.cardTitle}>Smart Assistance</h3>
              <p style={styles.cardText}>Get personalized help with tasks and information</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Input Box at Bottom */}
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

      {/* CSS for animations */}
      <style>{`
        @keyframes slideLeftToRight {
          0% {
            transform: translateX(-100vw);
          }
          100% {
            transform: translateX(100vw);
          }
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}