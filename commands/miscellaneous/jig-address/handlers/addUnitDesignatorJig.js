import {
  getJigDataJsonFile,
  getRandomMinMaxNumber,
  getRandomArrayIndex,
} from '../../../../utils/helpers.js';

const filePath = 'unitDesignator.json';

const unitDesignation = getJigDataJsonFile(filePath);

// Old:
// const unitDesignation = getJsonFile(
//   'commands/miscellaneous/jig-address/data/unitDesignator.json'
// );

export const handleAddUnitDesignatorJig = (addys, amountToJig) => {
  const possibleJigs = [];

  // Array of address to jig
  const addressesToJig = Array.isArray(addys)
    ? addys
    : Array(Number(amountToJig)).fill(addys);

  for (let i = 0; i < addressesToJig.length; i++) {
    // Random unitDesignation
    const randomUnitDesignation = getRandomArrayIndex(unitDesignation);

    // Generate a random number
    const randomNumber = getRandomMinMaxNumber(1, 99);

    // Combine them into a new string. Unit on second line.
    const newAddyJig = `${addressesToJig[i]}\n${randomUnitDesignation} ${randomNumber}`;

    // Check if the new string already exists in the new array
    if (!possibleJigs.includes(newAddyJig)) {
      // If not, push it to the new array
      possibleJigs.push(newAddyJig);
    }
  }

  return possibleJigs;
};
