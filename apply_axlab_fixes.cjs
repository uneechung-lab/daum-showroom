const fs = require('fs');

let aiLab = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');
let axLab = fs.readFileSync('c:\\daum_site\\ax-lab.html', 'utf8');

// Find the @media (max-width: 768px) { block in ai-lab
const match = aiLab.match(/@media \(max-width: 768px\) \{[\s\S]*?\}\s*\}\s*<\/style>/);

if (match) {
    const mobileCss = match[0].replace('</style>', '').trim();
    
    // Inject into ax-lab before </style>
    if (axLab.includes('</style>')) {
        axLab = axLab.replace('</style>', `\n        ${mobileCss}\n    </style>`);
        
        // Remove inline !important
        axLab = axLab.replace(/padding-top:\s*180px\s*!important;/g, 'padding-top: 180px;');
        axLab = axLab.replace(/font-size:\s*1\.5rem\s*!important;/g, 'font-size: 1.5rem;');
        
        fs.writeFileSync('c:\\daum_site\\ax-lab.html', axLab);
        console.log('Successfully applied all mobile fixes to ax-lab.html');
    } else {
        console.log('Could not find </style> in ax-lab.html');
    }
} else {
    console.log('Could not find mobile media query in ai-lab.html');
}
