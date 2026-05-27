const fs = require('fs');
const dir = 'c:\\\\daum_site';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const path = dir + '\\\\' + file;
  let content = fs.readFileSync(path, 'utf8');
  let original = content;

  // 1. Remove DAUMIS Digital Showroom
  content = content.replace(/<p style=\"font-size: 0\.85rem; opacity: 0\.4;\">DAUMIS Digital Showroom<\/p>/g, '');

  // 2. Footer grids
  content = content.replace(/<div style=\"display: grid; grid-template-columns: 1\.8fr 3fr; gap: 8rem;\">/g, '<div class=\"footer-top-grid\">');
  content = content.replace(/<div style=\"display: grid; grid-template-columns: 1fr 1\.2fr 1fr; gap: 4rem;\">/g, '<div class=\"footer-contact-grid\">');

  // 3. CTA character move inside container
  content = content.replace(
    /(<div class=\"cta-character\">[\s\S]*?<\/div>)\s*(<div class=\"container\">)/g,
    '$2\n          $1'
  );

  // 4. Add space before <br> tags safely
  content = content.replace(/([가-힣a-zA-Z0-9])<br>/g, '$1 <br>');

  if (content !== original) {
    fs.writeFileSync(path, content, 'utf8');
    console.log('Updated: ' + file);
  }
});
