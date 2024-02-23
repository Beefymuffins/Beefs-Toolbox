import inquirer from 'inquirer';
import { questions } from './questions.js';
import {
  handleAddUnitDesignatorJig,
  handleRandomAddressJig,
  handleThreeLetterJig,
  handleFourLetterJig,
  handleChangeSuffixJig,
} from './handlers/index.js';
import { capStreetName } from '../../../utils/helpers.js';
import { writeCsvFile } from './writeCsvFile.js';
import { handleSlightMisspellJig } from './handlers/slightMisspellJig.js';
import { handleRandomPeriodsJig } from './handlers/randomPeriods.js';

export const handleAddressJig = async () => {
  const answers = await inquirer.prompt(questions);
  const {
    addressOne,
    isAddressTwo,
    addressTwo,
    amountToJig,
    typeOfJig,
    jigCustomChoice,
    lettersBeforeOrAfter,
  } = answers;

  const addressOneCap = capStreetName(addressOne);

  // Create a jigs array
  const jigs = [];

  // Create Random Or Custom Jigs from 1 - 500
  if (typeOfJig === 'random') {
    const jiggedAddresses = handleRandomAddressJig(
      addressOneCap,
      amountToJig,
      isAddressTwo,
      addressTwo
    );

    // Add new addys to jigs array
    jigs.push(jiggedAddresses);
  }

  if (typeOfJig === 'custom') {
    let possibleJigs = Array(Number(amountToJig)).fill(addressOneCap);
    // let possibleJigs;

    // Random Slight Misspelling of address
    if (jigCustomChoice.includes('slightMisspelling')) {
      const addy = possibleJigs?.length > 0 ? possibleJigs : addressOneCap;

      const result = handleSlightMisspellJig(addy, amountToJig);

      possibleJigs = result;
    }

    // Random periods in address string
    if (jigCustomChoice.includes('randomPeriods')) {
      const addy = possibleJigs?.length > 0 ? possibleJigs : addressOneCap;

      const result = handleRandomPeriodsJig(addy, amountToJig);

      possibleJigs = result;
    }

    // Random Street suffix jig
    if (jigCustomChoice.includes('changeSuffix')) {
      const addy = possibleJigs?.length > 0 ? possibleJigs : addressOneCap;

      const result = handleChangeSuffixJig(addy, amountToJig);

      possibleJigs = result;
    }

    // 3 Letter Jigs (before or after)
    if (jigCustomChoice.includes('threeLetter')) {
      const addy = possibleJigs?.length > 0 ? possibleJigs : addressOneCap;

      const result = handleThreeLetterJig(
        addy,
        amountToJig,
        lettersBeforeOrAfter
      );

      // possibleJigs.push(result);
      possibleJigs = result;
    }

    // 4 Letter Jigs (before or after)
    if (jigCustomChoice.includes('fourLetter')) {
      const addy = possibleJigs?.length > 0 ? possibleJigs : addressOneCap;

      const result = handleFourLetterJig(
        addy,
        amountToJig,
        lettersBeforeOrAfter
      );

      possibleJigs = result;
    }

    // Random Unit Designator Jigg
    if (jigCustomChoice.includes('addUnitDesignator')) {
      const addy = possibleJigs?.length > 0 ? possibleJigs : addressOneCap;

      const result = handleAddUnitDesignatorJig(addy, amountToJig);

      possibleJigs = result;
    }

    // Add new addys to jigs array
    jigs.push(possibleJigs);
  }

  // Reduce the array down to one layer
  const consolidatedArray = [].concat(...jigs);

  // Write results to CSV file
  const newFile = writeCsvFile(consolidatedArray);

  return newFile;
};
