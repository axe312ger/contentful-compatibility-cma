const { By } = require("selenium-webdriver");
const assert = require("assert");
const { setupSeleniumClient } = require("../../../scripts/setup-selenium.cjs");

(async () => {
  const driver = await setupSeleniumClient();

  await driver.get("http://localhost:3000/");

  await driver.sleep(2000);

  // Check for success
  const loadingResult = await driver.findElement(
    By.id("loading-content-types")
  );
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
