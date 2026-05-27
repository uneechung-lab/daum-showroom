const fs = require('fs');
const path = 'c:\\\\daum_site';

const businessHtml = fs.readFileSync(path + '\\\\business.html', 'utf8');
const footerRegex = /<footer id="footer">[\s\S]*?<\/footer>/;
const footerMatch = businessHtml.match(footerRegex);

if (!footerMatch) {
  console.log("Footer not found in business.html");
  process.exit(1);
}

const standardFooter = footerMatch[0];
const files = fs.readdirSync(path).filter(f => f.endsWith('.html'));

let count = 0;
files.forEach(file => {
  const filePath = path + '\\\\' + file;
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.match(footerRegex)) {
    const newContent = content.replace(footerRegex, standardFooter);
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated footer in: ' + file);
      count++;
    }
  }
});
console.log('Total footers updated: ' + count);
