const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'index.html', 'overview.html', 'ceo.html', 'vision.html', 'history.html', 
    'contact.html', 'ai-lab.html', 'ax-lab.html', 'business.html', 
    'investment.html', 'mutual.html', 'sales.html', 'asset.html', 
    'project.html', 'clients.html', 'careers.html'
];

const mapping = [
    { old: /\/careers\.html#jobs/g, new: '/careers-jobs.html' },
    { old: /\/careers\.html#process/g, new: '/careers-process.html' },
    { old: /\/careers\.html#welfare/g, new: '/careers-welfare.html' },
    { old: /\/careers\.html#announcement/g, new: '/careers-announcement.html' },
    { old: /href="\/careers\.html"/g, new: 'href="/careers-jobs.html"' }
];

filesToUpdate.forEach(file => {
    const filePath = path.resolve(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;

    mapping.forEach(m => {
        newContent = newContent.replace(m.old, m.new);
    });

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
});
