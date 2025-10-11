'use client';

import { useState, useEffect } from 'react';

export default function SalesDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [analytics, setAnalytics] = useState({});
  const [timeRange, setTimeRange] = useState('today');
  const [selectedLandingPage, setSelectedLandingPage] = useState('all');

  // Dados mockados para demonstração
  const mockAnalytics = {
    today: {
      all: {
        visits: 1247,
        uniqueVisitors: 892,
        chatStarts: 89,
        conversions: 23,
        conversionRate: 1.85,
        avgSessionTime: '4:32',
        bounceRate: 34.5,
        topPages: [
          { page: 'empresa-a', visits: 456, conversions: 12 },
          { page: 'campanha-black-friday', visits: 378, conversions: 8 },
          { page: 'startup-xyz', visits: 234, conversions: 3 }
        ],
        chatMetrics: {
          totalChats: 89,
          completedChats: 67,
          avgResponseTime: '2:15',
          satisfactionRate: 4.6
        },
        groupClicks: {
          whatsapp: 145,
          telegram: 89,
          discord: 34
        }
      }
    },
    week: {
      all: {
        visits: 8934,
        uniqueVisitors: 5634,
        chatStarts: 567,
        conversions: 156,
        conversionRate: 1.75,
        avgSessionTime: '4:15',
        bounceRate: 36.2,
        topPages: [
          { page: 'empresa-a', visits: 3456, conversions: 78 },
          { page: 'campanha-black-friday', visits: 2789, conversions: 45 },
          { page: 'startup-xyz', visits: 1890, conversions: 33 }
        ]
      }
    }
  };

  useEffect(() => {
    // Verificar se está autenticado
    const auth = localStorage.getItem('ssbjr_sales_auth');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
      loadAnalytics();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Credenciais simples para demonstração
    if (loginForm.username === 'vendas' && loginForm.password === 'ssbjr2024') {
      setIsAuthenticated(true);
      localStorage.setItem('ssbjr_sales_auth', 'authenticated');
      loadAnalytics();
    } else {
      alert('Credenciais inválidas! Use: vendas / ssbjr2024');
    }
  };

  const loadAnalytics = () => {
    // Carregar dados reais do localStorage
    const realAnalytics = JSON.parse(localStorage.getItem('ssbjr_analytics') || '[]');
    
    // Processar dados reais e combinar com mock
    const processedData = processAnalyticsData(realAnalytics);
    setAnalytics({ ...mockAnalytics, ...processedData });
  };

  const processAnalyticsData = (data) => {
    const today = new Date().toDateString();
    const todayData = data.filter(item => 
      new Date(item.timestamp).toDateString() === today
    );

    const processed = {
      realtime: {
        totalEvents: data.length,
        todayEvents: todayData.length,
        chatEvents: data.filter(item => item.event.includes('chat')).length,
        groupClicks: data.filter(item => item.event === 'group_link_clicked').length,
        landingPageViews: {}
      }
    };

    // Agrupar por landing page
    data.forEach(item => {
      if (item.landingPage) {
        if (!processed.realtime.landingPageViews[item.landingPage]) {
          processed.realtime.landingPageViews[item.landingPage] = 0;
        }
        processed.realtime.landingPageViews[item.landingPage]++;
      }
    });

    return processed;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ssbjr_sales_auth');
  };

  const exportData = () => {
    const dataToExport = {
      timestamp: new Date().toISOString(),
      timeRange,
      selectedLandingPage,
      analytics: analytics[timeRange]?.[selectedLandingPage] || {}
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ssbjr-analytics-${timeRange}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentData = analytics[timeRange]?.[selectedLandingPage] || analytics[timeRange]?.all || {};

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📊</div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard de Vendas</h1>
            <p className="text-gray-600">Acesso restrito à equipe</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuário
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite seu usuário"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite sua senha"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Entrar no Dashboard
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              <strong>Demo:</strong> vendas / ssbjr2024
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">📊 Dashboard de Vendas</h1>
              <p className="text-gray-600">Estatísticas em tempo real das landing pages</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="today">Hoje</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mês</option>
              </select>
              
              <button
                onClick={exportData}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                📥 Exportar
              </button>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Visitas</p>
                <p className="text-2xl font-bold text-gray-900">{currentData.visits?.toLocaleString() || '0'}</p>
              </div>
              <div className="text-blue-500 text-2xl">👥</div>
            </div>
            <div className="mt-2 text-xs text-green-600">
              +12% vs período anterior
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversões</p>
                <p className="text-2xl font-bold text-gray-900">{currentData.conversions || '0'}</p>
              </div>
              <div className="text-green-500 text-2xl">🎯</div>
            </div>
            <div className="mt-2 text-xs text-green-600">
              Taxa: {currentData.conversionRate || '0'}%
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Chats Iniciados</p>
                <p className="text-2xl font-bold text-gray-900">{currentData.chatStarts || '0'}</p>
              </div>
              <div className="text-purple-500 text-2xl">💬</div>
            </div>
            <div className="mt-2 text-xs text-blue-600">
              +8% engajamento
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tempo Médio</p>
                <p className="text-2xl font-bold text-gray-900">{currentData.avgSessionTime || '0:00'}</p>
              </div>
              <div className="text-orange-500 text-2xl">⏱️</div>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              Bounce: {currentData.bounceRate || '0'}%
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Top Landing Pages */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Performance por Landing Page</h3>
            <div className="space-y-4">
              {currentData.topPages?.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{page.page}</p>
                      <p className="text-sm text-gray-600">{page.visits} visitas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{page.conversions} conversões</p>
                    <p className="text-xs text-gray-500">
                      {((page.conversions / page.visits) * 100).toFixed(1)}% taxa
                    </p>
                  </div>
                </div>
              )) || <p className="text-gray-500">Nenhum dado disponível</p>}
            </div>
          </div>

          {/* Chat Metrics */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💬 Métricas do Chat</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total de Chats</span>
                <span className="font-bold">{currentData.chatMetrics?.totalChats || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chats Completos</span>
                <span className="font-bold text-green-600">{currentData.chatMetrics?.completedChats || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tempo Resposta</span>
                <span className="font-bold">{currentData.chatMetrics?.avgResponseTime || '0:00'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Satisfação</span>
                <span className="font-bold text-yellow-600">⭐ {currentData.chatMetrics?.satisfactionRate || '0'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Group Links Performance */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔗 Performance dos Grupos</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">📱</div>
              <p className="text-sm text-gray-600">WhatsApp</p>
              <p className="text-xl font-bold text-green-600">{currentData.groupClicks?.whatsapp || '0'} cliques</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">✈️</div>
              <p className="text-sm text-gray-600">Telegram</p>
              <p className="text-xl font-bold text-blue-600">{currentData.groupClicks?.telegram || '0'} cliques</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🎮</div>
              <p className="text-sm text-gray-600">Discord</p>
              <p className="text-xl font-bold text-purple-600">{currentData.groupClicks?.discord || '0'} cliques</p>
            </div>
          </div>
        </div>

        {/* Real-time Data */}
        {analytics.realtime && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Dados em Tempo Real</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Eventos</p>
                <p className="text-lg font-bold">{analytics.realtime.totalEvents}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Eventos Hoje</p>
                <p className="text-lg font-bold text-blue-600">{analytics.realtime.todayEvents}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Chats</p>
                <p className="text-lg font-bold text-green-600">{analytics.realtime.chatEvents}</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Grupos</p>
                <p className="text-lg font-bold text-purple-600">{analytics.realtime.groupClicks}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}