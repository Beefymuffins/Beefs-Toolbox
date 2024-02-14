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

/**
 * ? Options to add:
 * Slight Misspell jig
 * Random Periods
 */

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

  // Create Random Jigs from 1 - 500
  if (typeOfJig === 'random') {
    const jiggedAddresses = handleRandomAddressJig(
      addyToJig,
      amountToJig,
      addressSuffix
    );

    // Add new addys to jigs array
    jigs.push(jiggedAddresses);
  }

  // Create Custom Jigs from 1 - 500
  if (typeOfJig === 'custom') {
    let possibleJigs;

    // Just street suffix jig
    if (jigCustomChoice.includes('changeSuffix')) {
      const addy = possibleJigs?.length > 0 ? possibleJigs : addyToJig;
      const result = handleChangeSuffixJig(addy, amountToJig);

      possibleJigs = result;
    }

    // Just 3 Letter Jigs (before or after)
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

    // Just 4 Letter Jigs (before or after)
    if (jigCustomChoice.includes('fourLetter')) {
      const addy = possibleJigs?.length > 0 ? possibleJigs : addyToJig;
      const result = handleFourLetterJig(
        addy,
        amountToJig,
        lettersBeforeOrAfter
      );

      possibleJigs = result;
    }

    if (jigCustomChoice.includes('addUnitDesignator')) {
      console.log('HANDLING UNIT DESIGNATION');
      const addy = possibleJigs?.length > 0 ? possibleJigs : addyToJig;
      const result = handleAddUnitDesignatorJig(addy, amountToJig);

      possibleJigs = result;
    }

    // Reduce arrays down to single array
    const consolidatedArray = [].concat(...possibleJigs);
    console.log(`consolidatedArray :`, consolidatedArray);

    // Add new addys to jigs array
    jigs.push(consolidatedArray);
  }

  // TODO: Write results to file
  // SPlit on the '\n' when writing to file. Creates Line two Ex: '123 main LIZO Canyn\nFLOOR 72'

  return jigs;
};
