'use client'

export default function AssinarPlanoPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Assinar Plano
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome completo</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="email@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Escolha o plano</label>
            <select
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option>Grátis - R$0/mês</option>
              <option>Básico - R$39/mês</option>
              <option>Profissional - R$89/mês</option>
            </select>
          </div>

          {/* Simulação de botão de pagamento */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition"
          >
            Confirmar Assinatura
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          Ao confirmar, você concorda com os <a href="#" className="underline">Termos de uso</a>.
        </p>
      </div>
    </div>
  );
}
