import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useForm } from 'react-hook-form';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== undefined;
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchProject();
    }
  }, [id]);

  async function fetchProject() {
    const { data } = await supabase.from('projects').select('*').eq('id', id).single();
    if (data) {
      Object.keys(data).forEach(key => setValue(key, data[key]));
    }
    setLoading(false);
  }

  const onSubmit = async (data) => {
    setSaving(true);
    
    // Process tags string to array if needed (assuming comma separated)
    if (typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    if (isEditing) {
      await supabase.from('projects').update(data).eq('id', id);
    } else {
      await supabase.from('projects').insert([data]);
    }
    
    setSaving(false);
    navigate('/admin/projects');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Project' : 'New Project'}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input {...register('title', { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
          {errors.title && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Slug</label>
          <input {...register('slug', { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
          {errors.slug && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea {...register('description')} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Tags (comma separated)</label>
          <input {...register('tags')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Image URL</label>
          <input {...register('image_url')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Live URL</label>
          <input {...register('live_url')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Sort Order</label>
            <input type="number" {...register('sort_order')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" {...register('published')} id="published" className="mr-2 h-4 w-4" />
            <label htmlFor="published" className="text-sm font-semibold">Published</label>
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <button type="submit" disabled={saving} className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Project'}
          </button>
          <button type="button" onClick={() => navigate('/admin/projects')} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-semibold hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
