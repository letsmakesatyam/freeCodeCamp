import React from 'react'
import { Link } from 'react-router';
import formatDate from './lib/utils.js';
import api from './lib/axios.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const NoteCard = ({ note,  setNotes }) => {
  const navigate = useNavigate();
  const onDelete = async(e) => {
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete this note?")) {
      return;
    } 
    try{
      await api.delete(`/notes/${note._id}`);
      setNotes(prevNotes => prevNotes.filter(n => n._id !== note._id));
      toast.success("Note deleted successfully");
    }
    catch(err) {
      console.error("Error deleting note:", err);
      toast.error("Failed to delete note. Please try again.");
    } 
  };
  const onEdit = (e) => {
    e.preventDefault();
    navigate(`/note/${note._id}`);
  }

  return (
    <Link to={`/note/${note._id}`} className='card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-primary'>
      <div className='card-body p-6'>
        <h3 className='card-title text-xl font-bold mb-3 line-clamp-2 text-base-content'>
          {note.title}
        </h3>
        
        <p className='text-base text-base-content/80 mb-4 line-clamp-3 leading-relaxed font-normal'>
          {note.content}
        </p>
        
        <div className='flex justify-between items-center pt-4 border-t border-base-300'>
          <div className='flex flex-col gap-1'>
            <span className='text-sm font-medium text-base-content/70'>
              Created: {formatDate(note.createdAt)}
            </span>
            {note.updatedAt !== note.createdAt && (
              <span className='text-sm font-normal text-base-content/60'>
                Updated: {formatDate(note.updatedAt)}
              </span>
            )}
          </div>
          
          <div className='card-actions justify-end gap-2'>
            <button
              onClick={onEdit}
              className='btn btn-sm btn-outline btn-primary font-medium'
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className='btn btn-sm btn-error font-medium'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard