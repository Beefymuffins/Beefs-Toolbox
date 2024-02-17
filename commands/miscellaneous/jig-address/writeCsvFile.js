import { convertArrayToCSV } from 'convert-array-to-csv';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { fileUrl, writeToFile } from '../../../utils/helpers.js';

// If wanna save the date in the file name. Ex: csvOutputFile${date}.csv
const date = new Date().toJSON().slice(0, 10);

// ESM specific features use __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const output = path.join(__dirname, `csvOutputFile.csv`);

export const writeCsvFile = (dataArray) => {
  const csvArray = [];
  const header = ['Address Line One', 'Address Line Two'];

  // Split the data lines at the '/n'
  for (let i = 0; i < dataArray.length; i++) {
    const arr = dataArray[i];
    if (arr.includes('\n')) {
      const [lineOne, lineTwo] = arr.split('\n');
      csvArray.push([lineOne, lineTwo]);
    } else {
      csvArray.push([arr, '']);
    }
  }

  // Create CSV format
  const csvFromArrayOfArrays = convertArrayToCSV(csvArray, {
    header,
    separator: ',',
  });

  // Write to CSV
  writeToFile(output, csvFromArrayOfArrays);

  // TODO: Want to make the file persistent. Save in %appdata% or something.

  // Print hyperlink to the console
  const hyperlink = fileUrl(`${__dirname}/csvOutputFile.csv`);
  console.log(chalk.blue(`CSV File: ${hyperlink}`));
};
