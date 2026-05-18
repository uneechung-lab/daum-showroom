const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

async function discover() {
    const candidates = [
        'is_major',
        'major',
        'is_primary',
        'primary',
        'is_emphasis',
        'emphasis',
        'is_complete',
        'complete',
        'is_important',
        'description',
        'is_highlighted',
        'highlighted',
        'is_accent',
        'accent'
    ];
    
    for (const col of candidates) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/history`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    year: '2026',
                    month: '05',
                    content: 'Test content',
                    [col]: col === 'description' ? 'test' : false
                })
            });
            const text = await response.text();
            if (response.status === 401 || text.includes('violates row-level security')) {
                console.log(`Column exists: ${col}`);
            } else {
                console.log(`Column missing or error for ${col}:`, text);
            }
        } catch (e) {
            console.error('Error for', col, e);
        }
    }
}
discover();
