const XLSX = require('xlsx'); // Import the XLSX library (assuming you have it installed)
const { readExcelData, countRowsInExcelFile } = require("./TestFileReader.js");

// Define the readExcelData function here...

// Call the readExcelData function and capture the return value
const testNumberToCapture = 2; // Change this to the desired test number
try {
  const result = readExcelData(testNumberToCapture);

  // Check if variables were found and print them
  if (result.variables) {
    console.log('Captured variables:');
    for (const variable in result.variables) {
      if (result.variables.hasOwnProperty(variable)) {
        console.log(`${variable}: ${result.variables[variable]}`);
      }
    }
  } else {
    console.log('No variables found in the Test Data.');
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
}
