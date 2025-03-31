'use client'

import { useState } from 'react'
import { register } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

export default function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await register(formData)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Compte créé avec succès !')
      router.push('/login')
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        {loading ? 'Création...' : 'Créer un compte'}
      </button>

      <div className="text-center text-sm text-gray-600">
        Déjà un compte ?{' '}
        <Link href="/login" className="text-blue-600 hover:text-blue-500">
          Se connecter
        </Link>
      </div>
    </form>
  )
} 