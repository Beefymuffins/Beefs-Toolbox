import { getJigDataJsonFile } from './helpers.js';

const filePath = 'streetSuffix.json';
const streetSuffixes = getJigDataJsonFile(filePath);

export const removeStreetSuffix = (address) => {
  let userInputtedAddress = address.toLowerCase();

  // Iterate through the street suffixes
  for (const suffix of streetSuffixes) {
    const lowerSuffix = suffix.toLowerCase();

    // Check if the address ends with the current suffix
    if (userInputtedAddress.endsWith(lowerSuffix)) {
      // Remove the suffix from the address
      userInputtedAddress = userInputtedAddress.slice(0, -suffix.length).trim();

      // Stop the loop once a suffix is removed
      break;
    }
  }
  return userInputtedAddress;
};
