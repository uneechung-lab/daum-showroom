const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const targetOrder = [
    '/overview.html',
    '/ceo.html',
    '/vision.html',
    '/history.html',
    '/contact.html'
];

let updatedCount = 0;

files.forEach(filename => {
    let content;
    try {
        content = fs.readFileSync(filename, 'utf8');
    } catch (e) {
        console.error(`Error reading ${filename}: ${e.message}`);
        return;
    }
    
    // Pattern to find the '회사소개' mega-menu list
    // It looks for <h3>회사소개</h3>, then navigates to the <ul> in mega-right
    const menuPattern = /(<h3>회사소개<\/h3>[\s\S]*?<div class="mega-right">[\s\S]*?<ul>)([\s\S]*?)(<\/ul>)/g;
    
    const newContent = content.replace(menuPattern, (match, prefix, itemsBlock, suffix) => {
        // Extract all <li> items
        const liItems = itemsBlock.match(/<li>[\s\S]*?<\/li>/g) || [];
        
        // Map href to its full <li> block
        const liMap = {};
        liItems.forEach(li => {
            const hrefMatch = li.match(/href="([^"]+)"/);
            if (hrefMatch) {
                liMap[hrefMatch[1]] = li;
            }
        });
        
        const newLiList = [];
        const seenHrefs = new Set();
        
        targetOrder.forEach(targetHref => {
            let matchedHref = null;
            if (liMap[targetHref]) matchedHref = targetHref;
            else if (liMap[targetHref.slice(1)]) matchedHref = targetHref.slice(1);
            
            if (matchedHref) {
                newLiList.push(liMap[matchedHref]);
                seenHrefs.add(matchedHref);
            }
        });
        
        // Add remaining items
        Object.keys(liMap).forEach(href => {
            if (!seenHrefs.has(href)) {
                newLiList.push(liMap[href]);
            }
        });
        
        const indent = "                        ";
        return prefix + "\n" + indent + newLiList.join("\n" + indent) + "\n                      " + suffix;
    });
    
    if (newContent !== content) {
        fs.writeFileSync(filename, newContent, 'utf8');
        console.log(`Updated ${filename}`);
        updatedCount++;
    }
});

console.log(`Finished. Total files updated: ${updatedCount}`);
