const { By } = require("selenium-webdriver");
const assert = require("assert");
const { setupSeleniumClient } = require("../../../scripts/setup-selenium.cjs");

(async () => {
  const driver = await setupSeleniumClient();

  await driver.get("http://localhost:1234/");

  await driver.sleep(2000);

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
    "✅ Success! (Plain + Legacy APIs)",
    "Result text does not indicate success."
  );
  assert(
    !loadingResultText.startsWith("🚫 Error"),
    "Result text indicates an error."
  );

  await driver.quit();
})();
