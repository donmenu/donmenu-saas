'use client'

import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Escolha o plano ideal</h1>
        <p className="text-gray-500 mb-12">Comece gratuitamente e evolua conforme seu negócio cresce.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plano Grátis */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-purple-600 mb-2">Grátis</h2>
            <p className="text-3xl font-bold text-gray-900 mb-4">R$ 0</p>
            <ul className="text-gray-600 mb-6 space-y-2 text-sm">
              <li>✅ 1 restaurante</li>
              <li>✅ Até 20 produtos no cardápio</li>
              <li>✅ Fichas técnicas básicas</li>
              <li>❌ Sem suporte</li>
            </ul>
            <Link href="/pricing/assinar?plano=gratis">
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded-md">
                Começar grátis
              </button>
            </Link>
          </div>

          {/* Plano Básico */}
          <div className="border-2 border-purple-500 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-purple-600 mb-2">Básico</h2>
            <p className="text-3xl font-bold text-gray-900 mb-4">R$ 39/mês</p>
            <ul className="text-gray-600 mb-6 space-y-2 text-sm">
              <li>✅ Até 3 restaurantes</li>
              <li>✅ Produtos ilimitados</li>
              <li>✅ Controle de custos e margem</li>
              <li>✅ Suporte por e-mail</li>
            </ul>
            <Link href="/pricing/assinar?plano=basico">
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded-md">
                Assinar plano
              </button>
            </Link>
          </div>

          {/* Plano Profissional */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-purple-600 mb-2">Profissional</h2>
            <p className="text-3xl font-bold text-gray-900 mb-4">R$ 89/mês</p>
            <ul className="text-gray-600 mb-6 space-y-2 text-sm">
              <li>✅ Restaurantes ilimitados</li>
              <li>✅ Relatórios avançados</li>
              <li>✅ Múltiplos usuários</li>
              <li>✅ Suporte prioritário</li>
            </ul>
            <Link href="/pricing/assinar?plano=profissional">
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded-md">
                Assinar plano
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
