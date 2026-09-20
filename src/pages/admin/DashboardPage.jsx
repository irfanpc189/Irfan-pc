import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { FolderKanban, FileText, Mail } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    posts: 0,
    messages: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: projectsCount },
        { count: postsCount },
        { count: messagesCount },
      ] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*', { count: 'exact', head: true, filter: 'read.eq.false' }),
      ]);

      setStats({
        projects: projectsCount || 0,
        posts: postsCount || 0,
        messages: messagesCount || 0,
      });
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-4 border-b-4 border-black pb-8">
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight">COMMAND CENTER</h2>
        <p className="text-xl font-bold uppercase tracking-wider bg-black text-white inline-block px-4 py-2 self-start">Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/admin/projects" className="bg-primary text-white p-8 border-black shadow-neo flex flex-col items-start gap-6 transition-transform hover:translate-y-[-4px]">
          <div className="bg-white text-black p-4 border-black">
            <FolderKanban size={32} />
          </div>
          <div className="mt-4">
            <h3 className="text-6xl font-display font-black">{stats.projects}</h3>
            <p className="text-xl font-bold uppercase mt-2">Projects</p>
          </div>
        </Link>
        
        <Link to="/admin/blog" className="bg-accent-1 text-black p-8 border-black shadow-neo flex flex-col items-start gap-6 transition-transform hover:translate-y-[-4px]">
          <div className="bg-white text-black p-4 border-black">
            <FileText size={32} />
          </div>
          <div className="mt-4">
            <h3 className="text-6xl font-display font-black">{stats.posts}</h3>
            <p className="text-xl font-bold uppercase mt-2">Blog Posts</p>
          </div>
        </Link>
        
        <Link to="/admin/messages" className="bg-accent-2 text-white p-8 border-black shadow-neo flex flex-col items-start gap-6 transition-transform hover:translate-y-[-4px]">
          <div className="bg-white text-black p-4 border-black">
            <Mail size={32} />
          </div>
          <div className="mt-4">
            <h3 className="text-6xl font-display font-black">{stats.messages}</h3>
            <p className="text-xl font-bold uppercase mt-2">Unread Messages</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
