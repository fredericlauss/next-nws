import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import BlogEditor from '@/components/blogEditor'
import { updateArticle } from '@/app/actions/blog'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

async function getArticle(id: string) {
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !article) return null
  return article
}

export default async function EditBlogPage({ params }: PageProps) {
  const resolvedParams = await params
  const article = await getArticle(resolvedParams.id)

  if (!article) {
    redirect('/admin')
  }

  const handleUpdate = async (data: { title: string; content: string }) => {
    'use server'
    await updateArticle(resolvedParams.id, data)
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