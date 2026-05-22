const fs = require('fs');
const path = require('path');

const dir = 'c:\\daum_site';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  let c = fs.readFileSync(filePath, 'utf8');
  
  // Remove spaces right after <h2 class="cta-text">
  c = c.replace(/<h2 class="cta-text">\s+/g, '<h2 class="cta-text">');
  
  // Remove spaces right after <br>
  c = c.replace(/<br>\s+/g, '<br>');
  
  // Remove spaces right after <span>
  c = c.replace(/<span>\s+/g, '<span>');
  
  // Also, for files that still have the old vision text with wrong <br> position:
  // "함께 금융의 미래를 만들어갈<br>비즈니스 파트너십이 필요하다면 지금 문의하세요." ->
  // "함께 금융의 미래를 만들어갈 비즈니스 파트너십이<br>필요하다면 지금 문의하세요."
  c = c.replace(/함께 금융의 미래를 만들어갈<br>비즈니스 파트너십이 필요하다면 지금 문의하세요\./g, '함께 금융의 미래를 만들어갈 비즈니스 파트너십이<br>필요하다면 지금 문의하세요.');
  
  // And if it was just "함께 금융의 미래를 만들어갈 비즈니스 파트너십이 필요하다면 지금 문의하세요." with no <br>
  c = c.replace(/함께 금융의 미래를 만들어갈 비즈니스 파트너십이 필요하다면 지금 문의하세요\./g, '함께 금융의 미래를 만들어갈 비즈니스 파트너십이<br>필요하다면 지금 문의하세요.');
  
  fs.writeFileSync(filePath, c);
});
console.log('Fixed all HTML files.');
