import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function deleteTestProject() {
  console.log('Searching for projects with title "test" or "null"...');
  
  // 1. Title이 'test'이거나 빈 값인 프로젝트 찾아서 삭제
  const { data, error } = await supabase
    .from('projects')
    .delete()
    .or('title.eq.test,title.eq.null,title.is.null');

  if (error) {
    console.error('Error deleting test project:', error.message);
  } else {
    console.log('Successfully deleted test project(s)!');
  }
}

deleteTestProject();
