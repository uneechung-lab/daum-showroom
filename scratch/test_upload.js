import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testUpload() {
  const fileData = new Uint8Array([1, 2, 3]);
  const { data, error } = await supabase.storage
    .from('project-assets')
    .upload('test_dummy.bin', fileData, {
      contentType: 'application/octet-stream',
      upsert: true
    });

  if (error) {
    console.error('Error uploading to resumes:', error.message);
  } else {
    console.log('Upload success to resumes!', data);
  }
}

testUpload();
