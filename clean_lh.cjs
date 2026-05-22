const fs = require('fs');
let content = fs.readFileSync('c:/daum_site/index.html', 'utf-8');

// We want to remove line-height from inline styles specifically for paragraphs and spans in the relevant sections
content = content.replace(/line-height:\s*1\.\d+;?\s*/g, '');

fs.writeFileSync('c:/daum_site/index.html', content);
console.log('Done');
