const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');

const mobileStyles = `
        @media (max-width: 768px) {
            /* Layout & Padding */
            .py-32 { padding-top: 5rem !important; padding-bottom: 5rem !important; }
            section[style*="padding-top: 180px"] { padding-top: 120px !important; padding-bottom: 3rem !important; }
            
            /* Typography */
            .lab-title, .section-title { font-size: 2.2rem !important; margin-bottom: 1.5rem !important; }
            .lab-sub { font-size: 1.15rem !important; margin-bottom: 1.5rem !important; }
            
            /* Showcase Box */
            #hero-showcase-wrapper { height: 350px !important; margin-top: 2rem !important; margin-bottom: 2rem !important; }
            #hero-showcase-box { height: 350px !important; border-radius: 24px !important; }
            .intro-text { font-size: 1.8rem !important; white-space: normal !important; word-break: keep-all; padding: 0 1.5rem; width: 100%; box-sizing: border-box; }
            .step-2-wrapper h2 { font-size: 1.4rem !important; }
            
            /* Code Terminal */
            .code-showcase-container { padding: 1rem !important; border-radius: 24px !important; }
            .code-stream { padding: 1rem !important; font-size: 0.75rem !important; }
            .code-content-wrapper { top: 1rem !important; left: 1rem !important; right: 1rem !important; }
            
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
        }
`;

if (content.includes('</style>') && !content.includes('.lab-title { font-size: var(--font-h2)')) {
    content = content.replace('</style>', mobileStyles + '\n    </style>');
    fs.writeFileSync('c:\\daum_site\\ai-lab.html', content);
    console.log('Mobile styles added successfully!');
} else {
    console.log('Could not find </style> or styles already exist.');
}
