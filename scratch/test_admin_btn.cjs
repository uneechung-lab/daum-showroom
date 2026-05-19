const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.goto('http://localhost:3000/admin/careers.html', { waitUntil: 'networkidle2' });
  
  console.log('Page loaded, waiting for list...');
  await new Promise(r => setTimeout(r, 1000));
  
  console.log('Clicking edit button...');
  await page.evaluate(() => {
    const btn = document.querySelector('.btn-edit-action');
    if (btn) btn.click();
    else console.log('Edit button not found');
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  await browser.close();
})();
