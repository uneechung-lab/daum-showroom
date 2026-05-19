const fs = require('fs');

const filePath = 'c:\\daum_site\\careers-announcement.html';
let content = fs.readFileSync(filePath, 'utf-8');

// Fix showApplyForm function to open modal
content = content.replace(
    "const modalScrollArea = document.querySelector('.modal-scroll-area');",
    "const modalScrollArea = document.querySelector('.modal-scroll-area');\n        const modal = document.getElementById('jobModal');"
);
content = content.replace(
    "if (modalScrollArea) modalScrollArea.scrollTop = 0;\n        lucide.createIcons();",
    "modal.classList.add('active');\n        document.body.style.overflow = 'hidden';\n        if (modalScrollArea) modalScrollArea.scrollTop = 0;\n        lucide.createIcons();"
);

// Fix the apply buttons to call showApplyForm instead of mailto
content = content.replace(
    /<div class="announcement-item" onclick="openJobModal\('([^']+)'\)">([\s\S]*?)<a href="mailto:recruit@daumis\.co\.kr" class="apply-btn" onclick="event\.stopPropagation\(\)">/g,
    (match, roleId, innerContent) => {
        return `<div class="announcement-item" onclick="openJobModal('${roleId}')">${innerContent}<a href="javascript:void(0)" class="apply-btn" onclick="event.stopPropagation(); showApplyForm('${roleId}')">`;
    }
);

// Fix the dynamic JS rendering apply buttons
content = content.replace(
    /<a href="mailto:recruit@daumis\.co\.kr" class="apply-btn" onclick="event\.stopPropagation\(\)">/g,
    '<a href="javascript:void(0)" class="apply-btn" onclick="event.stopPropagation(); showApplyForm(\'${roleId}\')">'
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('File updated successfully');
