import {
  addOneRandomLetter,
  removeRandomLetter,
} from '../../../../utils/letters.js';

export const handleSlightMisspellJig = (addys) => {
  console.log(`addys = `, addys);
  const possibleJigs = [];

  // Slight Misspelling in address string
  for (let i = 0; i < addys.length; i++) {
    // Step 1: Split the string into an array
    const stringArray = addys[i].split(' ');
    console.log(`stringArray = `, stringArray);

    // Step 2: Remove the first and last elements
    const firstElement = stringArray.shift();
    const lastElement = stringArray.pop();

    // Step 3: Modify the remaining values
    for (let j = 0; j < stringArray.length; j++) {
      // Store the original string
      const originalString = stringArray[j];

      // Remove random letter
      if (Math.random() < 0.25) {
        stringArray[j] = removeRandomLetter(stringArray[j], 1);
      }

      // Add random number
      if (Math.random() < 0.25) {
        stringArray[j] = addOneRandomLetter(stringArray[j]);
      }

      // Check if the string has been modified (save for now BUT Might not use)
      // while (stringArray[j] === originalString) {
      //   // If not modified, remove a random letter again
      //   stringArray[j] = removeRandomLetter(stringArray[j], 1);
      // }
    }

    // Step 4: Add the first and last values back
    stringArray.unshift(firstElement);
    stringArray.push(lastElement);

    // Step 5: Join the array back into a string and update the original array
    possibleJigs.push(stringArray.join(' '));
  }

  return possibleJigs;
};
