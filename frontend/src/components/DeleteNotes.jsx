import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteNotes = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.delete(`http://localhost:3000/Notes/${id}`)
      .then((res) => {
        console.log("Note deleted:", res.data);
      })
      .catch((err) => {
        console.error("Error deleting note:", err.response?.data || err.message);
      });
  }, [id]);

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300">
      <div className="bg-white shadow-2xl rounded-2xl p-10 flex flex-col items-center gap-6 w-[90vw] max-w-md">
        <h2 className="text-2xl font-bold text-green-700">Note Deleted</h2>
        <p className="text-gray-600 text-center">Your note has been successfully deleted.</p>
        <button
          onClick={navigateHome}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default DeleteNotes;
