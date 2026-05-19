const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function tryInserts() {
    try {
        const postRes = await fetch(`${SUPABASE_URL}/rest/v1/job_postings?select=id&limit=1`, { headers });
        const postings = await postRes.json();
        const postingId = postings[0].id;

        // Try 1: Minimal insert with name and posting_id only
        const res1 = await fetch(`${SUPABASE_URL}/rest/v1/applicants`, {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                posting_id: postingId,
                name: '테스트1'
            })
        });
        console.log("Try 1 (minimal):", res1.status, await res1.text());

        // Try 2: Minimal insert with status as '서류제출'
        const res2 = await fetch(`${SUPABASE_URL}/rest/v1/applicants`, {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                posting_id: postingId,
                name: '테스트2',
                status: '서류제출'
            })
        });
        console.log("Try 2 (with status):", res2.status, await res2.text());

        // Try 3: Insert with default status (omitted)
        const res3 = await fetch(`${SUPABASE_URL}/rest/v1/applicants`, {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                posting_id: postingId,
                name: '테스트3',
                email: 'test3@daumis.co.kr',
                phone: '010-0000-0000'
            })
        });
        console.log("Try 3 (omitted status):", res3.status, await res3.text());

    } catch (e) {
        console.error(e);
    }
}

tryInserts();
