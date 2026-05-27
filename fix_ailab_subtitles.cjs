const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');

const target = `            /* Key Insight Section */
            section[style*="background: #f8fafc"] h2 span {
                font-size: 1.35rem !important;
                line-height: 1.6 !important;
                word-break: keep-all;
            }
            section[style*="background: #f8fafc"] h2 span br {
                display: none !important;
            }`;

const replacement = `            /* Key Insight Section */
            section[style*="background: #f8fafc"] h2 span {
                font-size: 1.35rem !important;
                line-height: 1.6 !important;
                word-break: keep-all;
            }
            section[style*="background: #f8fafc"] h2 span br {
                display: none !important;
            }

            /* Section Subtitles */
            .section-title + p {
                font-size: 1.15rem !important;
                word-break: keep-all;
                line-height: 1.5 !important;
            }
            .section-title + p br {
                display: none !important;
            }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('c:\\daum_site\\ai-lab.html', content);
    console.log('Successfully added CSS rules for section subtitles!');
} else {
    console.log('Failed to find target string.');
}
