
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateNotes = () => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate()

  const handleCreate = async () => {
    if (!name.trim() || !content.trim()) {
      alert("Please enter both title and content.")
      return
    }
    try {
      await axios.post('http://localhost:3000/CreateNote', { Name: name, Content: content })
      navigate('/')
    } catch (err) {
      console.error("Failed to create note:", err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-white px-4">
      <div className="w-full max-w-md bg-zinc-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create a Note</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Note Title"
            className="p-3 rounded-xl bg-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            rows="5"
            placeholder="Write your note..."
            className="p-3 rounded-xl bg-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300 text-white py-2 rounded-xl font-semibold"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateNotes