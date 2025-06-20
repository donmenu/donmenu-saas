'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  CheckIcon, 
  XMarkIcon,
  StarIcon,
  SparklesIcon,
  UserGroupIcon,
  CogIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const plans = [
  {
    name: 'Gratuito',
    price: 0,
    description: 'Para começar e testar o sistema',
    features: [
      'Ficha técnica básica',
      'Precificação simples',
      'Controle de custos básico',
      'Cardápio digital',
      '10 produtos',
      '30 pedidos/mês',
      'Suporte por e-mail',
    ],
    notIncluded: [
      'Assistente de IA',
      'Relatórios financeiros',
      'QR Code para mesas',
      'Multiusuário',
      'Integração WhatsApp',
    ],
    cta: 'Começar grátis',
    popular: false,
    color: 'gray'
  },
  {
    name: 'Profissional',
    price: 29,
    description: 'Para quem quer vender mais e controlar melhor',
    features: [
      'Tudo do plano Gratuito',
      'Assistente de IA',
      'Relatórios financeiros',
      'QR Code para mesas',
      'Pedidos por QR Code',
      '100 produtos',
      '300 pedidos/mês',
      'Suporte prioritário',
    ],
    notIncluded: [
      'Multiusuário',
      'Integração WhatsApp',
      'Suporte por telefone',
    ],
    cta: 'Assinar agora',
    popular: true,
    color: 'green'
  },
  {
    name: 'Chef',
    price: 59,
    description: 'Para negócios em crescimento',
    features: [
      'Tudo do plano Profissional',
      'Multiusuário (até 5 usuários)',
      'Relatórios avançados',
      'Gestão de estoque',
      '500 produtos',
      '1000 pedidos/mês',
      'Suporte por WhatsApp',
      'Backup automático',
    ],
    notIncluded: [
      'Integração WhatsApp',
      'Suporte por telefone',
      'Usuários ilimitados',
    ],
    cta: 'Assinar agora',
    popular: false,
    color: 'blue'
  },
  {
    name: 'Restaurante Premium',
    price: 99,
    description: 'Para quem quer tudo ilimitado',
    features: [
      'Tudo do plano Chef',
      'Produtos ilimitados',
      'Pedidos ilimitados',
      'Usuários ilimitados',
      'Integração WhatsApp',
      'Suporte por telefone',
      'Consultoria personalizada',
      'API personalizada',
    ],
    notIncluded: [],
    cta: 'Assinar agora',
    popular: false,
    color: 'purple'
  }
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  const getPrice = (basePrice: number) => {
    if (annual) {
      return Math.round(basePrice * 10) // 2 meses grátis
    }
    return basePrice
  }

  const getPeriod = () => annual ? '/ano' : '/mês'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Planos para cada fase do seu negócio
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Escolha o plano ideal para o tamanho do seu restaurante. 
              Todos os planos incluem teste gratuito de 7 dias.
            </p>
            
            {/* Toggle anual/mensal */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-sm font-medium ${!annual ? 'text-gray-900' : 'text-gray-500'}`}>
                Mensal
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  annual ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    annual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${annual ? 'text-gray-900' : 'text-gray-500'}`}>
                Anual
                {annual && <span className="ml-1 text-green-600 font-bold">(2 meses grátis)</span>}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                plan.popular 
                  ? 'border-green-500 ring-4 ring-green-500/20' 
                  : 'border-gray-200'
              } overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 text-sm font-semibold">
                  Mais Popular
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      R$ {getPrice(plan.price)}
                    </span>
                    <span className="text-gray-500">{getPeriod()}</span>
                  </div>
                  
                  {plan.price > 0 && (
                    <p className="text-sm text-gray-500 mb-6">
                      Teste grátis por 7 dias • Cancele quando quiser
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Incluído no plano:</h4>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Not Included */}
                {plan.notIncluded.length > 0 && (
                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Não incluído:</h4>
                    {plan.notIncluded.map((feature) => (
                      <div key={feature} className="flex items-start">
                        <XMarkIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-500 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <Link
                  href={plan.price === 0 ? '/pricing/assinar' : `/pricing/assinar?plan=${plan.name.toLowerCase()}`}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg transition-all duration-200 ${
                    plan.popular
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                      : plan.price === 0
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.cta}
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dúvidas frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Respostas para as principais dúvidas sobre nossos planos
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                O Don Menu serve para qualquer tipo de restaurante?
              </h3>
              <p className="text-gray-600">
                Sim! Atendemos desde lanchonetes e cafés até restaurantes completos. 
                Nossos planos são escaláveis e se adaptam ao tamanho do seu negócio.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Preciso entender de tecnologia para usar?
              </h3>
              <p className="text-gray-600">
                Não! O sistema é feito para ser simples, visual e com ajuda do nosso assistente de IA. 
                Se tiver dúvidas, nossa equipe está sempre pronta para ajudar.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Posso cancelar quando quiser?
              </h3>
              <p className="text-gray-600">
                Sim, sem burocracia e sem taxas. Você pode cancelar a qualquer momento 
                e continuar usando até o final do período contratado.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Como funciona o plano gratuito?
              </h3>
              <p className="text-gray-600">
                Você pode usar as principais funções sem pagar nada, para sempre. 
                Se precisar de mais recursos, é só mudar de plano quando quiser.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Meus dados estão seguros?
              </h3>
              <p className="text-gray-600">
                Sim, usamos tecnologia de ponta para proteger suas informações. 
                Seus dados são criptografados e ficam armazenados em servidores seguros.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Junte-se a centenas de pequenos empreendedores que já estão 
            vendendo mais e lucrando melhor com o Don Menu.
          </p>
          <Link
            href="/pricing/assinar"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
          >
            Começar agora - É grátis!
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
} 