const { By } = require("selenium-webdriver");
const assert = require("assert");
const { setupSeleniumClient } = require("../../scripts/setup-selenium.cjs");

(async () => {
  const driver = await setupSeleniumClient();

  await driver.get("http://localhost:3000/");

  await driver.sleep(2000);

  const loadingResult = await driver.findElement(By.id("loading-entries"));

  // Check for success
  const loadedResultText = await loadingResult.getText();
  assert.strictEqual(
    loadedResultText,
    "✅ Success!",
    "Result text does not indicate success."
  );
  assert(
    !loadedResultText.startsWith("🚫 Error"),
    "Result text indicates an error."
  );

  await driver.quit();
})();
