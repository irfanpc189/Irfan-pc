import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SettingsPage() {
  const [content, setContent] = useState({
    about_bio: '',
    skills_list: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    setLoading(true);
    const { data } = await supabase.from('site_content').select('*');
    if (data) {
      const newContent = { ...content };
      data.forEach(item => {
        if (newContent[item.key] !== undefined) {
          newContent[item.key] = item.value?.text || '';
        }
      });
      setContent(newContent);
    }
    setLoading(false);
  }

  const handleChange = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key) => {
    setSaving(true);
    await supabase.from('site_content').upsert({ 
      key, 
      value: { text: content[key] },
      updated_at: new Date()
    });
    setSaving(false);
    alert('Saved successfully!');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-gray-500">Manage site content and configuration.</p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-4">About Section</h3>
            <textarea
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
              value={content.about_bio}
              onChange={(e) => handleChange('about_bio', e.target.value)}
              placeholder="Enter your bio text here..."
            />
            <button 
              onClick={() => handleSave('about_bio')}
              disabled={saving}
              className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 disabled:opacity-50"
            >
              Save Bio
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Skills</h3>
            <p className="text-sm text-gray-500 mb-2">Comma separated list of skills.</p>
            <textarea
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
              value={content.skills_list}
              onChange={(e) => handleChange('skills_list', e.target.value)}
              placeholder="React, Next.js, Node.js..."
            />
            <button 
              onClick={() => handleSave('skills_list')}
              disabled={saving}
              className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 disabled:opacity-50"
            >
              Save Skills
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
