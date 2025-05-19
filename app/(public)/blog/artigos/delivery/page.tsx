export default function DeliveryPage() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-purple-600 mb-6">Aumente seus pedidos no delivery</h1>
        <p className="text-gray-700 mb-4">
          O delivery é uma fonte importante de receita. Veja como aumentar seus pedidos:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-600">
          <li><strong>Fotos atrativas</strong>: invista em boas imagens dos seus pratos.</li>
          <li><strong>Descrições claras</strong>: destaque ingredientes, porções e diferenciais.</li>
          <li><strong>Embalagem caprichada</strong>: reforça a experiência e evita problemas.</li>
          <li><strong>Respostas rápidas e avaliações</strong>: mantenha boa reputação nos apps.</li>
        </ul>
      </div>
    );
  }