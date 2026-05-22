const fs = require('fs');

let content = fs.readFileSync('c:\\daum_site\\index.html', 'utf-8');

// Replace font-size and color inline styles
content = content.replace(/font-size:\s*1\.[01]5?rem;\s*color:\s*#cbd5e1;\s*/g, '');
content = content.replace(/color:\s*#cbd5e1;\s*/g, '');

fs.writeFileSync('c:\\daum_site\\index.html', content, 'utf-8');
console.log('Cleaned up inline styles.');
