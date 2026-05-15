const fs = require('fs');

async function migrate() {
    const html = fs.readFileSync('project.html', 'utf8');
    const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

    // 정규식으로 프로젝트 데이터 추출
    const regex = /<div class="project-card" data-category="([^"]+)"[^>]*>[\s\S]*?<div class="icon">[\s\S]*?<i data-lucide="([^"]+)"[\s\S]*?<div class="client-name">([^<]+)<\/div>[\s\S]*?<h3>([^<]+)<\/h3>[\s\S]*?<div class="period">([^<]+)<\/div>/g;
    
    let match;
    const projects = [];
    while ((match = regex.exec(html)) !== null) {
        const [_, category, icon, client, title, period] = match;
        const [start_date, end_date] = period.split('~').map(s => s.trim());
        
        projects.push({
            title: title.trim(),
            category: category.trim(),
            client: client.trim(),
            start_date: start_date,
            end_date: end_date || '현재',
            icon_name: icon.trim(),
            status: (end_date && end_date.includes('현재')) || period.includes('현재') ? 'ONGOING' : 'COMPLETED'
        });
    }

    console.log(`${projects.length}개의 프로젝트를 찾았습니다. 마이그레이션을 시작합니다...`);

    if (projects.length === 0) {
        console.log('추출된 프로젝트가 없습니다. 정규식을 확인해 주세요.');
        return;
    }

    // Supabase에 데이터 입력
    const response = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify(projects)
    });

    if (response.ok) {
        console.log('마이그레이션 성공!');
    } else {
        try {
            const error = await response.json();
            console.error('마이그레이션 실패:', error);
        } catch(e) {
            console.error('마이그레이션 실패 (응답 본문 없음)');
        }
    }
}

migrate();
