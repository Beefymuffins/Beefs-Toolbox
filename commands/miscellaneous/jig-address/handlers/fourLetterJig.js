import {
  getJigDataJsonFile,
  getRandomArrayIndex,
} from '../../../../utils/helpers.js';

const filePath = '4LetterCombinations.json';

const fourLetterCombo = getJigDataJsonFile(filePath);

export const handleFourLetterJig = (addys, lettersBeforeOrAfter) => {
  const possibleJigs = [];

  for (let i = 0; i < addys.length; i++) {
    // Random unitDesignation
    const randomFourLetters = getRandomArrayIndex(fourLetterCombo);

    const newAddyJig =
      lettersBeforeOrAfter === 'before'
        ? `${randomFourLetters} ${addys[i]}`
        : `${addys[i]} ${randomFourLetters}`;

    // Check if the new string already exists in the new array
    if (!possibleJigs.includes(newAddyJig)) {
      // If not, push it to the new array
      possibleJigs.push(newAddyJig);
    }
  }

  return possibleJigs;
};
