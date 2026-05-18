const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function dumpApi() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/`, { headers });
        const text = await response.text();
        console.log("Root response status:", response.status);
        console.log("Root response length:", text.length);
        console.log("Root response preview (first 1000 chars):");
        console.log(text.substring(0, 1000));
        
        // Write to file for full inspection if it's large
        const fs = require('fs');
        fs.writeFileSync('scratch/openapi_raw.json', text);
        console.log("Wrote raw openapi to scratch/openapi_raw.json");
    } catch (e) {
        console.error("Error dumping API:", e);
    }
}

dumpApi();
