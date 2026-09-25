import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useForm, useFieldArray } from 'react-hook-form';
import ImageUpload from '../../components/admin/ImageUpload';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export default function CaseStudyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== undefined;
  
  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm({
    defaultValues: {
      sections: [],
      insights: [],
      goals: [],
      images: []
    }
  });

  const { fields: sectionFields, append: appendSection, remove: removeSection, move: moveSection } = useFieldArray({ control, name: "sections" });
  const { fields: insightFields, append: appendInsight, remove: removeInsight, move: moveInsight } = useFieldArray({ control, name: "insights" });
  const { fields: goalFields, append: appendGoal, remove: removeGoal, move: moveGoal } = useFieldArray({ control, name: "goals" });
  const { fields: imageFields, append: appendImage, remove: removeImage, move: moveImage } = useFieldArray({ control, name: "images" });

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) fetchCaseStudy();
  }, [id]);

  async function fetchCaseStudy() {
    // Fetch main case study
    const { data: cs } = await supabase.from('case_studies').select('*').eq('id', id).single();
    if (cs) {
      Object.keys(cs).forEach(key => {
        if (key === 'tools' && Array.isArray(cs[key])) {
          setValue(key, cs[key].join(', '));
        } else {
          setValue(key, cs[key]);
        }
      });
    }

    // Fetch related data
    const [ { data: sections }, { data: insights }, { data: goals }, { data: images } ] = await Promise.all([
      supabase.from('case_study_sections').select('*').eq('case_study_id', id).order('display_order'),
      supabase.from('case_study_insights').select('*').eq('case_study_id', id).order('display_order'),
      supabase.from('case_study_goals').select('*').eq('case_study_id', id).order('display_order'),
      supabase.from('case_study_images').select('*').eq('case_study_id', id).order('display_order')
    ]);

    if (sections) setValue('sections', sections);
    if (insights) setValue('insights', insights);
    if (goals) setValue('goals', goals);
    if (images) setValue('images', images);

    setLoading(false);
  }

  const onSubmit = async (data) => {
    setSaving(true);
    
    const csData = {
      title: data.title,
      slug: data.slug,
      short_description: data.short_description,
      category: data.category,
      role: data.role,
      timeline: data.timeline,
      project_type: data.project_type,
      tools: typeof data.tools === 'string' ? data.tools.split(',').map(t => t.trim()).filter(Boolean) : data.tools,
      cover_image: data.cover_image,
      hero_image: data.hero_image,
      featured: data.featured,
      published: data.published,
      display_order: parseInt(data.display_order) || 0
    };

    let csId = id;

    if (isEditing) {
      const { error } = await supabase.from('case_studies').update(csData).eq('id', id);
      if (error) { alert('Error updating case study: ' + error.message); setSaving(false); return; }
    } else {
      const { data: newCs, error } = await supabase.from('case_studies').insert([csData]).select().single();
      if (error) { alert('Error creating case study: ' + error.message); setSaving(false); return; }
      csId = newCs.id;
    }

    // Delete existing relations
    if (isEditing) {
      await Promise.all([
        supabase.from('case_study_sections').delete().eq('case_study_id', id),
        supabase.from('case_study_insights').delete().eq('case_study_id', id),
        supabase.from('case_study_goals').delete().eq('case_study_id', id),
        supabase.from('case_study_images').delete().eq('case_study_id', id)
      ]);
    }

    // Insert new relations
    const insertData = async (table, items) => {
      if (items && items.length > 0) {
        const toInsert = items.map((item, index) => ({
          ...item,
          id: undefined, // let supabase generate it
          case_study_id: csId,
          display_order: index
        }));
        await supabase.from(table).insert(toInsert);
      }
    };

    await Promise.all([
      insertData('case_study_sections', data.sections),
      insertData('case_study_insights', data.insights),
      insertData('case_study_goals', data.goals),
      insertData('case_study_images', data.images)
    ]);

    setSaving(false);
    navigate('/admin/case-studies');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-8 border-b-4 border-black pb-4 inline-block">
        {isEditing ? 'Edit Case Study' : 'New Case Study'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* BASIC INFO */}
        <section className="bg-white p-8 border-4 border-black shadow-neo-lg space-y-6">
          <h3 className="text-2xl font-black uppercase tracking-widest border-b-4 border-black pb-2">Basic Info</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-black uppercase mb-2">Title *</label>
              <input {...register('title', { required: true })} className="w-full px-4 py-3 bg-gray-50 border-2 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
              {errors.title && <span className="text-red-500 font-bold uppercase text-sm mt-1 block">Required</span>}
            </div>
            <div>
              <label className="block text-sm font-black uppercase mb-2">Slug *</label>
              <input {...register('slug', { required: true })} className="w-full px-4 py-3 bg-gray-50 border-2 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
              {errors.slug && <span className="text-red-500 font-bold uppercase text-sm mt-1 block">Required</span>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-black uppercase mb-2">Short Description</label>
            <textarea {...register('short_description')} rows={3} className="w-full px-4 py-3 bg-gray-50 border-2 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-black uppercase mb-2">Category</label>
              <input {...register('category')} className="w-full px-4 py-3 bg-gray-50 border-2 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
            </div>
            <div>
              <label className="block text-sm font-black uppercase mb-2">Role</label>
              <input {...register('role')} className="w-full px-4 py-3 bg-gray-50 border-2 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
            </div>
            <div>
              <label className="block text-sm font-black uppercase mb-2">Timeline</label>
              <input {...register('timeline')} className="w-full px-4 py-3 bg-gray-50 border-2 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
            </div>
            <div>
              <label className="block text-sm font-black uppercase mb-2">Project Type</label>
              <input {...register('project_type')} className="w-full px-4 py-3 bg-gray-50 border-2 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-black uppercase mb-2">Tools (comma separated)</label>
            <input {...register('tools')} className="w-full px-4 py-3 bg-gray-50 border-2 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-accent-2 p-6 border-4 border-black mt-4">
            <div>
              <label className="block text-sm font-black uppercase mb-2">Display Order</label>
              <input type="number" {...register('display_order')} className="w-full px-4 py-3 bg-white border-2 border-black font-bold focus:outline-none focus:-translate-y-1 focus:shadow-neo-sm transition-all" />
            </div>
            <div className="flex flex-col gap-4 justify-center md:mt-8">
              <div className="flex items-center">
                <input type="checkbox" {...register('featured')} id="featured" className="h-6 w-6 border-2 border-black accent-black cursor-pointer" />
                <label htmlFor="featured" className="ml-3 text-lg font-black uppercase cursor-pointer">Featured Case Study</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" {...register('published')} id="published" className="h-6 w-6 border-2 border-black accent-black cursor-pointer" />
                <label htmlFor="published" className="ml-3 text-lg font-black uppercase cursor-pointer">Published</label>
              </div>
            </div>
          </div>
        </section>

        {/* IMAGES */}
        <section className="bg-white p-8 border-4 border-black shadow-neo-lg space-y-6">
          <h3 className="text-2xl font-black uppercase tracking-widest border-b-4 border-black pb-2">Main Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 border-2 border-black">
              <ImageUpload label="Cover Image" value={watch('cover_image')} onChange={(url) => setValue('cover_image', url)} folder="case_studies" />
            </div>
            <div className="bg-gray-50 p-6 border-2 border-black">
              <ImageUpload label="Hero Image" value={watch('hero_image')} onChange={(url) => setValue('hero_image', url)} folder="case_studies" />
            </div>
          </div>
        </section>

        {/* SECTIONS */}
        <section className="bg-white p-8 border-4 border-black shadow-neo-lg space-y-6">
          <div className="flex items-center justify-between border-b-4 border-black pb-2">
            <h3 className="text-2xl font-black uppercase tracking-widest">Sections</h3>
            <button type="button" onClick={() => appendSection({ section_type: 'Custom', title: '', content: '' })} className="bg-black text-white px-4 py-2 font-bold uppercase text-sm hover:-translate-y-1 transition-transform border-2 border-black">
              + Add Section
            </button>
          </div>
          
          <div className="space-y-6">
            {sectionFields.map((field, index) => (
              <div key={field.id} className="p-6 bg-gray-50 border-4 border-black relative group">
                <div className="absolute -left-4 -top-4 bg-primary text-white w-8 h-8 flex items-center justify-center font-black border-2 border-black">
                  {index + 1}
                </div>
                <div className="flex justify-end gap-2 mb-4">
                  <button type="button" onClick={() => index > 0 && moveSection(index, index - 1)} className="p-2 bg-white border-2 border-black hover:bg-gray-100" title="Move Up">↑</button>
                  <button type="button" onClick={() => index < sectionFields.length - 1 && moveSection(index, index + 1)} className="p-2 bg-white border-2 border-black hover:bg-gray-100" title="Move Down">↓</button>
                  <button type="button" onClick={() => removeSection(index)} className="p-2 bg-accent-2 text-white border-2 border-black hover:bg-red-600"><Trash2 size={16}/></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-black uppercase mb-1">Section Type</label>
                    <select {...register(`sections.${index}.section_type`)} className="w-full px-4 py-2 bg-white border-2 border-black font-bold">
                      {['Overview', 'Problem', 'Goals', 'Research', 'User Flow', 'Wireframes', 'Design Direction', 'Final UI', 'Development', 'Challenges', 'Outcome', 'Learnings', 'Custom'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase mb-1">Title</label>
                    <input {...register(`sections.${index}.title`)} className="w-full px-4 py-2 bg-white border-2 border-black font-bold" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black uppercase mb-1">Content (Markdown supported)</label>
                  <textarea {...register(`sections.${index}.content`)} rows={5} className="w-full px-4 py-2 bg-white border-2 border-black font-bold font-mono text-sm" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INSIGHTS */}
        <section className="bg-white p-8 border-4 border-black shadow-neo-lg space-y-6">
          <div className="flex items-center justify-between border-b-4 border-black pb-2">
            <h3 className="text-2xl font-black uppercase tracking-widest">Research Insights</h3>
            <button type="button" onClick={() => appendInsight({ title: '', description: '' })} className="bg-black text-white px-4 py-2 font-bold uppercase text-sm hover:-translate-y-1 transition-transform border-2 border-black">
              + Add Insight
            </button>
          </div>
          
          <div className="space-y-4">
            {insightFields.map((field, index) => (
              <div key={field.id} className="p-4 bg-gray-50 border-2 border-black flex gap-4">
                <div className="flex-1 space-y-2">
                  <input {...register(`insights.${index}.title`)} placeholder="Insight Title" className="w-full px-4 py-2 bg-white border-2 border-black font-bold" />
                  <textarea {...register(`insights.${index}.description`)} placeholder="Description" rows={2} className="w-full px-4 py-2 bg-white border-2 border-black font-bold" />
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={() => removeInsight(index)} className="p-2 bg-accent-2 text-white border-2 border-black"><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GOALS */}
        <section className="bg-white p-8 border-4 border-black shadow-neo-lg space-y-6">
          <div className="flex items-center justify-between border-b-4 border-black pb-2">
            <h3 className="text-2xl font-black uppercase tracking-widest">Goals</h3>
            <button type="button" onClick={() => appendGoal({ title: '', description: '' })} className="bg-black text-white px-4 py-2 font-bold uppercase text-sm hover:-translate-y-1 transition-transform border-2 border-black">
              + Add Goal
            </button>
          </div>
          
          <div className="space-y-4">
            {goalFields.map((field, index) => (
              <div key={field.id} className="p-4 bg-gray-50 border-2 border-black flex gap-4">
                <div className="flex-1 space-y-2">
                  <input {...register(`goals.${index}.title`)} placeholder="Goal Title" className="w-full px-4 py-2 bg-white border-2 border-black font-bold" />
                  <textarea {...register(`goals.${index}.description`)} placeholder="Description" rows={2} className="w-full px-4 py-2 bg-white border-2 border-black font-bold" />
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={() => removeGoal(index)} className="p-2 bg-accent-2 text-white border-2 border-black"><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ADDITIONAL IMAGES */}
        <section className="bg-white p-8 border-4 border-black shadow-neo-lg space-y-6">
          <div className="flex items-center justify-between border-b-4 border-black pb-2">
            <h3 className="text-2xl font-black uppercase tracking-widest">Additional Images (Gallery / Sections)</h3>
            <button type="button" onClick={() => appendImage({ image_url: '', alt_text: '', caption: '', image_type: 'gallery' })} className="bg-black text-white px-4 py-2 font-bold uppercase text-sm hover:-translate-y-1 transition-transform border-2 border-black">
              + Add Image
            </button>
          </div>
          
          <div className="space-y-4">
            {imageFields.map((field, index) => (
              <div key={field.id} className="p-4 bg-gray-50 border-2 border-black flex gap-6">
                <div className="w-48 flex-shrink-0">
                  <ImageUpload 
                    label="Upload" 
                    value={watch(`images.${index}.image_url`)} 
                    onChange={(url) => setValue(`images.${index}.image_url`, url)} 
                    folder="case_studies" 
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase mb-1">Type</label>
                      <select {...register(`images.${index}.image_type`)} className="w-full px-3 py-2 bg-white border-2 border-black font-bold text-sm">
                        {['gallery', 'research', 'user-flow', 'wireframe', 'design', 'final-ui', 'development'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase mb-1">Alt Text</label>
                      <input {...register(`images.${index}.alt_text`)} className="w-full px-3 py-2 bg-white border-2 border-black font-bold text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">Caption</label>
                    <input {...register(`images.${index}.caption`)} className="w-full px-3 py-2 bg-white border-2 border-black font-bold text-sm" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={() => index > 0 && moveImage(index, index - 1)} className="p-2 bg-white border-2 border-black hover:bg-gray-100" title="Move Up">↑</button>
                  <button type="button" onClick={() => index < imageFields.length - 1 && moveImage(index, index + 1)} className="p-2 bg-white border-2 border-black hover:bg-gray-100" title="Move Down">↓</button>
                  <button type="button" onClick={() => removeImage(index)} className="p-2 bg-accent-2 text-white border-2 border-black hover:bg-red-600"><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SUBMIT */}
        <div className="sticky bottom-0 z-50 bg-white p-6 border-t-4 border-l-4 border-r-4 border-black shadow-neo-lg flex gap-4 mt-8">
          <button type="submit" disabled={saving} className="neo-btn flex-1 text-center justify-center disabled:opacity-50">
            {saving ? 'SAVING...' : 'SAVE CASE STUDY'}
          </button>
          <button type="button" onClick={() => navigate('/admin/case-studies')} className="px-8 py-3 bg-gray-100 font-black uppercase border-2 border-black hover:bg-gray-200 transition-colors">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}
