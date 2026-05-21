const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !['index_temp.html', 'original_project.html'].includes(f));

console.log(`Found ${files.length} HTML files.`);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    if (content.includes("gtag('config', 'G-9DS4ERFRRQ');")) {
        const newContent = content.replace(
            "gtag('config', 'G-9DS4ERFRRQ');",
            "gtag('config', 'G-9DS4ERFRRQ', { 'debug_mode': true });"
        );
        fs.writeFileSync(file, newContent, 'utf-8');
        console.log(`Successfully added debug_mode to ${file}`);
    } else {
        console.log(`Skipping ${file}: target gtag config not found or already modified.`);
    }
});

console.log("Debug Mode injection complete!");
