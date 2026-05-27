const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\clients.html', 'utf8');

let start_marker = '      .client-item:hover img {\n        filter: grayscale(0) opacity(1);\n        overflow: hidden;\n        padding: 0.5rem 0; /* Reduced from 1rem */\n        position: relative;\n      }';
let end_marker = '      .slider-track {';

let start_idx = content.indexOf('      .client-item:hover img {');
let end_idx = content.indexOf(end_marker);

if (start_idx !== -1 && end_idx !== -1) {
    let replacement = `      .client-item:hover img {
        filter: grayscale(0) opacity(1);
        transform: scale(1.08);
      }

      @media (max-width: 1200px) {
        .client-grid { grid-template-columns: repeat(3, 1fr); }
      }
      @media (max-width: 768px) {
        .client-grid { grid-template-columns: repeat(2, 1fr); }
        .client-item { padding: 3rem 2rem; }
        .client-item img { max-width: 120px; }
        
        #clients-intro h2,
        #clients-intro h2 span {
          font-size: var(--font-h2, 1.8rem) !important;
          line-height: 1.35 !important;
          word-break: keep-all;
        }
      }

      /* Infinite Slider Styles */
      .slider-container {
        width: 100%;
        overflow: hidden;
        padding: 0.5rem 0; /* Reduced from 1rem */
        position: relative;
      }
      
`;
    content = content.substring(0, start_idx) + replacement + content.substring(end_idx);
    fs.writeFileSync('c:\\daum_site\\clients.html', content);
    console.log('Successfully fixed clients.html again!');
} else {
    console.log('Failed to find markers.');
}
