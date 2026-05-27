const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');

const target = `            /* Key Insight Section */`;

const replacement = `            /* D-FIN SUITE Logo */
            #hero-showcase-info img[src="/bi_dfin.png"] {
                height: 32px !important;
                margin-left: -4px !important;
                margin-bottom: 0.5rem !important;
            }
            
            /* Key Insight Section */`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('c:\\daum_site\\ai-lab.html', content);
    console.log('Successfully added CSS rules for D-FIN logo size!');
} else {
    console.log('Failed to find target string.');
}
