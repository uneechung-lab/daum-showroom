const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\clients.html', 'utf8');

let start_marker = '      /* White Theme when menu is open OR hovered interactive areas */';
let end_marker = '      /* Logo Text Color Logic */';

let start_idx = content.indexOf(start_marker);
let end_idx = content.indexOf(end_marker);

if (start_idx !== -1 && end_idx !== -1) {
    let original_block = content.substring(start_idx, end_idx);
    
    // We want to replace the first line of the block with the media query opening
    let replacement = `      @media (min-width: 769px) {
      /* White Theme when menu is open OR hovered interactive areas */
      body.sub-page header:has(.nav-links:hover),
      body.sub-page header:has(.gnb-mega-menu:hover) {
        background: #ffffff !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.05) !important;
      }
      body.sub-page header:has(.nav-links:hover) .nav-links a,
      body.sub-page header:has(.nav-links:hover) .nav-item > span,
      body.sub-page header:has(.gnb-mega-menu:hover) .nav-links a,
      body.sub-page header:has(.gnb-mega-menu:hover) .nav-item > span {
        color: #1e293b !important;
      }
      body.sub-page header:has(.nav-links:hover) .logo .logo-light,
      body.sub-page header:has(.gnb-mega-menu:hover) .logo .logo-light { 
        display: none !important; 
      }
      body.sub-page header:has(.nav-links:hover) .logo .logo-dark,
      body.sub-page header:has(.gnb-mega-menu:hover) .logo .logo-dark { 
        display: block !important; 
      }
      }

`;
    content = content.substring(0, start_idx) + replacement + content.substring(end_idx);
    fs.writeFileSync('c:\\daum_site\\clients.html', content);
    console.log('Successfully fixed clients.html!');
} else {
    console.log('Failed to find markers.');
}
