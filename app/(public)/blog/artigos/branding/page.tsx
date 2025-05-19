export default function BrandingPage() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-purple-600 mb-6">Construa uma marca forte no seu restaurante</h1>
        <p className="text-gray-700 mb-4">
          Branding é mais do que logotipo. Sua marca é a percepção que o cliente tem da experiência como um todo.
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-600">
          <li><strong>Identidade visual consistente</strong>: use cores, fontes e estilo iguais em todos os canais.</li>
          <li><strong>Tom de voz definido</strong>: sua comunicação deve ter personalidade, seja informal ou elegante.</li>
          <li><strong>Experiência unificada</strong>: do atendimento à entrega, tudo deve transmitir a essência da sua marca.</li>
        </ul>
      </div>
    );
  }