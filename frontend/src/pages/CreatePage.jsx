import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import api from '../components/lib/axios.js'

const CreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/notes', {
        title: formData.title.trim(),
        content: formData.content.trim()
      });

      toast.success('Note created successfully!');
      
      setFormData({ title: '', content: '' });
      
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (err) {
      console.error('Error creating note:', err);
      
      if (err.response && err.response.status === 429) {
        toast.error('Rate limit exceeded. Please try again later.' , {
          duration: 4000,
          icon: '⏳'
        });
      } else if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Failed to create note. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (formData.title || formData.content) {
      if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className='min-h-screen bg-base-200' data-theme='forest'>
      <Navbar />
      
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-base-content'>Create New Note</h1>
          <p className='text-base-content/70 mt-2'>Add a new note to your collection</p>
        </div>

        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-control mb-6'>
                <label className='label'>
                  <span className='label-text text-base font-semibold'>
                    Title <span className='text-error'>*</span>
                  </span>
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  placeholder='Enter note title'
                  className={`input input-bordered w-full ${
                    errors.title ? 'input-error' : 'input-primary'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{errors.title}</span>
                  </label>
                )}
                <label className='label'>
                  <span className='label-text-alt text-base-content/60'>
                    {formData.title.length} characters
                  </span>
                </label>
              </div>

              <div className='form-control mb-6'>
                <label className='label'>
                  <span className='label-text text-base font-semibold'>
                    Content <span className='text-error'>*</span>
                  </span>
                </label>
                <textarea
                  id='content'
                  name='content'
                  value={formData.content}
                  onChange={handleChange}
                  placeholder='Write your note content here...'
                  rows='5'
                  className={`textarea textarea-bordered w-full ${
                    errors.content ? 'textarea-error' : 'textarea-primary'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.content && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{errors.content}</span>
                  </label>
                )}
                <label className='label'>
                  <span className='label-text-alt text-base-content/60'>
                    {formData.content.length} characters
                  </span>
                </label>
              </div>

              <div className='divider'></div>

              <div className='flex flex-col sm:flex-row gap-3 justify-end'>
                <button
                  type='button'
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className='btn btn-ghost'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='btn btn-primary'
                >
                  {isSubmitting ? (
                    <>
                      <span className='loading loading-spinner'></span>
                      Creating...
                    </>
                  ) : (
                    'Create Note'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className='alert alert-info mt-6 shadow-lg'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='stroke-current shrink-0 w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
          </svg>
          <div>
            <h3 className='font-bold'>Tips for writing great notes</h3>
            <div className='text-sm mt-1'>
              <ul className='list-disc list-inside space-y-1'>
                <li>Use descriptive titles to easily find your notes later</li>
                <li>Keep your content organized and concise</li>
                <li>You can always edit your notes after creating them</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage