import React, { useEffect } from 'react'
import api from '../components/lib/axios.js'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from "react-router";

const NoteDetailPage = () => {
  const [note, setNote] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true); 
  const [saving, setSaving] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`); 
        console.log("Fetched note:", response.data);
        setNote(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch(err) {
        console.log("Error fetching note:", err);
        toast.error("Error fetching note");
      } finally {
        setIsLoading(false);
      }   
    }
    
    if (id) {
      fetchNote();
    }
  }, [id]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    setSaving(true);
    try {
      const response = await api.put(`/notes/${id}`, {
        title: title.trim(),
        content: content.trim()
      });
      setNote(response.data);
      toast.success('Note saved successfully');
    } catch(err) {
      console.error('Error updating note:', err);
      toast.error('Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted successfully');
      navigate('/');
    } catch(err) {
      console.error('Error deleting note:', err);
      toast.error('Failed to delete note');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Note not found</h2>
          <p className="text-base-content/70 mb-4">The note you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Back to notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost btn-sm gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn btn-primary btn-sm"
            >
              {saving ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save
                </>
              )}
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered input-primary w-full text-lg font-semibold"
                placeholder="Enter note title..."
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Content</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="textarea textarea-bordered textarea-primary w-full text-base leading-relaxed"
                placeholder="Write your note content here..."
              />
            </div>

            {note.createdAt && (
              <div className="mt-4 text-sm text-base-content/60">
                <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
                {note.updatedAt && note.updatedAt !== note.createdAt && (
                  <p>Last updated: {new Date(note.updatedAt).toLocaleString()}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage