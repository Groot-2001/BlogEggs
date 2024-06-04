const puppeteer = require("puppeteer");

jest.setTimeout(30000);

//first test suit to check
test("Add two number", () => {
  const result = 3 + 2;

  expect(result).toEqual(5);
});

//headless browser test suit
test("launching chromium instance", async (done) => {
  //initiate chromium instance
  const browser = await puppeteer.launch({
    headless: false,
  });

  //lets create browser tab or page
  const page = await browser.newPage();

  //navigate to localhost:3000
  await page.goto("localhost:3000");

  //Extracting page content
  const text = await page.$eval("a.brand-logo", (el) => el.innerText);

  //checking the text with original text
  expect(text).toEqual("BlogEggs");
  done();
});
