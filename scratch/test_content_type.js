const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

async function testContentType() {
    // 1. Test sending content as JSON object
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
                department: '금융사업부',
                job_type: '정규직',
                end_date: '2026-12-31',
                content: {
                    label: 'Open Roles',
                    meta: ["정규직/계약직/프리랜서", "여의도/서울대입구", "상시채용"],
                    intro: 'Role introduction test',
                    tasks: ['task1', 'task2'],
                    requirements: ['req1'],
                    preferred: ['pref1']
                },
                is_active: true
            })
        });
        const data = await response.json();
        console.log("JSON object response:", response.status, data);
    } catch (e) {
        console.error("Error for JSON object:", e);
    }

    // 2. Test sending content as string
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
                department: '금융사업부',
                job_type: '정규직',
                end_date: '2026-12-31',
                content: 'Plain text content test',
                is_active: true
            })
        });
        const data = await response.json();
        console.log("Plain text response:", response.status, data);
    } catch (e) {
        console.error("Error for plain text:", e);
    }
}

testContentType();
