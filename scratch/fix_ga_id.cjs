const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !['index_temp.html', 'original_project.html'].includes(f));

console.log(`Found ${files.length} HTML files.`);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    if (content.includes("G-9DS4ERFRRQ")) {
        // Use replaceAll to fix both places (script source and gtag config)
        const newContent = content.replaceAll("G-9DS4ERFRRQ", "G-5QS4QDR9RQ");
        fs.writeFileSync(file, newContent, 'utf-8');
        console.log(`Successfully fixed GA ID in ${file}`);
    } else {
        console.log(`Skipping ${file}: target GA ID G-9DS4ERFRRQ not found.`);
    }
});

console.log("GA ID correction complete!");
