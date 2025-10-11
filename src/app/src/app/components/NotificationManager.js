'use client';

import { useState, useEffect } from 'react';

export default function NotificationManager() {
  const [permission, setPermission] = useState('default');
  const [showPermissionRequest, setShowPermissionRequest] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [notificationQueue, setNotificationQueue] = useState([]);

  useEffect(() => {
    // Verificar suporte a notificações
    if ('Notification' in window) {
      setPermission(Notification.permission);
      
      // Verificar se já está inscrito
      const isSubscribed = localStorage.getItem('ssbjr_notifications_subscribed');
      if (isSubscribed === 'true') {
        setSubscribed(true);
      }
    }

    // Verificar se deve mostrar request de permissão
    const hasAskedPermission = localStorage.getItem('ssbjr_notification_permission_asked');
    if (!hasAskedPermission && permission === 'default') {
      // Mostrar após 30 segundos
      setTimeout(() => {
        setShowPermissionRequest(true);
      }, 30000);
    }
  }, [permission]);

  useEffect(() => {
    // Listener para mensagens do service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NEW_CHAT_MESSAGE') {
          showChatNotification(event.data.message);
        }
      });
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      localStorage.setItem('ssbjr_notification_permission_asked', 'true');
      
      if (result === 'granted') {
        setSubscribed(true);
        localStorage.setItem('ssbjr_notifications_subscribed', 'true');
        showWelcomeNotification();
      }
      
      setShowPermissionRequest(false);
    }
  };

  const showWelcomeNotification = () => {
    if (permission === 'granted') {
      new Notification('🎉 Notificações Ativadas!', {
        body: 'Agora você receberá alertas sobre novos chats e ofertas especiais.',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: 'welcome',
        renotify: false
      });
    }
  };

  const showChatNotification = (message) => {
    if (permission === 'granted' && subscribed) {
      const notification = new Notification('💬 Nova Mensagem do Chat', {
        body: `${message.sender}: ${message.text}`,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: 'chat',
        renotify: true,
        actions: [
          {
            action: 'reply',
            title: 'Responder'
          },
          {
            action: 'close',
            title: 'Fechar'
          }
        ]
      });

      notification.onclick = () => {
        window.focus();
        // Abrir chat (seria integrado com o ChatWidget)
        notification.close();
      };
    }
  };

  const showOfferNotification = (offer) => {
    if (permission === 'granted' && subscribed) {
      new Notification('🏷️ Oferta Especial!', {
        body: offer.message,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: 'offer',
        renotify: true,
        requireInteraction: true
      });
    }
  };

  const showGroupNotification = (groupName, message) => {
    if (permission === 'granted' && subscribed) {
      new Notification(`🔗 ${groupName}`, {
        body: message,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: 'group',
        renotify: false
      });
    }
  };

  const testNotification = () => {
    showChatNotification({
      sender: 'Ana Silva',
      text: 'Olá! Como posso ajudá-lo hoje?'
    });
  };

  const unsubscribe = () => {
    setSubscribed(false);
    localStorage.setItem('ssbjr_notifications_subscribed', 'false');
  };

  // Simulação de notificações automáticas
  useEffect(() => {
    if (subscribed && permission === 'granted') {
      // Notificação de oferta após 2 minutos
      const offerTimer = setTimeout(() => {
        showOfferNotification({
          message: 'Desconto especial de 20% válido por tempo limitado!'
        });
      }, 120000);

      // Notificação de grupo após 5 minutos
      const groupTimer = setTimeout(() => {
        showGroupNotification(
          'Grupo VIP',
          'Nova discussão interessante no grupo! Confira agora.'
        );
      }, 300000);

      return () => {
        clearTimeout(offerTimer);
        clearTimeout(groupTimer);
      };
    }
  }, [subscribed, permission]);

  // Componente invisível que expõe funções globalmente
  useEffect(() => {
    window.ssbjrNotifications = {
      showChatNotification,
      showOfferNotification,
      showGroupNotification
    };
  }, []);

  return (
    <>
      {/* Permission Request Banner */}
      {showPermissionRequest && permission === 'default' && (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🔔</div>
              <div>
                <h4 className="font-semibold">Quer ficar por dentro de tudo?</h4>
                <p className="text-sm opacity-90">
                  Receba notificações sobre novos chats, ofertas especiais e atualizações importantes.
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPermissionRequest(false)}
                className="px-4 py-2 text-sm bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
              >
                Depois
              </button>
              <button
                onClick={requestPermission}
                className="px-4 py-2 text-sm bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Ativar Notificações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings (Floating Button) */}
      {subscribed && (
        <div className="fixed top-4 right-4 z-40">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Notificações Ativas
                </span>
              </div>
              <button
                onClick={unsubscribe}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <span>💬</span>
                <span>Novas mensagens do chat</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🏷️</span>
                <span>Ofertas especiais</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🔗</span>
                <span>Atividade dos grupos</span>
              </div>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={testNotification}
                className="mt-3 w-full text-xs bg-blue-100 text-blue-800 py-1 rounded hover:bg-blue-200 transition-colors"
              >
                Testar Notificação
              </button>
            )}
          </div>
        </div>
      )}

      {/* Notification Queue Display */}
      {notificationQueue.length > 0 && (
        <div className="fixed bottom-20 right-4 space-y-2 z-50">
          {notificationQueue.map((notification, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm animate-slide-in"
            >
              <div className="flex items-start space-x-3">
                <div className="text-xl">{notification.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.body}</p>
                </div>
                <button
                  onClick={() => {
                    setNotificationQueue(prev => prev.filter((_, i) => i !== index));
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}