'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ArtigoPrecificacao() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <header className="mb-10 text-center">
        <Image
          src="/images/capa-price.png"
          alt="Imagem de precificação"
          width={800}
          height={400}
          className="mx-auto rounded-lg shadow-md"
        />
        <h1 className="text-4xl font-bold text-purple-700 leading-tight mt-6 mb-2">
          Como precificar corretamente e por que isso é crucial para seu restaurante
        </h1>
        <p className="text-lg text-gray-600">
          Entenda o impacto da precificação nos lucros e na sustentabilidade do seu negócio gastronômico.
        </p>
      </header>

      <section className="space-y-6">
        <p>
          A precificação correta dos produtos é um dos pilares do sucesso de qualquer restaurante. Muitos empreendedores
          erram ao basear os preços apenas na concorrência ou no achismo, ignorando os custos reais. Isso gera prejuízos
          silenciosos e limita o crescimento.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600">1. Entenda seus custos</h2>
        <p>Comece identificando tudo que compõe o custo de um prato:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Ingredientes e insumos</li>
          <li>Embalagens (especialmente no delivery)</li>
          <li>Despesas operacionais (energia, gás, água)</li>
          <li>Salários e encargos da equipe</li>
          <li>Taxas de aplicativos, impostos e comissões</li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-600">2. Defina sua margem de lucro</h2>
        <p>
          Após saber o custo real, defina quanto deseja lucrar. Exemplo:
        </p>
        <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-800 font-mono">
          Preço Final = Custo / (1 - Margem)<br />
          R$ 10 / (1 - 0,60) = R$ 25,00
        </div>

        <h2 className="text-2xl font-semibold text-purple-600">3. Analise o mercado, mas não copie</h2>
        <p>
          Pesquise o preço médio praticado, mas adapte à sua realidade. Seus custos e propostas são únicos.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600">4. Atualize os preços periodicamente</h2>
        <p>
          Os insumos mudam de preço com frequência. Faça revisões mensais nas fichas técnicas para evitar prejuízos.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600">5. A importância da precificação inteligente</h2>
        <p>Com uma precificação bem feita, você garante que seu negócio:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Tenha lucro real</li>
          <li>Seja sustentável</li>
          <li>Tenha clareza financeira</li>
          <li>Transmita valor ao cliente</li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-600">Conclusão</h2>
        <p>
          Precificar é mais que definir um valor — é decidir o futuro do seu negócio. Utilize fichas técnicas e revise
          periodicamente os preços para manter a lucratividade e crescer de forma consistente.
        </p>
      </section>

      <footer className="mt-12 border-t pt-6 text-center space-y-4">
        <p className="text-gray-500">Gostou deste artigo? Compartilhe com outros empreendedores!</p>
        <div className="flex justify-center gap-4">
          <Link href="#" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Compartilhar no Facebook</Link>
          <Link href="#" className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-sm">Compartilhar no Twitter</Link>
          <Link href="#" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm">Compartilhar no WhatsApp</Link>
        </div>
      </footer>
    </article>
  );
}
