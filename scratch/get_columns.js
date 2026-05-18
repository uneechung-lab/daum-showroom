const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};

async function getColumns() {
    const url = `${SUPABASE_URL}/rest/v1/job_postings`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({})
        });
        
        console.log("POST status:", response.status);
        const data = await response.json();
        console.log("POST response data (columns info):", data);
        
        if (response.status === 201 && data && data.length > 0) {
            const insertedRow = data[0];
            console.log("\nFound columns:", Object.keys(insertedRow));
            
            // Clean up the dummy inserted row
            if (insertedRow.id) {
                const deleteResponse = await fetch(`${url}?id=eq.${insertedRow.id}`, {
                    method: 'DELETE',
                    headers: {
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`
                    }
                });
                console.log("Cleanup status:", deleteResponse.status);
            }
        }
    } catch (e) {
        console.error("Error inserting/deleting:", e);
    }
}

getColumns();
