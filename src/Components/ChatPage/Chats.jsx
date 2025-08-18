import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Send, User, MessageCircle, X, Loader, LayoutDashboard, UserCircle, LogOut } from 'lucide-react';
import { ProfileContext } from '../Contexts/ProfileProvider';

export default function Chats() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true, timestamp: new Date() }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useContext(ProfileContext);
  const initialMessageProcessed = useRef(false);

  useEffect(() => {
    if (user?.email) {
      fetchChatHistory();
    }
  }, [user]);

  const fetchChatHistory = async () => {
    if (!user?.email) return;
    try {
      const response = await fetch(`http://localhost:3000/messages/history/${user.email}`);
      if (response.ok) {
        const data = await response.json();
        const transformedHistory = data.map(convo => ({
          id: convo.conversationId,
          name: formatConversationName(convo.startTime),
          lastMessage: convo.lastMessage || "No messages yet",
          timestamp: new Date(convo.startTime).getTime()
        })).sort((a, b) => b.timestamp - a.timestamp);
        setChatHistory(transformedHistory);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const formatConversationName = (isoString) => {
    const conversationDate = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateStr;
    if (conversationDate.toDateString() === today.toDateString()) {
      dateStr = 'Today';
    } else if (conversationDate.toDateString() === yesterday.toDateString()) {
      dateStr = 'Yesterday';
    } else {
      dateStr = conversationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    const timeStr = conversationDate.toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true
    });

    return `${dateStr} at ${timeStr}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const initialMessage = location.state?.initialMessage;
    if (initialMessage && !initialMessageProcessed.current) {
      initialMessageProcessed.current = true;
      processUserMessage(initialMessage);
      navigate('.', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const sendMessageToAPI = async (userMessage, conversationId) => {
    try {
      const response = await fetch('http://localhost:3000/message/sendmessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          email: user.email,
          conversationId: conversationId
        }),
      });
      if (!response.ok) throw new Error('API response was not ok');
      const data = await response.json();
      return {
        reply: data.reply || "Sorry, I couldn't process that.",
        conversationId: data.conversationId
      };
    } catch (error) {
      console.error('API Error:', error);
      return { reply: "I'm having trouble connecting. Please try again.", conversationId };
    }
  };

  const processUserMessage = async (userMessage) => {
    setIsLoading(true);
    const newUserMessage = { id: Date.now(), text: userMessage, isBot: false, timestamp: new Date() };
    setMessages(prev => [...prev, newUserMessage]);

    const apiResponse = await sendMessageToAPI(userMessage, currentChatId);
    const botResponseText = apiResponse.reply;
    const conversationId = apiResponse.conversationId;

    const newBotMessage = { id: Date.now() + 1, text: botResponseText, isBot: true, timestamp: new Date() };
    setMessages(prev => [...prev, newBotMessage]);

    if (!currentChatId) {
      const newChat = {
        id: conversationId,
        name: formatConversationName(new Date().toISOString()),
        lastMessage: botResponseText.slice(0, 40) + '...',
        timestamp: Date.now()
      };
      setChatHistory(prev => [newChat, ...prev].slice(0, 5));
      setCurrentChatId(conversationId);
    } else {
      setChatHistory(prev => prev.map(chat =>
        chat.id === conversationId
          ? { ...chat, lastMessage: botResponseText.slice(0, 40) + '...' }
          : chat
      ));
    }

    setIsLoading(false);
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
    return timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const handleNewChatClick = () => {
    setCurrentChatId(null);
    setMessages([{ id: 1, text: "Hello! How can I help you today?", isBot: true, timestamp: new Date() }]);
  };

  const handleChatHistoryClick = async (chat) => {
    if (!user?.email || !chat.id) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/messages/conversation/${chat.id}`);
      if (response.ok) {
        const conversationData = await response.json();
        const fetchedMessages = conversationData.messages?.map((msg, index) => ({
          id: msg.id || index,
          text: msg.text,
          isBot: msg.sender === 'bot',
          timestamp: new Date(msg.timestamp)
        })) || [];
        setMessages(fetchedMessages.length > 0 ? fetchedMessages : []);
        setCurrentChatId(chat.id);
      }
    } catch (error) {
      console.error('Error fetching conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDashboardClick = () => navigate('/dashboard');
  const handleProfileClick = () => navigate('/profile');
  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
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
              <h2 style={{ fontSize: '22px', fontWeight: '600' }}>Chat History</h2>
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
              New Chat
            </button>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid white' }}>Recent Chats</h3>
              {chatHistory.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', marginTop: '20px' }}>No recent chats</div>
              ) : (
                chatHistory.map((chat) => (
                  <button key={chat.id} onClick={() => handleChatHistoryClick(chat)} style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '8px',
                    background: currentChatId === chat.id ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}>
                    <div style={{ fontWeight: '500', fontSize: '14px' }}>{chat.name}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>{chat.lastMessage}</div>
                  </button>
                ))
              )}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <button
                onClick={handleDashboardClick}
                style={{ ...sidebarNavButtonStyle, paddingTop: '1vh', borderTop: 'none', borderBottom: '2px solid', borderRight: '2px solid white' }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
              ><LayoutDashboard size={16} style={{ marginRight: '10px' }} />Dashboard</button>

              <button
                onClick={handleProfileClick}
                style={{ ...sidebarNavButtonStyle, borderTop: 'none', borderBottom: '2px solid', borderRight: '2px solid white' }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
              ><UserCircle size={16} style={{ marginRight: '10px' }} />Profile</button>

              <button
                onClick={handleLogoutClick}
                style={{ ...sidebarNavButtonStyle, background: 'rgba(239, 68, 68, 0.2)', color: '#0c0606ff', borderRight: '2px solid red', borderBottom: '2px solid red' }}
                onMouseOver={(e) => { e.currentTarget.style.background = '#B91C1C'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.color = '#F87171'; e.currentTarget.style.transform = 'scale(1)'; }}
              ><LogOut size={16} style={{ marginRight: '10px' }} />Logout</button>
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
              <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#111827' }}>Agri Bot</h1>
              <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Start a conversation</p>
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
            <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={handleKeyPress} placeholder="Type your message here..." disabled={isLoading} style={{ flex: 1, padding: '10px', border: 'none', background: 'transparent', resize: 'none', outline: 'none', fontSize: '14px', color: '#1F2937' }} rows={1} />
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
