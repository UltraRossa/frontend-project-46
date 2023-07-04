import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = (filepath) => fs.readFileSync(filepath, { encoding: 'utf8' });

const normalizePath = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fullPath;
};

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

export {
  readFile,
  normalizePath,
  getFixturePath,
};
