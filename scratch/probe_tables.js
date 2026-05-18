const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

async function probe() {
    const candidates = [
        'history_config',
        'history_eras',
        'eras',
        'history_settings',
        'history_sections',
        'settings'
    ];
    
    for (const name of candidates) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/${name}?select=*`, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });
            console.log(`Table '${name}': Status ${response.status}`);
        } catch (e) {
            console.error(`Error for ${name}:`, e);
        }
    }
}
probe();
