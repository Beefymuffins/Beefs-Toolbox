export const handleCrypto = async () => {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What tool do you need?",
      choices: [
        "Wallet Balance Checker",
        "NFT Price Checker",
        "Coin price tracker",
        "Exit CLI",
      ],
    },
  ]);

  if (answer.action === "Exit CLI") {
    console.log("👋 Exiting Beefs-Toolbox...");
    await sleep(1500);
    console.clear();
    process.exit();
  } else if (answer.action === "Wallet Balance Checker") {
    await handleWalletBalance();
  } else if (answer.action === "NFT Price Checker") {
    await handleNFTPrice();
  } else if (answer.action === "Coin price tracker") {
    await handleCoinPrice();
  }
};
