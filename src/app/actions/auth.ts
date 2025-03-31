'use server'

import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function login(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  try {
    const { data: user } = await supabase
      .from('users')
      .select('id, username, password')
      .eq('username', username)
      .single()

    if (!user) {
      return { error: 'Wrong username or password' }
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return { error: 'Wrong username or password' }
    }

    const session = {
      userId: user.id,
      username: user.username,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }

    const cookieStore = await cookies()
    cookieStore.set('session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: session.expiresAt
    })

    return { success: true }
  } catch (error) {
    return { error: 'Une erreur est survenue ' + error }
  }
}

export async function register(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  try {
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single()

    if (existingUser) {
      return { error: 'Username already taken' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const { error } = await supabase
      .from('users')
      .insert([{ username, password: hashedPassword }])
      .select('id, username')
      .single()

    if (error) throw error

    return { success: true }
  } catch (error) {
    return { error: 'Une erreur est survenue' + error }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect('/login')
} 