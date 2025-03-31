import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import BlogEditor from '@/components/blogEditor'
import { updateArticle } from '@/app/actions/blog'

export default async function EditBlogPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !article) {
    redirect('/admin')
  }

  const handleUpdate = async (data: { title: string; content: string }) => {
    'use server'
    await updateArticle(id, data)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier l&apos;article</h1>
      <BlogEditor
        initialData={article}
        onSubmit={handleUpdate}
        isEditing
      />
    </div>
  )
} 