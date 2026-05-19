const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

async function getOpenapi() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_KEY}`);
        const data = await response.json();
        console.log("Keys of API doc:", Object.keys(data));
        if (data.definitions && data.definitions.applicants) {
            console.log("applicants columns:", Object.keys(data.definitions.applicants.properties));
        } else {
            console.log("No definitions.applicants. data.definitions:", data.definitions ? Object.keys(data.definitions) : null);
        }
    } catch (e) {
        console.error(e);
    }
}

getOpenapi();
