import { isValidTime } from '../../utils/utils.js';

/* eslint-disable prefer-regex-literals */
export const questions = [
  {
    type: 'input',
    name: 'time',
    message: 'Enter the time to convert.',
    validate(time) {
      const check = isValidTime(time);

      if (check === false) {
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
