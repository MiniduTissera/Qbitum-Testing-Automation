const XLSX = require("xlsx");


const fs = require('fs');
const csv = require('csv-parser');


function countRowsInExcelFile() {

    const filePath = '/home/minidu-tissera/Desktop/Architecture/Sample Login Test Cases.xlsx';

    try {
      const workbook = XLSX.readFile(filePath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const range = XLSX.utils.decode_range(worksheet['!ref']);
      const numberOfRows = range.e.r + 1;
      return numberOfRows;
    } catch (error) {
      console.error(`Error reading the Excel file: ${error.message}`);
      return 0; // Return 0 in case of an error
    }
}


function readExcelData(testnumber) {
  const workbook = XLSX.readFile("/home/minidu-tissera/Desktop/Architecture/Sample Login Test Cases.xlsx");
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const columnToCapture = "Test Data";
  // Specify the row you want to capture data from
  const rowToCapture = testnumber; // Change this to the desired row number

  // Initialize variables to store the captured values
  const variables = {}; // Store variables and their values as key-value pairs

  // Convert the worksheet to an array of objects
  const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Find the column index (0-based) based on the column label
  const columnIndex = sheetData[0].indexOf(columnToCapture);

  if (columnIndex !== -1) {
    // Check if the specified row exists
    if (rowToCapture >= 1 && rowToCapture < sheetData.length) {
      const cellValue = sheetData[rowToCapture][columnIndex];
      if (cellValue !== undefined) {
        // Split the cell value by line breaks to get an array of lines
        const lines = cellValue.split('\n');

        // Loop through each line and capture variables and their values
        lines.forEach((line) => {
          const parts = line.split('=');
          if (parts.length === 2) { // Check if there is exactly one "=" sign
            const variable = parts[0].trim(); // Variable name before "="
            const value = parts[1].trim(); // Value after "="
            variables[variable] = value; // Store variable and value
          }else if (parts.length === 1) { // If there is no "=" sign, assign a space as the value
            const variable = parts[0].trim(); // Variable name
            variables[variable] = ''; // Assign a space as the value
          }
        });

        if (Object.keys(variables).length > 0) {
          return { variables };
        } else {
          throw new Error(`No variables found in the Test Data.`);
        }
      } else {
        throw new Error(`No data found at Column "${columnToCapture}", Row ${rowToCapture}.`);
      }
    } else {
      throw new Error(`Row ${rowToCapture} not found in the worksheet.`);
    }
  } else {
    throw new Error(`Column "${columnToCapture}" not found in the worksheet.`);
  }
}




function readExcelDataByTestCaseName() {
  const workbook = XLSX.readFile("/home/minidu-tissera/Desktop/Architecture/Sample Login Test Cases.xlsx");

  const testCaseName = "Verify whether the log in is successful for correct User name and Password";


  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Initialize variables to store the captured values
  let variable1 = "";
  let variable2 = "";

  // Convert the worksheet to an array of objects
  const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Find the column indices (0-based) based on the column labels
  const testCaseNameColumnIndex = sheetData[0].indexOf("Test Case Name");
  const testDataColumnIndex = sheetData[0].indexOf("Test Data");

  if (testCaseNameColumnIndex !== -1 && testDataColumnIndex !== -1) {
    // Search for the row that matches the specified Test Case Name
    for (let row = 1; row < sheetData.length; row++) {
      if (sheetData[row][testCaseNameColumnIndex] === testCaseName) {
        // Found the matching row, capture the data
        const cellValue = sheetData[row][testDataColumnIndex];

        if (cellValue !== undefined) {
          // Split the cell value by line breaks to get an array of lines
          const lines = cellValue.split('\n');

          // Loop through each line and capture words after '=' sign
          lines.forEach((line, index) => {
            const parts = line.split('=');
            if (parts.length > 1) {
              // Join the parts from the second part to the last part
              const wordsAfterEqualSign = parts.slice(1).join('=').trim();
              if (index === 0) {
                variable1 = wordsAfterEqualSign;
              } else if (index === 1) {
                variable2 = wordsAfterEqualSign;
              }
            }
          });

          // Check if both variables have been assigned
          if (variable1 !== undefined && variable2 !== undefined) {
            return { variable1, variable2 };
          } else {
            throw new Error(`Not enough values found after '=' sign.`);
          }
        } else {
          throw new Error(`No data found at Column "Test Data" for Test Case "${testCaseName}".`);
        }
      }
    }

    throw new Error(`Test Case "${testCaseName}" not found in the worksheet.`);
  } else {
    throw new Error(`Column "Test Case Name" or "Test Data" not found in the worksheet.`);
  }
}



module.exports = { readExcelData , countRowsInExcelFile, readExcelDataByTestCaseName };


