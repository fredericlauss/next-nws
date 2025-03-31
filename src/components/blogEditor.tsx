'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface BlogEditorProps {
  initialData?: {
    title: string
    content: string
  }
  onSubmit: (data: { title: string; content: string }) => Promise<void>
  isEditing?: boolean
}

export default function BlogEditor({ initialData, onSubmit, isEditing = false }: BlogEditorProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [loading, setLoading] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
      }
    }
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!editor) return

    setLoading(true)
    try {
      await onSubmit({
        title,
        content: editor.getHTML()
      })
      toast.success(isEditing ? 'Article modifié !' : 'Article créé !')
    } catch (error) {
      toast.error('Une erreur est survenue')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto">
        <div className="border border-gray-300 rounded-md p-2">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Enregistrement...' : isEditing ? 'Modifier' : 'Créer'}
      </button>
    </form>
  )
}

function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null
  }

  return (
    <div className="border-b border-gray-300 pb-2 mb-2 flex gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        type="button"
      >
        Gras
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        type="button"
      >
        Italique
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
        type="button"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        type="button"
      >
        Liste
      </button>
    </div>
  )
} 