const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { readExcelData, countRowsInExcelFile } = require("./TestFileReader.js");
const xmlbuilder = require("xmlbuilder");
const fs = require("fs");
const csv = require('csv-parser');
const xlsx = require("xlsx-populate");



async function runTestCases() {
  const testResults = [];

  try {
    const numberOfRows = countRowsInExcelFile(); // Call the function to get the number of rows

    for (let i = 6; i <=6; i++) {
      try {
        const { testId, result } = await loginTestCase(i);
        testResults.push({ testNumber: testId, result });
      } catch (error) {
        console.error(`Error in test case ${i}: ${error.message}`);
        testResults.push({ testNumber: `TC_ID_${i}`, result: "Failed" });
      }
    }

    // Generate the XML report
    const xml = xmlbuilder.create("testResults");
    testResults.forEach((test) => {
      xml.ele("test", { testNumber: test.testNumber, result: test.result });
    });
    const xmlString = xml.end({ pretty: true });

    // Write the XML report to a file
    fs.writeFileSync("test_results.xml", xmlString, "utf-8");

  } catch (error) {
    console.error(`Error reading the number of rows: ${error.message}`);
  }
}



async function loginTestCase(testnumber) {
  try {
    const result = readExcelData(testnumber);

    const chromeOptions = new chrome.Options();
    //chromeOptions.addArguments('--headless');

    const driver = new webdriver.Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();

    try {
      await driver.manage().window().maximize();
      await driver.get("https://practicetestautomation.com/practice-test-login/"); // Replace with the actual login page URL

      // Find and interact with login page elements
      const usernameField = await driver.findElement(
        webdriver.By.id("username")
      ); // Replace with the actual ID of the username input field
      const passwordField = await driver.findElement(
        webdriver.By.id("password")
      ); // Replace with the actual ID of the password input field
      const loginButton = await driver.findElement(webdriver.By.id("submit")); // Replace with the actual ID of the login button

     
      // Enter login credentials
      await usernameField.sendKeys(result.variables["username"]); // Replace with a valid username
      await passwordField.sendKeys(result.variables["password"]); // Replace with a valid password

      const desiredUrl ="https://practicetestautomation.com/logged-in-successfully/"; // Replace with the expected URL after successful login


          // Click the login button
          //await loginButton.click();

          // Wait for a page to load or an element to appear that confirms successful login
          //await driver.wait(webdriver.until.urlIs('https://practicetestautomation.com/logged-in-successfully/'), 5000); // Replace with the URL of the dashboard page

          const actualUrl = await driver.getCurrentUrl();
          console.log(actualUrl);

         
          if (actualUrl === desiredUrl) {
            return { testId: firstColumnValue, result: "Passed" };
          } else {
            return { testId: firstColumnValue, result: "Failed" };
          }
          
      
    } finally {
      //await driver.quit();
    }
  } catch (error) {
    throw error; // Rethrow the error to be caught in the calling function
  }
}


async function initializeDriver() {
  try {
    const chromeOptions = new chrome.Options();
    //chromeOptions.addArguments('--headless');

    const driver = new webdriver.Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();

    try {
      await driver.manage().window().maximize();
      await driver.get("https://practicetestautomation.com/practice-test-login/"); // Replace with the actual login page URL

      // Find and interact with login page elements
      const usernameField = await driver.findElement(
        webdriver.By.id("username")
      ); // Replace with the actual ID of the username input field
      const passwordField = await driver.findElement(
        webdriver.By.id("password")
      ); // Replace with the actual ID of the password input field
      const loginButton = await driver.findElement(webdriver.By.id("submit")); // Replace with the actual ID of the login button
      
      // Return the elements as an object
      return {
        usernameField,
        passwordField,
        loginButton
      };
    } finally {
      // You can choose whether to quit the driver here or do it outside this function
      // await driver.quit();
    }
  } catch (error) {
    throw error; // Rethrow the error to be caught in the calling function
  }
}



async function loginTestCase(testnumber) {
  try {
    const result = readExcelData(testnumber);

    // Call the initializeDriver function
    const { usernameField, passwordField, loginButton } = await initializeDriver();

    await usernameField.sendKeys(result.variables["username"]); // Replace with a valid username
    await passwordField.sendKeys(result.variables["password"]); // Replace with a valid password

    // Continue with the rest of your login test case logic
    // ...
  } catch (error) {
    throw error; // Rethrow the error to be caught in the calling function
  }
}

runTestCases();



