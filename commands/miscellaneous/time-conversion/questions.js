import { isValidTime } from '../../../utils/helpers.js';

export const questions = [
  {
    type: 'input',
    name: 'time',
    message: 'Enter the time to convert.',
    validate(time) {
      const check = isValidTime(time);

      // eslint-disable-next-line eqeqeq
      if (check == false) {
        return `Not a valid time.`;
      }

      return true;
    },
  },
  {
    type: 'list',
    name: 'sourceTimeZone',
    message: 'Enter the time zone to convert from.',
    choices: ['EST', 'CST', 'MST', 'PST', 'UTC'],
  },
];
