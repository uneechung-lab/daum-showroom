const fs = require('fs');
const files = ['asset.html', 'business.html', 'investment.html', 'mutual.html', 'sales.html'];
files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace('<div class="cta-bg-circle"></div>', '<div class="cta-bg-circle"></div>\n        <div class="cta-character"><img src="/login.png" alt="Contact Character"></div>');
    fs.writeFileSync(f, c);
});
