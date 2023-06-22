import fs from 'fs';
import _ from 'lodash';

const makeObjectFromPath = (filepath) => JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }));

const genDiff = (filepath1, filepath2) => {
  const obj1 = makeObjectFromPath(filepath1);
  const obj2 = makeObjectFromPath(filepath2);
  const unitedSortedKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

  const difference = unitedSortedKeys.reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      return `${acc}  + ${key}: ${obj2[key]}\n`;
    }

    if (!Object.hasOwn(obj2, key)) {
      return `${acc}  - ${key}: ${obj1[key]}\n`;
    }

    if (obj1[key] === obj2[key]) {
      return `${acc}    ${key}: ${obj1[key]}\n`;
    }
    return `${acc}  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
  }, '');

  return `{\n${difference}}`;
};

export default genDiff;
