/* eslint-disable no-param-reassign */

export const removeRandomLetter = (str, amount) => {
  for (let i = 0; i < amount; i++) {
    // Never remove the first letter
    const firstLetter = str.charAt(0);
    let remainingLetters = str.substring(1);

    const max = remainingLetters.length - 1;
    const pos = Math.round(Math.random() * max);
    remainingLetters =
      remainingLetters.slice(0, pos) + remainingLetters.slice(pos + 1);

    str = `${firstLetter}${remainingLetters}`;
  }
  return str;
};

// Function to add a random letter to a string
export const addOneRandomLetter = (inputString) => {
  // Generate a random letter
  const randomLetter = getRandomLetter();

  // Never add letters before the first letter
  const firstLetter = inputString.charAt(0);
  const remainingLetters = inputString.substring(1);

  // Insert the random letter at a random position in the string
  const randomPosition = Math.floor(
    Math.random() * (remainingLetters.length + 1)
  );

  const modifiedString =
    remainingLetters.slice(0, randomPosition) +
    randomLetter +
    remainingLetters.slice(randomPosition);

  const str = `${firstLetter}${modifiedString}`;

  return str;
};

export const getRandomLetter = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 97);
