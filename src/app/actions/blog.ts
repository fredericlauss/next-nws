'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createArticle(data: { title: string; content: string }) {
  const { error } = await supabase
    .from('articles')
    .insert([{
      title: data.title,
      content: data.content,
    }])

  if (error) throw error
  
  revalidatePath('/blog')
  redirect('/admin')
}

export async function updateArticle(id: string, data: { title: string; content: string }) {
  const { error } = await supabase
    .from('articles')
    .update({
      title: data.title,
      content: data.content,
    })
    .eq('id', id)

  if (error) throw error
  
  revalidatePath('/blog')
  revalidatePath(`/blog/${id}`)
  redirect('/admin')
}

export async function deleteArticle(formData: FormData) {
  const id = formData.get('id') as string
  
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) throw error
  
  revalidatePath('/blog')
  revalidatePath('/admin')
} 