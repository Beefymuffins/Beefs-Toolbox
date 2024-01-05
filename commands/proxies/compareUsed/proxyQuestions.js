export const questions = [
  {
    type: 'editor',
    name: 'ProxyListOne',
    message: 'Enter the original proxy list',
    validate(text) {
      if (text.split('\n').length < 2) {
        return 'Must be at least 2 lines.';
      }

      return true;
    },
    waitUserInput: true,
  },
  {
    type: 'editor',
    name: 'ProxyListTwo',
    message: 'Enter the proxy list to compare to original',
    validate(text) {
      if (text.split('\n').length < 2) {
        return 'Must be at least 2 lines.';
      }

      return true;
    },
    waitUserInput: true,
  },
];
