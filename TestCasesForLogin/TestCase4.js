const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");


async function TestCase4(driver,usernameField,passwordField,loginButton,username,password) {

    await passwordField.sendKeys(password); 

    const enteredPassword = await passwordField.getAttribute("value");
               
        if (enteredPassword == null) {
            console.log('Failed');
            return "Failed";
            
          } else {
            console.log('Passed');
            return "Passed";
            
          }


    
}

module.exports = TestCase4;