import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const mockInquiries = [
  {
    name: '김철수',
    company: '한국은행',
    email: 'chulsoo.kim@bok.or.kr',
    phone: '010-1234-5678',
    subject: '퇴직연금시스템 (D-RPS) 도입 문의',
    content: '안녕하세요, 한국은행 IT기획부 김철수 과장입니다. 당행의 차세대 퇴직연금 적립금 운용 관리용 시스템으로 D-RPS 솔루션 도입을 검토 중입니다. 도입 예산 규모와 커스터마이징 가능 범위에 대해 소개 자료 및 미팅을 요청드립니다.',
    status: '미확인'
  },
  {
    name: '이영희',
    company: '신한금융지주',
    email: 'younghee.lee@shinhan.com',
    phone: '02-6300-1122',
    subject: '자산관리시스템 (D-WMS) 도입 문의',
    content: '신한금융그룹 자산관리 기획부 이영희 차장입니다. 당사 고액자산가(HNW) 대상 포트폴리오 관리 플랫폼 고도화를 위해 D-WMS 솔루션 도입 검토 보고서를 작성하고 있습니다. 연동 API 규격서와 표준 구축 기간 정보를 이메일로 받아볼 수 있을까요?',
    status: '진행중'
  },
  {
    name: '박민수',
    company: 'KB국민은행',
    email: 'minsoo.park@kbfg.com',
    phone: '010-9876-5432',
    subject: 'AI 리서치/AX 이노베이션 기술 실증(PoC) 제안',
    content: 'KB국민은행 테크혁신센터 박민수 센터장입니다. 다음에이아이의 금융특화 거대언어모델(LLM) 기반 리서치 어시스턴트 솔루션 기술 실증(PoC)을 진행하고자 연락드렸습니다. 당사 보안 가이드라인에 맞춘 온프레미스 구축 방안이 있는지 논의하고 싶습니다.',
    status: '완료'
  }
];

async function insertMockData() {
  const { data, error } = await supabase
    .from('inquiries')
    .insert(mockInquiries)
    .select();

  if (error) {
    console.error('Mock insert error:', error.message);
  } else {
    console.log('Successfully inserted mock inquiries:', data);
  }
}

insertMockData();
