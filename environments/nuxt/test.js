import { By } from "selenium-webdriver";
import assert from "assert";
import { setupSeleniumClient } from "../../scripts/setup-selenium.cjs";

(async () => {
  const driver = await setupSeleniumClient();

  await driver.get("http://localhost:3000/");

  await driver.sleep(2000);

  // Check for success
  const scriptSetupResult = await driver.findElement(By.id("result-script"));
  const scriptSetupResultText = await scriptSetupResult.getText();
  assert.strictEqual(
    scriptSetupResultText,
    "✅ Success! (Plain + Legacy APIs)",
    "Result text does not indicate success."
  );

  const compositionResult = await driver.findElement(
    By.id("result-composition")
  );
  const compositionResultText = await compositionResult.getText();
  assert.strictEqual(
    compositionResultText,
    "✅ Success using composables! (Plain + Legacy APIs)",
    "Result text does not indicate success."
  );

  assert(
    !scriptSetupResultText.startsWith("🚫 Error"),
    "Result text indicates an error."
  );
  assert(
    !compositionResultText.startsWith("🚫 Error"),
    "Result text indicates an error."
  );

  await driver.quit();
})();
