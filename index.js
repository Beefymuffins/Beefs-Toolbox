#! /usr/bin/env node
/* eslint-disable no-promise-executor-return */
import inquirer from 'inquirer';
import { logLogo, logLogo2, version } from './utils/logo.js';
import { handleProxyCheck } from './commands/proxy-checker/handleProxyCheck.js';

export const run = async () => {
  try {
    process.title = `Proxy-Checker - Version: ${version}`;
    logLogo2();
    console.log('');

    /* eslint-disable-next-line */
    let answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do:',
        choices: ['Proxy-Checker', 'Exit CLI'],
      },
    ]);

    if (answer.action === 'Exit CLI') {
      console.log('👋 Exiting Proxy-Checker...');
      process.exit();
    } else if (answer.action === 'Proxy-Checker') {
      await handleProxyCheck();
    }
  } catch (error) {
    console.log(`error = `, error);
  }
};

const Main = async () => {
  global.runMain = run;
  global.sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Run script
  run();
};

Main();
