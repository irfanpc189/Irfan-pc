import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkjymooogdxvjzdsiwrh.supabase.co';
const supabaseKey = 'sb_publishable_e8wj0AhDnOJsuzD4MbJGxQ_YAuAoUQY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const toInsert = {
    section_type: 'Custom',
    title: 'Test',
    content: 'Content',
    case_study_id: 1,
    display_order: 0,
    id: undefined
  };

  const res = await supabase.from('case_study_sections').insert(toInsert);
  console.log('case_study_sections insert result:', JSON.stringify(res, null, 2));

  const goalsRes = await supabase.from('case_study_goals').insert({ title: 'T', description: 'D', case_study_id: 1, display_order: 0, id: undefined });
  console.log('case_study_goals insert result:', JSON.stringify(goalsRes, null, 2));
  
  const insightsRes = await supabase.from('case_study_insights').insert({ title: 'T', description: 'D', case_study_id: 1, display_order: 0, id: undefined });
  console.log('case_study_insights insert result:', JSON.stringify(insightsRes, null, 2));

  const imagesRes = await supabase.from('case_study_images').insert({ image_url: 'u', alt_text: 'a', caption: 'c', image_type: 'gallery', case_study_id: 1, display_order: 0, id: undefined });
  console.log('case_study_images insert result:', JSON.stringify(imagesRes, null, 2));
}

run();
