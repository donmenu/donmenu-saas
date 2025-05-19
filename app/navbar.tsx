'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

const siteNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Sobre Nós', href: '/sobre' },
  { name: 'Nosso time', href: '/team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Preços', href: '/pricing' },
  { name: 'Contato', href: '/contato' }
];

const dashboardNavigation = [
  { name: 'Painel', href: '/dashboard' },
  { name: 'Configurações', href: '/dashboard/settings' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const navigation = isDashboard ? dashboardNavigation : siteNavigation;

  return (
    <Disclosure as="nav" className={`${isDashboard ? 'bg-gray-900' : 'bg-white'} shadow-sm`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center gap-3">
                <Image src="/images/logo.svg" alt="Logo" width={40} height={40} />
                <span className={`font-bold ${isDashboard ? 'text-white' : 'text-gray-800'}`}>Don Menu</span>
              </div>

              <div className="hidden sm:flex space-x-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? isDashboard
                          ? 'text-white underline'
                          : 'text-gray-900 underline'
                        : isDashboard
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-500 hover:text-gray-700',
                      'text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-4">
                {user ? (
                  <>
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={user.image || 'https://avatar.vercel.sh/leerob'}
                      height={32}
                      width={32}
                      alt={`${user?.name || 'avatar'}`}
                    />
                    <span className={classNames(
                      isDashboard ? 'text-gray-300' : 'text-gray-700',
                      'text-sm'
                    )}>Olá, {user.name}</span>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className={`text-sm ${isDashboard ? 'text-white' : 'text-gray-600'} hover:underline`}
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className={`text-sm ${isDashboard ? 'text-white' : 'text-gray-600'} hover:underline`}
                  >
                    Entrar
                  </button>
                )}
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Abrir menu principal</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {user && (
                <div className="flex items-center gap-3 pl-3 pr-4 py-2">
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={user.image || 'https://avatar.vercel.sh/leerob'}
                    height={32}
                    width={32}
                    alt="avatar"
                  />
                  <span className="text-base font-medium text-gray-800">{user.name}</span>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="ml-auto text-sm text-gray-600 hover:underline"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
