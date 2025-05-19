'use client'

import Image from 'next/image'
import Link from 'next/link'

const artigos = [
  {
    slug: 'calcular',
    titulo: 'Como calcular corretamente',
    resumo: 'Saiba cada detalhe e aplique em seu estabelecimento!',
    imagem: '/images/diet.svg',
    tags: ['#precificacao', '#cardapio'],
  },
  {
    slug: 'promocoes',
    titulo: 'Como planejar promoções?',
    resumo: 'Saiba os truques dos grandes restaurantes',
    imagem: '/images/eat.svg',
    tags: ['#empreendedorismo', '#gastronomia', '#promocao'],
  },
  {
    slug: 'clientes',
    titulo: 'Conquistando clientes!',
    resumo: 'Vender é a alma do negócio. Fique por dentro!',
    imagem: '/images/chef.svg',
    tags: ['#vendas', '#cardapio', '#marketing'],
  },
  {
    slug: 'delivery',
    titulo: 'Aumento do número de pedidos delivery',
    resumo: 'Aumente sua receita com nossas dicas',
    imagem: '/images/street.svg',
    tags: ['#delivery', '#vendas', '#planejamento'],
  },
  {
    slug: 'branding',
    titulo: 'Construa uma marca forte',
    resumo: 'Branding vai além do logo: crie uma identidade memorável.',
    imagem: '/images/brand.png',
    tags: ['#marca', '#identidade', '#branding'],
  },
  {
    slug: 'erros-comuns',
    titulo: '5 erros comuns em restaurantes',
    resumo: 'Evite os principais erros que impactam seu negócio.',
    imagem: '/images/error.png',
    tags: ['#gestao', '#dicas', '#restaurante'],
  },
]

export default function Blog() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Artigos do Don Menu</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {artigos.map((artigo) => (
            <Link href={`/blog/artigos/${artigo.slug}`} key={artigo.slug}>
              <div className="cursor-pointer w-80 rounded overflow-hidden shadow-lg hover:shadow-xl transition bg-white">
                <div className="flex justify-center pt-4">
                  <Image
                    src={artigo.imagem}
                    alt={artigo.titulo}
                    placeholder="blur"
                    blurDataURL={artigo.imagem}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{artigo.titulo}</div>
                  <p className="text-gray-700 text-base">{artigo.resumo}</p>
                </div>
                <div className="px-6 pt-2 pb-4">
                  {artigo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
