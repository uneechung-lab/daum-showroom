const fs = require('fs');

let content = fs.readFileSync('c:\\daum_site\\index.html', 'utf-8');

// The CEO text:
// <div class="ceo-greeting-text" style="line-height: 1.7; font-weight: 400; word-break: keep-all; flex-grow: 1;">
//   <p>
// We should add class="card-desc" to the p tag inside it.
content = content.replace(/<div class="ceo-greeting-text"([^>]*)>\s*<p>/g, '<div class="ceo-greeting-text"$1>\n                <p class="card-desc">');

// The vision spans:
// <span style="line-height: 1.4; word-break: keep-all;">
// Let's replace those with <span class="card-desc" style="...">
content = content.replace(/<span style="line-height: 1\.4; word-break: keep-all;">/g, '<span class="card-desc" style="line-height: 1.4; word-break: keep-all;">');

// The history and culture p tags:
// <p style="line-height: 1.6; word-break: keep-all; margin-bottom: 2.25rem;">
// Let's replace with <p class="card-desc" style="...">
content = content.replace(/<p style="line-height: 1\.6; word-break: keep-all;/g, '<p class="card-desc" style="line-height: 1.6; word-break: keep-all;');

// Let's also check for any <span style="display: flex; align-items: center; gap: 0.9rem; line-height: 1.1; font-weight: 500;">
content = content.replace(/<span style="display: flex;/g, '<span class="card-desc" style="display: flex;');

fs.writeFileSync('c:\\daum_site\\index.html', content, 'utf-8');
console.log('Added card-desc classes.');
