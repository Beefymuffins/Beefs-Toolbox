import {
  getJigDataJsonFile,
  getRandomMinMaxNumber,
  getRandomArrayIndex,
} from '../../../../utils/helpers.js';

const filePath = 'unitDesignator.json';

const unitDesignation = getJigDataJsonFile(filePath);

export const handleAddUnitDesignatorJig = (addys) => {
  const possibleJigs = [];

  for (let i = 0; i < addys.length; i++) {
    // Random unitDesignation
    const randomUnitDesignation = getRandomArrayIndex(unitDesignation);

    // Generate a random number
    const randomNumber = getRandomMinMaxNumber(1, 99);

    // Combine them into a new string. Unit on second line.
    const newAddyJig = `${addys[i]}\n${randomUnitDesignation} ${randomNumber}`;

    // Check if the new string already exists in the new array
    if (!possibleJigs.includes(newAddyJig)) {
      // If not, push it to the new array
      possibleJigs.push(newAddyJig);
    }
  }

  return possibleJigs;
};
