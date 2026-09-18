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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-500">Welcome to your admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/projects" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <FolderKanban size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{stats.projects}</h3>
            <p className="text-gray-500 font-medium">Total Projects</p>
          </div>
        </Link>
        
        <Link to="/admin/blog" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{stats.posts}</h3>
            <p className="text-gray-500 font-medium">Blog Posts</p>
          </div>
        </Link>
        
        <Link to="/admin/messages" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-red-100 p-3 rounded-full text-red-600">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{stats.messages}</h3>
            <p className="text-gray-500 font-medium">Unread Messages</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
