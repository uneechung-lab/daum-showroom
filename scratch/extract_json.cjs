const fs = require('fs');
const html = fs.readFileSync('c:/daum_site/clients.html', 'utf8');
const regex = /<div class="client-item"><img src="([^"]+)"/g;
let match;
const items = [];
items.push({ name: '키움증권', type: 'client', logo_url: '/ci_kw.png' });
items.push({ name: '토스', type: 'client', logo_url: '/ci_toss.png' });
items.push({ name: '삼성생명', type: 'client', logo_url: '/ci_ss.png' });
let idx = 4;
while ((match = regex.exec(html)) !== null) {
    if (['/ci_kw.png', '/ci_toss.png', '/ci_ss.png'].includes(match[1])) continue;
    items.push({ name: '고객사 ' + idx, type: 'client', logo_url: match[1] });
    idx++;
}
fs.writeFileSync('c:/daum_site/scratch/partners.json', JSON.stringify(items, null, 2));
