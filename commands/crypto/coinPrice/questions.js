export const questions = [
  {
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: [
      "Check Price of Coin",
      "Quick Check - (List of favorite coins)",
      "Create or Edit Favorites List",
    ],
  },
  {
    type: "input",
    name: "coin",
    message: "Enter the name of the coin",
    when: (answers) => answers.action === "Check Price of Coin",
    validate(coin) {
      // Check if input is not empty
      // Check is valid coin
    },
  },
  {
    type: "editor",
    name: "coinList",
    message: "Enter the name of the coin. (One per line)",
    when: (answers) => answers.action === "Create or Edit Favorites List",
    validate(text) {
      if (text.split("\n").length < 2) {
        return "Must be at least 2 lines.";
      }
    },
  },
];
