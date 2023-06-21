import fs from 'fs';

const makeObjectFromPath = (filepath) => JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }));

const genDiff = (filepath1, filepath2) => {
  const obj1 = makeObjectFromPath(filepath1);
  const obj2 = makeObjectFromPath(filepath2);
  const unitedEntries = Object.entries({ ...obj1, ...obj2 }).sort(([key1], [key2]) => {
    if (key1 < key2) {
      return -1;
    }
    if (key1 > key2) {
      return 1;
    }
    return 0;
  });
  const difference = unitedEntries.reduce((acc, [key, value]) => {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      const currentValue = `${acc}  - ${key}: ${value}\n`;
      return currentValue;
    }
    if (Object.hasOwn(obj2, key) && !Object.hasOwn(obj1, key)) {
      const currentValue = `${acc}  + ${key}: ${value}\n`;
      return currentValue;
    }
    if (obj1[key] === obj2[key]) {
      const currentValue = `${acc}    ${key}: ${value}\n`;
      return currentValue;
    }
    const currentValue = `${acc}  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
    return currentValue;
  }, '');
  return `{\n${difference}}`;
};

export default genDiff;
