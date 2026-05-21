import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkSchema() {
  const { data, error } = await supabase.rpc('get_inquiries_schema'); // if helper exists
  if (error) {
    // Let's run a raw query using supabase.from to insert and fail to see schema, or select and check properties
    console.log('Trying direct query on a non-existent row or inserting');
    const { data: insertData, error: insertError } = await supabase
      .from('inquiries')
      .insert({
        name: 'Test Name',
        email: 'test@example.com',
        type: 'RPS',
        content: 'Test content',
        status: '미확인'
      })
      .select();

    if (insertError) {
      console.error('Insert error:', insertError.message, insertError);
    } else {
      console.log('Insert success! Returned schema:', insertData);
      // Clean up test insert
      if (insertData && insertData[0]) {
        await supabase.from('inquiries').delete().eq('id', insertData[0].id);
        console.log('Cleanup complete');
      }
    }
  } else {
    console.log('Schema:', data);
  }
}

checkSchema();
