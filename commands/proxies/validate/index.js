import inquirer from 'inquirer';
import { questions } from './questions.js';
import { validateProxies } from './validate.js';

export const handleProxyValidation = async () => {
  const { ProxyList } = await inquirer.prompt(questions);

  // Create array & Delete any extra spaces
  const proxiesList = ProxyList.split(/\r?\n/).filter((str) => str !== '');

  await validateProxies(proxiesList);
};
