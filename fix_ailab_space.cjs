const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');

content = content.replace('AI는 우리의 역할을 대체하는 것이 아니라,<br>더 본질적인', 'AI는 우리의 역할을 대체하는 것이 아니라, <br>더 본질적인');

fs.writeFileSync('c:\\daum_site\\ai-lab.html', content);
console.log('Successfully added space before <br>!');
