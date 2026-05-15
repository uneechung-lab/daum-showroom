// Supabase 클라이언트 초기화 설정 (변수명 충돌 방지를 위해 supabaseClient로 정의)
const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';

// Supabase 라이브러리의 createClient 호출
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 공통 유틸리티 함수
async function handleLogout() {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
        window.location.href = '/admin/login.html';
    }
}
