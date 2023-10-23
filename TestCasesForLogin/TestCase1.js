const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");


async function TestCase1(driver,usernameField,passwordField,loginButton,username,password) {

    await usernameField.sendKeys(username); 

    const enteredUsername = await usernameField.getAttribute("value");
               
        if (enteredUsername == null) {
            console.log('Failed');
            return "Failed";
            
          } else {
            console.log('Passed');
            return "Passed";
            
          }


    
}

module.exports = TestCase1;