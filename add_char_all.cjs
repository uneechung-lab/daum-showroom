const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && file !== 'node_modules' && file !== '.git' && file !== 'dist') {
            processDir(fullPath);
        } else if (stat.isFile() && file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            if (content.includes('bottom-cta-section') && !content.includes('class="cta-character"')) {
                // Find <section class="bottom-cta-section..."
                // And insert the div before the next <div class="container"> if it's not already there
                
                content = content.replace(/(<section[^>]*class="[^"]*bottom-cta-section[^"]*"[^>]*>\s*)(<div class="container">)/i, '$1<div class="cta-character"><img src="/login.png" alt="Contact Character"></div>\n        $2');
                fs.writeFileSync(fullPath, content);
                console.log('Updated: ' + fullPath);
            }
        }
    }
}

processDir('.');
console.log('Done.');
