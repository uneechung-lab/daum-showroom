const fs = require('fs');

const filePath = 'c:\\daum_site\\careers-announcement.html';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace showApplyForm with openJobModal in the apply-btn onclick handlers
content = content.replace(
    /onclick="event\.stopPropagation\(\); showApplyForm\('([^']+)'\)"/g,
    'onclick="event.stopPropagation(); openJobModal(\'$1\')"'
);

// For the dynamic JS one:
content = content.replace(
    /onclick="event\.stopPropagation\(\); showApplyForm\('\\$\\{roleId\\}'\)"/g,
    'onclick="event.stopPropagation(); openJobModal(\'${roleId}\')"'
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('File updated successfully');
