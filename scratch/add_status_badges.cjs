
const fs = require('fs');
const path = require('path');

function addStatusBadges() {
    const filePath = path.join(__dirname, '..', 'project.html');
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 프로젝트 카드 섹션 찾기
    const cardRegex = /<div class="project-card"[\s\S]*?<\/div>\s*<\/div>/g;
    
    const newContent = content.replace(cardRegex, (card) => {
        // 이미 상태 뱃지가 있는지 확인 (중복 방지)
        if (card.includes('ONGOING') || card.includes('COMPLETED')) return card;
        
        // 기간(project-year) 정보 추출
        const yearMatch = card.match(/<div class="project-year">(.*?)<\/div>/);
        if (!yearMatch) return card;
        
        const yearText = yearMatch[1];
        const isOngoing = yearText.includes('현재');
        const statusBadge = isOngoing 
            ? '<span class="tag green">ONGOING</span>' 
            : '<span class="tag">COMPLETED</span>';
            
        // card-tags 섹션에 뱃지 추가
        return card.replace('<div class="card-tags">', `<div class="card-tags">${statusBadge}`);
    });
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log("Successfully added status badges to project.html");
}

addStatusBadges();
