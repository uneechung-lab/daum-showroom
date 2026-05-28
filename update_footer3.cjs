const fs = require('fs');
const path = require('path');
const dir = 'c:\\daum_site';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We look for the exact branding image tag we injected last time
  const regex = /<img src="\/ci_04\.png" alt="DAUMIS" style="height: 64px; width: auto; margin-left: -5px;">/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, `<img src="/ci_04.png" alt="DAUMIS" style="height: 72px; width: auto; margin-left: -8px;">`);
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
  }
});
console.log('Updated files count: ' + count);
