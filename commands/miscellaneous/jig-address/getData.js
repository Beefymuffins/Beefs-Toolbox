import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import { existsSync } from 'node:fs';

/**
 * Run Any of these with: node commands\miscellaneous\jig-address\getData.js
 * Uncomment the desired function to run
 */

// If the pound sign (#) is used in unitDesignator, there must be a space between the pound sign and the secondary number.

// URL of wiki page displaying all street suffixes
const URL = 'https://en.wikipedia.org/wiki/Street_suffix#United_States';

const generateCombinations = async (combinationLength) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const combinations = [];
  const file = `commands/miscellaneous/jig-address/data/${combinationLength}LetterCombinations.json`;

  // Only allow combinationLength to be between 1-4
  if (combinationLength > 4)
    return console.log(`Please supply a number between 1 - 4`);

  try {
    // Check if the file exists in the current directory.
    if (existsSync(file)) {
      throw new Error('The path exists.');
    }

    // Recursive function to generate combinations of given length
    const generate = (prefix, length) => {
      if (length === 0) {
        combinations.push(prefix.toUpperCase());
        return;
      }

      for (let i = 0; i < alphabet.length; i++) {
        const newPrefix = prefix + alphabet[i];
        generate(newPrefix, length - 1);
      }
    };

    generate('', combinationLength);

    // write results to file
    fs.writeFile(file, JSON.stringify(combinations, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Successfully written data to file!');
    });

    return combinations;
  } catch (error) {
    console.error('Error generating combinations data:', error.message);
  }
};

const result = generateCombinations(3);

// ---------------------------------------------------------------------------------------------------------------------------

// Get the street suffixes from wiki page
const getStreetSuffixes = async (url) => {
  try {
    try {
      // Fetch HTML content from the Wikipedia page
      const response = await axios.get(url);
      const html = response.data;

      // Load the HTML content into Cheerio
      const $ = cheerio.load(html);

      // Specify the selector for the ul containing the li elements
      const ulSelector =
        '#mw-content-text > div.mw-content-ltr.mw-parser-output > div:nth-child(26) > ul';

      // Extract text content from all li elements inside the specified ul
      const liTextContent = [];

      $(ulSelector)
        .find('li')
        .each((index, element) => {
          liTextContent.push($(element).text().trim());
        });

      // Process each element in the liTextContent array using the processStreetName function
      const processedResults = liTextContent.flatMap(processStreetName);

      // write results to file
      fs.writeFile(
        'commands/miscellaneous/jig-address/data/street_suffix.json',
        JSON.stringify(processedResults, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Successfully written data to file');
        }
      );

      // Output the processed results
      console.log(processedResults);
    } catch (error) {
      console.error('Error fetching or parsing data:', error.message);
    }
  } catch (err) {
    console.error(err);
  }
};

// const streetSuffixes = getData(URL);

// ---------------------------------------------------------------------------------------------------------------------------

// Sometimes Wiki will return [Alley (Allee, Ally, or Aly)].
// Use this function to separate the words and push to the array. ["Allee","Ally", "Aly",]
function processStreetName(suffix) {
  const newArr = [];
  const matches = suffix.match(/\((.*?)\)/); // Extract content within parentheses
  if (matches) {
    let additionalNames = matches[1].split(', '); // Split multiple names

    // Remove 'or' from each additional name
    additionalNames = additionalNames.map((name) =>
      name.replace(/\s*or\s*/g, '')
    );

    newArr.push(...additionalNames);
  }

  return newArr;
}
