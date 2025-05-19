'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const artigos = [
  {
    slug: 'calcular',
    titulo: 'Como calcular corretamente',
    resumo: 'Saiba cada detalhe e aplique em seu estabelecimento!',
    imagem: '/images/diet.svg',
    categoria: 'Gestão',
    tags: ['#precificacao', '#cardapio'],
  },
  {
    slug: 'promocoes',
    titulo: 'Como planejar promoções?',
    resumo: 'Saiba os truques dos grandes restaurantes',
    imagem: '/images/eat.svg',
    categoria: 'Marketing',
    tags: ['#empreendedorismo', '#gastronomia', '#promocao'],
  },
  {
    slug: 'clientes',
    titulo: 'Conquistando clientes!',
    resumo: 'Vender é a alma do negócio. Fique por dentro!',
    imagem: '/images/chef.svg',
    categoria: 'Vendas',
    tags: ['#vendas', '#cardapio', '#marketing'],
  },
  {
    slug: 'delivery',
    titulo: 'Aumento do número de pedidos delivery',
    resumo: 'Aumente sua receita com nossas dicas',
    imagem: '/images/street.svg',
    categoria: 'Delivery',
    tags: ['#delivery', '#vendas', '#planejamento'],
  },
  {
    slug: 'branding',
    titulo: 'Construa uma marca forte',
    resumo: 'Branding vai além do logo: crie uma identidade memorável.',
    imagem: '/images/brand.png',
    categoria: 'Marca',
    tags: ['#marca', '#identidade', '#branding'],
  },
  {
    slug: 'erros-comuns',
    titulo: '5 erros comuns em restaurantes',
    resumo: 'Evite os principais erros que impactam seu negócio.',
    imagem: '/images/error.png',
    categoria: 'Gestão',
    tags: ['#gestao', '#dicas', '#restaurante'],
  },
  {
    slug: 'precificacao',
    titulo: 'A importância da precificação',
    resumo: 'Entenda como precificar corretamente e garantir lucro no seu restaurante.',
    imagem: '/images/price.png',
    categoria: 'Financeiro',
    tags: ['#precificacao', '#lucro', '#gestao']
  },
  {
    slug: 'como-fazer-ficha-tecnica',
    titulo: 'Como montar uma ficha técnica de produto',
    resumo: 'Passo a passo para organizar seus insumos e custos.',
    imagem: '/images/recipe.png',
    categoria: 'Cozinha',
    tags: ['#fichatecnica', '#insumos', '#custos']
  }
]

export default function Blog() {
  const [filtro, setFiltro] = useState('Todos')
  const categorias = ['Todos', ...new Set(artigos.map(a => a.categoria))]

  const artigosFiltrados = filtro === 'Todos' ? artigos : artigos.filter(a => a.categoria === filtro)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8">Conteúdos para transformar seu restaurante</h1>

        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filtro === cat ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artigosFiltrados.map((artigo) => (
            <Link href={`/blog/artigos/${artigo.slug}`} key={artigo.slug}>
              <div className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={artigo.imagem}
                    alt={artigo.titulo}
                    fill
                    className="object-contain p-6"
                  />
                </div>
                <div className="px-6 pb-6">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition mt-4 mb-2">
                    {artigo.titulo}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 min-h-[60px]">{artigo.resumo}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {artigo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 italic">Categoria: {artigo.categoria}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
