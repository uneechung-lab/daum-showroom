const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

async function fetchSchema() {
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/`, { headers });
  const schema = await response.json();

  console.log('Raw schema:', schema);
  if (schema.paths) {
    console.log('Paths:', Object.keys(schema.paths));
    const inquiriesPath = schema.paths['/inquiries'];
    if (inquiriesPath) {
      console.log('Inquiries path operations:', inquiriesPath);
    }
  }
  if (schema.definitions) {
    console.log('Definitions keys:', Object.keys(schema.definitions));
    if (schema.definitions.inquiries) {
      console.log('inquiries def:', schema.definitions.inquiries);
    }
  }
}

fetchSchema();
