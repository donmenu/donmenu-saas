export default function ClientesPage() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-purple-600 mb-6">Como conquistar e fidelizar seus clientes</h1>
        <p className="text-gray-700 mb-4">
          Um cliente fiel vale muito mais do que um novo. Conheça técnicas para conquistar e manter quem já comprou de você:
        </p>
        <ol className="list-decimal ml-6 space-y-2 text-gray-600">
          <li><strong>Tenha um atendimento excepcional</strong>: escute, resolva e encante.</li>
          <li><strong>Crie uma experiência memorável</strong>: ambiente, entrega, embalagem e sabor contam.</li>
          <li><strong>Ofereça vantagens exclusivas</strong>: descontos, programa de pontos ou brindes.</li>
        </ol>
      </div>
    );
  }