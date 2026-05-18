const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
};

const tables = ['careers', 'jobs', 'recruitment', 'job_postings', 'announcements'];

async function checkTables() {
    for (const table of tables) {
        const url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
        try {
            const response = await fetch(url, { headers });
            console.log(`Table '${table}': Status ${response.status}`);
            if (response.status === 200) {
                const data = await response.json();
                console.log(`Sample data:`, data.slice(0, 2));
            }
        } catch (e) {
            console.error(`Failed to query ${table}:`, e);
        }
    }
}

checkTables();
