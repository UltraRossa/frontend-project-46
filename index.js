import { getFullPath } from './src/utils.js';
import format from './formatters/index.js';
import parse from './src/parse.js';
import makeDiffTree from './src/makeDiffTree.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fullPath1 = getFullPath(filepath1);
  const fullPath2 = getFullPath(filepath2);
  const parsedObject1 = parse(fullPath1);
  const parsedObject2 = parse(fullPath2);
  const diff = makeDiffTree(parsedObject1, parsedObject2);
  const formattedDiff = format(formatName, diff);
  return formattedDiff;
};

export default genDiff;
