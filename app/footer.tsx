import Link from 'next/link'
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo e descrição */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-lg">D</span>
                            </div>
                            <span className="text-xl font-bold">Don Menu</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Transformando pequenos restaurantes com tecnologia simples e inteligente. 
                            Precificação, controle de custos e gestão completa do seu negócio.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <span className="sr-only">YouTube</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Produto */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Produto</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                                    Planos e preços
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing/assinar" className="text-gray-400 hover:text-white transition-colors">
                                    Começar grátis
                                </Link>
                            </li>
                            <li>
                                <Link href="/sobre" className="text-gray-400 hover:text-white transition-colors">
                                    Sobre nós
                                </Link>
                            </li>
                            <li>
                                <Link href="/contato" className="text-gray-400 hover:text-white transition-colors">
                                    Contato
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Recursos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Recursos</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                                    Blog e dicas
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog/artigos/precificacao" className="text-gray-400 hover:text-white transition-colors">
                                    Guia de precificação
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog/artigos/clientes" className="text-gray-400 hover:text-white transition-colors">
                                    Como vender mais
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog/artigos/erros-comuns" className="text-gray-400 hover:text-white transition-colors">
                                    Erros comuns
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Suporte */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Suporte</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/contato" className="text-gray-400 hover:text-white transition-colors">
                                    Central de ajuda
                                </Link>
                            </li>
                            <li>
                                <Link href="/contato" className="text-gray-400 hover:text-white transition-colors">
                                    Fale conosco
                                </Link>
                            </li>
                            <li>
                                <Link href="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors">
                                    Termos de uso
                                </Link>
                            </li>
                            <li>
                                <Link href="/politica-de-privacidade" className="text-gray-400 hover:text-white transition-colors">
                                    Política de privacidade
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Contato */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center">
                            <EnvelopeIcon className="w-5 h-5 text-green-500 mr-3" />
                            <span className="text-gray-400">contato@donmenu.com.br</span>
                        </div>
                        <div className="flex items-center">
                            <PhoneIcon className="w-5 h-5 text-green-500 mr-3" />
                            <span className="text-gray-400">(11) 99999-9999</span>
                        </div>
                        <div className="flex items-center">
                            <MapPinIcon className="w-5 h-5 text-green-500 mr-3" />
                            <span className="text-gray-400">São Paulo, SP - Brasil</span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © 2024 Don Menu. Todos os direitos reservados. 
                        Feito com ❤️ para pequenos empreendedores da gastronomia.
                    </p>
                </div>
            </div>
        </footer>
    )
}

