const { By } = require("selenium-webdriver");
const assert = require("assert");
const {setupSeleniumClientBrowserStack} = require("../../../scripts/setup-selenium.cjs");

describe("contentful.js execution test", () => {
  let driver;

  beforeAll(async () => {
    driver = await setupSeleniumClientBrowserStack();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("local server test", async () => {
    await driver.get("http://bs-local.com:1234/");

    // Check HTML title
    const title = await driver.getTitle();
    assert.strictEqual(
      title,
      "contentful-management.js - Browser Test",
      "Title does not match expected."
    );

    // Check for success
    const loadingResult = await driver.findElement(By.id("loading-entries"));
    const loadingResultText = await loadingResult.getText();
    assert.strictEqual(
      loadingResultText,
      "✅ Success!",
      "Result text does not indicate success."
    );
    assert(
      !loadingResultText.startsWith("🚫 Error"),
      "Result text indicates an error."
    );
  }, 10000); // Timeout for test block if necessary.
});
