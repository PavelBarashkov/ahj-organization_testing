/* eslint-disable no-undef */
import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(100000);
describe('Credit Card Validator form', () => {
  let browser;
  let page;
  let server;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false, // show gui
      // slowMo: 50,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('form should on page start', async () => {
    await page.goto(baseUrl);

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
  );
});
