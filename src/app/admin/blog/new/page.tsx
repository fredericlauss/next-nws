import BlogEditor from '@/components/blogEditor';
import { createArticle } from '@/app/actions/blog'

export default function NewBlogPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Nouvel article</h1>
      <BlogEditor onSubmit={createArticle} />
    </div>
  )
} 