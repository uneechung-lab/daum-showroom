const fs = require('fs');

async function migrate() {
    const html = fs.readFileSync('project.html', 'utf8');
    const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

    // 정규식 업데이트: HTML 구조에 맞춰 정밀하게 파싱
    const regex = /<div class="project-card" data-category="([^"]+)"[^>]*>[\s\S]*?data-lucide="([^"]+)"[\s\S]*?<span class="company-name">([^<]+)<\/span>\s*([^<]+)<\/h3>[\s\S]*?<div class="project-year">([^<]+)<\/div>/g;
    
    let match;
    const projects = [];
    while ((match = regex.exec(html)) !== null) {
        const [_, category, icon, client, title, period] = match;
        const isOngoing = period.includes('현재') || period.includes('진행');
        const [start_date, end_date] = period.split('~').map(s => s.trim());
        
        projects.push({
            title: title.trim(),
            category: category.trim(),
            client: client.trim(),
            start_date: start_date,
            end_date: end_date || (isOngoing ? '현재' : start_date),
            icon_name: icon.trim(),
            status: isOngoing ? 'ONGOING' : 'COMPLETED'
        });
    }

    console.log(`${projects.length}개의 프로젝트를 찾았습니다. 마이그레이션을 시작합니다...`);

    if (projects.length === 0) {
        console.log('추출 실패: 정규식을 다시 확인해야 합니다.');
        return;
    }

    // 기존 데이터 삭제 (청소)
    await fetch(`${SUPABASE_URL}/rest/v1/projects?id=gt.0`, {
        method: 'DELETE',
        headers: { 
            'apikey': SUPABASE_KEY, 
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json'
        }
    });

    // 데이터 입력
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
        console.log('전체 마이그레이션 성공!');
    } else {
        console.error('마이그레이션 실패:', await response.text());
    }
}

migrate();
