import path from 'path';
import format from './formatters/index.js';
import parse from './parse.js';
import makeDiffTree from './makeDiffTree.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const getExtension = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const getObjectFromFile1 = parse(getExtension(filepath1));
  const getObjectFromFile2 = parse(getExtension(filepath2));
  const fullPath1 = getFullPath(filepath1);
  const fullPath2 = getFullPath(filepath2);
  const object1 = getObjectFromFile1(fullPath1);
  const object2 = getObjectFromFile2(fullPath2);
  const diff = makeDiffTree(object1, object2);
  const formattedDiff = format(formatName, diff);
  return formattedDiff;
};

export default genDiff;
