export const questions = [
  {
    type: 'editor',
    name: 'ProxyList',
    message: 'Enter the proxy list to be validated',
    validate(text) {
      if (text.split('\n').length < 2) {
        return 'Must be at least 2 lines.';
      }

      return true;
    },
    waitUserInput: true,
  },
];
