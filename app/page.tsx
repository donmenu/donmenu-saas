import Link from 'next/link'
import { 
  CheckCircleIcon, 
  StarIcon,
  UserGroupIcon,
  CalculatorIcon,
  DocumentTextIcon,
  CogIcon,
  SparklesIcon,
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-8">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Assistente de IA integrado
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Transforme seu restaurante com{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                tecnologia simples e inteligente
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              O Don Menu é o sistema feito para quem vive da gastronomia: precifique melhor, 
              controle custos, organize seu negócio e conte com um assistente de IA que fala a sua língua.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                href="/pricing/assinar"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105"
              >
                Comece grátis agora
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              
              <Link 
                href="/pricing"
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                Ver planos e preços
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                Teste grátis por 7 dias
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                Sem cartão de crédito
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                Cancele quando quiser
              </div>
            </div>
          </div>
        </div>
        
        {/* Video Preview */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlayIcon className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Veja o Don Menu em ação</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tudo o que o pequeno restaurante precisa, em um só lugar
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ferramentas práticas e inteligentes para você focar no que importa: 
              seu cliente e seu sabor.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <CalculatorIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Precificação Inteligente</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Saiba exatamente quanto cobrar em cada prato, com cálculo automático de custos e margem.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ficha Técnica Automatizada</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monte fichas técnicas completas em minutos, sem complicação.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <CogIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Controle de Custos por Item</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Veja onde está gastando mais e otimize seu cardápio.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Assistente de IA</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tire dúvidas, peça sugestões e automatize tarefas com um assistente que entende seu negócio.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <UserGroupIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ferramentas para Vender Mais</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Gere cardápio digital, QR Code para mesas, controle de pedidos e muito mais.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Gestão Simples e Visual</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Relatórios, gráficos e alertas para você tomar decisões rápidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Quem usa, recomenda
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Pequenos empreendedores que transformaram seus negócios com o Don Menu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                &quot;O Don Menu me ajudou a entender meus custos e aumentar meu lucro. 
                O assistente de IA é como ter um consultor na cozinha!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 dark:text-green-400 font-semibold">A</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Ana Silva</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Dona do Bistrô da Ana</p>
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
                &quot;Finalmente um sistema que fala a língua do restaurante. 
                Simples, prático e que realmente resolve meus problemas.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">C</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Carlos Santos</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Chef do Cantinho do Chef</p>
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
                &quot;A precificação inteligente mudou meu negócio. 
                Agora sei exatamente quanto cobrar e meu lucro aumentou 30%.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">M</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Maria Costa</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Proprietária da Pizzaria Maria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para transformar seu restaurante?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de pequenos empreendedores que já estão usando o Don Menu 
            para crescer seus negócios.
          </p>
          <Link 
            href="/pricing/assinar"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
          >
            Começar agora - Grátis por 7 dias
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}
