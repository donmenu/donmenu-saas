export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Página não encontrada</h2>
      <p className="text-gray-500 mb-6">
        O recurso que você está procurando não foi encontrado.
      </p>
      <a
        href="/"
        className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition"
      >
        Voltar para o início
      </a>
    </div>
  );
}
