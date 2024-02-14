import inquirer from 'inquirer';
import { logLogo, version } from './logo.js';
import { sleep } from '../utils/helpers.js';
import { handleProxy } from '../commands/proxies/index.js';
import { handleAccount } from '../commands/accounts/index.js';
import { handleMiscellaneous } from '../commands/miscellaneous/index.js';

export const run = async () => {
  try {
    process.title = `Beef's-Toolbox - Version: ${version}`;
    logLogo();
    console.log('');

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What are you working with?',
        choices: ['Proxies', 'Accounts', 'Miscellaneous', 'Exit'],
      },
    ]);

    if (answer.action === 'Exit CLI') {
      console.log('👋 Exiting Beefs-Toolbox...');
      await sleep(1500);
      console.clear();
      process.exit();
    } else if (answer.action === 'Proxies') {
      await handleProxy();
    } else if (answer.action === 'Accounts') {
      await handleAccount();
    } else if (answer.action === 'Miscellaneous') {
      await handleMiscellaneous();
    }
  } catch (error) {
    console.log(`error = `, error);
  }
};
