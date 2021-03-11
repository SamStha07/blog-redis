const puppeteer = require('puppeteer');

let brower, page;
// Automated testing where test will acts as a user where all the behaviour will be mocked by the test

// we run in first, before all the tests
beforeEach(async () => {
  // opens new brower window using puppeteer
  browser = await puppeteer.launch({
    headless: false, // GUI is off
  });
  //opens new page or tab
  page = await browser.newPage();

  await page.goto('localhost:3000');
});

// Executed after each test runs
afterEach(async () => {
  // automatically closes browser after running all tests
  await browser.close();
});

test('the header has the correct text', async () => {
  // in header logo name is Blogster so we pull out that text css selector
  const text = await page.$eval('a.brand-logo', (el) => el.innerHTML);

  expect(text).toEqual('Blogster');
});

test('clicking login starts Oauth flow', async () => {
  // css selector of login with google
  // puppeteer github docs
  await page.click('.right a');

  // finds the url of that page
  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});
