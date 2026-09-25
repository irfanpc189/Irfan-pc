import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  async function fetchCaseStudies() {
    setLoading(true);
    const { data } = await supabase
      .from('case_studies')
      .select('*')
      .order('display_order', { ascending: true });
    if (data) setCaseStudies(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this case study? Sections and images will also be removed.')) {
      await supabase.from('case_studies').delete().eq('id', id);
      fetchCaseStudies();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-4 border-black pb-8 gap-4">
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight">Case Studies</h2>
        <Link to="/admin/case-studies/new" className="neo-btn">
          <Plus size={20} /> Add Case Study
        </Link>
      </div>

      <div className="bg-white border-black shadow-neo-lg overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-accent-2 border-b-4 border-black">
            <tr>
              <th className="px-6 py-4 font-black uppercase tracking-wider border-r-4 border-black w-24">Cover</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider border-r-4 border-black">Title & Category</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider border-r-4 border-black">Status</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider border-r-4 border-black">Featured</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider border-r-4 border-black">Order</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-black">
            {loading ? (
              <tr><td colSpan="6" className="px-6 py-8 text-center font-bold uppercase">Loading...</td></tr>
            ) : caseStudies.length === 0 ? (
              <tr><td colSpan="6" className="px-6 py-8 text-center font-bold uppercase">No case studies found.</td></tr>
            ) : (
              caseStudies.map(cs => (
                <tr key={cs.id} className="transition-transform hover:-translate-y-1 relative z-10 hover:z-20 bg-white shadow-sm">
                  <td className="px-6 py-4 border-r-4 border-black">
                    {cs.cover_image ? (
                      <img src={cs.cover_image} alt={cs.title} className="w-16 h-16 object-cover border-2 border-black" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 border-2 border-black flex items-center justify-center">N/A</div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold border-r-4 border-black">
                    <div className="text-lg">{cs.title}</div>
                    <div className="text-sm font-medium text-gray-600 uppercase mt-1">{cs.category}</div>
                  </td>
                  <td className="px-6 py-4 border-r-4 border-black">
                    <span className={`px-3 py-1 text-sm font-black uppercase border-black inline-block ${cs.published ? 'bg-primary text-white shadow-neo-sm' : 'bg-white text-black shadow-neo-sm'}`}>
                      {cs.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r-4 border-black text-center">
                    {cs.featured && (
                      <span className="px-3 py-1 text-sm font-black uppercase border-black bg-accent-1 text-black shadow-neo-sm">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold border-r-4 border-black text-xl text-center">{cs.display_order}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link to={`/case-studies/${cs.slug}`} target="_blank" className="bg-gray-100 text-black p-2 inline-flex border-2 border-black hover:-translate-y-1 transition-transform" title="Preview">
                      <Eye size={20} />
                    </Link>
                    <Link to={`/admin/case-studies/${cs.id}`} className="bg-black text-white p-2 inline-flex border-2 border-black hover:-translate-y-1 transition-transform" title="Edit">
                      <Edit2 size={20} />
                    </Link>
                    <button onClick={() => handleDelete(cs.id)} className="bg-accent-2 text-white p-2 inline-flex border-2 border-black hover:-translate-y-1 transition-transform" title="Delete">
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
