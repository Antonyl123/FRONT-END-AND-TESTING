import React, { useState, useEffect, useRef } from 'react';

const PRESET_CHIPS = [
  { label: 'How to clock-in?', query: 'clock-in' },
  { label: 'When is payday?', query: 'payday' },
  { label: 'Leave policy details', query: 'leave-policy' },
  { label: 'Who is the administrator?', query: 'admin-info' }
];

const BOT_RESPONSES = {
  'clock-in': 'To clock in, navigate to the "Attendance" tab on the sidebar. Under the "Time Clock" card, click the active "Clock In Session" button. When you finish your workday, return to that widget and click "Clock Out Session". Your status will update in the database in real-time!',
  'payday': 'All corporate accounts are paid on the final day of each month. You can view your monthly base salary, bonuses, deductions, and download your detailed compensation invoice under the "Salary" tab in your portal.',
  'leave-policy': 'Our standard corporate package includes 25 annual paid leave days (excluding public holidays). To apply for Casual, Sick, or Medical leave, go to the "Attendance" tab, fill out the "Apply for Leave" form, and wait for Administrator approval.',
  'admin-info': 'The Lead System Administrator is Eleanor Vance. Admin controls allow management of team rosters, scheduling weekly shifts, adjusting payroll numbers, and approving leave request logs.',
  'default': 'I am the AuraHR digital assistant. You can select one of the suggested query chips above, or ask me questions about "leave", "pay", "shifts", "attendance", or "roster" and I will be happy to help!'
};

export default function Chatbot({ userRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am your AuraHR Assistant. How can I assist you with your corporate dashboard inquiries today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      let botAnswer = BOT_RESPONSES.default;
      const lowerText = text.toLowerCase();

      if (lowerText.includes('clock') || lowerText.includes('attendance') || lowerText.includes('check in')) {
        botAnswer = BOT_RESPONSES['clock-in'];
      } else if (lowerText.includes('pay') || lowerText.includes('salary') || lowerText.includes('earn') || lowerText.includes('invoice')) {
        botAnswer = BOT_RESPONSES['payday'];
      } else if (lowerText.includes('leave') || lowerText.includes('vacation') || lowerText.includes('sick')) {
        botAnswer = BOT_RESPONSES['leave-policy'];
      } else if (lowerText.includes('admin') || lowerText.includes('eleanor') || lowerText.includes('manager')) {
        botAnswer = BOT_RESPONSES['admin-info'];
      } else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
        botAnswer = `Hi there! I am the AuraHR helper bot. You are currently logged in as a ${userRole === 'admin' ? 'System Administrator' : 'Company Employee'}. How can I assist you?`;
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botAnswer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  const handleChipClick = (query) => {
    const chipText = PRESET_CHIPS.find(c => c.query === query)?.label || query;
    handleSendMessage(chipText);
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Toggle Button */}
      <button
        type="button"
        className={`chatbot-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Open AuraHR Assistant"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <div className="btn-chat-content">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="badge-pulse"></span>
          </div>
        )}
      </button>

      {/* Expandable Chat Widget */}
      {isOpen && (
        <div className="chatbot-widget glass animate-slide-up">
          <div className="widget-header">
            <div className="bot-title">
              <div className="bot-avatar-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12A10 10 0 0 1 12 2z" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
              <div>
                <h3>AuraHR Assistant</h3>
                <span>Online • Powered by Rules</span>
              </div>
            </div>
          </div>

          {/* Quick Query Chips */}
          <div className="widget-chips-area">
            {PRESET_CHIPS.map((chip) => (
              <button
                key={chip.query}
                type="button"
                className="chip-btn hover-scale"
                onClick={() => handleChipClick(chip.query)}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages scroll pane */}
          <div className="widget-body">
            <div className="messages-container">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-bubble-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
                  <div className="message-content">
                    <p className="message-text">{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message-bubble-row bot-row">
                  <div className="message-content typing-box">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="widget-input-form glass"
          >
            <input
              type="text"
              placeholder="Type HR query (e.g. leave, payroll)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="send-btn" disabled={!inputValue.trim()}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
