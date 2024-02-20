// Checks the input is not empty or whitespace only
const inputRegex = /^(?!\s*$).+/;

// Check address contains at least 1 letter and 1 number
const validAddressRegex = /^(?=.*[a-zA-Z])(?=.*\d).+/;

const onlyNumbersRegex = /^\d+$/;

export const questions = [
  {
    type: 'input',
    name: 'addressOne',
    message: 'Enter the address you would like to Jig.',
    validate(address) {
      if (!inputRegex.test(address) && !validAddressRegex.test(address)) {
        return `Please supply an address.`;
      }

      const addressParts = address.split(' ');
      if (addressParts.length >= 5 || addressParts.length < 2) {
        return `Please Enter a valid address. Example: '123 Main Street'`;
      }

      return true;
    },
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
    validate(address) {
      const addressParts = address.split(' ');
      if (addressParts.length >= 3 || addressParts.length < 1) {
        return `Please Enter a valid address. Example: 'Apt 4'`;
      }

      if (!inputRegex.test(address) && !validAddressRegex.test(address)) {
        return `Please supply an address.`;
      }

      return true;
    },
  },
  {
    type: 'input',
    name: 'amountToJig',
    message: 'How many jigs do you want?',
    validate(num) {
      const min = 0;
      const max = 500;

      if (!onlyNumbersRegex.test(num)) {
        return `Please enter only numbers.`;
      }

      if (num <= min || num > max) {
        return `Please enter a number between 1 - 500.`;
      }

      return true;
    },
  },
  // Secondary questions (What kind of Jigg do you want to do?)
  {
    type: 'list',
    name: 'typeOfJig',
    message: 'What type of Jig would you like?',
    choices: [
      {
        name: 'Random',
        value: 'random',
        description: 'Creates a random jigged address.',
      },
      {
        name: 'Custom',
        value: 'custom',
        description:
          'Creates a jigged address with users choice of jig method.',
      },
    ],
  },
  // If Custom
  {
    type: 'checkbox',
    name: 'jigCustomChoice',
    message: 'How would you like your address jigged? (Can select multiple)',
    choices: (answers) => {
      const defaultChoices = [
        { name: '3-Letter', value: 'threeLetter' },
        { name: '4-Letter', value: 'fourLetter' },
        { name: 'Change Suffix', value: 'changeSuffix' },
        { name: 'Slight Misspelling', value: 'slightMisspelling' },
        { name: 'Random periods', value: 'randomPeriods' },
        {
          name: 'Add Unit Designator',
          value: 'addUnitDesignator',
        },
      ];

      if (answers.isAddressTwo === false) {
        return defaultChoices;
      }

      // If there is an addressTwo hide the unitDesignations jigg
      return defaultChoices.filter(
        (choice) => choice.value !== 'addUnitDesignator'
      );
    },
    when: (answers) => answers.typeOfJig === 'custom',
    validate(choices) {
      if (choices.includes('threeLetter') && choices.includes('fourLetter')) {
        return `Please choose one or the other letter jig.`;
      }

      // Needs at least one choice
      if (choices.length === 0) {
        return `Please choose an option.`;
      }

      return true;
    },
  },
  // {
  //   type: 'checkbox',
  //   name: 'jigCustomChoice',
  //   message: 'How would you like your address jigged? (Can select multiple)',
  //   choices: [
  //     { name: '3-Letter', value: 'threeLetter' },
  //     { name: '4-Letter', value: 'fourLetter' },
  //     { name: 'Change Suffix', value: 'changeSuffix' },
  //     {
  //       name: 'Add Unit Designator',
  //       value: 'addUnitDesignator',
  //     },
  //   ],
  //   when: (answers) => answers.typeOfJig === 'custom',
  //   validate(choices) {
  //     if (choices.includes('threeLetter') && choices.includes('fourLetter')) {
  //       return `Please choose one or the other letter jig.`;
  //     }

  //     // Needs at least one choice
  //     if (choices.length === 0) {
  //       return `Please choose an option.`;
  //     }

  //     return true;
  //   },
  // },
  {
    type: 'list',
    name: 'lettersBeforeOrAfter',
    message: 'Would you like the letters BEFORE or AFTER the address?',
    choices: [
      {
        name: 'Before',
        value: 'before',
        description: 'Adds the letters BEFORE the address.',
      },
      {
        name: 'After',
        value: 'after',
        description: 'Adds the letters AFTER the address.',
      },
    ],
    when: (answers) =>
      (answers.typeOfJig === 'custom' &&
        answers.jigCustomChoice.includes('threeLetter')) ||
      (answers.typeOfJig === 'custom' &&
        answers.jigCustomChoice.includes('fourLetter')),
  },
];
