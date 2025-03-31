import Link from 'next/link'
import { supabase } from '@/lib/supabase'

async function getArticles() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return articles
}

export default async function BlogPage() {
  const articles = await getArticles()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6">
        {articles.map((article) => (
          <article key={article.id} className="bg-white rounded-lg shadow-md p-6">
            <Link href={`/blog/${article.id}`}>
              <h2 className="text-xl font-bold hover:text-blue-600 transition-colors">
                {article.title}
              </h2>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
} 