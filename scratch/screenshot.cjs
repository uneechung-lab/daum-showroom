const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000/careers-announcement.html', { waitUntil: 'networkidle2' });
  
  await page.evaluate(() => {
    const btn = document.querySelector('.apply-btn');
    if (btn) btn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ path: 'c:\\daum_site\\scratch\\screenshot.png' });
  
  await browser.close();
})();
