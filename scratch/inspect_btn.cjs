const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/admin/careers.html', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 1000));
  
  const html = await page.evaluate(() => {
    const btn = document.querySelector('.btn-edit-action');
    return btn ? btn.outerHTML : 'Button not found';
  });
  
  console.log('Rendered Button HTML:', html);
  
  await browser.close();
})();
