import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkjymooogdxvjzdsiwrh.supabase.co';
const supabaseKey = 'sb_publishable_e8wj0AhDnOJsuzD4MbJGxQ_YAuAoUQY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: caseStudy, error } = await supabase
    .from('case_studies')
    .select('id, slug')
    .eq('slug', 'vaaki')
    .single();

  if (error) {
    console.error('Error fetching case study:', error);
    return;
  }

  console.log('Case Study ID:', caseStudy.id);

  const id = caseStudy.id;

  const [sections, goals, insights, images] = await Promise.all([
    supabase.from('case_study_sections').select('*', { count: 'exact' }).eq('case_study_id', id),
    supabase.from('case_study_goals').select('*', { count: 'exact' }).eq('case_study_id', id),
    supabase.from('case_study_insights').select('*', { count: 'exact' }).eq('case_study_id', id),
    supabase.from('case_study_images').select('*', { count: 'exact' }).eq('case_study_id', id)
  ]);

  console.log(`case_study_sections count: ${sections.data?.length} (error: ${sections.error?.message || 'none'})`);
  console.log(`case_study_goals count: ${goals.data?.length} (error: ${goals.error?.message || 'none'})`);
  console.log(`case_study_insights count: ${insights.data?.length} (error: ${insights.error?.message || 'none'})`);
  console.log(`case_study_images count: ${images.data?.length} (error: ${images.error?.message || 'none'})`);
}

run();
