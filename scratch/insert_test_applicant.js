const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function testInsert() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/applicants`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                name: '테스트 지원자',
                email: 'test@example.com',
                phone: '010-1234-5678',
                job_title: '금융 시스템 개발자',
                exp_type: '신입',
                rank: '초급',
                portfolio_url: 'https://test.com',
                message: '테스트 자기소개 내용입니다.',
                file_name: '이력서_테스트.pdf',
                status: '서류제출'
            })
        });
        const text = await response.text();
        console.log("Status:", response.status);
        console.log("Response text:", text);
    } catch (e) {
        console.error(e);
    }
}

testInsert();
