import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [allNotes, setAllNotes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/AllNotes')
      .then((res) => {
        setAllNotes(res.data.data)
      })
      .catch((err) => {
        console.error("Failed to fetch notes:", err)
      })
  }, [])

  return (
    <div className='bg-zinc-900 min-h-screen py-10 px-4'>
      <h1 className='text-white text-3xl font-bold text-center mb-8'>Welcome to Note App</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {allNotes.length === 0 ? (
          <h1 className='text-zinc-300'>No notes to show</h1>
        ) : (
          allNotes.map(note => (
            <div key={note._id} className="bg-zinc-800 text-white p-4 rounded-xl shadow-md w-72">
              <h2 className='text-xl font-semibold mb-2'>{note.Name}</h2>
              <div className="flex justify-between text-sm mt-4">
                <Link className='text-red-400 hover:underline' to={`/DeleteNotes/${note._id}`}>Delete</Link>
                <Link className='text-blue-400 hover:underline' to={`/EditNotes/${note._id}`}>Edit</Link>
                <Link className='text-green-400 hover:underline' to={`/ReadNotes/${note._id}`}>Read</Link>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to={`/CreateNote`} className='bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-xl transition'>Create Note</Link>
      </div>
    </div>
  )
}

export default Home