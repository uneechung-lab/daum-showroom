const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

async function discover() {
    const candidates = [
        'resume_url', 'resume_path', 'file_url', 'file_path',
        'cv_url', 'cv_path', 'cv', 'attachment_url',
        'experience_level', 'tech_grade', 'grade',
        'career_status', 'tech_class', 'class'
    ];
    
    console.log("Starting column discovery for 'applicants' part 3...");
    
    for (const col of candidates) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/applicants`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    [col]: 'test'
                })
            });
            const data = await response.json();
            
            if (response.status === 400 && data && data.code === 'PGRST204') {
                // Column missing (PGRST204)
            } else {
                // Column exists (or some other error like RLS, constraint, or success)
                console.log(`[EXIST] Column exists: '${col}' (Status ${response.status})`, data);
            }
        } catch (e) {
            console.error(`Error probing ${col}:`, e);
        }
    }
    console.log("Column discovery finished!");
}

discover();
