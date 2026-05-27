const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\project.html', 'utf8');
let start_marker = '      @media (min-width: 769px) {';
let end_marker = '        padding-top: 140px;';
let start_idx = content.indexOf(start_marker);
let end_idx = content.indexOf(end_marker);
if (start_idx !== -1 && end_idx !== -1) {
    let replacement = `      /* Handle light background states */
      body.sub-page header:has(.nav-item:hover) .logo-text {
        color: #0f172a !important;
      }
      html body.sub-page header.scrolled:not(.menu-open) .logo .logo-light { 
        display: block !important; 
      }
      html body.sub-page header.scrolled:not(.menu-open) .logo .logo-dark { 
        display: none !important; 
      }

      @media (min-width: 769px) {
      /* White Theme ONLY for desktop hover states */
      body.sub-page header:has(.nav-item:hover),
      body.sub-page header:has(.gnb-mega-menu:hover) {
        background: #ffffff !important;
        border-bottom: none !important;
        box-shadow: none !important;
      }
      body.sub-page header:has(.nav-item:hover) .nav-links a,
      body.sub-page header:has(.nav-item:hover) .nav-item > span,
      body.sub-page header:has(.gnb-mega-menu:hover) .nav-links a,
      body.sub-page header:has(.gnb-mega-menu:hover) .nav-item > span {
        color: #1e293b !important;
      }
      body.sub-page header:has(.nav-item:hover) .logo .logo-light,
      body.sub-page header:has(.gnb-mega-menu:hover) .logo .logo-light { 
        display: none !important; 
      }
      body.sub-page header:has(.nav-item:hover) .logo .logo-dark,
      body.sub-page header:has(.gnb-mega-menu:hover) .logo .logo-dark { 
        display: block !important; 
      }
      }

      header .logo {
        position: relative;
        z-index: 100000 !important;
      }
      body.sub-page .detail-hero.slim-hero {
        position: relative;
        height: 460px;
        min-height: auto;
`;
    content = content.substring(0, start_idx) + replacement + content.substring(end_idx);
    fs.writeFileSync('c:\\daum_site\\project.html', content);
    console.log('Successfully fixed project.html!');
} else {
    console.log('Failed to find markers.');
}
