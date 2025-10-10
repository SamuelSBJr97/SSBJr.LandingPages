'use client';

import { useState, useEffect } from 'react';

export default function GroupLinks({ landingPageSlug }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Configuração de grupos por landing page
    const groupsConfig = {
      'empresa-a': [
        {
          id: 1,
          name: 'Grupo VIP Empresas',
          description: 'Acesso exclusivo para grandes empresas',
          platform: 'whatsapp',
          link: 'https://chat.whatsapp.com/exemplo-empresa-a-vip',
          icon: '👑',
          members: 156,
          isPrivate: true,
          requirements: 'Empresa com +100 funcionários'
        },
        {
          id: 2,
          name: 'Canal Telegram Ofertas',
          description: 'Ofertas especiais e novidades',
          platform: 'telegram',
          link: 'https://t.me/ssbjr_ofertas_empresa_a',
          icon: '🎯',
          members: 342,
          isPrivate: false
        },
        {
          id: 3,
          name: 'Discord Comunidade Tech',
          description: 'Discussões técnicas e networking',
          platform: 'discord',
          link: 'https://discord.gg/ssbjr-tech',
          icon: '💻',
          members: 89,
          isPrivate: true,
          requirements: 'Profissional de TI'
        }
      ],
      'campanha-black-friday': [
        {
          id: 1,
          name: 'Black Friday VIP',
          description: 'Descontos exclusivos até 70%',
          platform: 'whatsapp',
          link: 'https://chat.whatsapp.com/black-friday-vip',
          icon: '🔥',
          members: 1250,
          isPrivate: false,
          urgency: true
        },
        {
          id: 2,
          name: 'Telegram Liquidação',
          description: 'Avisos de produtos em liquidação',
          platform: 'telegram',
          link: 'https://t.me/ssbjr_liquidacao',
          icon: '💰',
          members: 2100,
          isPrivate: false
        }
      ],
      'startup-xyz': [
        {
          id: 1,
          name: 'Founders Club',
          description: 'Networking entre empreendedores',
          platform: 'discord',
          link: 'https://discord.gg/founders-club',
          icon: '🚀',
          members: 234,
          isPrivate: true,
          requirements: 'Founder ou C-Level'
        },
        {
          id: 2,
          name: 'Investidores Angel',
          description: 'Grupo exclusivo para investidores',
          platform: 'whatsapp',
          link: 'https://chat.whatsapp.com/angel-investors',
          icon: '😇',
          members: 45,
          isPrivate: true,
          requirements: 'Investidor angel verificado'
        }
      ]
    };
    
    // Carregar grupos específicos da landing page
    const pageGroups = groupsConfig[landingPageSlug] || [];
    setGroups(pageGroups);
  }, [landingPageSlug]);

  const handleGroupClick = (group) => {
    // Registrar clique para analytics
    const analytics = JSON.parse(localStorage.getItem('ssbjr_analytics') || '[]');
    analytics.push({
      timestamp: new Date().toISOString(),
      event: 'group_link_clicked',
      landingPage: landingPageSlug,
      groupId: group.id,
      groupName: group.name,
      platform: group.platform
    });
    localStorage.setItem('ssbjr_analytics', JSON.stringify(analytics));

    // Abrir link em nova aba
    window.open(group.link, '_blank', 'noopener,noreferrer');
  };

  const getPlatformColor = (platform) => {
    const colors = {
      whatsapp: 'bg-green-500 hover:bg-green-600',
      telegram: 'bg-blue-500 hover:bg-blue-600',
      discord: 'bg-indigo-500 hover:bg-indigo-600',
      default: 'bg-gray-500 hover:bg-gray-600'
    };
    return colors[platform] || colors.default;
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      whatsapp: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      telegram: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      discord: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
        </svg>
      )
    };
    return icons[platform] || icons.default;
  };

  if (groups.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🔗 Grupos Exclusivos
          </h2>
          <p className="text-lg text-gray-600">
            Conecte-se com nossa comunidade e tenha acesso a benefícios exclusivos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{group.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {group.members} membros
                      </p>
                    </div>
                  </div>
                  {group.isPrivate && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      🔒 Privado
                    </span>
                  )}
                  {group.urgency && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full animate-pulse">
                      🔥 Urgente
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm">
                  {group.description}
                </p>

                {/* Requirements */}
                {group.requirements && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-700">
                      <span className="font-medium">Requisitos:</span> {group.requirements}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => handleGroupClick(group)}
                  className={`w-full flex items-center justify-center space-x-2 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 ${getPlatformColor(group.platform)}`}
                >
                  {getPlatformIcon(group.platform)}
                  <span>Entrar no Grupo</span>
                </button>

                {/* Platform Info */}
                <div className="mt-3 text-center">
                  <span className="text-xs text-gray-500 capitalize">
                    Via {group.platform}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              📱 Não perca nenhuma novidade!
            </h3>
            <p className="text-gray-600 mb-6">
              Nossos grupos são atualizados diariamente com ofertas exclusivas, 
              conteúdos especiais e networking de qualidade.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span className="text-green-500">✓</span>
                <span>Conteúdo exclusivo</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span className="text-green-500">✓</span>
                <span>Networking profissional</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span className="text-green-500">✓</span>
                <span>Ofertas especiais</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}