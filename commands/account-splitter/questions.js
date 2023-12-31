export const questions = [
  {
    type: 'editor',
    name: 'AccountList',
    message: 'Enter the account list',
    validate(text) {
      if (text.split('\n').length < 2) {
        return 'Must be at least 2 lines.';
      }

      return true;
    },
    waitUserInput: true,
  },
];
