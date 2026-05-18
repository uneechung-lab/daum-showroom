const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

async function runMigration() {
    console.log("=== 고객사 & 파트너 데이터 마이그레이션 시작 ===");

    // 1. JSON 파일 로드
    const jsonPath = path.join(__dirname, 'partners.json');
    if (!fs.existsSync(jsonPath)) {
        console.error("오류: scratch/partners.json 파일이 존재하지 않습니다.");
        return;
    }
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const partners = JSON.parse(rawData);
    console.log(`[정보] partners.json 로드 완료: 총 ${partners.length}개 레코드`);

    // 2. REST API 헤더 설정
    const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
    };

    // 3. 기존 테스트 데이터 일괄 삭제 (TOP_SECTION_CONFIG 제외)
    console.log("[진행] 기존 데이터 정리 중 (TOP_SECTION_CONFIG 제외)...");
    const deleteUrl = `${SUPABASE_URL}/rest/v1/partners?name=neq.TOP_SECTION_CONFIG`;
    try {
        const deleteResponse = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: headers
        });

        if (!deleteResponse.ok) {
            const errorText = await deleteResponse.text();
            throw new Error(`기존 데이터 삭제 실패: ${deleteResponse.status} ${errorText}`);
        }
        console.log("[성공] 기존 데이터 정리가 완료되었습니다.");
    } catch (e) {
        console.error("오류 발생:", e.message);
        return;
    }

    // 4. 스키마 컬럼 매핑 및 정렬 인덱스 부여
    const payload = partners.map((p, idx) => ({
        name: p.name,
        partner_type: p.type || 'client', // type -> partner_type 매핑
        logo_url: p.logo_url,
        order_index: idx * 10 // 순서 유지를 위한 인덱스 부여
    }));

    // 5. Supabase bulk insert 수행
    console.log(`[진행] Supabase DB로 ${payload.length}개 레코드 삽입 중...`);
    const insertUrl = `${SUPABASE_URL}/rest/v1/partners`;
    try {
        const insertResponse = await fetch(insertUrl, {
            method: 'POST',
            headers: {
                ...headers,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(payload)
        });

        if (!insertResponse.ok) {
            const errorText = await insertResponse.text();
            throw new Error(`데이터 삽입 실패: ${insertResponse.status} ${errorText}`);
        }

        const result = await insertResponse.json();
        console.log(`[성공] 총 ${result.length}개의 데이터가 Supabase DB에 성공적으로 저장되었습니다!`);
        console.log("=== 마이그레이션이 완료되었습니다! ===");
    } catch (e) {
        console.error("오류 발생:", e.message);
    }
}

runMigration();
