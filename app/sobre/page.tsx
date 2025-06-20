import Link from 'next/link'
import { 
  HeartIcon,
  LightBulbIcon,
  UserGroupIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Nossa história
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Somos apaixonados por tecnologia e gastronomia. 
              Criamos o Don Menu para empoderar pequenos empreendedores 
              com ferramentas simples e inteligentes.
            </p>
          </div>
        </div>
      </section>

      {/* História Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Como tudo começou
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Tudo começou em uma pequena lanchonete familiar. Vimos de perto os desafios 
                  que os pequenos empreendedores da gastronomia enfrentam diariamente: 
                  precificar corretamente, controlar custos, organizar cardápios e, 
                  principalmente, focar no que realmente importa - o cliente e o sabor.
                </p>
                <p>
                  Foi então que decidimos criar uma solução que fosse realmente feita 
                  para quem vive da gastronomia. Não queríamos mais um sistema complexo 
                  e caro, mas sim algo simples, prático e acessível.
                </p>
                <p>
                  O Don Menu nasceu dessa vontade de democratizar a tecnologia para 
                  pequenos restaurantes, lanchonetes, cafés e food trucks. 
                  Hoje, ajudamos centenas de empreendedores a vender mais e lucrar melhor.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HeartIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Feito com amor pela gastronomia
                </h3>
                <p className="text-gray-600">
                  Nossa equipe é formada por desenvolvedores, designers e, 
                  principalmente, pessoas que amam comida e tecnologia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão e Valores */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossa missão e valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Acreditamos que tecnologia deve ser simples, acessível e realmente útil
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <LightBulbIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Simplicidade</h3>
              <p className="text-gray-600">
                Acreditamos que a melhor tecnologia é aquela que você nem percebe que está usando. 
                Interface limpa, funcionalidades intuitivas e zero complicação.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <UserGroupIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Acessibilidade</h3>
              <p className="text-gray-600">
                Tecnologia de ponta não deve ser cara. Queremos que qualquer pequeno 
                empreendedor possa ter acesso a ferramentas profissionais.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Inovação</h3>
              <p className="text-gray-600">
                Estamos sempre buscando novas formas de ajudar nossos clientes. 
                IA, automação e ferramentas inteligentes para seu negócio crescer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos números
            </h2>
            <p className="text-xl text-gray-600">
              Resultados que nos orgulham e motivam a continuar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-gray-600">Restaurantes ativos</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50k+</div>
              <p className="text-gray-600">Pedidos processados</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">98%</div>
              <p className="text-gray-600">Satisfação dos clientes</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">24/7</div>
              <p className="text-gray-600">Suporte disponível</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conheça nossa equipe
            </h2>
            <p className="text-xl text-gray-600">
              Pessoas apaixonadas por tecnologia e gastronomia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">W</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Wellington Patriota</h3>
              <p className="text-green-600 font-medium mb-4">CEO & Fundador</p>
              <p className="text-gray-600">
                Desenvolvedor apaixonado por criar soluções que realmente fazem diferença 
                na vida das pessoas. Acredita que tecnologia deve ser simples e acessível.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">L</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Letícia Costa</h3>
              <p className="text-purple-600 font-medium mb-4">Head de Produto</p>
              <p className="text-gray-600">
                Especialista em experiência do usuário e design de produtos. 
                Garante que o Don Menu seja intuitivo e realmente útil para nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por que escolher */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o Don Menu?
            </h2>
            <p className="text-xl text-gray-600">
              Diferenciais que fazem a diferença para o seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Feito para pequenos negócios</h3>
                  <p className="text-gray-600">
                    Não somos um sistema genérico. O Don Menu foi criado especificamente 
                    para restaurantes, lanchonetes e cafés.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Assistente de IA integrado</h3>
                  <p className="text-gray-600">
                    Tire dúvidas, peça sugestões e automatize tarefas com nosso 
                    assistente inteligente que fala a sua língua.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Precificação inteligente</h3>
                  <p className="text-gray-600">
                    Calcule automaticamente custos, margens e preços sugeridos 
                    para maximizar seu lucro sem perder clientes.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Suporte humano e atencioso</h3>
                  <p className="text-gray-600">
                    Nossa equipe conhece o seu negócio e está sempre pronta para ajudar. 
                    Não somos uma empresa gigante e distante.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Preços justos e transparentes</h3>
                  <p className="text-gray-600">
                    Sem surpresas, sem taxas ocultas. Planos claros que crescem 
                    junto com o seu negócio.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Atualizações constantes</h3>
                  <p className="text-gray-600">
                    Estamos sempre melhorando o sistema com base no feedback 
                    dos nossos clientes. Seu sucesso é nosso sucesso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para fazer parte da nossa história?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Junte-se a centenas de pequenos empreendedores que já estão 
            transformando seus negócios com o Don Menu.
          </p>
          <Link
            href="/pricing/assinar"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
          >
            Começar agora - É grátis!
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
} 