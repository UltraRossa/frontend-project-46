import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import stylish from './stylish.js';
import plain from './plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = (filepath) => fs.readFileSync(filepath, { encoding: 'utf8' });

const normalizePath = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fullPath;
};

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const setFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new Error(`Unknown order state: '${formatName}'!`);
  }
};

export {
  readFile,
  normalizePath,
  getFixturePath,
  setFormatter,
};
