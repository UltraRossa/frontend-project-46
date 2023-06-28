import { normalizePath } from './utils.js';
import parse from './parsers.js';
import makeNewTree from './makeNewTree.js';

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const fullPath1 = normalizePath(filepath1);
  const fullPath2 = normalizePath(filepath2);
  const parsedObject1 = parse(fullPath1);
  const parsedObject2 = parse(fullPath2);
  const diff = makeNewTree(parsedObject1, parsedObject2);

};

export default genDiff;
