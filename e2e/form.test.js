/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

describe('valid form ', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test('form should on page start', async () => {
    await page.goto('http://localhost:9000');

    await page.waitForSelector('.container-card');
  });

  test(
    'Form input should add .valid class if number card is valid',
    async () => {
      await page.goto('http://localhost:9000');
      await page.waitForSelector('.container-card');

      const form = await page.$('.container-card');
      const input = await form.$('.input');
      const submit = await form.$('.submit');

      await input.type('2720994540520557');
      await submit.click();

      await page.waitForSelector('.container-card .input.valid');
    },
    15000,
  );

  test(
    'Form input should add .invalid class if number card is invalid',
    async () => {
      await page.goto('http://localhost:9000');
      await page.waitForSelector('.container-card');

      const form = await page.$('.container-card');
      const input = await form.$('.input');
      const submit = await form.$('.submit');

      await input.type('272099454052055');
      await submit.click();

      await page.waitForSelector('.container-card .input.invalid');
    },
    15000,
  );

  afterEach(async () => {
    await browser.close();
  });
});
