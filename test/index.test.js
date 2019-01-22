// renders correctly, snapshot
// sign in button leads to sign in page
// sign up button leads to sign up page

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

test('page renders correctly', async () => {
    await page.goto('https://valerierono.github.io/iReporter-Valerie/UI/index.html');
    await page.waitFor('#main_content');
  })

test('sign in button leads to log in page', async () => {
    await page.goto('https://valerierono.github.io/iReporter-Valerie/UI/index.html');
    await page.waitFor('#main_content');

    await page.click('a[href="sign_in.html"]')
    await page.waitForSelector('#signIn')
  })

test('sign up button leads to sign up page', async () => {
    await page.goto('https://valerierono.github.io/iReporter-Valerie/UI/index.html');
    await page.waitFor('#main_content');

    await page.click('a[href="sign_up.html"]')
    await page.waitForSelector('#signUp')
})
