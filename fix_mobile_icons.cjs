const fs = require('fs');
let content = fs.readFileSync('c:\\\\daum_site\\\\ax-lab.html', 'utf8');

const additionalCss = `
            /* Icon size & Text z-index */
            .icon-particle img { transform: scale(0.6); }
            .step-2-wrapper h2 { position: relative; z-index: 20; }
            
            /* Grid & Items */`;

content = content.replace('/* Grid & Items */', additionalCss);
fs.writeFileSync('c:\\\\daum_site\\\\ax-lab.html', content);
console.log('Added icon scaling and z-index to mobile CSS');
