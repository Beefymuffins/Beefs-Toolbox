import inquirer from 'inquirer';
import chalk from 'chalk';
import { questions } from './questions.js';

export const handleAccountSplitter = async () => {
  const answers = await inquirer.prompt(questions);
  const { AccountList } = answers;
  const arr = AccountList.split(/\r?\n/);

  const accountArr = [];
  const passwordArr = [];

  // loop through the list and separate the account from the password
  for (let i = 0; i < arr.length; i++) {
    const opt = arr[i].split(':');
    const key = opt[0];
    const value = opt[1];

    accountArr.push(key);
    passwordArr.push(value);
  }

  // Display the account & password
  console.log(
    chalk.green.bold(`Account:\n`),
    accountArr.toString().split(',').join('\n')
  );
  console.log(
    chalk.green.bold(`Password:\n`),
    passwordArr.toString().split(',').join('\n')
  );
};
