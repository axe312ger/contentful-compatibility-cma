const { By } = require("selenium-webdriver");
const assert = require("assert");
const { setupSeleniumClient } = require("../../../scripts/setup-selenium.cjs");

describe("contentful.js execution test", () => {
  let driver;

  beforeAll(async () => {
    driver = await setupSeleniumClient();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("local server test", async () => {
    await driver.get("http://localhost:3000/");

    // Check for success SSR
    const serverResult = await driver.findElement(By.id("server"));
    const serverResultText = await serverResult.getText();
    assert.strictEqual(
      serverResultText,
      "✅ Success!",
      "Server result text does not indicate success."
    );
    assert(
      !serverResultText.startsWith("🚫 Error"),
      "Server result text indicates an error."
    );

    // Check for success loading Client
    await driver.sleep(1000);

    const clientResult = await driver.findElement(By.id("client"));
    const clientResultText = await clientResult.getText();
    assert.strictEqual(
      clientResultText,
      "✅ Success!",
      "Client result text does not indicate success."
    );
    assert(
      !clientResultText.startsWith("🚫 Error"),
      "Client result text indicates an error."
    );
  }, 10000); // Timeout for test block if necessary.
});
