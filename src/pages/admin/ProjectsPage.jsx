import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
    if (data) setProjects(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link to="/admin/projects/new" className="bg-black text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-800">
          <Plus size={18} /> Add Project
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-600">Title</th>
              <th className="px-6 py-3 font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 font-semibold text-gray-600">Order</th>
              <th className="px-6 py-3 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan="4" className="px-6 py-4 text-center">No projects found.</td></tr>
            ) : (
              projects.map(project => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{project.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${project.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {project.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{project.sort_order}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link to={`/admin/projects/${project.id}`} className="text-blue-600 hover:text-blue-800 p-1 inline-flex" title="Edit">
                      <Edit2 size={18} />
                    </Link>
                    <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-800 p-1 inline-flex" title="Delete">
                      <Trash2 size={18} />
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
