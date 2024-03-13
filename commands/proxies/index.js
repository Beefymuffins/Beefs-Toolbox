import inquirer from "inquirer";
import { sleep } from "../../utils/helpers.js";
import { handleProxyCheck } from "./compareUsed/handleProxyCheck.js";
import { handleProxyValidation } from "./validate/index.js";

export const handleProxy = async () => {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What tool do you need?",
      choices: ["Compare-Proxy-lists", "Proxy-Validator", "Exit CLI"],
    },
  ]);

  if (answer.action === "Exit CLI") {
    console.log("👋 Exiting Beefs-Toolbox...");
    await sleep(1500);
    console.clear();
    process.exit();
  } else if (answer.action === "Compare-Proxy-lists") {
    await handleProxyCheck();
  } else if (answer.action === "Proxy-Validator") {
    await handleProxyValidation();
  }
};
