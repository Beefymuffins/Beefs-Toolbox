import inquirer from 'inquirer';
import { handleTimeConversion } from './time-conversion/index.js';
import { sleep } from '../../utils/utils.js';

export const handleMiscellaneous = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What tool do you need?',
      choices: ['Time-Conversion', 'Exit CLI'],
    },
  ]);

  if (answer.action === 'Exit CLI') {
    console.log('👋 Exiting Beefs-Toolbox...');
    await sleep(1500);
    console.clear();
    process.exit();
  } else if (answer.action === 'Time-Conversion') {
    await handleTimeConversion();
  }
};
