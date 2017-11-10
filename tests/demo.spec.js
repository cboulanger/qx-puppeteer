// Inspired by https://www.valentinog.com/blog/ui-testing-jest-puppetteer/

import puppeteer from "puppeteer";
import httpServer from "http-server";
import * as path from "path";

const build_target = "source";
const host = "127.0.0.1";
const port = 8080;
const root = path.join(__dirname, '..', 'demo');
const url  = `http://${host}:${port}/${build_target}-output/demo/`;

let page;
let browser;
let server;
const width = 1000;
const height = 600;

beforeAll(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  server = httpServer.createServer({ root });
  server.listen(port);
  console.info(`Started a server on ${host}:${port}`);
  try {
    
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
    console.info(`Navigating to ${url}...`);
    await page.goto(url);
    console.info(`Opened ${url}...`);  
  } catch(e) {
    console.error(e);
  }
});

describe("Testing the frontend",  () => {
  test("assert that <title> is correct", async () => {
    const title = await page.title();
    expect(title).toBe("Qooxdoo Application");
  }); 
  test("click on the button", async () => {
    await page.click("[data-widget-id=button1]");
    let node = await page.waitForSelector("[data-widget-id=dialog1]");
    console.log(node);
  }); 
});
  
afterAll(async() => {
  //await browser.close();
});