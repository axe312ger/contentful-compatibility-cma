const os = require("os");
const { Builder, Browser, Capabilities } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const defaultBrowser =
  os.platform() === "darwin" ? Browser.SAFARI : Browser.CHROME;

async function setupSeleniumClient() {
  const options = new chrome.Options();
  options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");

  return new Builder()
    .forBrowser(process.env.BROWSER || defaultBrowser)
    .setChromeOptions(options)
    .build();
}

async function setupSeleniumClientBrowserStack() {
  const options = new chrome.Options();
  options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");

  return new Builder()
    .forBrowser(process.env.BROWSER || defaultBrowser)
    .setChromeOptions(options)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(Capabilities.chrome())
    .build();
}

module.exports = {
  setupSeleniumClient,
  setupSeleniumClientBrowserStack,
};
