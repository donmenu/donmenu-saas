'use client'

export default function WelcomePage() {
  return (
    <div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="mt-8 text-center text-base text-gray-400">
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo</h1>
            <p className="mt-4 text-lg text-gray-500">O Don Menu é um plataforma web que ajuda você a precificar e gerir suas vendas</p>
          <div>
            <form>
              <input type="text" placeholder="Nome" />
              <input type="text" placeholder="Email" />                  
              <button type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>                  
    </div>
  )
}
