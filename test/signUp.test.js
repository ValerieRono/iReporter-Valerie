const puppeteer = require('puppeteer');
const faker = require('faker');

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
    await page.goto('https://valerierono.github.io/iReporter-Valerie/UI/sign_up.html');
    await page.waitFor('#main_content');
  })

test('sign in button leads to log in page', async () => {
    await page.goto('https://valerierono.github.io/iReporter-Valerie/UI/sign_up.html');
    await page.waitFor('#main_content');

    await page.click('a[href="sign_in.html"]')
    await page.waitForSelector('#signIn')
  })

test('sign up button leads to sign up page', async () => {
    await page.goto('https://valerierono.github.io/iReporter-Valerie/UI/sign_up.html');
    await page.waitFor('#main_content');

    await page.click('a[href="sign_up.html"]')
    await page.waitForSelector('#signUp')
})


let testUser = {
    firstname: faker.name.firstName(),
    lastname: "chepkirui",
    othernames: "cate",
    email: "ronovalerie@gmail.com",
    phoneNumber: "0717245777",
    username: faker.name.firstName(),
    password: "chepkirui",
    confirmPassword: "chepkirui"
  };

  test("user can sign up", async () => {
    await page.goto('https://valerierono.github.io/iReporter-Valerie/UI/sign_up.html');
    await page.waitForSelector("#signUp");

    await page.click("input[name=firstname]");
    await page.type("input[name=firstname]", testUser.firstname);

    await page.click("input[name=lastname]");
    await page.type("input[name=lastname]", testUser.lastname);

    await page.click("input[name=othernames]");
    await page.type("input[name=othernames]", testUser.othernames);

    await page.click("input[name=Email]");
    await page.type("input[name=Email]", testUser.email);

    await page.click("input[name=phonenumber]");
    await page.type("input[name=phonenumber]", testUser.phoneNumber);

    await page.click("input[name=username]");
    await page.type("input[name=username]", testUser.username);

    await page.click("input[name=Password]");
    await page.type("input[name=Password]", testUser.password);

    await page.click("input[name=confirmPassword]");
    await page.type("input[name=confirmPassword]", testUser.confirmPassword);

    await page.click("input[type=submit]");
    await page.waitForSelector("#past_records");
    await page.screenshot({path: "signUp.png"})
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