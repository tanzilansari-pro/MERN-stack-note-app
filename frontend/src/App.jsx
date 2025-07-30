import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateNotes from './components/CreateNotes';
import DeleteNotes from './components/DeleteNotes';
import ReadNotes from './components/ReadNotes'
import EditNotes from './components/EditNotes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/CreateNote" element={<CreateNotes />} />
      <Route path="/DeleteNotes/:id" element={<DeleteNotes />} />
      <Route path="/ReadNotes/:id" element={<ReadNotes />} />
      <Route path="/EditNotes/:id" element={<EditNotes />} />
    </Routes>
  );
}

export default App;