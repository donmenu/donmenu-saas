'use client'

import { useTheme } from '../lib/contexts/ThemeContext'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Evitar hidratação incorreta
  useEffect(() => {
    setMounted(true)
  }, [])

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  // Renderizar um placeholder durante SSR
  if (!mounted) {
    return (
      <div
        className={`
          ${sizeClasses[size]}
          ${className}
          relative inline-flex items-center justify-center
          rounded-lg border border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-700 dark:text-gray-200
          transition-all duration-200 ease-in-out
          shadow-sm
        `}
      >
        <div className={iconSizes[size]} />
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        ${className}
        relative inline-flex items-center justify-center
        rounded-lg border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        text-gray-700 dark:text-gray-200
        hover:bg-gray-50 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
        transition-all duration-200 ease-in-out
        shadow-sm hover:shadow-md
      `}
      aria-label={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      <div className="relative">
        {/* Ícone do Sol */}
        <SunIcon 
          className={`
            ${iconSizes[size]}
            transition-all duration-300 ease-in-out
            ${theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-0 absolute'
            }
          `}
        />
        
        {/* Ícone da Lua */}
        <MoonIcon 
          className={`
            ${iconSizes[size]}
            transition-all duration-300 ease-in-out
            ${theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0 absolute'
            }
          `}
        />
      </div>
    </button>
  )
} 