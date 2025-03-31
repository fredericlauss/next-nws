import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

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

export default async function ArticlePage({ params }: PageProps) {
  const resolvedParams = await params
  const article = await getArticle(resolvedParams.id)

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <article className="prose lg:prose-xl mx-auto">
        <h1>{article.title}</h1>
        <div className="mt-4">
          {article.content}
        </div>
      </article>
    </div>
  )
}

// Revalidate la page toutes les minutes
export const revalidate = 60 