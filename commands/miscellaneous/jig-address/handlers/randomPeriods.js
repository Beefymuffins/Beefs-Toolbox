import { addRandomPeriods } from '../../../../utils/addRandomPeriod.js';

/* eslint-disable no-shadow */
export const handleRandomPeriodsJig = (addys) => {
  const possibleJigs = [];

  // Iterate through each string in the array
  for (let i = 0; i < addys.length; i++) {
    // Step 1: Split the string into an array
    const stringArray = addys[i].split(' ');

    // If Address is 2 values. Ex: '123 Main St'
    if (stringArray.length > 3) {
      // Step 2: Remove the first and last elements
      const firstElement = stringArray.shift();

      const lastElement = stringArray.pop();

      // Step 3: Modify the remaining values
      for (let j = 0; j < stringArray.length; j++) {
        stringArray[j] = addRandomPeriods(stringArray[j]);
      }

      // Step 4: Add the first and last values back
      stringArray.unshift(firstElement);
      stringArray.push(lastElement);

      // Step 5: Join the array back into a string and update the original array
      return possibleJigs.push(stringArray.join(' '));
    }

    // If Address is 3 values. Ex: '123 East Main St'
    const firstElement = stringArray.shift();

    // Modify the remaining values
    for (let j = 0; j < stringArray.length; j++) {
      stringArray[j] = addRandomPeriods(stringArray[j]);
    }

    stringArray.unshift(firstElement);

    // Join the array back into a string and update the original array
    possibleJigs.push(stringArray.join(' '));
  }

  return possibleJigs;
};
