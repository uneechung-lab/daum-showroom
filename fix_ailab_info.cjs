const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');

const target = `            /* Showcase Box */
            #hero-showcase-wrapper { height: 350px !important; margin-top: 2rem !important; margin-bottom: 2rem !important; }
            #hero-showcase-box { height: 350px !important; border-radius: 24px !important; }
            .intro-text { font-size: 1.8rem !important; white-space: normal !important; word-break: keep-all; padding: 0 1.5rem; width: 100%; box-sizing: border-box; }
            .step-2-wrapper h2 { font-size: 1.4rem !important; }`;

const replacement = `            /* Showcase Box & Info Section */
            #hero-showcase-wrapper { height: auto !important; min-height: 850px !important; margin-top: 2rem !important; margin-bottom: 2rem !important; }
            #hero-showcase-box { width: 100% !important; height: 350px !important; border-radius: 24px !important; }
            .intro-text { font-size: 1.8rem !important; white-space: normal !important; word-break: keep-all; padding: 0 1.5rem; width: 100%; box-sizing: border-box; }
            .step-2-wrapper h2 { font-size: 1.4rem !important; }
            #hero-showcase-info {
                position: absolute !important;
                left: 0 !important;
                top: 380px !important;
                width: 100% !important;
                padding: 0 !important;
            }
            #hero-showcase-info > div { flex-wrap: wrap !important; justify-content: flex-start !important; gap: 0.5rem !important; }
            #hero-showcase-info > div > div { width: calc(50% - 0.5rem) !important; height: 120px !important; }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('c:\\daum_site\\ai-lab.html', content);
    console.log('Showcase info mobile styles updated!');
} else {
    console.log('Could not find target string to replace.');
}
