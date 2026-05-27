const fs = require('fs');

let content = fs.readFileSync('c:\\\\daum_site\\\\ax-lab.html', 'utf8');

// 1. Fix mobile CSS to remove !important from height
content = content.replace('height: 650px !important;', 'height: 350px;');
content = content.replace('width: 100% !important;', 'width: 100%;');

// 2. Fix GSAP animation
const oldGsap = `.to("#hero-showcase-box", { 
                  width: "360px", 
                  height: "821px", 
                  x: 170,
                  borderRadius: "32px",`;

const newGsap = `.to("#hero-showcase-box", { 
                  width: window.innerWidth <= 768 ? "100%" : "360px", 
                  height: window.innerWidth <= 768 ? "650px" : "821px", 
                  x: window.innerWidth <= 768 ? 0 : 170,
                  borderRadius: window.innerWidth <= 768 ? "24px" : "32px",`;

content = content.replace(oldGsap, newGsap);

// 3. Fix reset function height
const oldReset = `gsap.set("#hero-showcase-box", { 
                            width: "100%", height: "auto", x: 0,`;
const newReset = `gsap.set("#hero-showcase-box", { 
                            width: "100%", height: window.innerWidth <= 768 ? "350px" : "500px", x: 0,`;

content = content.replace(oldReset, newReset);

fs.writeFileSync('c:\\\\daum_site\\\\ax-lab.html', content);
console.log('Mobile height animation applied.');
