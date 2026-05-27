const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');

const target = `            /* Hide the plus signs on mobile */
            #hero-showcase-info > div:nth-of-type(2) > div > div:nth-child(even) { 
                display: none !important; 
            }`;

const replacement = `            /* Hide the plus signs on mobile */
            #hero-showcase-info > div:nth-of-type(2) > div > div:nth-child(even) { 
                display: none !important; 
            }
            
            /* Key Insight Section */
            section[style*="background: #f8fafc"] h2 span {
                font-size: 1.35rem !important;
                line-height: 1.6 !important;
                word-break: keep-all;
            }
            section[style*="background: #f8fafc"] h2 span br {
                display: none !important;
            }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('c:\\daum_site\\ai-lab.html', content);
    console.log('Successfully added CSS rules for Key Insight section!');
} else {
    console.log('Failed to find target string.');
}
