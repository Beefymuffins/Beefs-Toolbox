import inquirer from 'inquirer';
import { logLogo, version } from './logo.js';
import { handleProxyCheck } from '../commands/proxies/compareUsed/handleProxyCheck.js';
import { handleAccountSplitter } from '../commands/accounts/account-splitter/index.js';
import { sleep } from '../utils/utils.js';
import { handleProxyValidation } from '../commands/proxies/validate/index.js';

export const run = async () => {
  try {
    process.title = `Beef's-Toolbox - Version: ${version}`;
    logLogo();
    console.log('');

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do:',
        choices: [
          'Proxy-Checker',
          'Account-Splitter',
          'Proxy-Validator',
          'Exit CLI',
        ],
      },
    ]);

    if (answer.action === 'Exit CLI') {
      console.log('👋 Exiting Beefs-Toolbox...');
      await sleep(1500);
      console.clear();
      process.exit();
    } else if (answer.action === 'Proxy-Checker') {
      await handleProxyCheck();
    } else if (answer.action === 'Account-Splitter') {
      await handleAccountSplitter();
    } else if (answer.action === 'Proxy-Validator') {
      await handleProxyValidation();
    }
  } catch (error) {
    console.log(`error = `, error);
  }
};
