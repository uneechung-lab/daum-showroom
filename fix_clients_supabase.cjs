const fs = require('fs');
let lines = fs.readFileSync('c:\\daum_site\\clients.html', 'utf8').split('\n');

const idx = lines.findIndex(l => l.includes('// Render Headline'));

if (idx !== -1) {
    let newLogic = [
        '            if (config.headline) {',
        '              const linesSplit = config.headline.trim().split(\'\\n\');',
        '              if (linesSplit.length > 1) {',
        '                  let secondLine = linesSplit[1];',
        '                  let commaIndex = secondLine.indexOf(\', \');',
        '                  if (commaIndex !== -1) {',
        '                      const boldPart = secondLine.substring(0, commaIndex + 2);',
        '                      const normalPart = secondLine.substring(commaIndex + 2);',
        '                      secondLine = `<span style="opacity: 1;">${boldPart}<span style="color: #0f172a; font-weight: 400;">${normalPart}</span></span>`;',
        '                  } else {',
        '                      secondLine = `<span style="opacity: 1;"><span style="color: #0f172a; font-weight: 400;">${secondLine}</span></span>`;',
        '                  }',
        '                  document.querySelector(\'#clients-intro h2\').innerHTML = linesSplit[0] + \'<br>\' + secondLine;',
        '              } else {',
        '                  document.querySelector(\'#clients-intro h2\').innerHTML = linesSplit[0];',
        '              }',
        '            }'
    ];
    
    // Replace the next 4 lines (if config.headline) { ... } with our new logic
    lines.splice(idx + 1, 4, ...newLogic);
    
    fs.writeFileSync('c:\\daum_site\\clients.html', lines.join('\n'));
    console.log('Successfully updated Supabase logic!');
} else {
    console.log('Could not find Render Headline comment.');
}
