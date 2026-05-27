const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\clients.html', 'utf8');

// 1. Add .project-heading CSS right before @media (max-width: 1200px)
let style_marker = '      @media (max-width: 1200px) {';
if (content.includes(style_marker) && !content.includes('.project-heading')) {
    content = content.replace(style_marker, `      .project-heading, .project-heading span {
        font-size: var(--font-h2) !important;
      }

      @media (max-width: 1200px) {`);
}

// 2. Add class="project-heading" to h2
let h2_marker = '<h2 style="margin-top: 0; line-height: 1.2; font-weight: 700; color: #0f172a; margin-bottom: 0; letter-spacing: -0.02em;">';
if (content.includes(h2_marker)) {
    content = content.replace(h2_marker, '<h2 class="project-heading" style="margin-top: 0; line-height: 1.2; font-weight: 700; color: #0f172a; margin-bottom: 0; letter-spacing: -0.02em;">');
}

// 3. Update Supabase script
let old_script = `            // Render Headline
            if (config.headline) {
              const headlineHTML = config.headline.trim().replace(/\\n/g, '<br>');
              document.querySelector('#clients-intro h2').innerHTML = headlineHTML;
            }`;

let new_script = `            // Render Headline
            if (config.headline) {
              const lines = config.headline.trim().split('\\n');
              if (lines.length > 1) {
                  let secondLine = lines[1];
                  let commaIndex = secondLine.indexOf(', ');
                  if (commaIndex !== -1) {
                      const boldPart = secondLine.substring(0, commaIndex + 2);
                      const normalPart = secondLine.substring(commaIndex + 2);
                      secondLine = \`<span style="opacity: 1;">\${boldPart}<span style="color: #0f172a; font-weight: 400;">\${normalPart}</span></span>\`;
                  } else {
                      secondLine = \`<span style="opacity: 1;"><span style="color: #0f172a; font-weight: 400;">\${secondLine}</span></span>\`;
                  }
                  document.querySelector('#clients-intro h2').innerHTML = lines[0] + '<br>' + secondLine;
              } else {
                  document.querySelector('#clients-intro h2').innerHTML = lines[0];
              }
            }`;

if (content.includes(old_script)) {
    content = content.replace(old_script, new_script);
}

fs.writeFileSync('c:\\daum_site\\clients.html', content);
console.log('Successfully updated clients.html for perfect match!');
