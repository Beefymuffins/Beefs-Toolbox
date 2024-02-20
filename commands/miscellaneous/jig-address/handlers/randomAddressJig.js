import { getStreetSuffix } from '../../../../utils/checkForSuffix.js';
import {
  getJigDataJsonFile,
  getRandomArrayIndex,
  getRandomMinMaxNumber,
} from '../../../../utils/helpers.js';
import { removeStreetSuffix } from '../../../../utils/removeStreetSuffix.js';

//  Get Data
const streetSuffixes = getJigDataJsonFile('streetSuffix.json');
const unitDesignations = getJigDataJsonFile('unitDesignator.json');
const threeLetterCombos = getJigDataJsonFile('3LetterCombinations.json');
const fourLetterCombos = getJigDataJsonFile('4LetterCombinations.json');

export const handleRandomAddressJig = (
  addyToJig,
  amountToJig,
  isAddressTwo,
  addressTwo
) => {
  // Get suffix
  const addressSuffix = getStreetSuffix(addyToJig);

  // Remove Suffix after its saved
  const addressNoSuffix = removeStreetSuffix(addyToJig);

  // If IS Suffix, use it randomly;
  const suffix = addressSuffix ? ` ${addressSuffix}` : '';
  const addresses = [];

  for (let i = 0; i < amountToJig; i++) {
    let address = addressNoSuffix;
    const isTrue = Math.random() < 0.5;
    const randomSuffix = getRandomArrayIndex(streetSuffixes);
    const randomUnitDes = getRandomArrayIndex(unitDesignations);
    const randomNum = getRandomMinMaxNumber(1, 99);

    // Decide whether to append threeLetterCombos or fourLetterCombos
    const chosenCombo = isTrue ? threeLetterCombos : fourLetterCombos;
    const randomCombo = getRandomArrayIndex(chosenCombo);

    // Randomly append street suffix
    address += isTrue ? `${suffix}` : ` ${randomSuffix}`;

    // Randomly append the letter combo before or after the address
    isTrue
      ? (address = `${randomCombo} ${address}`)
      : (address += ` ${randomCombo}`);

    // Randomly append unit designations ONLY if one is NOT supplied
    if (!isAddressTwo)
      address += isTrue ? '' : `\n${randomUnitDes} ${randomNum}`;

    // Add the ORIGINAL unit designations back to address
    if (isAddressTwo) address += `\n${addressTwo}`;

    // Push address to array
    addresses.push(address.trim());
  }

  return addresses;
};
