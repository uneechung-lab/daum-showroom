const fs = require('fs');
const path = require('path');
const dir = 'c:\\daum_site';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We look for the exact branding section
  const regex = /<div style="margin-bottom: 1.2rem; display: flex; align-items: center; gap: 12px;">\s*<img src="\/ci_04\.png" alt="DAUMIS" style="height: 36px; width: auto; margin-left: -12px;">\s*<span style="font-size: 1.2rem; font-weight: 400; color: #FFB800; opacity: 1;">다음정보시스템즈<\/span>\s*<\/div>/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, `<div style="margin-bottom: 1.2rem; display: flex; align-items: center;">
                <img src="/ci_04.png" alt="DAUMIS" style="height: 56px; width: auto;">
              </div>`);
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
  }
});
console.log('Updated: ' + count);
