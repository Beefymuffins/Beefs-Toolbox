import {
  getJigDataJsonFile,
  getRandomArrayIndex,
} from '../../../../utils/helpers.js';
import { removeStreetSuffix } from '../../../../utils/removeStreetSuffix.js';

const filePath = 'streetSuffix.json';
const streetSuffix = getJigDataJsonFile(filePath);

// * There is only 19 street suffix options, before Duplicates are made.

export const handleChangeSuffixJig = (addys, amountToJig) => {
  const possibleJigs = [];

  // Array of address to jig
  const addressesToJig = Array.isArray(addys)
    ? addys
    : Array(Number(amountToJig)).fill(addys);

  // Loop through the array and remove street suffix from each address
  const modifiedAddy = addressesToJig.map(removeStreetSuffix);

  for (let i = 0; i < modifiedAddy.length; i++) {
    // Random unitDesignation
    const randomStreetSuffix = getRandomArrayIndex(streetSuffix);

    // Combine them into a new string
    const newAddyJig = `${modifiedAddy[i]} ${randomStreetSuffix}`;

    // Check if the new string already exists in the new array
    if (!possibleJigs.includes(newAddyJig)) {
      // If not, push it to the new array
      possibleJigs.push(newAddyJig);
    }
  }

  return possibleJigs;
};
