import axios from 'axios';
import chalk from 'chalk';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import {
  fileUrl,
  getAuthInfoFromProxyUrl,
  writeToFile,
} from '../../../utils/helpers.js';

// * Ideas:
// Make the url dynamic (can check proxy against any site inputted)

// ESM specific features use __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const output = path.join(__dirname, 'outputFile.txt');

export const validateProxies = async (proxies) => {
  const validProxies = [];

  // Use Promise.all to execute all promises concurrently
  await Promise.all(
    proxies.map(async (proxy) => {
      const proxyInfo = getAuthInfoFromProxyUrl(proxy);
      const isAuth = proxyInfo.length === 4;

      // Start measuring time
      const startTime = new Date();

      try {
        await makeRequest(proxyInfo);

        // Calculate and log the elapsed time
        const endTime = new Date();
        const elapsedTime = endTime - startTime;

        console.log(
          chalk.green(
            `[ALIVE] -> ${proxyInfo[0]}:${proxyInfo[1]} - Ping: ${elapsedTime}ms`
          )
        );

        // Add the valid proxy to the array
        isAuth
          ? validProxies.push(
              `${proxyInfo[0]}:${proxyInfo[1]}:${proxyInfo[2]}:${proxyInfo[3]}`
            )
          : validProxies.push(`${proxyInfo[0]}:${proxyInfo[1]}`);
      } catch (error) {
        console.log(
          chalk.red(
            `[DEAD] -> ${proxyInfo[0]}:${proxyInfo[1]}.  Error: ${error.message}`
          )
        );
      }
    })
  );

  // Write valid proxies to the output file
  await writeToFile(output, validProxies.join('\n'));

  console.log(`${validProxies.length} out of ${proxies.length} valid proxies.`);

  // Print hyperlink to the console
  const hyperlink = fileUrl(`${__dirname}/outputFile.txt`);
  console.log(chalk.blue(`Valid Proxies File: ${hyperlink}`));
};

const makeRequest = (proxyInfo) => {
  const proxyOptions = {
    host: proxyInfo[0],
    port: proxyInfo[1],
  };

  // Add auth if there is user:pass
  if (proxyInfo.length === 4) {
    proxyOptions.auth = {
      username: proxyInfo[2],
      password: proxyInfo[3],
    };
  }

  return axios.get('http://www.google.com', {
    proxy: proxyOptions,
    timeout: 10000,
  });
};
