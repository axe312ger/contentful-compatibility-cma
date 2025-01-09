import { By } from "selenium-webdriver";
import assert from "assert";
import { setupSeleniumClient } from "../../scripts/setup-selenium.cjs";

(async () => {
  const driver = await setupSeleniumClient();

  await driver.get("http://localhost:4173/");

  await driver.sleep(2000);

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

  await driver.quit();
})();
