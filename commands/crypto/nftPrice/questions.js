export const questions = [
  {
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: [
      "Check Price of NFT",
      "Quick Check - (List of favorite NFTs)",
      "Create or Edit Favorites List",
    ],
  },
  {
    type: "input",
    name: "nftName",
    message: "Enter the address OR the name of the NFT.",
    when: (answers) => answers.action === "Check Price of NFT",
    validate(input) {
      // Check there is an input
      // Check that its not malicious input
    },
  },
  {
    type: "editor",
    name: "nftList",
    message: "Enter the address OR the name of the NFT. (One per line)",
    when: (answers) => answers.action === "Create or Edit Favorites List",
    validate(text) {
      if (text.split("\n").length < 2) {
        return "Must be at least 2 lines.";
      }
    },
  },
];
