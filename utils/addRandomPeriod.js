export const addRandomPeriods = (inputString) => {
  // Split the string into an array of words
  const words = inputString.split(' ');

  // Iterate through each word
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let modifiedWord = '';

    // Iterate through each character in the word
    for (let j = 0; j < word.length; j++) {
      // Add the current character to the modified word
      modifiedWord += word[j];

      // Add a random period with a 25% probability
      if (Math.random() < 0.25) {
        modifiedWord += '.';
      }
    }

    // Update the word in the array
    words[i] = modifiedWord;
  }

  // Join the array back into a string and return it
  return words.join(' ');
};
