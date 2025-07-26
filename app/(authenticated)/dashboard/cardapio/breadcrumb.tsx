'use client';

import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-6">
      <Link 
        href="/dashboard" 
        className="flex items-center hover:text-gray-700 transition-colors"
      >
        <HomeIcon className="w-4 h-4 mr-1" />
        Dashboard
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRightIcon className="w-4 h-4 mx-1 text-gray-400" />
          {item.current ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : item.href ? (
            <Link 
              href={item.href}
              className="hover:text-gray-700 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-500">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
} 