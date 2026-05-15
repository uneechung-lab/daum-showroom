
const fs = require('fs');
const path = require('path');

function cleanProjectHtml() {
    const filePath = path.join(__dirname, '..', 'project.html');
    
    // UTF-8로 안전하게 읽기
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Finance 태그 제거
    content = content.split('<span class="tag">Finance</span>').join('');
    
    // 2. 다른 태그들을 대문자로 변경 (태그 내부 텍스트만)
    const replacements = {
        'Pension': 'PENSION',
        'Investment': 'INVESTMENT',
        'Mutual': 'MUTUAL',
        'Consulting': 'CONSULTING',
        'Maintenance': 'MAINTENANCE'
    };
    
    for (const [old, newVal] of Object.entries(replacements)) {
        content = content.split(`>${old}</span>`).join(`>${newVal}</span>`);
    }
    
    // UTF-8로 안전하게 저장
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully cleaned project.html with Node.js (UTF-8)");
}

cleanProjectHtml();
