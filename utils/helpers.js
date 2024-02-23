/* eslint-disable prefer-regex-literals */
/* eslint-disable no-shadow */
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { stat, mkdir } from 'node:fs/promises';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

// Create File URL for hyperlink
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
  // Regex to check valid time in 12-hour format
  const regex = /((1[0-2]|0?[1-9]):([0-5][0-9]))/;
  // const regex = new RegExp(/((1[0-2]|0?[1-9]):([0-5][0-9]))/);

  //  if str is empty return false
  if (str == null) {
    return false;
  }

  // Return true if the str matched the ReGex
  if (regex.test(str) === true) {
    return true;
  }
  return false;
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

// Function to generate a random index in an array
export const getRandomArrayIndex = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Want all outputs to be sent to the Output_Files Folder
export const writeToFile = async (filename, folderName, data) => {
  // If wanna save the date in the file name. Ex: csvOutputFile${date}.csv
  const date = new Date().toJSON().slice(0, 10);
  const time = new Date().getTime();

  try {
    // Create Folder if it does not exist already
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const folder = path.join(__dirname, `../Output_Files/${folderName}`);
    await checkForDirectory(folder);

    // Create Filename
    const fileParts = filename.split('.');
    const updateFileName = `${fileParts[0]}${date}-${time}.${fileParts[1]}`;
    const output = path.join(folder, updateFileName);

    // Write file
    fs.writeFile(output, data, (err) => {
      if (err) {
        console.log(chalk.red(`Error writing to ${output}: ${err.message}`));
        throw err;
      }
      console.log('The file has been saved successfully!');
    });

    // Print hyperlink to the console
    const hyperlink = fileUrl(output);
    console.log(chalk.blue(`CSV File: ${hyperlink}`));
  } catch (error) {
    console.error(`Error writing to file!`, error);
  }
};

// Check for dir, if none, make it
export const checkForDirectory = async (dir) => {
  try {
    await stat(dir);
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await mkdir(dir);
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};

// Get array OR Create array if none
export const getArray = (addys, amountToJig) => {
  const addressesToJig = Array.isArray(addys)
    ? addys
    : Array(Number(amountToJig)).fill(addys);

  return addressesToJig;
};
