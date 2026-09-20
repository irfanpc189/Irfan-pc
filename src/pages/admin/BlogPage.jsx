import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await supabase.from('blog_posts').delete().eq('id', id);
      fetchPosts();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-4 border-black pb-8 gap-4">
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight">Blog Posts</h2>
        <Link to="/admin/blog/new" className="neo-btn">
          <Plus size={20} /> Add Post
        </Link>
      </div>

      <div className="bg-white border-black shadow-neo-lg overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-accent-2 border-b-4 border-black">
            <tr>
              <th className="px-6 py-4 font-black uppercase tracking-wider border-r-4 border-black">Title</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider border-r-4 border-black">Status</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider border-r-4 border-black">Date</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-black">
            {loading ? (
              <tr><td colSpan="4" className="px-6 py-8 text-center font-bold uppercase">Loading...</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan="4" className="px-6 py-8 text-center font-bold uppercase">No posts found.</td></tr>
            ) : (
              posts.map(post => (
                <tr key={post.id} className="transition-transform hover:-translate-y-1 relative z-10 hover:z-20 bg-white shadow-sm">
                  <td className="px-6 py-4 font-bold border-r-4 border-black text-lg">{post.title}</td>
                  <td className="px-6 py-4 border-r-4 border-black">
                    <span className={`px-3 py-1 text-sm font-black uppercase border-black ${post.published ? 'bg-primary text-white shadow-neo-sm' : 'bg-white text-black shadow-neo-sm'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold border-r-4 border-black text-md">
                    {new Date(post.created_at || post.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link to={`/admin/blog/${post.id}`} className="bg-black text-white p-2 inline-flex border-black shadow-neo-sm transition-transform hover:-translate-y-1" title="Edit">
                      <Edit2 size={20} />
                    </Link>
                    <button onClick={() => handleDelete(post.id)} className="bg-accent-2 text-white p-2 inline-flex border-black shadow-neo-sm transition-transform hover:-translate-y-1" title="Delete">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
