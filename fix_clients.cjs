const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\clients.html', 'utf8');

let replace_str = `      /* White Theme ONLY when menu is open OR actual nav item is hovered to show mega menu */
      body.sub-page header.menu-open,
      body.sub-page header:has(.nav-links:hover),
      body.sub-page header:has(.gnb-mega-menu:hover) {
        background: #ffffff !important;
        border-bottom: none !important;
        box-shadow: none !important;
      }
      body.sub-page header.menu-open .nav-links a,
      body.sub-page header.menu-open .nav-item > span,
      body.sub-page header:has(.nav-links:hover) .nav-links a,
      body.sub-page header:has(.nav-links:hover) .nav-item > span,
      body.sub-page header:has(.gnb-mega-menu:hover) .nav-links a,
      body.sub-page header:has(.gnb-mega-menu:hover) .nav-item > span {
        color: #1e293b !important;
      }
      body.sub-page header.menu-open .logo .logo-light,
      body.sub-page header:has(.nav-links:hover) .logo .logo-light,
      body.sub-page header:has(.gnb-mega-menu:hover) .logo .logo-light { 
        display: none !important; 
      }
      body.sub-page header.menu-open .logo .logo-dark,
      body.sub-page header:has(.nav-links:hover) .logo .logo-dark,
      body.sub-page header:has(.gnb-mega-menu:hover) .logo .logo-dark { 
        display: block !important; 
      }`;

let new_str = `      @media (min-width: 769px) {
      /* White Theme ONLY for desktop hover states */
      body.sub-page header:has(.nav-links:hover),
      body.sub-page header:has(.gnb-mega-menu:hover) {
        background: #ffffff !important;
        border-bottom: none !important;
        box-shadow: none !important;
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
      }`;

if (content.includes('/* White Theme ONLY when menu is open OR actual nav item is hovered to show mega menu */')) {
    content = content.replace(replace_str, new_str);
    fs.writeFileSync('c:\\daum_site\\clients.html', content);
    console.log('Successfully fixed clients.html!');
} else {
    console.log('Could not find marker in clients.html');
}
