/* eslint-disable eqeqeq */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow */
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const fileUrl = (str) => {
  if (typeof str !== 'string') {
    throw new Error('Expected a string');
  }

  let pathName = path.resolve(str).replace(/\\/g, '/');

  // Windows drive letter must be prefixed with a slash (changes: C:/Users/ ==> /C:/Users)
  if (pathName[0] !== '/') {
    pathName = `/${pathName}`;
  }

  return encodeURI(`file://${pathName}`);
};

export const getAuthInfoFromProxyUrl = (proxy) => {
  const isAuth = proxy.split(':').length === 4;

  if (isAuth) {
    const [host, port, user, pass] = proxy.split(':');
    return [host, port, user, pass];
  }

  const [host, port] = proxy.split(':');
  return [host, port];
};

// Validate time format
export const isValidTime = (str) => {
  // Regex to check valid
  // time in 12-hour format
  const regex = new RegExp(/((1[0-2]|0?[1-9]):([0-5][0-9]))/);

  //  if str
  // is empty return false
  if (str == null) {
    return 'false';
  }

  // Return true if the str
  // matched the ReGex
  if (regex.test(str) == true) {
    return 'true';
  }
  return 'false';
};

// Read JigAddress Json Files
export const getJigDataJsonFile = (filePath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const absolutePath = path.join(
    __dirname,
    `../commands/miscellaneous/jig-address/data/${filePath}`
  );

  const file = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));

  return file;
};

// Get Random Number between (min - max)
export const getRandomMinMaxNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Get Random Number
export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate a random unit designation
export const getRandomArrayIndex = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const capitalized = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const capStreetName = (address) => {
  const words = address.split(' ');

  // Check if there is at least one word
  if (words.length >= 2) {
    words[1] = capitalized(words[1]);
  }

  return words.join(' ');
};

export const writeToFile = async (filename, data) => {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.log(chalk.red(`Error writing to ${filename}: ${err.message}`));
      throw err;
    }
    console.log('The file has been saved successfully!');
  });
};
