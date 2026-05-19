const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.goto('http://localhost:3000/careers-announcement.html', { waitUntil: 'networkidle2' });
  
  console.log('Page loaded, clicking apply button...');
  await page.evaluate(() => {
    const btn = document.querySelector('.apply-btn');
    if (btn) btn.click();
    else console.log('Button not found');
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  await browser.close();
})();
