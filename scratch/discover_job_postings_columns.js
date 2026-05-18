const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

async function discover() {
    const candidates = [
        'department', 'dept', 'employment_type', 'job_type', 'type',
        'deadline', 'end_date', 'due_date', 'closed_at', 'closes_at',
        'responsibilities', 'tasks', 'description', 'content', 'intro',
        'qualifications', 'requirements', 'preferred', 'skills',
        'welfare', 'benefits', 'status', 'is_active', 'active',
        'order_index', 'meta', 'label', 'location', 'place', 'experience_type'
    ];
    
    console.log("Starting column discovery for 'job_postings'...");
    
    for (const col of candidates) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/job_postings`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    title: '금융 시스템 개발자',
                    [col]: 'test'
                })
            });
            const data = await response.json();
            
            if (response.status === 401 || (data && data.code === '42501')) {
                console.log(`[EXIST] Column exists: ${col}`);
            } else if (data && data.code === 'PGRST204') {
                // Column missing
            } else {
                console.log(`[OTHER] Result for ${col} (Status ${response.status}):`, data);
            }
        } catch (e) {
            console.error(`Error probing ${col}:`, e);
        }
    }
    console.log("Column discovery finished!");
}

discover();
