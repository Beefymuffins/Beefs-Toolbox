import inquirer from 'inquirer';
import { logLogo, version } from './logo.js';
import { handleProxyCheck } from '../commands/proxy-checker/handleProxyCheck.js';
import { handleAccountSplitter } from '../commands/account-splitter/index.js';
import { sleep } from './utils.js';

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
        choices: ['Proxy-Checker', 'Account-Splitter', 'Exit CLI'],
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
    }
  } catch (error) {
    console.log(`error = `, error);
  }
};
