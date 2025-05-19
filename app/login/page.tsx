'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Acesse sua conta</h1>
        <button
          onClick={() => signIn('google')}
          className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded hover:shadow"
        >
          <FcGoogle className="text-xl" />
          <span>Entrar com Google</span>
        </button>
      </div>
    </div>
  )
}
