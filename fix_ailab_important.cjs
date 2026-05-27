const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');

content = content.split('font-size: 1.5rem !important;').join('font-size: 1.5rem;');

fs.writeFileSync('c:\\daum_site\\ai-lab.html', content);
console.log('Successfully replaced 1.5rem !important to 1.5rem');
