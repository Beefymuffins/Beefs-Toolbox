import { readFileSync, createWriteStream } from 'fs';
import chalk from 'chalk';
import { questions } from './commands/getProxyLists.js';

// // Function to read the file
// const getList = (filename) => {
//   if (filename.length === 0) {
//     console.log(chalk.red.bold('File is empty.'));
//     return;
//   }
//   if (!filename) {
//     console.log(chalk.red.bold('No file exist!'));
//     return;
//   }
//   const contents = readFileSync(filename, 'utf-8');
//   const arr = contents.split(/\r?\n/);
//   return arr;
// };

// // Get data from the files
// const ogProxyList = getList('textFiles/originalList.txt');
// const compareProxyList = getList('textFiles/compareList.txt');

// // Compare the List (Creates a new array with non matching proxies)
// const checkList = ogProxyList.filter((x) => !compareProxyList.includes(x));

// // Function to write the file
// const result = (data) => {
//   const file = createWriteStream('textFiles/results.txt');
//   file.on('error', function (err) {
//     Console.log(chalk.red.bold('Error writing to file'));
//   });
//   data.forEach((value) => file.write(`${value}\r\n`));
//   file.end();
//   console.log(chalk.green.bold('New proxy list created in results file!'))

// };

// // Use the function to write the file with the results
// const compareResults = result(checkList)

// const handelAnswer = async (isChecker) => {
//   if (isChecker) {
//     await inquirer.prompt(questions).then((answers) => {
//       // console.log(JSON.stringify(answers, null, '  '));
//       console.log(answers);
//     });
//   }
// };

// const toDo = async () => {
//   const answers = await inquirer.prompt({
//     name: 'Process',
//     type: 'list',
//     message: 'Select one of the following:',
//     choices: ['Proxy-Checker'],
//   });

//   return handelAnswer(answers.Process === 'Proxy-Checker');
// };
