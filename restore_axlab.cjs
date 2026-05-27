const fs = require('fs');

let axLab = fs.readFileSync('c:\\\\daum_site\\\\ax-lab.html', 'utf8');

// 1. First, make sure we have a clean mobile CSS block
const mobileCssStart = axLab.indexOf('@media (max-width: 768px) {');
const mobileCssEnd = axLab.indexOf('</style>', mobileCssStart);

const perfectMobileCss = `@media (max-width: 768px) {
            /* Layout & Padding */
            .py-32 { padding-top: 5rem !important; padding-bottom: 5rem !important; }
            section[style*="padding-top: 180px"] { padding-top: 90px !important; padding-bottom: 2rem !important; }
            
            /* Typography */
            .lab-title, .section-title { font-size: 1.6rem !important; margin-bottom: 1.2rem !important; word-break: keep-all; }
            .lab-title br { display: none; }
            .lab-sub { font-size: 1.1rem !important; margin-bottom: 1.5rem !important; }
            
            /* Showcase Box & Info Section */
            #hero-showcase-wrapper { height: auto !important; min-height: auto !important; margin-top: 2rem !important; margin-bottom: 2rem !important; display: flex !important; flex-direction: column !important; }
            
            #hero-showcase-box { 
                position: relative !important; 
                width: 100%; 
                height: 350px; 
                border-radius: 24px !important; 
                transform: none !important; 
                margin-left: auto !important; 
            }
            .intro-text { font-size: 1.8rem !important; white-space: normal !important; word-break: keep-all; padding: 0 1.5rem; width: 100%; box-sizing: border-box; }
            
            #hero-showcase-info {
                position: relative !important;
                left: 0 !important;
                top: 0 !important;
                margin-top: 2.5rem !important;
                width: 100% !important;
                padding: 0 !important;
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                transform: none !important; 
            }

            /* Fix zal-card-container overlap */
            .zal-card-container {
                position: absolute !important;
                left: -30px !important;
                bottom: -20px !important;
                top: auto !important;
                width: 220px !important;
                max-width: none !important;
                margin: 0 !important;
                transform: none !important; 
                display: block !important; 
                z-index: 100 !important;
            }

            .zal-image-container img {
                object-fit: contain !important; transform: scale(1) !important;
                border-radius: 24px !important;
            }
            
            /* D-FIN SUITE / ZAL EAT Logo */
            #hero-showcase-info img[src="/bi_zaleat.png"] {
                height: 32px !important;
                margin-left: -4px !important;
                margin-bottom: 0.5rem !important;
            }
            
            /* Key Insight Section */
            section[style*="background: #f8fafc"] h2 span { font-size: 1.35rem !important; line-height: 1.6 !important; word-break: keep-all; }
            section[style*="background: #f8fafc"] h2 span br { display: none !important; }

            /* Section Subtitles */
            .section-title + p { font-size: 1.15rem !important; word-break: keep-all; line-height: 1.5 !important; }
            .section-title + p br { display: none !important; }
            
            /* Remove margins from info grids on mobile */
            .info-grid { margin-top: 2rem !important; }
            #hero-showcase-info > div[style*="padding-left: 4.2rem"] { padding-left: 0 !important; margin-top: 2rem !important; padding-top: 2rem !important; }
            #hero-showcase-info > div > div[style*="gap: 2.5rem"] { flex-direction: column !important; gap: 1.5rem !important; align-items: flex-start !important; }
            #hero-showcase-info > div > div[style*="gap: 2.5rem"] > div[style*="width: 20px"] { display: none !important; }
            
            /* Icon size & Text z-index */
            .icon-particle img { transform: scale(0.6); }
            .step-2-wrapper h2 { font-size: 1.8rem !important; position: relative; z-index: 20; }
            
            /* Grid & Items */
            .gap-6 { gap: 1rem !important; }
            .gap-8 { gap: 1.5rem !important; }
            .phi-card { padding: 1.8rem 1.5rem !important; }
            
            /* Research Outputs Grid */
            section.py-32 > .container > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            .section-label + h2 + p { font-size: 1.1rem !important; margin-bottom: 3rem !important; }
        }
`;

if (mobileCssStart !== -1) {
    axLab = axLab.substring(0, mobileCssStart) + perfectMobileCss + axLab.substring(mobileCssEnd);
} else {
    const styleEnd = axLab.indexOf('</style>');
    axLab = axLab.substring(0, styleEnd) + perfectMobileCss + axLab.substring(styleEnd);
}

// 2. Fix the GSAP animation script exactly
// We'll replace the block starting at .to("#hero-showcase-box"
const matchGsap = axLab.match(/\\.to\\(\\"#hero-showcase-box\\", \\{[\\s\\S]*?borderWidth: \\"6px\\",/);
if (matchGsap) {
    const newGsap = `.to("#hero-showcase-box", { 
                  width: window.innerWidth <= 768 ? "85%" : "360px", 
                  height: window.innerWidth <= 768 ? "650px" : "821px", 
                  x: window.innerWidth <= 768 ? 0 : 170,
                  borderRadius: window.innerWidth <= 768 ? "24px" : "32px", 
                  backgroundColor: "transparent",
                  borderColor: "#ffffff",
                  borderWidth: "6px",`;
    axLab = axLab.replace(matchGsap[0], newGsap);
}

// Fix icon particles GSAP
const iconGsap = axLab.match(/\\.fromTo\\(\\".icon-particle\\", \\{ opacity: 0, scale: 0\\.5 \\}, \\{ opacity: 1, scale: 1, x: \\(i\\) => \\[-300, 300, 0\\]\\[i\\], y: \\(i\\) => \\[-140, -140, 110\\]\\[i\\]/);
if (iconGsap) {
    const newIconGsap = `.fromTo(".icon-particle", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, x: (i) => window.innerWidth <= 768 ? [-120, 120, 0][i] : [-300, 300, 0][i], y: (i) => window.innerWidth <= 768 ? [-90, -90, 80][i] : [-140, -140, 110][i]`;
    axLab = axLab.replace(iconGsap[0], newIconGsap);
}

// Fix icn_02 inline style
axLab = axLab.replace('width: 120px; height: 120px; margin-left: -60px; margin-top: -60px;"><img src="/icn_02.png"', 'width: 84px; height: 84px; margin-left: -42px; margin-top: -42px;"><img src="/icn_02.png"');

// Replace bi_dfin with bi_zaleat
axLab = axLab.replace('/bi_dfin.png', '/bi_zaleat.png');

// Add spaces before <br>
axLab = axLab.replace('집중합니다.<br>다음', '집중합니다. <br>다음');
axLab = axLab.replace('설계합니다.<br>우리는', '설계합니다. <br>우리는');

fs.writeFileSync('c:\\\\daum_site\\\\ax-lab.html', axLab);
console.log('Restored everything correctly');
