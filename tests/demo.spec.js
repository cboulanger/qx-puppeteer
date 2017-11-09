// Inspired by https://www.valentinog.com/blog/ui-testing-jest-puppetteer/

import puppeteer from "puppeteer";
import httpServer from "http-server";
import * as path from "path";

const root = path.join(__dirname, '..', 'demo');
const url  = "http://127.0.0.1:8080/source-output/demo/";

let page;
let browser;
let server;
const width = 600;
const height = 400;

beforeAll(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  server = httpServer.createServer({ root });
  server.listen(8080);
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(url);
});

describe("Testing the frontend",  () => {
  test("assert that <title> is correct", async () => {
    const title = await page.title();
    expect(title).toBe("Qooxdoo Application");
  }); //
  test("click on the button", async () => {
    //
    await page.click("div.qx-button-box");
    await page.waitForSelector("div.qx-window-active");
    
  }); 
});
  
afterAll(async() => {
  //await browser.close();
});