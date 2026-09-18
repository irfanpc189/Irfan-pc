import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useForm } from 'react-hook-form';
import MDEditor from '@uiw/react-md-editor';

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
      <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Post' : 'New Post'}</h2>
      
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
          <label className="block text-sm font-semibold mb-1">Cover Image URL</label>
          <input {...register('cover_image')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div className="flex items-center mb-6">
          <input type="checkbox" {...register('published')} id="published" className="mr-2 h-4 w-4" />
          <label htmlFor="published" className="text-sm font-semibold">Published</label>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Content (Markdown)</label>
          <div data-color-mode="light">
            <MDEditor
              value={content}
              onChange={setContent}
              height={400}
            />
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <button type="submit" disabled={saving} className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Post'}
          </button>
          <button type="button" onClick={() => navigate('/admin/blog')} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-semibold hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
