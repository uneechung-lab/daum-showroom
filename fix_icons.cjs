const fs = require('fs');

let content = fs.readFileSync('c:\\daum_site\\ax-lab.html', 'utf8');

const oldLine = '.fromTo(".icon-particle", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, x: (i) => [-300, 300, 0][i], y: (i) => [-140, -140, 110][i], duration: 0.8, stagger: 0.08, ease: "back.out(1.5)" }, "-=0.3")';
const newLine = '.fromTo(".icon-particle", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, x: (i) => window.innerWidth <= 768 ? [-120, 120, 0][i] : [-300, 300, 0][i], y: (i) => window.innerWidth <= 768 ? [-90, -90, 80][i] : [-140, -140, 110][i], duration: 0.8, stagger: 0.08, ease: "back.out(1.5)" }, "-=0.3")';

if (content.includes(oldLine)) {
    content = content.replace(oldLine, newLine);
    fs.writeFileSync('c:\\daum_site\\ax-lab.html', content);
    console.log('GSAP icons fixed for mobile.');
} else {
    console.log('Could not find the old line.');
}
