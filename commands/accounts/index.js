import inquirer from 'inquirer';
import { sleep } from '../../utils/utils.js';
import { handleAccountSplitter } from './account-splitter/index.js';

export const handleAccount = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What tool do you need?',
      choices: ['Account-User:Pass-Splitter', 'Exit CLI'],
    },
  ]);

  if (answer.action === 'Exit CLI') {
    console.log('👋 Exiting Beefs-Toolbox...');
    await sleep(1500);
    console.clear();
    process.exit();
  } else if (answer.action === 'Account-User:Pass-Splitter') {
    await handleAccountSplitter();
  }
};
