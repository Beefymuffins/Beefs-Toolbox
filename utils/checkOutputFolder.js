import path from 'path';
import { fileURLToPath } from 'url';
import { checkForDirectory } from './helpers.js';

export const checkOrCreateFolder = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const folder = path.join(__dirname, `../Output_Files`);
  const isFolder = await checkForDirectory(folder);
};
