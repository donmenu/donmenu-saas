'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  CheckCircleIcon, 
  StarIcon,
  CalculatorIcon,
  DocumentTextIcon,
  CogIcon,
  SparklesIcon,
  ArrowRightIcon,
  PlayIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
  BoltIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import LeadCapturePopup from '../../components/LeadCapturePopup'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  // Mostrar popup após 30 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 30000) // 30 segundos

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Por favor, insira seu email')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Aqui você pode integrar com seu sistema de email marketing
      console.log('Email capturado:', email)
      
      setIsSubmitted(true)
      setEmail('')
    } catch (err) {
      setError('Erro ao enviar. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePopupSuccess = (popupEmail: string) => {
    console.log('Email capturado via popup:', popupEmail)
    // Aqui você pode integrar com seu sistema de email marketing
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section com Formulário */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo Principal */}
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-8">
                <SparklesIcon className="w-4 h-4 mr-2" />
                🎯 Oferta Especial: 7 dias grátis + 50% de desconto
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Transforme seu restaurante em{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  30 dias
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                <strong>500+ restaurantes</strong> já aumentaram seus lucros com o Don Menu. 
                Precificação inteligente, controle de custos e assistente de IA - tudo em um só lugar.
              </p>

              {/* Benefícios Rápidos */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700 dark:text-gray-200">Aumente seu lucro em até 40%</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700 dark:text-gray-200">Configure em menos de 10 minutos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700 dark:text-gray-200">Suporte especializado incluso</span>
                </div>
              </div>

              {/* CTA Principal */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/pricing/assinar"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105"
                >
                  Começar Agora - Grátis
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Ver Demo (2 min)
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-800"></div>
                    ))}
                  </div>
                  <span>500+ restaurantes ativos</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>4.9/5 (127 avaliações)</span>
                </div>
              </div>
            </div>

            {/* Formulário de Captura */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Quer aumentar seu lucro?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receba nosso guia gratuito + 7 dias de teste
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Seu melhor email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Enviando...' : 'Quero aumentar meu lucro!'}
                  </button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    ✓ Sem spam • ✓ Cancelar quando quiser • ✓ Dados seguros
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Email enviado com sucesso!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Verifique sua caixa de entrada. Enviamos o guia em até 5 minutos.
                  </p>
                </div>
              )}

              {/* Garantias */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <ShieldCheckIcon className="w-4 h-4 mr-1" />
                    <span>100% Seguro</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>Setup em 10min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Problemas */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cansado de perder dinheiro?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Se você se identifica com algum desses problemas, o Don Menu é para você
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg border-l-4 border-red-500">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-6">
                <CalculatorIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Não sabe quanto cobrar</h3>
              <p className="text-gray-600 dark:text-gray-300">
                "Estou sempre em dúvida se estou cobrando o preço certo. Às vezes acho que estou perdendo dinheiro."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg border-l-4 border-orange-500">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-6">
                <DocumentTextIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ficha técnica manual</h3>
              <p className="text-gray-600 dark:text-gray-300">
                "Passo horas calculando ingredientes e custos. É muito trabalho e sempre tem erro."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg border-l-4 border-purple-500">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                <CogIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Controle de custos difícil</h3>
              <p className="text-gray-600 dark:text-gray-300">
                "Não consigo acompanhar onde estou gastando mais. Os custos sempre fogem do controle."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Soluções */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Como o Don Menu resolve isso
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ferramentas inteligentes que transformam seu restaurante em 30 dias
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <CalculatorIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Precificação Automática</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                O sistema calcula automaticamente o preço ideal baseado nos custos e margem desejada.
              </p>
              <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                <BoltIcon className="w-4 h-4 mr-2" />
                Resultado em 2 minutos
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ficha Técnica Digital</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Crie fichas técnicas completas em minutos, sem planilhas ou cálculos manuais.
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                <BoltIcon className="w-4 h-4 mr-2" />
                10x mais rápido
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <ChartBarIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Controle Total</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Visualize relatórios em tempo real e identifique onde otimizar seus custos.
              </p>
              <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium">
                <BoltIcon className="w-4 h-4 mr-2" />
                Dados em tempo real
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Resultados */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Resultados reais de restaurantes como o seu
          </h2>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
            Veja como outros pequenos restaurantes transformaram seus negócios
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-4xl font-bold text-white mb-2">40%</div>
              <div className="text-green-100">Aumento médio no lucro</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-4xl font-bold text-white mb-2">2h</div>
              <div className="text-green-100">Tempo economizado por dia</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-4xl font-bold text-white mb-2">30 dias</div>
              <div className="text-green-100">Para ver os primeiros resultados</div>
            </div>
          </div>

          <Link 
            href="/pricing/assinar"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
          >
            Quero esses resultados também
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Histórias reais de restaurantes que transformaram seus negócios
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                &quot;Em 30 dias, meu lucro aumentou 35%. O Don Menu me mostrou exatamente onde eu estava perdendo dinheiro.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 dark:text-green-400 font-semibold">A</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Ana Silva</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Bistrô da Ana - São Paulo</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                &quot;A precificação automática mudou tudo. Agora sei exatamente quanto cobrar e meu faturamento aumentou 40%.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">C</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Carlos Santos</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Cantinho do Chef - Rio de Janeiro</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                &quot;O assistente de IA é incrível! Responde todas minhas dúvidas e me ajuda a tomar decisões melhores.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">M</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Maria Costa</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Pizzaria Maria - Belo Horizonte</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pronto para transformar seu restaurante?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a 500+ restaurantes que já estão lucrando mais com o Don Menu
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link 
              href="/pricing/assinar"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105"
            >
              Começar Agora - Grátis por 7 dias
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            
            <Link 
              href="/contato"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              Falar com especialista
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <HeartIcon className="w-4 h-4 text-red-500 mr-2" />
              Feito para pequenos restaurantes
            </div>
            <div className="flex items-center">
              <ShieldCheckIcon className="w-4 h-4 text-green-500 mr-2" />
              100% seguro e confiável
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 text-blue-500 mr-2" />
              Setup em 10 minutos
            </div>
          </div>
        </div>
      </section>

      {/* Popup de Captura de Leads */}
      <LeadCapturePopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onSuccess={handlePopupSuccess}
      />
    </div>
  )
} 