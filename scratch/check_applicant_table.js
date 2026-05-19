const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function checkTables() {
    const tables = ['job_applications', 'applicants', 'submissions', 'job_applicants', 'applications', 'inquiries'];
    for (const table of tables) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&limit=1`, { headers });
            console.log(`Table '${table}': Status ${response.status}`);
            if (response.status === 200) {
                const data = await response.json();
                console.log(`Table '${table}' exists! Sample data:`, data);
            }
        } catch (e) {
            console.error(`Error for ${table}:`, e);
        }
    }
}

checkTables();
