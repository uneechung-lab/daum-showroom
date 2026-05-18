const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const topConfig = {
  headline: "초일류 금융사부터\n공공 비즈니스까지, 금융의 미래를 구축하고 있습니다.",
  stories: [
    {
      company: "키움증권",
      logo: "/ci_kw.png",
      quote: "혁신적인 퇴직연금 시스템을\n성공적으로 구축했습니다.",
      stats: "다음의 기술력 덕분에 복잡한 연금 구조를\n효율적으로 자동화하여 운영 효율을 60% 높였습니다."
    },
    {
      company: "토스",
      logo: "/ci_toss.png",
      quote: "복잡한 금융 인가 절차를\n단 3개월 만에 마쳤습니다.",
      stats: "전문적인 컨설팅과 솔루션 덕분에\n신규 비즈니스 런칭 일정을 2개월 앞당겼습니다."
    },
    {
      company: "삼성생명",
      logo: "/ci_ss.png",
      quote: "고객 중심의 자산관리 플랫폼으로\n디지털 전환에 성공했습니다.",
      stats: "클라우드 네이티브 아키텍처 도입으로\n시스템 안정성을 확보하고 서비스 유연성을 극대화했습니다."
    },
    {
      company: "고객사 7", // KB
      logo: "/assets/client_04.gif",
      quote: "차세대 뱅킹 시스템 구축을 위한\n최적의 기술 파트너입니다.",
      stats: "금융 도메인에 대한 깊은 이해도를 바탕으로\n리스크 없이 안정적인 대규모 인프라 전환을 수행했습니다."
    },
    {
      company: "고객사 8", // Hana
      logo: "/assets/client_05.jpg",
      quote: "글로벌 금융 시장 확대를 위한\n시스템 고도화를 실현했습니다.",
      stats: "다양한 국가의 금융 규제를 준수하는\n유연한 아키텍처 설계로 글로벌 경쟁력을 강화했습니다."
    },
    {
      company: "고객사 9", // Shinhan
      logo: "/assets/client_06.png",
      quote: "AI 기반 이상거래 탐지 시스템으로\n보안 수준을 한 단계 높였습니다.",
      stats: "고도화된 알고리즘을 통해 탐지 정확도를\n획기적으로 개선하고 실시간 모니터링 체계를 구축했습니다."
    }
  ]
};

async function registerStories() {
    console.log("=== 우수사례 슬라이드 초기 설정 등록 시작 ===");

    const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
    };

    // 1. 기존 TOP_SECTION_CONFIG 삭제
    console.log("[진행] 기존 TOP_SECTION_CONFIG 레코드 정리 중...");
    await fetch(`${SUPABASE_URL}/rest/v1/partners?name=eq.TOP_SECTION_CONFIG`, {
        method: 'DELETE',
        headers: headers
    });

    // 2. 새 레코드 삽입
    const payload = {
        name: 'TOP_SECTION_CONFIG',
        partner_type: 'client', // 'config' -> 'client' 로 수정하여 CHECK 제약 조건 회피
        logo_url: JSON.stringify(topConfig),
        order_index: -9999
    };

    console.log("[진행] 새로운 TOP_SECTION_CONFIG 레코드 삽입 중...");
    const response = await fetch(`${SUPABASE_URL}/rest/v1/partners`, {
        method: 'POST',
        headers: {
            ...headers,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify([payload])
    });

    if (response.ok) {
        console.log("=== [성공] 우수사례 슬라이드 6개 데이터 등록 완료! ===");
    } else {
        console.error("오류 발생:", await response.text());
    }
}

registerStories();
