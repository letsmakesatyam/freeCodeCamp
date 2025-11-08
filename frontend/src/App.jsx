import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import CreatePage from './pages/CreatePage.jsx' 
import { toast } from 'react-hot-toast' 
const App = () => {
  return (
    <div data-theme="forest" className="min-h-screen bg-base-200 pt-12 px-4">
      <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/note/:id' element={<NoteDetailPage />} />
        <Route path='/create' element={<CreatePage />} />
      </Routes> 
    </div>
  )
}

export default App
