'use client'

export default function WelcomePage() {
  return (
    <div className="bg-white">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Como funciona?</h1>

    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8">
      <div className="flex flex-col items-center mt-8">
        <svg className="w-16 h-16 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <h2 className="text-xl font-bold text-gray-900">Passo 1: Cadastre-se</h2>
        <p className="text-gray-500 mt-2 text-center">Crie uma conta gratuita no Don Menu preenchendo o formulário de cadastro.</p>
      </div>

      <div className="flex flex-col items-center mt-8">
        <svg className="w-16 h-16 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <h2 className="text-xl font-bold text-gray-900">Passo 2: Monte Fichas Técnicas</h2>
        <p className="text-gray-500 mt-2 text-center">Crie fichas técnicas detalhadas para cada produto do seu cardápio, incluindo ingredientes, medidas e instruções.</p>
      </div>

      <div className="flex flex-col items-center mt-8">
        <svg className="w-16 h-16 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <h2 className="text-xl font-bold text-gray-900">Passo 3: Aplique e Venda</h2>
        <p className="text-gray-500 mt-2 text-center">Aplique as fichas técnicas aos produtos do seu cardápio e comece a vender com preços precisos e informações completas.</p>
      </div>
    </div>

    <div className="max-w-md mx-auto mt-12">
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nome
          </label>
          <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="text" id="name" placeholder="Seu nome" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="email" id="email" placeholder="Seu email" />
        </div>
        <p className="text-gray-500 text-sm italic mb-4">No momento, estamos apenas cadastrando interessados em nossa lista de espera. Em breve, informaremos sobre o lançamento.</p>
        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</div>


    
  )
}
