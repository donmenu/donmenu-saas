'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { 
  Bars3Icon, 
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">
                  <Image src="/images/logo.svg" alt="Don Menu" width={32} height={32} />
                </span>
              </div>
              <span className="text-xl font-bold text-gray-900">Don Menu</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Produto Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
                className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
              >
                Produto
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              {isProductMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link 
                    href="/pricing" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600"
                    onClick={() => setIsProductMenuOpen(false)}
                  >
                    Planos e preços
                  </Link>
                  <Link 
                    href="/sobre" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600"
                    onClick={() => setIsProductMenuOpen(false)}
                  >
                    Sobre nós
                  </Link>
                  <Link 
                    href="/contato" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600"
                    onClick={() => setIsProductMenuOpen(false)}
                  >
                    Contato
                  </Link>
                </div>
              )}
            </div>

            <Link href="/blog" className="text-gray-700 hover:text-green-600 transition-colors">
              Blog
            </Link>

            <Link href="/contato" className="text-gray-700 hover:text-green-600 transition-colors">
              Suporte
            </Link>

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <Image src={session.user?.image || '/images/logo.svg'} alt={session.user?.name || 'Usuário'} width={32} height={32} className="w-8 h-8 rounded-full" />
                  <span className="font-medium text-gray-900">{session.user?.name?.split(' ')[0]}</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-xs text-gray-500">{session.user?.email}</p>
                    </div>
                    <Link href="/dashboard" className="block px-4 py-2 text-green-700 font-bold bg-green-50 hover:bg-green-100 border-l-4 border-green-600">Dashboard</Link>
                    <Link href="/dashboard/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Editar perfil</Link>
                    <Link href="/dashboard/assinatura" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Assinatura</Link>
                    <Link href="/dashboard/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Configurações</Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/pricing/assinar"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Começar grátis
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Produto</h3>
                <div className="space-y-2 pl-4">
                  <Link 
                    href="/pricing" 
                    className="block text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Planos e preços
                  </Link>
                  <Link 
                    href="/sobre" 
                    className="block text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sobre nós
                  </Link>
                  <Link 
                    href="/contato" 
                    className="block text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contato
                  </Link>
                </div>
              </div>

              <Link 
                href="/blog" 
                className="block text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>

              <Link 
                href="/contato" 
                className="block text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Suporte
              </Link>

              {session ? (
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="block text-green-700 font-bold bg-green-50 hover:bg-green-100 border-l-4 border-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="block text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Editar perfil
                  </Link>
                  <Link
                    href="/dashboard/assinatura"
                    className="block text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Assinatura
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Configurações
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block text-red-600 hover:bg-red-50 w-full text-left px-4 py-2"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    className="block text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/pricing/assinar"
                    className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Começar grátis
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
}
