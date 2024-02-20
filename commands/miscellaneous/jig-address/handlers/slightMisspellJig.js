export const handleSlightMisspellJig = (addys, amountToJig) => {
  const possibleJigs = [];

  // Array of address to jig
  const addressesToJig = Array.isArray(addys)
    ? addys
    : Array(Number(amountToJig)).fill(addys);

  // Slight Misspelling in address string
  for (let i = 0; i < addressesToJig.length; i++) {
    // Step 1: Split the string into an array
    const stringArray = addressesToJig[i].split(' ');

    // Step 2: Remove the first and last elements
    const firstElement = stringArray.shift();
    const lastElement = stringArray.pop();

    // Step 3: Modify the remaining values
    for (let j = 0; j < stringArray.length; j++) {
      // ! Add slight misspell to remaining words
      stringArray[j] = addSlightMisspell(stringArray[j]);
    }

    // Step 4: Add the first and last values back
    stringArray.unshift(firstElement);
    stringArray.push(lastElement);

    // Step 5: Join the array back into a string and update the original array
    possibleJigs.push(stringArray.join(' '));
  }

  return possibleJigs;
};

// ! Write Function
const addSlightMisspell = () => {};
