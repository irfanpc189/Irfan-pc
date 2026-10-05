import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkjymooogdxvjzdsiwrh.supabase.co';
const supabaseKey = 'sb_publishable_e8wj0AhDnOJsuzD4MbJGxQ_YAuAoUQY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@vaaki.com',
    password: 'Testpassword123!'
  });
  console.log('Signup result:', data, error);
}

run();
