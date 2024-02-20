export const handleRandomPeriodsJig = (addys, amountToJig) => {
  const possibleJigs = [];

  // Array of address to jig
  const addressesToJig = Array.isArray(addys)
    ? addys
    : Array(Number(amountToJig)).fill(addys);

  // Iterate through each string in the array
  for (let i = 0; i < addressesToJig.length; i++) {
    // Step 1: Split the string into an array
    const stringArray = addressesToJig[i].split(' ');

    // Step 2: Remove the first and last elements
    const firstElement = stringArray.shift();
    const lastElement = stringArray.pop();

    // Step 3: Modify the remaining values
    for (let j = 0; j < stringArray.length; j++) {
      stringArray[j] = addRandomPeriods(stringArray[j]);
    }

    // Step 4: Add the first and last values back
    stringArray.unshift(firstElement);
    stringArray.push(lastElement);

    // Step 5: Join the array back into a string and update the original array
    possibleJigs.push(stringArray.join(' '));
  }

  return possibleJigs;
};

const addRandomPeriods = (inputString) => {
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
