import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    await page.goto('http://localhost:3001/admin/inquiries.html', { waitUntil: 'networkidle2' });
    
    console.log('--- Initial Loaded State ---');
    const getDetails = () => {
        const d = document.querySelector('#sort-created_at-container svg');
        const n = document.querySelector('#sort-name-container svg');
        return {
            date: d ? { class: d.className.baseVal, lucide: d.getAttribute('data-lucide'), color: d.style.color } : null,
            name: n ? { class: n.className.baseVal, lucide: n.getAttribute('data-lucide'), color: n.style.color } : null
        };
    };

    console.log(await page.evaluate(getDetails));

    console.log('\n--- Clicking Name Header ---');
    await page.click('th[onclick*="name"]');
    
    // Wait a brief moment for DOM updates
    await new Promise(r => setTimeout(r, 100));

    console.log(await page.evaluate(getDetails));

    await browser.close();
})();
