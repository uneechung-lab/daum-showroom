const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function getOpenApi() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/`, { headers });
        const doc = await response.json();
        console.log("Available paths:", Object.keys(doc.paths));
        console.log("Available definitions:", Object.keys(doc.definitions || {}));
        if (doc.definitions && doc.definitions.job_postings) {
            console.log("job_postings definition:", JSON.stringify(doc.definitions.job_postings, null, 2));
        } else {
            // Log a key matching job_postings or similar
            const matchingKeys = Object.keys(doc.definitions || {}).filter(k => k.toLowerCase().includes('job'));
            console.log("Matching keys for 'job':", matchingKeys);
        }
    } catch (e) {
        console.error("Error fetching OpenAPI doc:", e);
    }
}

getOpenApi();
