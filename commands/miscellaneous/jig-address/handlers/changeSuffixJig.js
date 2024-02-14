import {
  getJigDataJsonFile,
  getRandomArrayIndex,
} from '../../../../utils/utils.js';

const filePath = 'streetSuffix.json';

const streetSuffix = getJigDataJsonFile(filePath);

// * There is only 19 street suffix options, before Duplicates are made.

export const handleChangeSuffixJig = (addys, amountToJig) => {
  const possibleJigs = [];

  // Array of address to jig
  const addressesToJig = Array.isArray(addys)
    ? addys
    : Array(Number(amountToJig)).fill(addys);

  for (let i = 0; i < addressesToJig.length; i++) {
    // Random unitDesignation
    const randomStreetSuffix = getRandomArrayIndex(streetSuffix);

    // Combine them into a new string
    const newAddyJig = `${addressesToJig[i]} ${randomStreetSuffix}`;

    // Check if the new string already exists in the new array
    if (!possibleJigs.includes(newAddyJig)) {
      // If not, push it to the new array
      possibleJigs.push(newAddyJig);
    }
  }

  return possibleJigs;
};
