import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SettingsPage() {
  const [content, setContent] = useState({
    about_bio: '',
    skills_list: '' // We keep this to allow fallback/migration
  });
  const [dbSkills, setDbSkills] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('development');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    
    // 1. Fetch old site_content
    const { data: contentData } = await supabase.from('site_content').select('*');
    let newContent = { about_bio: '', skills_list: '' };
    if (contentData) {
      contentData.forEach(item => {
        if (newContent[item.key] !== undefined) {
          newContent[item.key] = item.value?.text || '';
        }
      });
      setContent(newContent);
    }

    // 2. Fetch new skills
    let { data: skillsData, error: skillsError } = await supabase.from('skills').select('*').order('created_at', { ascending: true });
    
    // 3. Migration Logic: If new skills table is empty but we have an old skills_list, auto-migrate!
    if (!skillsError && skillsData && skillsData.length === 0 && newContent.skills_list) {
      const oldSkills = newContent.skills_list.split(',').map(s => s.trim()).filter(Boolean);
      if (oldSkills.length > 0) {
        const designKeywords = ['figma', 'design', 'ui', 'ux', 'wirefram', 'prototyp', 'typograph', 'photoshop', 'illustrator', 'color'];
        
        const migrationInserts = oldSkills.map(skill => {
          const lower = skill.toLowerCase();
          const isDesign = designKeywords.some(kw => lower.includes(kw));
          return {
            name: skill,
            category: isDesign ? 'design' : 'development'
          };
        });
        
        // Insert into new table
        const { error: insertError } = await supabase.from('skills').insert(migrationInserts);
        if (!insertError) {
          // Refetch skills after migration
          const { data: refetchedSkills } = await supabase.from('skills').select('*').order('created_at', { ascending: true });
          if (refetchedSkills) skillsData = refetchedSkills;
        }
      }
    }
    
    if (skillsData) {
      setDbSkills(skillsData);
    }
    setLoading(false);
  }

  const handleChange = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveAbout = async () => {
    setSaving(true);
    const { error } = await supabase.from('site_content').upsert({ 
      key: 'about_bio', 
      value: { text: content.about_bio },
      updated_at: new Date()
    });
    setSaving(false);
    
    if (error) {
      alert('Error saving content: ' + error.message);
    } else {
      alert('Saved successfully!');
    }
  };

  const handleAddSkill = async () => {
    if (!newSkillName.trim()) return;
    setSaving(true);
    const { data, error } = await supabase.from('skills').insert([{
      name: newSkillName.trim(),
      category: newSkillCategory
    }]).select();
    
    setSaving(false);
    if (error) {
      alert('Error adding skill: ' + error.message);
    } else if (data) {
      setDbSkills(prev => [...prev, ...data]);
      setNewSkillName('');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) {
      alert('Error deleting skill: ' + error.message);
    } else {
      setDbSkills(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="max-w-4xl space-y-12">
      <div className="flex flex-col gap-4 border-b-4 border-black pb-8">
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight">Settings</h2>
        <p className="text-xl font-bold uppercase tracking-wider bg-black text-white inline-block px-4 py-2 self-start">Manage site content</p>
      </div>

      {loading ? (
        <p className="font-bold text-xl uppercase">Loading...</p>
      ) : (
        <div className="space-y-8">
          {/* About Section */}
          <div className="bg-accent-1 p-8 border-black shadow-neo-lg">
            <h3 className="text-2xl font-display font-black uppercase tracking-wider mb-6">About Section</h3>
            <textarea
              className="w-full h-40 px-4 py-3 bg-white border-black font-bold focus:outline-none focus:-translate-y-1 focus:shadow-neo-sm transition-all mb-6"
              value={content.about_bio}
              onChange={(e) => handleChange('about_bio', e.target.value)}
              placeholder="Enter your bio text here..."
            />
            <button 
              onClick={handleSaveAbout}
              disabled={saving}
              className="neo-btn bg-black text-white disabled:opacity-50"
            >
              {saving ? 'SAVING...' : 'SAVE BIO'}
            </button>
          </div>

          {/* Skills Section */}
          <div className="bg-primary text-white p-8 border-black shadow-neo-lg">
            <h3 className="text-2xl font-display font-black uppercase tracking-wider mb-2">Skills</h3>
            <p className="text-sm font-bold uppercase tracking-wider mb-6 bg-black inline-block px-3 py-1">Manage individual skills</p>
            
            {/* Add Skill Form */}
            <div className="bg-white text-black p-6 border-4 border-black mb-8 flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-sm font-black uppercase mb-2">Skill Name</label>
                <input 
                  type="text" 
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:-translate-y-1 transition-all"
                  placeholder="e.g. React"
                />
              </div>
              <div className="w-full md:w-48">
                <label className="block text-sm font-black uppercase mb-2">Category</label>
                <select 
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none cursor-pointer bg-white"
                >
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                </select>
              </div>
              <button 
                onClick={handleAddSkill}
                disabled={saving || !newSkillName.trim()}
                className="neo-btn bg-accent-2 text-white h-[52px] w-full md:w-auto hover:bg-black"
              >
                ADD
              </button>
            </div>

            {/* List Skills */}
            <div className="space-y-3">
              {dbSkills.length === 0 ? (
                <p className="font-bold border-4 border-white border-dashed p-4 text-center">No skills added yet.</p>
              ) : (
                dbSkills.map(skill => (
                  <div key={skill.id} className="flex justify-between items-center bg-white text-black border-4 border-black p-4">
                    <div>
                      <span className="font-black text-xl uppercase block">{skill.name}</span>
                      <span className="text-xs font-bold uppercase bg-black text-white px-2 py-1 inline-block mt-1">{skill.category}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="neo-btn bg-[#FF6B6B] text-black !py-2 !px-4 text-sm shadow-[3px_3px_0px_#000]"
                    >
                      DELETE
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
