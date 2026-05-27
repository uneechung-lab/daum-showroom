const fs = require('fs');
const path = 'c:\\\\daum_site';
const files = fs.readdirSync(path).filter(f => f.endsWith('.html'));

let count = 0;
files.forEach(file => {
  const filePath = path + '\\\\' + file;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace <span ...> in CTA text
  const regex = /<h2 class="cta-text">([\s\S]*?)<br>\s*<span[^>]*>([\s\S]*?)<\/span>\s*<\/h2>/g;
  const newContent = content.replace(regex, '<h2 class="cta-text">$1 <br>$2\n            </h2>');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated: ' + file);
    count++;
  }
});
console.log('Total updated: ' + count);
