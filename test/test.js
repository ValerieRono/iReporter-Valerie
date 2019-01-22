const puppeteer = require('puppeteer');

let browser, page;


beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: true
    });
    page = await browser.newPage();
});

afterEach(async () => {
    await browser.close();
});

    
    
it ('should contain header', async() => {
    await page.goto('https://valerierono.github.io/iReporter-Valerie/UI/index.html');
    await page.waitFor('#main_content');

    const actual = await page.evaluate(() => document.querySelector('a').innerHTML);
    const expected = "iReporter";

    expect(actual).toEqual(expected);
});