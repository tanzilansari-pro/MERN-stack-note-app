import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReadNotes = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/Notes/${id}`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.error("Failed to fetch notes:", err)
      })
  }, [id])

  return (
    <div className='bg-gradient-to-br from-zinc-700 to-zinc-600 flex flex-col justify-center items-center h-screen w-full text-white px-4'>
      <div className="bg-zinc-800 max-w-md w-full p-6 rounded-2xl shadow-xl text-center">
        <h1 className='text-2xl font-bold mb-4'>{data.Name}</h1>
        <p className="text-zinc-300 text-lg">{data.Content}</p>
      </div>
    </div>
  )
}

export default ReadNotes