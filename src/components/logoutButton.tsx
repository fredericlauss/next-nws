'use client'

import { logout } from '@/app/actions/auth'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition-colors text-white"
      >
        Déconnexion
      </button>
    </form>
  )
} 