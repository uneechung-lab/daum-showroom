const fs = require('fs');

let axLab = fs.readFileSync('c:\\\\daum_site\\\\ax-lab.html', 'utf8');

// 1. Update GSAP animation for #hero-showcase-box to 75% width and 520px height
const gsapMatch = axLab.match(/\\.to\\(\\"#hero-showcase-box\\", \\{[\\s\\S]*?borderWidth: \\"6px\\",/);
if (gsapMatch) {
    const newGsap = `.to("#hero-showcase-box", { 
                  width: window.innerWidth <= 768 ? "75%" : "360px", 
                  height: window.innerWidth <= 768 ? "520px" : "821px", 
                  x: window.innerWidth <= 768 ? 0 : 170,
                  borderRadius: window.innerWidth <= 768 ? "24px" : "32px", 
                  backgroundColor: "transparent",
                  borderColor: "#ffffff",
                  borderWidth: "6px",`;
    axLab = axLab.replace(gsapMatch[0], newGsap);
}

// 2. Update CSS for .zal-card-container
const oldCardCss = `            /* Fix zal-card-container overlap */
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
const newCardCss = `            /* Fix zal-card-container overlap */
            .zal-card-container {
                position: absolute !important;
                left: -10px !important;
                top: 360px !important;
                bottom: auto !important;
                width: 200px !important;
                max-width: none !important;
                margin: 0 !important;
                transform: none !important; 
                display: block !important; 
                opacity: 1 !important;
                visibility: visible !important;
                z-index: 100 !important;
            }`;
            
axLab = axLab.replace(oldCardCss, newCardCss);

fs.writeFileSync('c:\\\\daum_site\\\\ax-lab.html', axLab);
console.log('Mobile layout updated for 75% width and character position fixed.');
