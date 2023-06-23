import fs from 'fs';
import path from 'path';

const readFile = (filepath) => fs.readFileSync(filepath, { encoding: 'utf8' });

const normalizePath = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fullPath;
};

export { readFile, normalizePath };
