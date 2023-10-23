const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");


async function TestCase5(driver,usernameField,passwordField,loginButton,username,password) {

    await passwordField.sendKeys(password); 

    const typeAttribute = await passwordField.getAttribute('type');


        if (typeAttribute === 'password') {
            console.log('Passed');
            return "Passed";
            
          } else {
            console.log('Failed');
            return "Failed";
            
          }


    
}

module.exports = TestCase5;