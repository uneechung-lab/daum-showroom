const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');

const target = `            section[style*="padding-top: 180px"] { padding-top: 120px !important; padding-bottom: 3rem !important; }`;
const replacement = `            section[style*="padding-top: 180px"] { padding-top: 90px !important; padding-bottom: 2rem !important; }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('c:\\daum_site\\ai-lab.html', content);
    console.log('Successfully reduced top padding for mobile hero section!');
} else {
    console.log('Failed to find target string.');
}
