'use client'

import { useState } from 'react'
import { login } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await login(formData)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Connexion réussie !')
      router.push('/admin')
    }
    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Nom d&apos;utilisateur
        </label>
        <input
          type="text"
          name="username"
          id="username"
          required
          disabled={loading}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          disabled={loading}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connexion en cours...
          </>
        ) : (
          'Se connecter'
        )}
      </button>

      <div className="text-center text-sm text-gray-600">
        Pas encore de compte ?{' '}
        <Link href="/register" className="text-blue-600 hover:text-blue-500">
          Créer un compte
        </Link>
      </div>
    </form>
  )
} 