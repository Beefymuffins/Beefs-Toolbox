#! /usr/bin/env node

import { run } from './cli/run.js';

const Main = async () => {
  // Add globals (needs looked into.. not working)
  global.runMain = run;

  // Run script
  run();
};

Main();
