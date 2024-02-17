import inquirer from 'inquirer';
import chalk from 'chalk';
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

/**
 * ? Options to add:
 * Slight Misspell jig
 * Random Periods
 */

// ? Right now im doing nothing with addressTwo

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

  const addressParts = addressOneCap.split(' ');
  let address = addressParts;
  let addressSuffix;

  if (addressParts.length >= 3) {
    address = addressParts.slice(0, -1); // deletes the suffix
    addressSuffix = addressParts.slice(-1); // Save the suffix
  }

  const addyToJig = address.join(' ');

  // Create Random Or Custom Jigs from 1 - 500
  if (typeOfJig === 'random') {
    const jiggedAddresses = handleRandomAddressJig(
      addyToJig,
      amountToJig,
      addressSuffix
    );

    // Add new addys to jigs array
    jigs.push(jiggedAddresses);
  }

  if (typeOfJig === 'custom') {
    let possibleJigs;

    // Random Street suffix jig
    if (jigCustomChoice.includes('changeSuffix')) {
      const addy = possibleJigs?.length > 0 ? possibleJigs : addyToJig;
      const result = handleChangeSuffixJig(addy, amountToJig);

      possibleJigs = result;
    }

    // 3 Letter Jigs (before or after)
    if (jigCustomChoice.includes('threeLetter')) {
      const addy = possibleJigs?.length > 0 ? possibleJigs : addyToJig;
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
      const addy = possibleJigs?.length > 0 ? possibleJigs : addyToJig;
      const result = handleFourLetterJig(
        addy,
        amountToJig,
        lettersBeforeOrAfter
      );

      possibleJigs = result;
    }

    // Random Unit Designator Jigg
    if (jigCustomChoice.includes('addUnitDesignator')) {
      console.log('HANDLING UNIT DESIGNATION');
      const addy = possibleJigs?.length > 0 ? possibleJigs : addyToJig;
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
