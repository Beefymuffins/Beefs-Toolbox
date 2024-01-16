import inquirer from 'inquirer';
import { logLogo, version } from './logo.js';
import { handleProxyCheck } from '../commands/proxies/compareUsed/handleProxyCheck.js';
import { handleAccountSplitter } from '../commands/accounts/account-splitter/index.js';
import { sleep } from '../utils/utils.js';
import { handleProxyValidation } from '../commands/proxies/validate/index.js';
import { handleTimeConversion } from '../commands/time-conversion/index.js';

export const run = async () => {
  try {
    process.title = `Beef's-Toolbox - Version: ${version}`;
    logLogo();
    console.log('');

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What tool do you need?',
        choices: [
          'Compare-Proxy-lists',
          'Account-User:Pass-Splitter',
          'Proxy-Validator',
          'Time-Conversion',
          'Exit CLI',
        ],
      },
    ]);

    if (answer.action === 'Exit CLI') {
      console.log('👋 Exiting Beefs-Toolbox...');
      await sleep(1500);
      console.clear();
      process.exit();
    } else if (answer.action === 'Compare-Proxy-lists') {
      await handleProxyCheck();
    } else if (answer.action === 'Account-User:Pass-Splitter') {
      await handleAccountSplitter();
    } else if (answer.action === 'Proxy-Validator') {
      await handleProxyValidation();
    } else if (answer.action === 'Time-Conversion') {
      await handleTimeConversion();
    }
  } catch (error) {
    console.log(`error = `, error);
  }
};
