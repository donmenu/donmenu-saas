export default function ErrosPage() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-purple-600 mb-6">5 erros comuns em restaurantes e como evitá-los</h1>
        <p className="text-gray-700 mb-4">
          Pequenas falhas no dia a dia podem comprometer seus resultados. Veja os mais comuns:
        </p>
        <ol className="list-decimal ml-6 space-y-2 text-gray-600">
          <li><strong>Falta de controle de estoque</strong>: leva ao desperdício e prejuízo.</li>
          <li><strong>Precificação errada</strong>: vender sem lucro é um dos maiores erros.</li>
          <li><strong>Desorganização no atendimento</strong>: gera reclamações e notas ruins.</li>
          <li><strong>Ausência online</strong>: não ter presença digital é perder oportunidades.</li>
          <li><strong>Ignorar o feedback</strong>: ouvir o cliente é chave para melhorar.</li>
        </ol>
      </div>
    );
  }