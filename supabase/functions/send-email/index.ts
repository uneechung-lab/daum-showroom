import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0"

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
    const applicantEmail = newRecord.email;
    
    // Parse Tech Category and Rank if available
    let coverLetter = newRecord.cover_letter || "";
    let parsedInfo = "";
    if (coverLetter.startsWith('[경력구분:')) {
      const endMatchIndex = coverLetter.indexOf(']');
      if (endMatchIndex > -1) {
        parsedInfo = coverLetter.substring(0, endMatchIndex + 1);
        coverLetter = coverLetter.substring(endMatchIndex + 1).trim();
      }
    }

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

    // 2. 환경 변수에서 Resend API 키 및 수신 이메일 주소 획득
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || "re_your_api_key";
    const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || "admin@daumit.net"; // 알림 메일을 받을 주소

    // 3. [이메일 1] 담당자(상무님) 알림 메일 발송
    const adminEmailBody = {
      from: "다음정보시스템즈 채용알림 <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: `[신규 지원서] '${applicantName}'님이 '${jobTitle}' 공고에 지원하였습니다.`,
      html: `
        <div style="font-family: 'Pretendard', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 2.5rem 2rem; border: 1px solid #f1f5f9; border-radius: 24px; background: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.02);">
          <div style="text-align: center; margin-bottom: 2.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1.5rem;">
            <h2 style="color: #0f172a; font-size: 1.6rem; font-weight: 800; margin: 0 0 0.5rem 0; letter-spacing: -0.025em; line-height: 1.3;">새로운 지원서 접수 안내</h2>
            <p style="color: #64748b; font-size: 0.95rem; margin: 0; font-weight: 500;">다음정보시스템즈 채용 시스템에서 알림을 보냅니다.</p>
          </div>
          
          <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem; line-height: 1.8;">
              <tr>
                <td style="padding: 0.4rem 0; color: #64748b; font-weight: 600; width: 100px;">지원자명</td>
                <td style="padding: 0.4rem 0; color: #0f172a; font-weight: 700; font-size: 1.05rem;">${applicantName}</td>
              </tr>
              <tr>
                <td style="padding: 0.4rem 0; color: #64748b; font-weight: 600;">지원 분야</td>
                <td style="padding: 0.4rem 0; color: #0284c7; font-weight: 700;">${jobTitle}</td>
              </tr>
              <tr>
                <td style="padding: 0.4rem 0; color: #64748b; font-weight: 600;">연락처</td>
                <td style="padding: 0.4rem 0; color: #334155; font-weight: 500;">${applicantPhone}</td>
              </tr>
              <tr>
                <td style="padding: 0.4rem 0; color: #64748b; font-weight: 600;">이메일</td>
                <td style="padding: 0.4rem 0; color: #334155; font-weight: 500;">${applicantEmail}</td>
              </tr>
              ${parsedInfo ? `
              <tr>
                <td style="padding: 0.4rem 0; color: #64748b; font-weight: 600;">지원 정보</td>
                <td style="padding: 0.4rem 0; color: #10b981; font-weight: 600;">${parsedInfo}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="margin-bottom: 2.5rem;">
            <h4 style="color: #0f172a; font-size: 1.05rem; font-weight: 700; margin: 0 0 0.75rem 0;">자기소개 및 한마디</h4>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; color: #334155; font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap; min-height: 100px;">
              ${coverLetter.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="text-align: center; border-top: 1px solid #f1f5f9; padding-top: 2rem;">
            <a href="http://localhost:3000/admin/careers.html" target="_blank" style="display: inline-block; padding: 0.9rem 2.25rem; background: #0f172a; color: #ffffff; font-weight: 700; font-size: 0.95rem; border-radius: 14px; text-decoration: none; box-shadow: 0 8px 20px rgba(15,23,42,0.15); transition: background 0.2s;">
              어드민 대시보드에서 이력서 보기
            </a>
          </div>
        </div>
      `
    };

    const adminResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(adminEmailBody)
    });

    const adminResult = await adminResponse.json();

    // 4. [이메일 2] 지원자용 감사/확인 메일 발송 (도메인 미인증 샌드박스 상태일 때 에러로 전체 흐름이 깨지지 않도록 try-catch 적용)
    let applicantResult = null;
    try {
      const applicantEmailBody = {
        from: "다음정보시스템즈 채용팀 <onboarding@resend.dev>",
        to: [applicantEmail],
        subject: `[다음정보시스템즈] '${applicantName}'님의 입사지원서가 정상적으로 접수되었습니다.`,
        html: `
          <div style="font-family: 'Pretendard', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 2.5rem 2rem; border: 1px solid #f1f5f9; border-radius: 24px; background: #ffffff;">
            <div style="text-align: center; margin-bottom: 2rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1.5rem;">
              <h2 style="color: #0f172a; font-size: 1.5rem; font-weight: 800; margin: 0 0 0.5rem 0;">입사지원 접수 완료</h2>
              <p style="color: #64748b; font-size: 0.95rem; margin: 0; font-weight: 500;">다음정보시스템즈 채용에 관심을 가져주셔서 깊이 감사드립니다.</p>
            </div>
            
            <p style="color: #334155; font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem;">
              안녕하세요, <strong>${applicantName}</strong>님.<br>
              다음정보시스템즈 채용담당자입니다.
            </p>

            <p style="color: #334155; font-size: 1rem; line-height: 1.7; margin-bottom: 2rem;">
              보내주신 귀중한 입사지원서가 성공적으로 접수되었습니다.<br>
              제출해 주신 지원 서류는 채용팀과 현업 부서에서 면밀히 검토할 예정이며, 서류 전형 결과는 결과 여부와 관계없이 기재해 주신 연락처와 이메일로 개별 안내해 드릴 예정입니다.
            </p>

            <div style="background: #f8fafc; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; border: 1px solid #f1f5f9;">
              <h4 style="color: #0f172a; margin: 0 0 0.75rem 0; font-size: 1rem; font-weight: 700;">접수 세부 정보</h4>
              <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem; line-height: 1.6; color: #475569;">
                <tr>
                  <td style="width: 100px; font-weight: 600;">지원 분야</td>
                  <td style="color: #0f172a; font-weight: 700;">${jobTitle}</td>
                </tr>
                <tr>
                  <td style="font-weight: 600;">접수 일시</td>
                  <td style="color: #0f172a;">${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
                </tr>
              </table>
            </div>

            <p style="color: #64748b; font-size: 0.9rem; line-height: 1.6; margin-bottom: 2rem; border-top: 1px solid #f1f5f9; padding-top: 1.5rem;">
              ※ 본 메일은 발신 전용 메일로 회신이 불가합니다. 채용 관련 문의 사항이 있으실 경우 공식 채용 채널 또는 어드민으로 연락해 주시기 바랍니다.
            </p>

            <div style="text-align: center; color: #94a3b8; font-size: 0.85rem; font-weight: 500;">
              © ${new Date().getFullYear()} 다음정보시스템즈. All rights reserved.
            </div>
          </div>
        `
      };

      const applicantResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(applicantEmailBody)
      });
      
      applicantResult = await applicantResponse.json();
    } catch (e) {
      console.warn("지원자 메일 발송 건너뜀 (샌드박스 수신처 제한 가능성):", e.message);
    }

    return new Response(JSON.stringify({ success: true, adminResult, applicantResult }), {
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
