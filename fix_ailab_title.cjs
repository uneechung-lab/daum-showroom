const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');

const target = `.lab-title, .section-title { font-size: 2.2rem !important; margin-bottom: 1.5rem !important; }`;
const replacement = `.lab-title, .section-title { font-size: 1.75rem !important; margin-bottom: 1.5rem !important; }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('c:\\daum_site\\ai-lab.html', content);
    console.log('Successfully reduced section title font size to 1.75rem!');
} else {
    console.log('Failed to find target string.');
}
