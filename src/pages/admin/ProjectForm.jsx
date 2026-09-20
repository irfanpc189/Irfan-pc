import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useForm } from 'react-hook-form';
import ImageUpload from '../../components/admin/ImageUpload';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== undefined;
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
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

    let errorResult = null;

    if (isEditing) {
      const { error } = await supabase.from('projects').update(data).eq('id', id);
      errorResult = error;
    } else {
      const { error } = await supabase.from('projects').insert([data]);
      errorResult = error;
    }
    
    setSaving(false);

    if (errorResult) {
      alert('Error saving project: ' + errorResult.message);
      return;
    }

    navigate('/admin/projects');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-8 border-b-4 border-black pb-4 inline-block">{isEditing ? 'Edit Project' : 'New Project'}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 border-black shadow-neo-lg space-y-6">
        <div>
          <label className="block text-sm font-black uppercase tracking-wider mb-2">Title</label>
          <input {...register('title', { required: true })} className="w-full px-4 py-3 bg-gray-50 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
          {errors.title && <span className="text-red-500 font-bold uppercase text-sm mt-1 block">Required</span>}
        </div>

        <div>
          <label className="block text-sm font-black uppercase tracking-wider mb-2">Slug</label>
          <input {...register('slug', { required: true })} className="w-full px-4 py-3 bg-gray-50 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
          {errors.slug && <span className="text-red-500 font-bold uppercase text-sm mt-1 block">Required</span>}
        </div>

        <div>
          <label className="block text-sm font-black uppercase tracking-wider mb-2">Description</label>
          <textarea {...register('description')} rows={4} className="w-full px-4 py-3 bg-gray-50 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
        </div>

        <div>
          <label className="block text-sm font-black uppercase tracking-wider mb-2">Tags (comma separated)</label>
          <input {...register('tags')} className="w-full px-4 py-3 bg-gray-50 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
        </div>

        <div className="bg-gray-50 p-6 border-black">
          <ImageUpload 
            label="Image URL (Upload)" 
            value={watch('image_url')} 
            onChange={(url) => setValue('image_url', url)} 
            folder="projects" 
          />
        </div>

        <div>
          <label className="block text-sm font-black uppercase tracking-wider mb-2">Live URL</label>
          <input {...register('live_url')} className="w-full px-4 py-3 bg-gray-50 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-accent-2 p-6 border-black mt-4">
          <div>
            <label className="block text-sm font-black uppercase tracking-wider mb-2">Sort Order</label>
            <input type="number" {...register('sort_order')} className="w-full px-4 py-3 bg-white border-black font-bold focus:outline-none focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
          </div>
          <div className="flex items-center md:mt-8">
            <input type="checkbox" {...register('published')} id="published" className="h-6 w-6 border-black accent-black cursor-pointer" />
            <label htmlFor="published" className="ml-3 text-lg font-black uppercase tracking-wider cursor-pointer">Published</label>
          </div>
        </div>

        <div className="pt-8 flex flex-wrap gap-4 border-t-4 border-black mt-8">
          <button type="submit" disabled={saving} className="neo-btn neo-btn-primary disabled:opacity-50">
            {saving ? 'SAVING...' : 'SAVE PROJECT'}
          </button>
          <button type="button" onClick={() => navigate('/admin/projects')} className="neo-btn bg-white">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}
