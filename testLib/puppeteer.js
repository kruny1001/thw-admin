const puppeteer = require('puppeteer');



const browser = puppeteer.launch();
const page = browser.newPage();
page.goto('https://example.com');
page.screenshot({path: './google.png'});

browser.close();