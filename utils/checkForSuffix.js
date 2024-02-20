import { getJigDataJsonFile } from './helpers.js';

const filePath = 'streetSuffix.json';
const streetSuffixes = getJigDataJsonFile(filePath);

export const getStreetSuffix = (address) => {
  const lowerAddress = address.toLowerCase();

  const matchingSuffix = streetSuffixes.find((suffix) =>
    lowerAddress.includes(suffix.toLowerCase())
  );

  return matchingSuffix || null; // Return null if no suffix is found
};
