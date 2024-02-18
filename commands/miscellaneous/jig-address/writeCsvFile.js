import { convertArrayToCSV } from 'convert-array-to-csv';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeToFile } from '../../../utils/helpers.js';

// ESM specific features use __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputFolder = 'Jigged_Addresses';
const outputFile = `csvOutputFile.csv`;
// const outputFile = `csvOutputFile${date}-${time}.csv`;

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

  // Finally, Write to CSV
  writeToFile(outputFile, outputFolder, csvFromArrayOfArrays);
};
