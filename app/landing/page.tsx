'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'

const features = [
  { name: 'Cardápio Digital com QR Code', description: 'Modernize seu atendimento com um cardápio digital acessível por QR code. Rápido, fácil e sem contato.' },
  { name: 'Gestão de Insumos', description: 'Controle seu estoque em tempo real, evite desperdícios e saiba exatamente quando comprar mais.' },
  { name: 'Ficha Técnica Detalhada', description: 'Padronize suas receitas, calcule custos precisos e garanta a lucratividade de cada prato.' },
  { name: 'Relatórios Inteligentes', description: 'Tome decisões baseadas em dados com relatórios completos sobre vendas, custos e desempenho.' },
]

const testimonials = [
  {
    body: 'O Don Menu transformou a gestão do meu restaurante. A ficha técnica me deu uma visão clara dos meus custos e aumentou minha lucratividade em 20%!',
    author: {
      name: 'Juliana Costa',
      handle: 'Dona Jô Bistrô',
      imageUrl: '/images/team/leticia.svg',
    },
  },
  {
    body: 'A facilidade de atualizar o cardápio digital é incrível. Nossos clientes adoram a agilidade e a modernidade do sistema. Recomendo!',
    author: {
      name: 'Marcos Andrade',
      handle: 'Burger House',
      imageUrl: '/images/team/wellington.svg',
    },
  },
  {
    body: 'Finalmente um sistema que entende as necessidades de um restaurante. O controle de insumos é simples e muito eficaz. Adeus, planilhas!',
    author: {
      name: 'Fernanda Lima',
      handle: 'Cantina da Nona',
      imageUrl: '/images/team/leticia.svg',
    },
  },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <main>
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gray-900">
          <div className="relative z-10 mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                A gestão do seu restaurante, <span className="text-green-400">simples e inteligente</span>.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Do cardápio digital à ficha técnica, o Don Menu oferece todas as ferramentas para você lucrar mais e gerenciar melhor.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/pricing/assinar"
                  className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-transform transform hover:scale-105"
                >
                  Começar agora
                </Link>
                <Link href="/sobre" className="text-sm font-semibold leading-6 text-white">
                  Saber mais <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl lg:text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 className="text-base font-semibold leading-7 text-green-600">Tudo em um só lugar</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                O sistema completo para o seu negócio
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Controle total sobre sua operação, desde o que o cliente vê no cardápio até o seu lucro no final do mês.
              </p>
            </motion.div>
            <motion.div
              className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                        <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="relative isolate overflow-hidden bg-gray-50 dark:bg-gray-800 px-6 py-24 sm:py-32 lg:px-8">
           <div className="absolute inset-0 opacity-10 z-0">
             <Image src="/images/taste.svg" layout="fill" objectFit="cover" alt="background pattern" />
           </div>
          <div className="relative mx-auto max-w-2xl lg:max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Quem usa, aprova!
              </h2>
              <p className="text-center mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Veja o que nossos parceiros estão dizendo sobre o Don Menu.
              </p>
              <figure className="mt-10">
                <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 dark:text-white sm:text-2xl sm:leading-9">
                  <p>
                    &quot;O Don Menu transformou a gestão do meu restaurante. A ficha técnica me deu uma visão clara dos meus custos e aumentou minha lucratividade em 20%!&quot;
                  </p>
                </blockquote>
                <figcaption className="mt-10">
                  <Image
                    className="mx-auto h-10 w-10 rounded-full"
                    src="/images/team/leticia.svg"
                    alt="Foto de Juliana Costa"
                    width={40}
                    height={40}
                  />
                  <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-gray-900 dark:text-white">Juliana Costa</div>
                    <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900 dark:fill-white">
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className="text-gray-600 dark:text-gray-400">Dona Jô Bistrô</div>
                  </div>
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="relative isolate overflow-hidden bg-green-700 px-6 pt-16 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Pronto para simplificar sua gestão?
                </h2>
                <p className="mt-6 text-lg leading-8 text-green-100">
                  Experimente o Don Menu e veja na prática como podemos ajudar seu restaurante a crescer.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <Link
                    href="/pricing/assinar"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-green-700 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-transform transform hover:scale-105"
                  >
                    Começar grátis
                  </Link>
                  <Link href="/contato" className="text-sm font-semibold leading-6 text-white">
                    Fale conosco <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="relative mt-16 h-80 lg:mt-8">
                <Image
                  className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                  src="/images/paneldashboard.svg"
                  alt="App screenshot"
                  width={1824}
                  height={1080}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
} 