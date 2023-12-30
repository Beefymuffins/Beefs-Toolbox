import inquirer from 'inquirer';
import { questions } from './proxyQuestions.js';

export const handleProxyCheck = async () => {
  const answers = await inquirer.prompt(questions);

  const { ProxyListOne, ProxyListTwo } = answers;

  if (!ProxyListOne || !ProxyListTwo) {
    return `Make sure you have proxy list imputed`;
  }

  // Make into an array (Split on new line)
  const list1 = ProxyListOne.split(/\r?\n/);
  const list2 = ProxyListTwo.split(/\r?\n/);

  // Compare the two list --> compare becomes the new array
  const compare = list1.filter((x) => !list2.includes(x));

  // Sometimes there is an extra space added, this removes it
  const noEmptyStrings = compare.filter((str) => str !== '');

  // Make it print one proxy per line
  const newList = noEmptyStrings.toString().split(',').join('\n');
  console.log(newList);

  return newList;
};
