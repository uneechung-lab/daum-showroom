const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');

const target = `            #hero-showcase-info {
                position: absolute !important;
                left: 0 !important;
                top: 380px !important;
                width: 100% !important;
                padding: 0 !important;
            }`;

const replacement = `            #hero-showcase-info {
                position: absolute !important;
                left: 0 !important;
                top: 380px !important;
                width: 100% !important;
                padding: 0 !important;
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
            }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('c:\\daum_site\\ai-lab.html', content);
    console.log('Successfully made showcase info visible immediately on mobile!');
} else {
    console.log('Failed to find target string.');
}
