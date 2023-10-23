const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { readExcelData, countRowsInExcelFile } = require("./TestFileReader.js");
// const TestCase01 = require("./test01.js");
const Table = require("cli-table3");
const fs = require('fs/promises'); // Use the fs.promises API for asynchronous file operations
const path = require('path');



async function initializeDriver() {
  try {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--headless');

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
        driver,
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






async function loginTestCases(testnumber, table) {

  try {
    // Call the initializeDriver function
    const { driver, usernameField, passwordField, loginButton } = await initializeDriver();

    // Define the directory where your test case files are located
    const testCasesDirectory = '/home/minidu-tissera/Desktop/Architecture/TestCasesForLogin'; // Change this to the actual directory path

    // Construct the filename for the test case based on testnumber
    const testCaseFileName = `TestCase${testnumber}.js`;
    const testCaseFilePath = path.join(testCasesDirectory, testCaseFileName);

    try {
      // Attempt to read and load the test case file
      const testCaseModule = require(testCaseFilePath);

      if (typeof testCaseModule === 'function') {
        // The test case file should export a function
        const result = readExcelData(testnumber);
        const testResult = await testCaseModule(driver, usernameField, passwordField, loginButton, result.variables["username"], result.variables["password"]);

        // Add the test result to the table
        addTableRow(table, testnumber, testResult);

        return testResult;

      } else {
        console.error(`Test case module in '${testCaseFilePath}' does not export a function.`);
      }
    } catch (error) {
      console.error(`Error loading test case '${testCaseFileName}': ${error.message}`);
    }

    return 'Failed';

  } catch (error) {
    throw error; // Rethrow the error to be caught in the calling function
  }
}

function createTable() {
  const table = new Table({
    head: ["Test Number", "Result"],
  });
  return table;
}

function addTableRow(table, testNumber, result) {
  table.push([testNumber, result]);
}


async function runTestCases() {

  const table = createTable();

  const numberOfRows = countRowsInExcelFile();

  let passedCount = 0; // Counter for passed test cases
  let totalCount = 0; // Counter for total test cases

  for (i= 2; i <=2; i++) {
    const testResult = await loginTestCases(i,table);

    if (testResult === 'Passed') {
      passedCount++;
    }
    totalCount++;
  }

  // Output the table in the terminal after all executions
  console.log('Results Table:');
  console.log(table.toString());

  // Print the pass/total count after all executions
  console.log(`Passed: ${passedCount}/${totalCount}`);
}






runTestCases();

