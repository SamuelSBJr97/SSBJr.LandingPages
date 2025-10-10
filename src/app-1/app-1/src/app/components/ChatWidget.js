'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatWidget({ landingPageSlug }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [chatStarted, setChatStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineAgents, setOnlineAgents] = useState(2);
  const [chatId] = useState(() => 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
  const messagesEndRef = useRef(null);

  // Auto responses da equipe de vendas
  const autoResponses = [
    "Olá! 👋 Obrigado por entrar em contato. Como posso ajudá-lo hoje?",
    "Fico feliz em esclarecer suas dúvidas! Qual informação você precisa?",
    "Entendi sua necessidade. Vou verificar as melhores opções para você.",
    "Excelente pergunta! Deixe-me explicar melhor sobre isso.",
    "Posso agendar uma demonstração personalizada para você. Que tal?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simular presença online de agentes
    const interval = setInterval(() => {
      setOnlineAgents(Math.floor(Math.random() * 4) + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const startChat = () => {
    if (userInfo.name && userInfo.email) {
      setChatStarted(true);
      const welcomeMessage = {
        id: Date.now(),
        text: `Olá ${userInfo.name}! 👋 Sou da equipe de vendas da SSBJr. Obrigado por seu interesse em nossos serviços. Como posso ajudá-lo hoje?`,
        sender: 'agent',
        timestamp: new Date(),
        agent: 'Ana Silva'
      };
      setMessages([welcomeMessage]);
      
      // Registrar início do chat para analytics
      registerChatEvent('chat_started', {
        landingPage: landingPageSlug,
        userInfo: userInfo,
        chatId: chatId
      });
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && chatStarted) {
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Registrar mensagem para analytics
      registerChatEvent('message_sent', {
        chatId: chatId,
        landingPage: landingPageSlug,
        messageLength: newMessage.length
      });

      // Simular resposta do agente
      setIsTyping(true);
      setTimeout(() => {
        const agentMessage = {
          id: Date.now() + 1,
          text: autoResponses[Math.floor(Math.random() * autoResponses.length)],
          sender: 'agent',
          timestamp: new Date(),
          agent: 'Ana Silva'
        };
        setMessages(prev => [...prev, agentMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000);
    }
  };

  const registerChatEvent = (event, data) => {
    // Salvar evento no localStorage para analytics
    const analytics = JSON.parse(localStorage.getItem('ssbjr_analytics') || '[]');
    analytics.push({
      timestamp: new Date().toISOString(),
      event: event,
      ...data
    });
    localStorage.setItem('ssbjr_analytics', JSON.stringify(analytics));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {onlineAgents > 0 && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {onlineAgents}
                </div>
              )}
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Chat com Vendas</h3>
                <p className="text-xs opacity-90">
                  {onlineAgents} {onlineAgents === 1 ? 'agente online' : 'agentes online'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            {!chatStarted ? (
              /* User Info Form */
              <div className="p-4 space-y-3">
                <h4 className="font-medium text-gray-800">Vamos começar!</h4>
                <p className="text-sm text-gray-600">
                  Informe seus dados para conectar com nossa equipe:
                </p>
                
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                />
                
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                />
                
                <input
                  type="tel"
                  placeholder="Telefone (opcional)"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                />
                
                <button
                  onClick={startChat}
                  disabled={!userInfo.name || !userInfo.email}
                  className="w-full bg-blue-600 text-white p-2 rounded-lg text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Iniciar Chat
                </button>
              </div>
            ) : (
              /* Chat Messages */
              <>
                <div className="flex-1 p-4 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                    >
                      <div
                        className={`inline-block max-w-xs p-2 rounded-lg text-sm ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.sender === 'agent' && message.agent && (
                          <div className="text-xs opacity-75 mb-1">{message.agent}</div>
                        )}
                        <div>{message.text}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="text-left mb-3">
                      <div className="inline-block bg-gray-100 text-gray-800 p-2 rounded-lg text-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-blue-600 text-white p-2 rounded-lg disabled:bg-gray-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}