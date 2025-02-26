const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, Browser, WebDriver, until } = require('selenium-webdriver');

/**
 * @type WebDriver
 */
let driver;

async function init() {
    driver = new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('http://127.0.0.1:4200');
}

Given('dos cuentas con balance de MX$50,000.00 y MX$25,000.00', async function () {
    await init();
    this.result = await (await driver.wait(until.elementIsVisible(driver.findElement(By.id('accountBalance'))))).getText()
    await driver.quit();
});

Then('el resultado debe ser de {string}', async function (expectedAnswer) {
    assert.strictEqual( this.result, expectedAnswer);
});
