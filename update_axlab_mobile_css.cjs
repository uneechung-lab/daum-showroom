const fs = require('fs');

let axLab = fs.readFileSync('c:\\daum_site\\ax-lab.html', 'utf8');

// The new perfected mobile block for ax-lab
const newMobileCss = `@media (max-width: 768px) {
            /* Layout & Padding */
            .py-32 { padding-top: 5rem !important; padding-bottom: 5rem !important; }
            section[style*="padding-top: 180px"] { padding-top: 90px !important; padding-bottom: 2rem !important; }
            
            /* Typography */
            .lab-title, .section-title { font-size: 1.6rem !important; margin-bottom: 1.2rem !important; word-break: keep-all; }
            .lab-title br { display: none; } /* Let it wrap naturally */
            .lab-sub { font-size: 1.1rem !important; margin-bottom: 1.5rem !important; }
            
            /* Showcase Box & Info Section */
            #hero-showcase-wrapper { height: auto !important; min-height: auto !important; margin-top: 2rem !important; margin-bottom: 2rem !important; display: flex !important; flex-direction: column !important; }
            
            #hero-showcase-box { 
                position: relative !important; 
                width: 100% !important; 
                height: 350px !important; 
                border-radius: 24px !important; 
                transform: none !important; /* Cancel GSAP x offset */
            }
            .intro-text { font-size: 1.8rem !important; white-space: normal !important; word-break: keep-all; padding: 0 1.5rem; width: 100%; box-sizing: border-box; }
            .step-2-wrapper h2 { font-size: 1.4rem !important; }
            
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
                transform: none !important; /* Cancel GSAP x offset */
            }

            /* Fix zal-card-container overlap */
            .zal-card-container {
                position: relative !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                max-width: 250px !important;
                margin: 0 auto !important;
                transform: none !important; /* Cancel GSAP */
                display: none !important; /* Hide the floating card on mobile as it conflicts with layout */
            }

            .zal-image-container img {
                object-fit: cover !important;
                border-radius: 24px !important;
            }
            
            /* D-FIN SUITE / ZAL EAT Logo */
            #hero-showcase-info img[src="/bi_zaleat.png"] {
                height: 32px !important;
                margin-left: -4px !important;
                margin-bottom: 0.5rem !important;
            }
            
            /* Key Insight Section */
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
            }
            
            /* Remove margins from info grids on mobile */
            .info-grid {
                margin-top: 2rem !important;
            }
            #hero-showcase-info > div[style*="padding-left: 4.2rem"] {
                padding-left: 0 !important;
                margin-top: 2rem !important;
                padding-top: 2rem !important;
            }
            #hero-showcase-info > div > div[style*="gap: 2.5rem"] {
                flex-direction: column !important;
                gap: 1.5rem !important;
                align-items: flex-start !important;
            }
            #hero-showcase-info > div > div[style*="gap: 2.5rem"] > div[style*="width: 20px"] {
                display: none !important; /* Hide the '+' symbols */
            }
            
            /* Grid & Items */
            .gap-6 { gap: 1rem !important; }
            .gap-8 { gap: 1.5rem !important; }
            .phi-card { padding: 1.8rem 1.5rem !important; }
            
            /* Research Outputs Grid */
            section.py-32 > .container > div[style*="grid-template-columns: repeat(4"] {
                grid-template-columns: 1fr !important;
                gap: 2.5rem !important;
            }
            .section-label + h2 + p { font-size: 1.1rem !important; margin-bottom: 3rem !important; }
        }`;

// Find the old @media (max-width: 768px) { block
const startIdx = axLab.indexOf('@media (max-width: 768px) {');
if (startIdx !== -1) {
    const endStr = '</style>';
    const endIdx = axLab.indexOf(endStr, startIdx);
    axLab = axLab.substring(0, startIdx) + newMobileCss + '\\n    ' + axLab.substring(endIdx);
    fs.writeFileSync('c:\\\\daum_site\\\\ax-lab.html', axLab);
    console.log('Mobile CSS updated in ax-lab.html');
} else {
    console.log('Could not find existing mobile CSS block in ax-lab.html');
}
