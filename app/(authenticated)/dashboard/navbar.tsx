'use client';

import { Fragment, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, BellIcon, UserCircleIcon, ArrowRightOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Cardápios', href: '/dashboard/cardapio', current: false },
  { name: 'Fichas Técnicas', href: '/dashboard/ficha-tecnica', current: false },
  { name: 'Pedidos', href: '/dashboard/pedidos', current: false },
  { name: 'Financeiro', href: '/dashboard/financeiro', current: false },
  { name: 'QR Code', href: '/dashboard/qr-code', current: false },
  { name: 'Configurações', href: '/dashboard/settings', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navHovered, setNavHovered] = useState(false);

  // Recolhe menu mobile automaticamente ao sair o mouse
  const handleNavMouseEnter = () => setNavHovered(true);
  const handleNavMouseLeave = () => setNavHovered(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <Disclosure as="nav" className="bg-white shadow fixed top-0 left-0 right-0 z-40" onMouseEnter={handleNavMouseEnter} onMouseLeave={handleNavMouseLeave}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex justify-center items-center">
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-md p-3 hover:bg-indigo-900 transition duration-300">
                    <Image
                      src="/images/logo.svg"
                      alt="Logo"
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  </div>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? 'border-slate-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <div className="relative">
                        <button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {session?.user?.image ? (
                            <Image
                              src={session.user.image}
                              alt={session.user.name || 'Usuário'}
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <UserCircleIcon className="w-8 h-8 text-gray-400" />
                          )}
                          <div className="hidden md:block text-left">
                            <p className="text-sm font-medium text-gray-900">
                              {session?.user?.name || 'Usuário'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {session?.user?.email}
                            </p>
                          </div>
                        </button>
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    {isDropdownOpen && (
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {session?.user?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {session?.user?.email}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false)
                            // Adicionar navegação para configurações
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Cog6ToothIcon className="w-4 h-4 mr-2" />
                          Configurações
                        </button>
                        
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                          Sair
                        </button>
                      </Menu.Items>
                    )}
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className={`sm:hidden transition-all duration-300 ${navHovered || open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700',
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              {session ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {session.user?.image ? (
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={session.user.image}
                          alt={`${session.user.name || 'Usuário'} avatar`}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <UserCircleIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {session.user?.name || 'Usuário'}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {session.user?.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={handleSignOut}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Sair
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => signIn('google')}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </Disclosure.Panel>

          {/* Overlay para fechar dropdown */}
          {isDropdownOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdownOpen(false)}
            />
          )}
        </>
      )}
    </Disclosure>
  );
}
