import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkColumns() {
  const { data, error } = await supabase
    .from('inquiries')
    .insert({})
    .select();

  if (error) {
    console.error('Insert empty error:', error.message, error);
  } else {
    console.log('Insert empty success! Row returned:', data);
    if (data && data[0]) {
      await supabase.from('inquiries').delete().eq('id', data[0].id);
      console.log('Cleanup complete');
    }
  }
}

checkColumns();
