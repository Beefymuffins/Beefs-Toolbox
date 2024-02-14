import {
  getJigDataJsonFile,
  getRandomArrayIndex,
} from '../../../../utils/utils.js';

const filePath = '4LetterCombinations.json';

const fourLetterCombo = getJigDataJsonFile(filePath);

export const handleFourLetterJig = (
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
    const randomFourLetters = getRandomArrayIndex(fourLetterCombo);

    const newAddyJig =
      lettersBeforeOrAfter === 'before'
        ? `${randomFourLetters} ${addressesToJig[i]}`
        : `${addressesToJig[i]} ${randomFourLetters}`;

    // Check if the new string already exists in the new array
    if (!possibleJigs.includes(newAddyJig)) {
      // If not, push it to the new array
      possibleJigs.push(newAddyJig);
    }
  }

  return possibleJigs;
};
