import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { logout } from '@/app/actions/auth'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')

  if (!session) {
    redirect('/login')
  }

  const user = JSON.parse(session.value)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Panneau d&apos;administration
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-gray-600">
                Connecté en tant que {user.username}
              </p>
              <form action={logout}>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Déconnexion
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 