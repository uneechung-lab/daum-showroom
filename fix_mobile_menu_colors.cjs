const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\src\\style.css', 'utf8');

const target = `  #header .nav-item > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;
    font-size: var(--font-h3);
    font-weight: 700;
    cursor: pointer;
    color: var(--text-muted) !important; /* Dim when closed */
    transition: color 0.3s ease;
  }`;

const replacement = `  #header .nav-item > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;
    font-size: var(--font-h3);
    font-weight: 700;
    cursor: pointer;
    color: rgba(255,255,255,0.5) !important;
    transition: color 0.3s ease;
  }

  /* Force light text on the dark mobile overlay regardless of body theme */
  body.theme-light #header .nav-right.active .nav-item > span,
  body.sub-page #header .nav-right.active .nav-item > span,
  #header .nav-right.active .nav-item > span {
    color: rgba(255, 255, 255, 0.6) !important;
  }
  
  body.theme-light #header .nav-right.active .nav-item.open > span,
  body.sub-page #header .nav-right.active .nav-item.open > span,
  #header .nav-right.active .nav-item.open > span {
    color: #ffffff !important;
  }
  
  body.theme-light #header .nav-right.active .mega-left h3,
  body.theme-light #header .nav-right.active .mega-left p,
  body.theme-light #header .nav-right.active .mega-right a {
    color: rgba(255, 255, 255, 0.8) !important;
  }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('c:\\daum_site\\src\\style.css', content);
    console.log('Successfully forced mobile menu text to white!');
} else {
    console.log('Failed to find target string in style.css');
}
