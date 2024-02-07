/* eslint-disable prefer-regex-literals */
export const questions = [
  {
    type: 'input',
    name: 'addressOne',
    message: 'Enter the address you would like to Jig.',
  },
  {
    type: 'confirm',
    name: 'isAddressTwo',
    message: 'Is there another address line? Apt, unit, ect.',
  },
  {
    type: 'input',
    name: 'addressTwo',
    message: 'Enter address line two. Apt, unit, ect.',
    when: (answers) => answers.isAddressTwo === true,
  },
];
