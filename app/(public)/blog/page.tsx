'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const artigos = [
  {
    titulo: '5 Estratégias de Branding para Restaurantes',
    descricao: 'Descubra como criar uma marca forte e memorável para o seu restaurante e se destacar no mercado.',
    autor: 'Wellington P.',
    data: '2024-07-20',
    imagem: '/images/logo.png',
    slug: '/blog/artigos/branding',
    categoria: 'Branding'
  },
  {
    titulo: 'Como Calcular o Preço de Venda dos Seus Pratos',
    descricao: 'Aprenda o passo a passo para precificar corretamente os pratos do seu cardápio e garantir a lucratividade.',
    autor: 'Leticia G.',
    data: '2024-07-18',
    imagem: '/images/recipe.png',
    slug: '/blog/artigos/calcular',
    categoria: 'Gestão'
  },
  {
    titulo: '7 Dicas para Fidelizar Clientes no seu Restaurante',
    descricao: 'Conheça estratégias eficazes para transformar clientes de primeira viagem em frequentadores assíduos.',
    autor: 'Wellington P.',
    data: '2024-07-15',
    imagem: '/images/taste.svg',
    slug: '/blog/artigos/clientes',
    categoria: 'Marketing'
  },
  {
    titulo: 'O Guia Completo do Delivery para Restaurantes',
    descricao: 'Tudo o que você precisa saber para montar uma operação de delivery de sucesso, do pedido à entrega.',
    autor: 'Leticia G.',
    data: '2024-07-12',
    imagem: '/images/delivery.png',
    slug: '/blog/artigos/delivery',
    categoria: 'Delivery'
  },
  {
    titulo: 'Os 10 Erros Mais Comuns na Gestão de Restaurantes',
    descricao: 'Evite armadilhas comuns que podem comprometer o sucesso do seu negócio. Aprenda com os erros dos outros.',
    autor: 'Wellington P.',
    data: '2024-07-10',
    imagem: '/images/error.png',
    slug: '/blog/artigos/erros-comuns',
    categoria: 'Gestão'
  },
  {
    titulo: 'Engenharia de Cardápio: O que é e Como Aplicar',
    descricao: 'Use a inteligência de dados para otimizar seu cardápio, destacar pratos lucrativos e aumentar suas vendas.',
    autor: 'Leticia G.',
    data: '2024-07-08',
    imagem: '/images/design.svg',
    slug: '/blog/artigos/engenharia-cardapio',
    categoria: 'Gestão'
  },
  {
    titulo: 'Promoções Inteligentes para Atrair Mais Clientes',
    descricao: 'Aprenda a criar ofertas e promoções que realmente funcionam, sem sacrificar sua margem de lucro.',
    autor: 'Wellington P.',
    data: '2024-07-05',
    imagem: '/images/somar.svg',
    slug: '/blog/artigos/promocoes',
    categoria: 'Marketing'
  },
]

const categorias = ['Todos', 'Branding', 'Gestão', 'Marketing', 'Delivery']

export default function BlogPage() {
  const [filtro, setFiltro] = useState('Todos')

  const artigosFiltrados = filtro === 'Todos'
    ? artigos
    : artigos.filter(artigo => artigo.categoria === filtro)

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Blog Don Menu
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Dicas, estratégias e novidades para gestão do seu restaurante.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="flex space-x-2 sm:space-x-4 rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
            {categorias.map(categoria => (
              <button
                key={categoria}
                onClick={() => setFiltro(categoria)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                  ${filtro === categoria
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60'
                  }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {artigosFiltrados.map(artigo => (
            <article key={artigo.slug} className="flex flex-col items-start justify-between bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <Link href={artigo.slug} className="w-full">
                <div className="relative w-full">
                  <Image
                    src={artigo.imagem}
                    alt={`Imagem para o artigo ${artigo.titulo}`}
                    width={800}
                    height={400}
                    className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </Link>
              <div className="max-w-xl p-6 flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={artigo.data} className="text-gray-500 dark:text-gray-400">
                    {new Date(artigo.data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                  <span className="relative z-10 rounded-full bg-green-50 px-3 py-1.5 font-medium text-green-600">
                    {artigo.categoria}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300">
                    <Link href={artigo.slug}>
                      <span className="absolute inset-0" />
                      {artigo.titulo}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {artigo.descricao}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <Image
                    src={artigo.autor === 'Wellington P.' ? '/images/team/wellington.svg' : '/images/team/leticia.svg'}
                    alt={`Foto de ${artigo.autor}`}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full bg-gray-100"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {artigo.autor}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
