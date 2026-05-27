const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\ai-lab.html', 'utf8');

const target = `            #hero-showcase-info > div { flex-wrap: wrap !important; justify-content: flex-start !important; gap: 0.5rem !important; }
            #hero-showcase-info > div > div { width: calc(50% - 0.5rem) !important; height: 120px !important; }`;

const replacement = `            /* Cards Container */
            #hero-showcase-info > div:nth-of-type(1) { flex-wrap: wrap !important; justify-content: flex-start !important; gap: 0.5rem !important; }
            #hero-showcase-info > div:nth-of-type(1) > div { width: calc(50% - 0.5rem) !important; height: 120px !important; }
            
            /* Feature List Container (Intelligence Inside, etc.) */
            #hero-showcase-info > div:nth-of-type(2) > div { 
                flex-direction: column !important; 
                gap: 1.5rem !important; 
                align-items: flex-start !important; 
            }
            #hero-showcase-info > div:nth-of-type(2) > div > div { 
                width: 100% !important; 
                flex: none !important; 
            }
            /* Hide the plus signs on mobile */
            #hero-showcase-info > div:nth-of-type(2) > div > div:nth-child(even) { 
                display: none !important; 
            }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('c:\\daum_site\\ai-lab.html', content);
    console.log('Successfully fixed info sections grid!');
} else {
    console.log('Failed to find target string for grid fix.');
}
