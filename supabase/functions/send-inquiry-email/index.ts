import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  // CORS Preflight request handling
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      } 
    })
  }

  try {
    const payload = await req.json();
    
    // Support both Supabase Webhook payload and direct client-side invocation payload
    const newRecord = payload.record || payload; 
    if (!newRecord || !newRecord.name) {
      return new Response(JSON.stringify({ error: "No valid record found in payload" }), { status: 400 });
    }

    const { name, company, email, phone, subject, content } = newRecord;

    // Fetch environmental keys
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || "re_your_api_key";
    
    // Send all emails to the verified ADMIN_EMAIL (Director Cho Sung-hyun)
    const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || "admin@daumit.net"; 
    const SITE_URL = Deno.env.get('SITE_URL') || "https://daum-showroom.vercel.app";

    // Draft a clean, elegant email notification for the Executive Director
    const emailBody = {
      from: "다음정보시스템즈 도입문의알림 <onboarding@resend.dev>",
      to: [ADMIN_EMAIL], 
      subject: `[신규 도입문의] '${company}'의 '${name}'님이 문의를 등록하였습니다.`,
      html: `
        <div style="font-family: 'Pretendard', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 2.5rem 2rem; border: 1px solid #f1f5f9; border-radius: 24px; background: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.02);">
          <div style="text-align: center; margin-bottom: 2.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1.5rem;">
            <span style="display: inline-block; padding: 0.35rem 0.8rem; background: #e0f2fe; color: #0369a1; border-radius: 99px; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">New Inquiry</span>
            <h2 style="color: #0f172a; font-size: 1.6rem; font-weight: 800; margin: 0 0 0.5rem 0; letter-spacing: -0.025em; line-height: 1.3;">신규 도입 문의 접수</h2>
            <p style="color: #64748b; font-size: 0.95rem; margin: 0; font-weight: 500;">다음정보시스템즈 비즈니스 도입 문의 알림입니다.</p>
          </div>
          
          <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem; line-height: 1.8;">
              <tr>
                <td style="padding: 0.4rem 0; color: #64748b; font-weight: 600; width: 100px;">회사명</td>
                <td style="padding: 0.4rem 0; color: #0f172a; font-weight: 700;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 0.4rem 0; color: #64748b; font-weight: 600;">성함 / 직급</td>
                <td style="padding: 0.4rem 0; color: #0f172a; font-weight: 700;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 0.4rem 0; color: #64748b; font-weight: 600;">문의 분야</td>
                <td style="padding: 0.4rem 0; color: #3b82f6; font-weight: 700;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 0.4rem 0; color: #64748b; font-weight: 600;">연락처</td>
                <td style="padding: 0.4rem 0; color: #334155; font-weight: 500;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 0.4rem 0; color: #64748b; font-weight: 600;">이메일</td>
                <td style="padding: 0.4rem 0; color: #334155; font-weight: 500;">${email}</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 2.5rem;">
            <h4 style="color: #0f172a; font-size: 1.05rem; font-weight: 700; margin: 0 0 0.75rem 0;">문의 내용</h4>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; color: #334155; font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap; min-height: 120px;">
              ${content.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="text-align: center; border-top: 1px solid #f1f5f9; padding-top: 2rem;">
            <a href="${SITE_URL}/admin/inquiries.html?inquiryId=${newRecord.id || ''}" target="_blank" style="display: inline-block; padding: 0.9rem 2.25rem; background: #0f172a; color: #ffffff; font-weight: 700; font-size: 0.95rem; border-radius: 14px; text-decoration: none; box-shadow: 0 8px 20px rgba(15,23,42,0.15); transition: background 0.2s;">
              어드민 대시보드에서 관리하기
            </a>
          </div>
        </div>
      `
    };

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailBody)
    });

    const result = await response.json();

    return new Response(JSON.stringify({ success: true, targetEmail: ADMIN_EMAIL, result }), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      status: 500,
    });
  }
});
