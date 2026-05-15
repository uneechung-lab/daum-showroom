
const fs = require('fs');
const path = require('path');

function addStatusBadges() {
    const filePath = path.join(__dirname, '..', 'project.html');
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. 모든 프로젝트 카드 블록을 찾습니다.
    // 각 카드는 <div class="project-card" 로 시작하고 해당 카드의 </div> 로 끝납니다.
    // 여기서는 간단하게 다음 카드가 나오기 전까지 혹은 섹션이 끝나기 전까지로 잡습니다.
    const cards = content.split('<div class="project-card"');
    
    let newContent = cards[0];
    for (let i = 1; i < cards.length; i++) {
        let card = cards[i];
        
        // 이 카드 블록 내에서 뱃지가 이미 있는지 확인
        if (!card.includes('ONGOING') && !card.includes('COMPLETED')) {
            // 기간 확인
            const yearMatch = card.match(/<div class="project-year">(.*?)<\/div>/);
            if (yearMatch) {
                const yearText = yearMatch[1];
                const isOngoing = yearText.includes('현재');
                const statusBadge = isOngoing 
                    ? '<span class="tag green">ONGOING</span>' 
                    : '<span class="tag">COMPLETED</span>';
                
                // card-tags 내부에 삽입
                card = card.replace('<div class="card-tags">', `<div class="card-tags">${statusBadge}`);
            }
        }
        newContent += '<div class="project-card"' + card;
    }
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log("Successfully added status badges with improved logic.");
}

addStatusBadges();
