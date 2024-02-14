import {
  getJigDataJsonFile,
  getRandomArrayIndex,
} from '../../../../utils/helpers.js';

const filePath = '3LetterCombinations.json';

const threeLetterCombo = getJigDataJsonFile(filePath);

export const handleThreeLetterJig = (
  addys,
  amountToJig,
  lettersBeforeOrAfter
) => {
  const possibleJigs = [];

  // Array of address to jig
  const addressesToJig = Array.isArray(addys)
    ? addys
    : Array(Number(amountToJig)).fill(addys);

  for (let i = 0; i < addressesToJig.length; i++) {
    // Random unitDesignation
    const randomThreeLetters = getRandomArrayIndex(threeLetterCombo);

    const newAddyJig =
      lettersBeforeOrAfter === 'before'
        ? `${randomThreeLetters} ${addressesToJig[i]}`
        : `${addressesToJig[i]} ${randomThreeLetters}`;

    // Check if the new string already exists in the new array
    if (!possibleJigs.includes(newAddyJig)) {
      // If not, push it to the new array
      possibleJigs.push(newAddyJig);
    }
  }

  return possibleJigs;
};
