const fs = require('fs');

let content = fs.readFileSync('c:\\\\daum_site\\\\ax-lab.html', 'utf8');

// 1. Update GSAP animation for width on mobile
const oldGsap = `.to("#hero-showcase-box", { 
                  width: window.innerWidth <= 768 ? "100%" : "360px",`;
const newGsap = `.to("#hero-showcase-box", { 
                  width: window.innerWidth <= 768 ? "85%" : "360px",`;

content = content.replace(oldGsap, newGsap);

// 2. Update CSS for hero-showcase-box alignment
const oldBoxCss = `#hero-showcase-box { 
                position: relative !important; 
                width: 100%; 
                height: 350px; 
                border-radius: 24px !important; 
                transform: none !important; /* Cancel GSAP x offset */
            }`;
const newBoxCss = `#hero-showcase-box { 
                position: relative !important; 
                width: 100%; 
                height: 350px; 
                border-radius: 24px !important; 
                transform: none !important; 
                margin-left: auto !important; /* Align right to make space for characters */
            }`;
content = content.replace(oldBoxCss, newBoxCss);

// 3. Update CSS for zal-card-container
const oldCardCss = `            /* Fix zal-card-container overlap */
            .zal-card-container {
                position: relative !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                max-width: 250px !important;
                margin: 0 auto !important;
                transform: none !important; /* Cancel GSAP */
                display: none !important; /* Hide the floating card on mobile as it conflicts with layout */
            }`;
const newCardCss = `            /* Fix zal-card-container overlap */
            .zal-card-container {
                position: absolute !important;
                left: -30px !important;
                bottom: -20px !important;
                top: auto !important;
                width: 220px !important;
                max-width: none !important;
                margin: 0 !important;
                transform: none !important; 
                display: block !important; 
                z-index: 100 !important;
            }`;
content = content.replace(oldCardCss, newCardCss);

fs.writeFileSync('c:\\\\daum_site\\\\ax-lab.html', content);
console.log('Mobile layout updated for 85% width and characters on left.');
