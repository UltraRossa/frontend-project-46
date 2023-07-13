import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import parse from './parsers.js';
import makeDiffTree from './makeDiffTree.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const getExtension = (filepath) => path.extname(filepath);

export const readFile = (filepath) => fs.readFileSync(filepath, { encoding: 'utf8' });

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const parsedObject1 = parse(readFile(getFullPath(filepath1)), getExtension(filepath1));
  const parsedObject2 = parse(readFile(getFullPath(filepath2)), getExtension(filepath2));
  const diff = makeDiffTree(parsedObject1, parsedObject2);
  const formattedDiff = format(formatName, diff);
  return formattedDiff;
};

export default genDiff;
