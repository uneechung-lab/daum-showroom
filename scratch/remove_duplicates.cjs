
const fs = require('fs');
const path = require('path');

function removeDuplicateOngoing() {
    const filePath = path.join(__dirname, '..', 'project.html');
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. 기존의 소문자 Ongoing 태그를 모두 제거합니다.
    // 대소문자 구분 없이 <span class="tag ongoing">Ongoing</span> 패턴을 찾습니다.
    const ongoingRegex = /<span class="tag ongoing">Ongoing<\/span>/gi;
    content = content.replace(ongoingRegex, '');
    
    // 2. 혹시라도 ONGOING이 한 카드에 두 번 들어간 경우를 대비해 정리합니다.
    // (이미 스크립트로 추가된 것들이 있으므로)
    const cardRegex = /<div class="card-tags">([\s\S]*?)<\/div>/g;
    content = content.replace(cardRegex, (match, tags) => {
        if (tags.includes('ONGOING')) {
            // ONGOING이 여러번 나오면 하나만 남깁니다.
            const parts = tags.split('<span class="tag green">ONGOING</span>');
            if (parts.length > 2) {
                return '<div class="card-tags">' + '<span class="tag green">ONGOING</span>' + parts.join('').replace(/<span class="tag green">ONGOING<\/span>/g, '') + '</div>';
            }
        }
        return match;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully removed duplicate Ongoing badges.");
}

removeDuplicateOngoing();
