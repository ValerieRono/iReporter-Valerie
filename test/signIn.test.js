const puppeteer = require('puppeteer');

let browser, page;


beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
});

afterEach(async () => {
    await browser.close();
});

test('page renders correctly', async () => {
    await page.goto('https://valerierono.github.io/iReporter-Valerie/UI/sign_in.html');
    await page.waitFor('#main_content');
  })

test('sign in button leads to log in page', async () => {
    await page.goto('https://valerierono.github.io/iReporter-Valerie/UI/sign_in.html');
    await page.waitFor('#main_content');

    await page.click('a[href="sign_in.html"]')
    await page.waitForSelector('#signIn')
  })

test('sign up button leads to sign up page', async () => {
    await page.goto('https://valerierono.github.io/iReporter-Valerie/UI/sign_in.html');
    await page.waitFor('#main_content');

    await page.click('a[href="sign_up.html"]')
    await page.waitForSelector('#signUp')
})

let testUser = {
    username: "chepkiru",
    password: "chepkirui"
  };

test("user can sign up", async () => {
    await page.goto('https://valerierono.github.io/iReporter-Valerie/UI/sign_in.html');
    await page.waitForSelector("#signIn");

    await page.click("input[name=username]");
    await page.type("input[name=username]", testUser.username);

    await page.click("input[name=Password]");
    await page.type("input[name=Password]", testUser.password);

    await page.click("input[type=submit]");
    await page.waitForSelector("#past_records");
    await page.screenshot({path: "signIn.png"})
});