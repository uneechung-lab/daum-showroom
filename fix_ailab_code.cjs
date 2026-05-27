const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');

const target = `            /* Code Terminal */
            .code-showcase-container { padding: 1rem !important; border-radius: 24px !important; }
            .code-stream { padding: 1rem !important; font-size: 0.75rem !important; }
            .code-content-wrapper { top: 1rem !important; left: 1rem !important; right: 1rem !important; }`;

const replacement = `            /* Code Terminal */
            .code-showcase-container { padding: 1rem !important; border-radius: 24px !important; }
            .code-stream { padding: 1rem !important; font-size: 0.65rem !important; }
            .code-content-wrapper { top: 1rem !important; left: 1rem !important; right: 1rem !important; }
            .code-line { white-space: pre-wrap !important; word-break: break-all !important; margin-bottom: 0.8rem !important; line-height: 1.4 !important; }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('c:\\daum_site\\ai-lab.html', content);
    console.log('Code terminal mobile styles updated!');
} else {
    console.log('Could not find target string to replace.');
}
