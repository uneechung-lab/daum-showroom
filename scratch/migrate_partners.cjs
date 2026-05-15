const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
    const html = fs.readFileSync('c:/daum_site/clients.html', 'utf8');
    const regex = /<div class="client-item"><img src="([^"]+)"/g;
    let match;
    const items = [];
    
    items.push({ name: '키움증권', type: 'client', logo_url: '/ci_kw.png' });
    items.push({ name: '토스', type: 'client', logo_url: '/ci_toss.png' });
    items.push({ name: '삼성', type: 'client', logo_url: '/ci_ss.png' });

    let idx = 4;
    while ((match = regex.exec(html)) !== null) {
        // 이미 추가된 파일 중복 제거
        if (['/ci_kw.png', '/ci_toss.png', '/ci_ss.png'].includes(match[1])) continue;
        
        items.push({
            name: '고객사 ' + idx,
            type: 'client', // client or partner
            logo_url: match[1]
        });
        idx++;
    }

    console.log(`총 ${items.length}개의 데이터를 삽입합니다...`);

    // Insert into 'partners' table
    let successCount = 0;
    for (const item of items) {
        const { error } = await supabase.from('partners').insert([item]);
        if (error) {
            console.error('Error inserting', item.logo_url, error.message);
            if (error.message.includes('does not exist')) {
                console.error("테이블이 존재하지 않습니다!");
                return;
            }
        } else {
            successCount++;
        }
    }
    console.log(`성공적으로 ${successCount}개의 데이터를 삽입했습니다.`);
}
run();
