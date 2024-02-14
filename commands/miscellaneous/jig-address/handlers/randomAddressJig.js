import {
  getJigDataJsonFile,
  getRandomArrayIndex,
  getRandomMinMaxNumber,
} from '../../../../utils/helpers.js';

const streetSuffixFilePath = 'streetSuffix.json';
const unitDesignationFilePath = 'unitDesignator.json';
const threeLetterFilePath = '3LetterCombinations.json';
const fourLetterFilePath = '4LetterCombinations.json';

export const handleRandomAddressJig = (
  addyToJig,
  amountToJig,
  addressSuffix
) => {
  //  Get Data
  const streetSuffixes = getJigDataJsonFile(streetSuffixFilePath);
  const unitDesignations = getJigDataJsonFile(unitDesignationFilePath);
  const threeLetterCombos = getJigDataJsonFile(threeLetterFilePath);
  const fourLetterCombos = getJigDataJsonFile(fourLetterFilePath);

  const suffix = addressSuffix ? ` ${addressSuffix}` : '';
  const addresses = [];

  for (let i = 0; i < amountToJig; i++) {
    let address = addyToJig;
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

    // Randomly append unit designations
    address += isTrue ? '' : `\n${randomUnitDes} ${randomNum}`;

    // Push address to array
    addresses.push(address.trim());
  }

  console.log(`addresses`, addresses);
  return addresses;
};
