import React, { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import RateLimitedUi from '../components/RateLimitedUi.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard.jsx'
import api from '../components/lib/axios.js'
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes');
        console.log("Fetched notes:", response.data);
        setNotes(response.data);
        setIsLoading(false);  
        setIsRateLimited(false);
      } catch(err) {
        console.log("Error fetching notes:", err);
        if (err.response && err.response.status === 429) {
          setIsRateLimited(true);
        } else {
          setIsRateLimited(false);
          toast.error("Error fetching notes");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotes();
  }, [])
  
  return (
    
    <div className='min-h-screen bg-base-200' data-theme='forest'>
      <Navbar />
      
      {isRateLimited ? <RateLimitedUi /> : null}
      
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {isLoading && (
          <div className='flex justify-center items-center py-20'>
            <span className='loading loading-spinner loading-lg text-primary'></span>
          </div>
        )}

        {!isLoading && notes.length === 0 && !isRateLimited && (
          <div className='flex flex-col items-center justify-center py-20'>
            <div className='text-center'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-24 w-24 mx-auto text-base-content/20' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
              <h3 className='mt-4 text-2xl font-bold text-base-content'>No notes yet</h3>
              <p className='mt-2 text-base-content/70'>Get started by creating your first note!</p>
              <button className='btn btn-primary mt-6' onClick={() => window.location.href = '/create'}>
                Create Note
              </button>
            </div>
          </div>
        )}

        {notes.length > 0 && !isLoading && (
          <div>
            <div className='mb-6'>
              <h2 className='text-3xl font-bold text-base-content'>Your Notes</h2>
              <p className='text-base-content/70 mt-1'>{notes.length} {notes.length === 1 ? 'note' : 'notes'} found</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes = {setNotes} /> 
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage