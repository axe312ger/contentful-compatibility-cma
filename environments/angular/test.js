// @ts-check
const { By } = require("selenium-webdriver");
const assert = require("assert");
const { setupSeleniumClient } = require("../../scripts/setup-selenium.cjs");

(async () => {
  const driver = await setupSeleniumClient();

  await driver.get("http://127.0.0.1:4200/");

  const loadingResult = await driver.findElement(By.id("loading-entries"));

  // Wait up to 10 seconds for the result to contain success/error
  await driver.wait(async () => {
    const text = await loadingResult.getText();
    return text.includes("Success") || text.includes("Error");
  }, 10000, "Timed out waiting for API response");

  // Check for success
  const loadedResultText = await loadingResult.getText();
  assert.strictEqual(
    loadedResultText,
    "✅ Success! (Plain + Legacy APIs)",
    "Result text does not indicate success."
  );
  assert(
    !loadedResultText.startsWith("🚫 Error"),
    "Result text indicates an error."
  );

  await driver.quit();
})();
