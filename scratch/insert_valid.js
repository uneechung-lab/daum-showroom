import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function insertValid() {
  const { data, error } = await supabase
    .from('inquiries')
    .insert({
      name: '홍길동',
      company: '다음에이아이',
      email: 'hong@company.com',
      phone: '010-1234-5678',
      subject: 'D-RPS 퇴직연금시스템 도입 문의',
      content: '안녕하세요. 시스템 도입 단가 및 기간을 문의드립니다.',
      status: '미확인'
    })
    .select();

  if (error) {
    console.error('Insert error:', error.message, error);
  } else {
    console.log('Successfully inserted valid row:', data);
  }
}

insertValid();
