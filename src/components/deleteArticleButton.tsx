'use client'

import { deleteArticle } from '@/app/actions/blog'

export default function DeleteArticleButton({ id }: { id: string }) {
  return (
    <form className="inline-block" action={deleteArticle}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-red-600 hover:text-red-900 ml-4"
        onClick={(e) => {
          if (!confirm('Voulez-vous vraiment supprimer cet article ?')) {
            e.preventDefault()
          }
        }}
      >
        Supprimer
      </button>
    </form>
  )
} 