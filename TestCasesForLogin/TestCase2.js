const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");


// async function TestCase2(driver,usernameField,usernameField,loginButton,username,password) {

//     await usernameField.sendKeys(username);
    
//     usernameField.getAttribute('value').then(function(username) {
//         // Define a regular expression pattern to match alphanumeric characters and underscores
//         const pattern = /^[a-zA-Z0-9_]+$/;

//         if (pattern.test(username)) {
//             console.log('Failed');
//             return "Failed";
            
//           } else {
//             console.log('Passed');
//             return "Passed";
            
//           }
//     })


    
// }


async function TestCase2(driver, usernameField, loginButton, username, password) {
  try {
      // Input the username
          await usernameField.sendKeys(username);

          // Get the entered value
          usernameField.getAttribute('value').then(function(username){

          // Define a regular expression pattern to match alphanumeric characters and underscores
          const pattern = /^[a-zA-Z0-9_]+$/;

          if (pattern.test(username)) {
              console.log('Passed');
              return "Passed";
          } else {
              console.log('Failed');
              return "Failed";
          }
        })
  } catch (error) {
      console.error('Error:', error.message);
      return "Error";
  }
}

module.exports = TestCase2;





module.exports = TestCase2;