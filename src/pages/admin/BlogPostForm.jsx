import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useForm } from 'react-hook-form';
import MDEditor from '@uiw/react-md-editor';
import ImageUpload from '../../components/admin/ImageUpload';

export default function BlogPostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== undefined;
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  async function fetchPost() {
    const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (data) {
      Object.keys(data).forEach(key => {
        if (key !== 'content') setValue(key, data[key]);
      });
      setContent(data.content || '');
    }
    setLoading(false);
  }

  const onSubmit = async (data) => {
    setSaving(true);
    data.content = content;

    if (data.published && !data.published_at) {
      data.published_at = new Date().toISOString();
    }

    if (isEditing) {
      await supabase.from('blog_posts').update(data).eq('id', id);
    } else {
      await supabase.from('blog_posts').insert([data]);
    }
    
    setSaving(false);
    navigate('/admin/blog');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl">
      <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-8 border-b-4 border-black pb-4 inline-block">{isEditing ? 'Edit Post' : 'New Post'}</h2>
      
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

        <div className="bg-gray-50 p-6 border-black">
          <ImageUpload 
            label="Cover Image (Upload)" 
            value={watch('cover_image')} 
            onChange={(url) => setValue('cover_image', url)} 
            folder="blog" 
          />
        </div>

        <div className="flex items-center bg-accent-2 p-6 border-black">
          <input type="checkbox" {...register('published')} id="published" className="h-6 w-6 border-black accent-black cursor-pointer" />
          <label htmlFor="published" className="ml-3 text-lg font-black uppercase tracking-wider cursor-pointer">Published</label>
        </div>

        <div>
          <label className="block text-sm font-black uppercase tracking-wider mb-2">Content (Markdown)</label>
          <div data-color-mode="light" className="border-black border-4 shadow-neo-sm">
            <MDEditor
              value={content}
              onChange={setContent}
              height={400}
            />
          </div>
        </div>

        <div className="pt-8 flex flex-wrap gap-4 border-t-4 border-black mt-8">
          <button type="submit" disabled={saving} className="neo-btn neo-btn-primary disabled:opacity-50">
            {saving ? 'SAVING...' : 'SAVE POST'}
          </button>
          <button type="button" onClick={() => navigate('/admin/blog')} className="neo-btn bg-white">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}
