import {
  getJigDataJsonFile,
  getRandomArrayIndex,
} from '../../../../utils/helpers.js';

const filePath = '3LetterCombinations.json';

const threeLetterCombo = getJigDataJsonFile(filePath);

export const handleThreeLetterJig = (addys, lettersBeforeOrAfter) => {
  const possibleJigs = [];

  for (let i = 0; i < addys.length; i++) {
    // Random unitDesignation
    const randomThreeLetters = getRandomArrayIndex(threeLetterCombo);

    const newAddyJig =
      lettersBeforeOrAfter === 'before'
        ? `${randomThreeLetters} ${addys[i]}`
        : `${addys[i]} ${randomThreeLetters}`;

    // Check if the new string already exists in the new array
    if (!possibleJigs.includes(newAddyJig)) {
      // If not, push it to the new array
      possibleJigs.push(newAddyJig);
    }
  }

  return possibleJigs;
};
