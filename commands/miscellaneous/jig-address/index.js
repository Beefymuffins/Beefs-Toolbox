import inquirer from 'inquirer';
import chalk from 'chalk';
import { questions } from './questions.js';

export const handleAddressJig = async () => {
  const answers = await inquirer.prompt(questions);
  const { addressOne, isAddressTwo, addressTwo } = answers;
  console.log({ addressOne, isAddressTwo, addressTwo });

  // Do Work
};
