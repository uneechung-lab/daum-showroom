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

// Override global alert with premium glassmorphic modal
window.showAdminAlert = function(message) {
    const existing = document.getElementById('adminAlertModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'adminAlertModal';
    modal.style.position = 'fixed';
    modal.style.inset = '0';
    modal.style.background = 'rgba(15, 23, 42, 0.4)';
    modal.style.backdropFilter = 'blur(10px)';
    modal.style.webkitBackdropFilter = 'blur(10px)';
    modal.style.zIndex = '99999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.25s ease';

    const isError = message.includes('실패') || message.includes('오류') || message.includes('에러');
    const iconName = isError ? 'alert-triangle' : 'check-circle-2';
    const iconColor = isError ? '#ef4444' : '#10b981'; // Beautiful success green
    const iconBg = isError ? '#fee2e2' : '#d1fae5';

    modal.innerHTML = `
        <div style="background: #ffffff; border-radius: 24px; width: 90%; max-width: 400px; padding: 2.5rem 2rem; box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25); border: 1px solid #f1f5f9; text-align: center; transform: scale(0.95); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: ${iconBg}; border-radius: 50%; margin-bottom: 1.5rem;">
                <i data-lucide="${iconName}" style="width: 32px; height: 32px; color: ${iconColor};"></i>
            </div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0 0 1.75rem 0; line-height: 1.6; word-break: keep-all;">
                ${message.replace(/\n/g, '<br>')}
            </h3>
            <button onclick="window.closeAdminAlert()" style="width: 100%; padding: 0.875rem; background: #0f172a; color: #ffffff; border: none; border-radius: 12px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s; outline: none; box-shadow: 0 4px 12px rgba(15,23,42,0.15);" onmouseover="this.style.background='#1e293b'" onmouseout="this.style.background='#0f172a'">
                확인
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    if (window.lucide) {
        lucide.createIcons();
    }

    modal.offsetHeight; // force reflow
    modal.style.opacity = '1';
    modal.querySelector('div').style.transform = 'scale(1)';
};

window.closeAdminAlert = function() {
    const modal = document.getElementById('adminAlertModal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('div').style.transform = 'scale(0.95)';
        setTimeout(() => {
            modal.remove();
        }, 250);
    }
};

window.alert = function(message) {
    window.showAdminAlert(message);
};

// Override window.confirm or provide showAdminConfirm with premium glassmorphic style
window.showAdminConfirm = function(message, onConfirm) {
    const existing = document.getElementById('adminConfirmModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'adminConfirmModal';
    modal.style.position = 'fixed';
    modal.style.inset = '0';
    modal.style.background = 'rgba(15, 23, 42, 0.4)';
    modal.style.backdropFilter = 'blur(10px)';
    modal.style.webkitBackdropFilter = 'blur(10px)';
    modal.style.zIndex = '99999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.25s ease';

    modal.innerHTML = `
        <div style="background: #ffffff; border-radius: 24px; width: 90%; max-width: 400px; padding: 2.5rem 2rem; box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25); border: 1px solid #f1f5f9; text-align: center; transform: scale(0.95); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); display: flex; flex-direction: column; align-items: center;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: #e0f2fe; border-radius: 50%; margin-bottom: 1.5rem;">
                <i data-lucide="help-circle" style="width: 32px; height: 32px; color: #0284c7;"></i>
            </div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0 0 1.75rem 0; line-height: 1.6; word-break: keep-all;">
                ${message.replace(/\n/g, '<br>')}
            </h3>
            <div style="display: flex; gap: 0.75rem; width: 100%;">
                <button onclick="window.closeAdminConfirm(false)" style="flex: 1; padding: 0.875rem; background: #f1f5f9; color: #475569; border: none; border-radius: 12px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s; outline: none;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f1f5f9'">
                    취소
                </button>
                <button onclick="window.closeAdminConfirm(true)" style="flex: 1; padding: 0.875rem; background: #0f172a; color: #ffffff; border: none; border-radius: 12px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s; outline: none; box-shadow: 0 4px 12px rgba(15,23,42,0.15);" onmouseover="this.style.background='#1e293b'" onmouseout="this.style.background='#0f172a'">
                    확인
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    window.adminConfirmCallback = onConfirm;

    if (window.lucide) {
        lucide.createIcons();
    }

    modal.offsetHeight; // force reflow
    modal.style.opacity = '1';
    modal.querySelector('div').style.transform = 'scale(1)';
};

window.closeAdminConfirm = function(result) {
    const modal = document.getElementById('adminConfirmModal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('div').style.transform = 'scale(0.95)';
        setTimeout(() => {
            modal.remove();
            if (result && window.adminConfirmCallback) {
                window.adminConfirmCallback();
            }
            window.adminConfirmCallback = null;
        }, 250);
    }
};
