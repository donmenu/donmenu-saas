'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface LeadCapturePopupProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (email: string) => void
}

export default function LeadCapturePopup({ isOpen, onClose, onSuccess }: LeadCapturePopupProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Por favor, insira seu email')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onSuccess(email)
      setIsSubmitted(true)
      setEmail('')
      
      // Fechar popup após 3 segundos
      setTimeout(() => {
        onClose()
        setIsSubmitted(false)
      }, 3000)
    } catch (err) {
      setError('Erro ao enviar. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🎯 Oferta Especial!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receba nosso guia gratuito + 7 dias de teste do Don Menu
              </p>
            </div>

            {/* Benefícios */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-200">Guia: Como aumentar 40% seu lucro</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-200">7 dias grátis do Don Menu</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-200">Consultoria gratuita de 30 min</span>
              </div>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="popup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Seu melhor email
                </label>
                <input
                  type="email"
                  id="popup-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {error && (
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Quero aumentar meu lucro!'}
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                ✓ Sem spam • ✓ Cancelar quando quiser • ✓ Dados seguros
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Email enviado com sucesso!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Verifique sua caixa de entrada. Enviamos o guia em até 5 minutos.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 