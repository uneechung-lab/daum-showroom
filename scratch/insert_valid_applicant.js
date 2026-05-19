const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function insertValid() {
    try {
        // 1. Fetch active posting
        const postRes = await fetch(`${SUPABASE_URL}/rest/v1/job_postings?select=id,title&limit=1`, { headers });
        const postings = await postRes.json();
        if (postings.length === 0) {
            console.log("No job postings found!");
            return;
        }
        const postingId = postings[0].id;
        console.log(`Using posting_id: ${postingId} (${postings[0].title})`);
        
        // 2. Insert applicant
        const appRes = await fetch(`${SUPABASE_URL}/rest/v1/applicants`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                posting_id: postingId,
                name: '홍길동',
                email: 'gildong@daumis.co.kr',
                phone: '010-1234-5678',
                portfolio_url: 'https://github.com/gildong',
                resume_url: 'https://supabase.co/storage/v1/object/public/resumes/resume_gildong.pdf',
                cover_letter: '안녕하세요. 금융 시스템 개발에 관심이 많은 홍길동입니다. 다음에이아이와 함께 성장하고 싶습니다.',
                status: '서류제출'
            })
        });
        
        const data = await appRes.json();
        console.log("Status:", appRes.status);
        console.log("Response data:", data);
    } catch (e) {
        console.error(e);
    }
}

insertValid();
