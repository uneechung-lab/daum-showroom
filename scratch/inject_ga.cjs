const fs = require('fs');
const path = require('path');

const GA_SCRIPT = `    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9DS4ERFRRQ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-9DS4ERFRRQ');
    </script>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !['index_temp.html', 'original_project.html'].includes(f));

console.log(`Found ${files.length} HTML files.`);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    if (content.includes('G-9DS4ERFRRQ')) {
        console.log(`Skipping ${file}: already injected.`);
        return;
    }
    const match = content.match(/<head\b[^>]*>/);
    if (match) {
        const insertIndex = match.index + match[0].length;
        const newContent = content.substring(0, insertIndex) + "\n" + GA_SCRIPT + content.substring(insertIndex);
        fs.writeFileSync(file, newContent, 'utf-8');
        console.log(`Successfully injected GA tag into ${file}`);
    } else {
        console.log(`WARNING: No <head> tag in ${file}`);
    }
});

console.log("Injection complete!");
