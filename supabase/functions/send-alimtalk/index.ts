import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0"

// 솔라피(Solapi) API 인증 헤더 생성 유틸리티 함수
async function makeSolapiAuthHeader(apiKey: string, apiSecret: string) {
  const date = new Date().toISOString();
  const salt = Math.random().toString(36).substring(2, 15);
  
  // Hashing API Secret + Date + Salt
  const encoder = new TextEncoder();
  const keyData = encoder.encode(apiSecret);
  const messageData = encoder.encode(date + salt);
  
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    messageData
  );
  
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signature = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

serve(async (req) => {
  // CORS 프리플라이트 요청 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const payload = await req.json();
    
    // Supabase Webhook Insert 페이로드 추출
    const newRecord = payload.record; 
    if (!newRecord) {
      return new Response(JSON.stringify({ error: "No record found in payload" }), { status: 400 });
    }

    const applicantName = newRecord.name;
    const applicantPhone = newRecord.phone;
    const coverLetter = newRecord.cover_letter || "";

    // 1. Supabase에서 지원한 공고의 제목을 가져옵니다.
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? "";
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    let jobTitle = "상시 채용 인재풀";
    if (newRecord.posting_id) {
      const { data: jobData } = await supabase
        .from('job_postings')
        .select('title')
        .eq('id', newRecord.posting_id)
        .single();
      if (jobData) jobTitle = jobData.title;
    }

    // 2. 환경 변수에서 솔라피 API 정보 및 카카오 설정값 로드
    const SOLAPI_API_KEY = Deno.env.get('SOLAPI_API_KEY') || "YOUR_SOLAPI_API_KEY";
    const SOLAPI_API_SECRET = Deno.env.get('SOLAPI_API_SECRET') || "YOUR_SOLAPI_API_SECRET";
    const ADMIN_PHONE = Deno.env.get('ADMIN_PHONE_NUMBER') || "01012345678"; // 알림을 받을 담당자 번호
    const SENDER_PHONE = Deno.env.get('SENDER_PHONE_NUMBER') || "0262478413"; // 등록된 발신 번호
    const KAKAO_PF_ID = Deno.env.get('KAKAO_PF_ID') || "YOUR_KAKAO_PF_ID"; // 카카오톡 채널 프로필 ID (@다음정보시스템즈)
    const KAKAO_TEMPLATE_ID = Deno.env.get('KAKAO_TEMPLATE_ID') || "YOUR_TEMPLATE_ID"; // 승인받은 알림톡 템플릿 ID

    // 알림톡 인증 헤더
    const authHeader = await makeSolapiAuthHeader(SOLAPI_API_KEY, SOLAPI_API_SECRET);

    // 3. 담당자용 카카오 알림톡 발송 Payload 설계
    // (템플릿 검수 시 승인받은 형식과 정확히 일치해야 발송됩니다)
    const alimtalkBody = {
      message: {
        to: ADMIN_PHONE,
        from: SENDER_PHONE,
        text: `[다음정보시스템즈] 신규 지원서가 접수되었습니다.\n\n▶ 지원자: ${applicantName}\n▶ 지원공고: ${jobTitle}\n▶ 연락처: ${applicantPhone}\n\n어드민 페이지에서 상세 이력서와 내용을 확인해 주세요.`,
        kakaoOptions: {
          pfId: KAKAO_PF_ID,
          templateId: KAKAO_TEMPLATE_ID,
          variables: {
            "#{name}": applicantName,
            "#{jobTitle}": jobTitle,
            "#{phone}": applicantPhone
          }
        }
      }
    };

    // 4. 솔라피 API 호출하여 전송
    const response = await fetch("https://api.solapi.com/messages/v4/send", {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(alimtalkBody)
    });

    const result = await response.json();

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
