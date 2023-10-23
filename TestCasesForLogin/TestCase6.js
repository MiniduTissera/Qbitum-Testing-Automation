const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");


async function TestCase6(driver,usernameField,usernameField,loginButton,username,password) {

    await usernameField.sendKeys(username); // Replace with a valid username
    await usernameField.sendKeys(password); // Replace with a valid password

    await loginButton.click();

    const desiredUrl ="https://practicetestautomation.com/logged-in-successfully/";

    const actualUrl = await driver.getCurrentUrl();
          console.log(actualUrl);

          if (actualUrl === desiredUrl) {
            console.log('Passed');
            return "Passed";
            
          } else {
            console.log('Failed');
            return "Failed";
            
          }


    
}

module.exports = TestCase6;